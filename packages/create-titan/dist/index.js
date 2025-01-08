#!/usr/bin/env node
"use strict";

// src/index.ts
var { Command } = require("commander");
var chalk = require("chalk");
var execa = require("execa");
var ora = require("ora");
var prompts = require("prompts");
var fs = require("fs/promises");
var path = require("path");
var program = new Command().name("create-titan").description("Create a new Titan project").argument("[directory]", "Directory to create the project in").version("0.1.0").parse();
async function main() {
  const projectDir = program.args[0] || ".";
  let spinner;
  try {
    const { projectName, useAuth, usePayments } = await prompts([
      {
        type: "text",
        name: "projectName",
        message: "What is your project name?",
        initial: path.basename(path.resolve(projectDir))
      },
      {
        type: "confirm",
        name: "useAuth",
        message: "Do you want to set up authentication with Clerk?",
        initial: true
      },
      {
        type: "confirm",
        name: "usePayments",
        message: "Do you want to set up payments with Stripe?",
        initial: true
      }
    ], {
      onCancel: () => {
        console.log("\nSetup cancelled");
        process.exit(1);
      }
    });
    spinner = ora("Creating your Titan project...").start();
    await execa("git", [
      "clone",
      "https://github.com/ObaidUr-Rahmaan/titan.git",
      projectDir
    ]);
    await execa("rm", ["-rf", ".git"], { cwd: projectDir });
    await execa("git", ["init"], { cwd: projectDir });
    spinner.succeed("Project cloned successfully!");
    let envContent = "";
    if (useAuth) {
      spinner.stop();
      const authConfig = await prompts([
        {
          type: "password",
          name: "clerkPublishableKey",
          message: "Enter your Clerk Publishable Key:"
        },
        {
          type: "password",
          name: "clerkSecretKey",
          message: "Enter your Clerk Secret Key:"
        }
      ], {
        onCancel: () => {
          console.log("\nSetup cancelled");
          process.exit(1);
        }
      });
      if (!authConfig.clerkPublishableKey || !authConfig.clerkSecretKey) {
        console.log(chalk.red("Clerk keys are required when auth is enabled"));
        process.exit(1);
      }
      spinner.start("Configuring authentication...");
      envContent += `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${authConfig.clerkPublishableKey}
`;
      envContent += `CLERK_SECRET_KEY=${authConfig.clerkSecretKey}

`;
      envContent += `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
`;
      envContent += `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
`;
      envContent += `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
`;
      envContent += `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

`;
      spinner.succeed("Authentication configured");
    }
    spinner.stop();
    const dbConfig = await prompts([
      {
        type: "text",
        name: "supabaseUrl",
        message: "Enter your Supabase URL:"
      },
      {
        type: "password",
        name: "supabaseServiceKey",
        message: "Enter your Supabase Service Key:"
      },
      {
        type: "text",
        name: "databaseUrl",
        message: "Enter your Database URL (with pgbouncer):"
      },
      {
        type: "text",
        name: "directUrl",
        message: "Enter your Direct Database URL:"
      }
    ], {
      onCancel: () => {
        console.log("\nSetup cancelled");
        process.exit(1);
      }
    });
    if (!dbConfig.supabaseUrl || !dbConfig.supabaseServiceKey || !dbConfig.databaseUrl || !dbConfig.directUrl) {
      console.log(chalk.red("All database configuration values are required"));
      process.exit(1);
    }
    spinner.start("Configuring database...");
    envContent += `SUPABASE_URL=${dbConfig.supabaseUrl}
`;
    envContent += `SUPABASE_SERVICE_KEY=${dbConfig.supabaseServiceKey}

`;
    envContent += `DATABASE_URL="${dbConfig.databaseUrl}"
`;
    envContent += `DIRECT_URL="${dbConfig.directUrl}"

`;
    envContent += `FRONTEND_URL=http://localhost:3000

`;
    spinner.succeed("Database configured");
    if (usePayments) {
      spinner.stop();
      const paymentConfig = await prompts([
        {
          type: "password",
          name: "stripeSecretKey",
          message: "Enter your Stripe Secret Key:"
        },
        {
          type: "text",
          name: "stripePublicKey",
          message: "Enter your Stripe Public Key:"
        },
        {
          type: "text",
          name: "stripePriceId",
          message: "Enter your Stripe Price ID:"
        }
      ], {
        onCancel: () => {
          console.log("\nSetup cancelled");
          process.exit(1);
        }
      });
      if (!paymentConfig.stripeSecretKey || !paymentConfig.stripePublicKey || !paymentConfig.stripePriceId) {
        console.log(chalk.red("All Stripe configuration values are required when payments are enabled"));
        process.exit(1);
      }
      spinner.start("Configuring payments...");
      envContent += `STRIPE_SECRET_KEY=${paymentConfig.stripeSecretKey}
`;
      envContent += `NEXT_PUBLIC_STRIPE_PUBLIC_KEY=${paymentConfig.stripePublicKey}
`;
      envContent += `NEXT_PUBLIC_STRIPE_PRICE_ID=${paymentConfig.stripePriceId}

`;
      spinner.succeed("Payments configured");
    }
    spinner.stop();
    const emailConfig = await prompts([
      {
        type: "text",
        name: "plunkApiKey",
        message: "Enter your Plunk API Key:"
      }
    ], {
      onCancel: () => {
        console.log("\nSetup cancelled");
        process.exit(1);
      }
    });
    if (!emailConfig.plunkApiKey) {
      console.log(chalk.red("Plunk API Key is required"));
      process.exit(1);
    }
    spinner.start("Configuring email...");
    envContent += `PLUNK_API_KEY=${emailConfig.plunkApiKey}
`;
    spinner.succeed("Email configured");
    spinner.start("Writing configuration files...");
    await fs.writeFile(path.join(projectDir, ".env"), envContent);
    const configPath = path.join(projectDir, "config.ts");
    const configContent = `const config = {
  auth: {
    enabled: ${useAuth},
  },
  payments: {
    enabled: ${usePayments},
  },
  email: {
    enabled: true,
  },
};

export default config;
`;
    await fs.writeFile(configPath, configContent);
    spinner.succeed(chalk.green("Project configured successfully! \u{1F680}"));
    console.log("\nNext steps:");
    console.log(chalk.cyan(`  cd ${projectDir}`));
    console.log(chalk.cyan("  pnpm install"));
    console.log(chalk.cyan("  pnpm dev"));
    console.log("\nMake sure to:");
    console.log("1. Review your .env file");
    console.log("2. Check the documentation at https://github.com/ObaidUr-Rahmaan/titan");
  } catch (error) {
    if (spinner) {
      spinner.stop();
    }
    console.error(chalk.red("Failed to create project:"), error);
    process.exit(1);
  }
}
process.on("SIGINT", () => {
  console.log("\nSetup cancelled");
  process.exit(1);
});
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
