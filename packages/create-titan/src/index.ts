const { Command } = require('commander');
const chalk = require('chalk');
const execa = require('execa');
const ora = require('ora');
const prompts = require('prompts');
const fs = require('fs/promises');
const path = require('path');

const program = new Command()
  .name('create-titan')
  .description('Create a new Titan project')
  .argument('[directory]', 'Directory to create the project in')
  .version('0.1.0')
  .parse();

async function main() {
  const projectDir = program.args[0] || '.';
  let spinner;

  try {
    // Project setup questions
    const { projectName, useAuth, usePayments } = await prompts([
      {
        type: 'text',
        name: 'projectName',
        message: 'What is your project name?',
        initial: path.basename(path.resolve(projectDir)),
      },
      {
        type: 'confirm',
        name: 'useAuth',
        message: 'Do you want to set up authentication with Clerk?',
        initial: true,
      },
      {
        type: 'confirm',
        name: 'usePayments',
        message: 'Do you want to set up payments with Stripe?',
        initial: true,
      },
    ], {
      onCancel: () => {
        console.log('\nSetup cancelled');
        process.exit(1);
      }
    });

    spinner = ora('Creating your Titan project...').start();

    // Clone the repository
    await execa('git', [
      'clone',
      'https://github.com/ObaidUr-Rahmaan/titan.git',
      projectDir,
    ]);

    // Remove git history
    await execa('rm', ['-rf', '.git'], { cwd: projectDir });
    
    // Initialize new git repository
    await execa('git', ['init'], { cwd: projectDir });

    spinner.succeed('Project cloned successfully!');

    let envContent = '';
    
    // Auth Configuration
    if (useAuth) {
      spinner.stop();
      const authConfig = await prompts([
        {
          type: 'password',
          name: 'clerkPublishableKey',
          message: 'Enter your Clerk Publishable Key:',
        },
        {
          type: 'password',
          name: 'clerkSecretKey',
          message: 'Enter your Clerk Secret Key:',
        },
      ], {
        onCancel: () => {
          console.log('\nSetup cancelled');
          process.exit(1);
        }
      });

      if (!authConfig.clerkPublishableKey || !authConfig.clerkSecretKey) {
        console.log(chalk.red('Clerk keys are required when auth is enabled'));
        process.exit(1);
      }

      spinner.start('Configuring authentication...');
      envContent += `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${authConfig.clerkPublishableKey}\n`;
      envContent += `CLERK_SECRET_KEY=${authConfig.clerkSecretKey}\n\n`;
      envContent += `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in\n`;
      envContent += `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up\n`;
      envContent += `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/\n`;
      envContent += `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/\n\n`;
      spinner.succeed('Authentication configured');
    }

    // Database Configuration
    spinner.stop();
    const dbConfig = await prompts([
      {
        type: 'text',
        name: 'supabaseUrl',
        message: 'Enter your Supabase URL:',
      },
      {
        type: 'password',
        name: 'supabaseServiceKey',
        message: 'Enter your Supabase Service Key:',
      },
      {
        type: 'text',
        name: 'databaseUrl',
        message: 'Enter your Database URL (with pgbouncer):',
      },
      {
        type: 'text',
        name: 'directUrl',
        message: 'Enter your Direct Database URL:',
      },
    ], {
      onCancel: () => {
        console.log('\nSetup cancelled');
        process.exit(1);
      }
    });

    if (!dbConfig.supabaseUrl || !dbConfig.supabaseServiceKey || !dbConfig.databaseUrl || !dbConfig.directUrl) {
      console.log(chalk.red('All database configuration values are required'));
      process.exit(1);
    }

    spinner.start('Configuring database...');
    envContent += `SUPABASE_URL=${dbConfig.supabaseUrl}\n`;
    envContent += `SUPABASE_SERVICE_KEY=${dbConfig.supabaseServiceKey}\n\n`;
    envContent += `DATABASE_URL="${dbConfig.databaseUrl}"\n`;
    envContent += `DIRECT_URL="${dbConfig.directUrl}"\n\n`;
    envContent += `FRONTEND_URL=http://localhost:3000\n\n`;
    spinner.succeed('Database configured');

    // Payments Configuration
    if (usePayments) {
      spinner.stop();
      const paymentConfig = await prompts([
        {
          type: 'password',
          name: 'stripeSecretKey',
          message: 'Enter your Stripe Secret Key:',
        },
        {
          type: 'text',
          name: 'stripePublicKey',
          message: 'Enter your Stripe Public Key:',
        },
        {
          type: 'text',
          name: 'stripePriceId',
          message: 'Enter your Stripe Price ID:',
        },
      ], {
        onCancel: () => {
          console.log('\nSetup cancelled');
          process.exit(1);
        }
      });

      if (!paymentConfig.stripeSecretKey || !paymentConfig.stripePublicKey || !paymentConfig.stripePriceId) {
        console.log(chalk.red('All Stripe configuration values are required when payments are enabled'));
        process.exit(1);
      }

      spinner.start('Configuring payments...');
      envContent += `STRIPE_SECRET_KEY=${paymentConfig.stripeSecretKey}\n`;
      envContent += `NEXT_PUBLIC_STRIPE_PUBLIC_KEY=${paymentConfig.stripePublicKey}\n`;
      envContent += `NEXT_PUBLIC_STRIPE_PRICE_ID=${paymentConfig.stripePriceId}\n\n`;
      spinner.succeed('Payments configured');
    }

    // Email Configuration
    spinner.stop();
    const emailConfig = await prompts([
      {
        type: 'text',
        name: 'plunkApiKey',
        message: 'Enter your Plunk API Key:',
      },
    ], {
      onCancel: () => {
        console.log('\nSetup cancelled');
        process.exit(1);
      }
    });

    if (!emailConfig.plunkApiKey) {
      console.log(chalk.red('Plunk API Key is required'));
      process.exit(1);
    }

    spinner.start('Configuring email...');
    envContent += `PLUNK_API_KEY=${emailConfig.plunkApiKey}\n`;
    spinner.succeed('Email configured');

    // Write configuration files
    spinner.start('Writing configuration files...');
    await fs.writeFile(path.join(projectDir, '.env'), envContent);

    // Update config.ts
    const configPath = path.join(projectDir, 'config.ts');
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

    spinner.succeed(chalk.green('Project configured successfully! 🚀'));
    
    console.log('\nNext steps:');
    console.log(chalk.cyan(`  cd ${projectDir}`));
    console.log(chalk.cyan('  pnpm install'));
    console.log(chalk.cyan('  pnpm dev'));
    
    console.log('\nMake sure to:');
    console.log('1. Review your .env file');
    console.log('2. Check the documentation at https://github.com/ObaidUr-Rahmaan/titan');
    
  } catch (error) {
    if (spinner) {
      spinner.stop();
    }
    console.error(chalk.red('Failed to create project:'), error);
    process.exit(1);
  }
}

// Handle interrupts
process.on('SIGINT', () => {
  console.log('\nSetup cancelled');
  process.exit(1);
});

main().catch((error) => {
  console.error(error);
  process.exit(1);
}); 