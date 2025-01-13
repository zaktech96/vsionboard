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
var os = require("os");
var isWindows = os.platform() === "win32";
var is64Bit = os.arch() === "x64";
var programFiles = is64Bit ? "C:\\Program Files" : "C:\\Program Files (x86)";
var rmrf = isWindows ? ["cmd", ["/c", "rmdir", "/s", "/q"]] : ["rm", ["-rf"]];
var gitInit = isWindows ? ["cmd", ["/c", "git", "init"]] : ["git", ["init"]];
var program = new Command().name("create-titan").description("Create a new Titan project").argument("[directory]", "Directory to create the project in").version("0.1.0").parse();
async function main() {
  const projectDir = program.args[0] || ".";
  let spinner;
  try {
    const { projectName, projectDescription, githubRepo } = await prompts([
      {
        type: "text",
        name: "projectName",
        message: "What is your project name?",
        initial: path.basename(path.resolve(projectDir))
      },
      {
        type: "text",
        name: "projectDescription",
        message: "Describe your project in a few words:"
      },
      {
        type: "text",
        name: "githubRepo",
        message: "Enter your GitHub repository URL:",
        validate: (value) => value.includes("github.com") ? true : "Please enter a valid GitHub repository URL"
      }
    ], {
      onCancel: () => {
        console.log("\nSetup cancelled");
        process.exit(1);
      }
    });
    spinner = ora("Creating your project...").start();
    await execa("git", [
      "clone",
      "https://github.com/ObaidUr-Rahmaan/titan.git",
      projectDir
    ]);
    spinner.succeed("Project cloned successfully!");
    let envContent = "";
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
      console.log(chalk.red("Clerk keys are required"));
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
    spinner.stop();
    spinner.start("Starting local Supabase instance...");
    try {
      spinner.start("Starting Supabase (this might take a few minutes on first run)...");
      const { stdout } = await execa("supabase", ["start"], { cwd: projectDir });
      spinner.succeed("Supabase started");
      const serviceKeyMatch = stdout.match(/service_role key: (.*)/);
      if (!serviceKeyMatch) {
        throw new Error("Could not find service_role key in Supabase output");
      }
      const serviceKey = serviceKeyMatch[1].trim();
      const dbConfig = {
        supabaseUrl: "http://127.0.0.1:54321",
        supabaseServiceKey: serviceKey,
        databaseUrl: "postgresql://postgres:postgres@127.0.0.1:54322/postgres",
        directUrl: "postgresql://postgres:postgres@127.0.0.1:54322/postgres"
      };
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
      await fs.writeFile(path.join(projectDir, ".env"), envContent);
      spinner.start("Setting up database tables and generating types...");
      try {
        await execa("pnpm", ["dlx", "prisma", "generate"], { cwd: projectDir });
        await execa("pnpm", ["dlx", "prisma", "db", "push"], { cwd: projectDir });
        const { stdout: stdout2 } = await execa("supabase", ["gen", "types", "typescript", "--local"], {
          cwd: projectDir,
          stdio: "pipe"
        });
        await fs.writeFile(path.join(projectDir, "types", "supabase.ts"), stdout2);
        spinner.succeed("Database tables created and types generated successfully");
      } catch (error) {
        spinner.fail("Failed to setup database");
        console.error(chalk.red("Error:"), error);
        console.log(chalk.yellow("\nMake sure you have Docker running and try again."));
        console.log(chalk.yellow("\nYou can try running these commands manually:"));
        console.log(chalk.cyan("  cd " + projectDir));
        console.log(chalk.cyan("  pnpm prisma generate"));
        console.log(chalk.cyan("  pnpm prisma db push"));
        console.log(chalk.cyan("  supabase gen types typescript --local > types/supabase.ts"));
        process.exit(1);
      }
      console.log(chalk.green("\nLocal Supabase is running! \u{1F680}"));
      console.log(chalk.cyan("Access Supabase Studio at: http://127.0.0.1:54323"));
    } catch (error) {
      spinner.fail("Failed to setup local Supabase");
      console.error(chalk.red("Error:"), error);
      console.log(chalk.yellow("\nMake sure Docker/Orbstack is running and try again."));
      process.exit(1);
    }
    spinner.stop();
    const paymentConfig = await prompts([
      {
        type: "text",
        name: "stripePublicKey",
        message: "Enter your Stripe Public Key:"
      },
      {
        type: "password",
        name: "stripeSecretKey",
        message: "Enter your Stripe Secret Key:"
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
      console.log(chalk.red("All Stripe configuration values are required"));
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
    await fs.rm(path.join(projectDir, ".env.template"));
    const configPath = path.join(projectDir, "config.ts");
    const configContent = `const config = {
  auth: {
    enabled: true,
  },
  payments: {
    enabled: true,
  },
  email: {
    enabled: true,
  },
};

export default config;
`;
    await fs.writeFile(configPath, configContent);
    spinner.succeed(chalk.green("Project configured successfully! \u{1F680}"));
    spinner.start("Installing dependencies...");
    try {
      process.chdir(path.resolve(projectDir));
      await execa("pnpm", ["install"], { stdio: "inherit" });
      spinner.succeed("Dependencies installed");
    } catch (error) {
      spinner.fail("Failed to install dependencies");
      console.error(chalk.red("Error installing dependencies:"), error);
      process.exit(1);
    }
    spinner.start("Setting up git repository...");
    try {
      await execa(...rmrf, [path.join(projectDir, ".git")]);
      await execa(...gitInit, { cwd: projectDir });
      const gitCmd = isWindows ? ["cmd", ["/c", "git"]] : ["git", []];
      await execa(...gitCmd, [...gitCmd[1], "remote", "add", "origin", githubRepo], { cwd: projectDir });
      await execa(...gitCmd, [...gitCmd[1], "add", "."], { cwd: projectDir });
      await execa(...gitCmd, [...gitCmd[1], "commit", "-m", "Initial commit from Titan CLI"], { cwd: projectDir });
      await execa(...gitCmd, [...gitCmd[1], "branch", "-M", "main"], { cwd: projectDir });
      await execa(...gitCmd, [...gitCmd[1], "push", "-f", "origin", "main"], { cwd: projectDir });
      spinner.succeed("Git repository setup complete");
    } catch (error) {
      spinner.fail("Failed to setup git repository");
      console.error(chalk.red("Error setting up git:"), error);
      process.exit(1);
    }
    const readmeContent = `# ${projectName}

${projectDescription}

# ToDos

- Add todos here...
`;
    await fs.writeFile("README.md", readmeContent);
    try {
      await fs.rm(path.join(projectDir, "packages"), { recursive: true, force: true });
    } catch (error) {
    }
    spinner.start("Opening project in editor...");
    try {
      const editor = isWindows ? path.join(programFiles, "Microsoft VS Code", "bin", "code.cmd") : "code";
      await execa(editor, ["-r", "."]);
      spinner.succeed("Project opened in editor");
    } catch (error) {
      try {
        await execa(isWindows ? "code.cmd" : "code", ["-r", "."]);
        spinner.succeed("Project opened in editor");
      } catch (fallbackError) {
        spinner.warn("Could not open project in editor. Please open it manually.");
      }
    }
    console.log("\nMake sure to:");
    console.log("1. Review your .env file");
    console.log("2. Start the development server with: pnpm dev");
    console.log("3. Check the documentation at https://github.com/ObaidUr-Rahmaan/titan");
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
