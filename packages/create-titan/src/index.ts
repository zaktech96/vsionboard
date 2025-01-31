const { Command } = require('commander');
const chalk = require('chalk');
const execa = require('execa');
const ora = require('ora');
const prompts = require('prompts');
const fs = require('fs/promises');
const path = require('path');
const os = require('os');

// Cross-platform command helpers
const isWindows = os.platform() === 'win32';
const is64Bit = os.arch() === 'x64';

// Windows-specific paths
const programFiles = is64Bit ? 'C:\\Program Files' : 'C:\\Program Files (x86)';
const rmrf = isWindows ? ['cmd', ['/c', 'rmdir', '/s', '/q']] : ['rm', ['-rf']];
const gitInit = isWindows ? ['cmd', ['/c', 'git', 'init']] : ['git', ['init']];

const program = new Command()
  .name('create-titan')
  .description('Create a new Titan project')
  .version('0.1.0')
  .parse();

async function main() {
  let spinner;

  try {
    console.log(chalk.cyan('\n🚀 Welcome to Titan CLI!\n'));
    console.log(chalk.yellow('Pre-requisites check:'));
    console.log(chalk.yellow('1. Docker/Orbstack must be running'));
    console.log(chalk.yellow('2. Supabase CLI must be installed'));
    console.log(chalk.yellow('3. SSH key must be set up with GitHub'));
    console.log(chalk.yellow('4. The following API keys ready:'));
    console.log(chalk.yellow('   - Clerk (Publishable Key & Secret Key)'));
    console.log(chalk.yellow('   - Stripe (Public Key, Secret Key & Price ID)'));
    console.log(chalk.yellow('   - Plunk API Key\n'));

    const { proceed } = await prompts({
      type: 'confirm',
      name: 'proceed',
      message: 'Do you have all pre-requisites ready?',
      initial: false
    });

    if (!proceed) {
      console.log(chalk.cyan('\nPlease set up the pre-requisites and try again.'));
      console.log(chalk.cyan('For detailed setup instructions, visit: https://github.com/ObaidUr-Rahmaan/titan#prerequisites'));
      process.exit(0);
    }

    // Project setup questions
    const { projectName, projectDescription, githubRepo } = await prompts([
      {
        type: 'text',
        name: 'projectName',
        message: 'What is your project name?',
        initial: 'my-titan-app',
      },
      {
        type: 'text',
        name: 'projectDescription',
        message: 'Describe your project in a few words:',
      },
      {
        type: 'text',
        name: 'githubRepo',
        message: 'Enter your GitHub repository URL (SSH format: git@github.com:username/repo.git):',
        validate: (value: string) => {
          const sshFormat = /^git@github\.com:.+\/.+\.git$/;
          const httpsFormat = /^https:\/\/github\.com\/.+\/.+\.git$/;
          
          if (sshFormat.test(value)) return true;
          if (httpsFormat.test(value)) {
            const sshUrl = value
              .replace('https://github.com/', 'git@github.com:')
              .replace(/\.git$/, '.git');
            return `Please use the SSH URL format instead: ${sshUrl}`;
          }
          return 'Please enter a valid GitHub SSH URL (format: git@github.com:username/repo.git)';
        }
      },
    ], {
      onCancel: () => {
        console.log('\nSetup cancelled');
        process.exit(1);
      }
    });

    // Create project directory
    const projectDir = path.join(process.cwd(), projectName);
    
    // Check if directory exists
    try {
      await fs.access(projectDir);
      console.error(chalk.red(`\nError: Directory ${projectName} already exists. Please choose a different name or delete the existing directory.`));
      process.exit(1);
    } catch {
      // Directory doesn't exist, we can proceed
      await fs.mkdir(projectDir);
    }

    spinner = ora('Creating your project...').start();

    // Clone the repository with retries
    const maxRetries = 3;
    let retryCount = 0;
    
    while (retryCount < maxRetries) {
      try {
        spinner.text = 'Cloning template repository...';
        await execa('git', [
          'clone',
          '--depth=1',
          '--single-branch',
          'git@github.com:ObaidUr-Rahmaan/titan.git',
          projectDir,
        ]);
        spinner.succeed('Project cloned successfully!');
        break;
      } catch (error) {
        retryCount++;
        if (retryCount === maxRetries) {
          spinner.fail('Failed to clone repository');
          console.error(chalk.red('\nError cloning repository. Please check:'));
          console.log(chalk.cyan('1. Your SSH key is set up correctly:'));
          console.log(chalk.cyan('   Run: ssh -T git@github.com'));
          console.log(chalk.cyan('   If it fails, follow: https://docs.github.com/en/authentication/connecting-to-github-with-ssh'));
          console.log(chalk.cyan('\n2. The repository exists on GitHub:'));
          console.log(chalk.cyan('   - Go to GitHub'));
          console.log(chalk.cyan('   - Create repository named "your-repo-name"'));
          console.log(chalk.cyan('   - Don\'t initialize with any files'));
          console.log(chalk.cyan('\n3. Try cloning manually to verify:'));
          console.log(chalk.cyan(`   git clone --depth=1 git@github.com:ObaidUr-Rahmaan/titan.git ${projectDir}`));
          process.exit(1);
        }
        spinner.text = `Retrying clone (${retryCount}/${maxRetries})...`;
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    let envContent = '';
    
    // Auth Configuration
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
      console.log(chalk.red('Clerk keys are required'));
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

    // Database Configuration
    spinner.stop();
    spinner.start('Starting local Supabase instance...');
    try {
      // Start Supabase directly (skip init since it's already done)
      spinner.start('Starting Supabase (this might take a few minutes on first run)...');
      const { stdout } = await execa('supabase', ['start'], { cwd: projectDir });
      spinner.succeed('Supabase started');
      
      // Parse the service_role key from stdout
      const serviceKeyMatch = stdout.match(/service_role key: (.*)/);
      if (!serviceKeyMatch) {
        throw new Error('Could not find service_role key in Supabase output');
      }
      
      const serviceKey = serviceKeyMatch[1].trim();
      
      const dbConfig = {
        supabaseUrl: 'http://127.0.0.1:54321',
        supabaseServiceKey: serviceKey,
        databaseUrl: 'postgresql://postgres:postgres@127.0.0.1:54322/postgres',
        directUrl: 'postgresql://postgres:postgres@127.0.0.1:54322/postgres'
      };

      // Write initial database env vars before running prisma commands
      envContent += `SUPABASE_URL=${dbConfig.supabaseUrl}\n`;
      envContent += `SUPABASE_SERVICE_KEY=${dbConfig.supabaseServiceKey}\n\n`;
      envContent += `DATABASE_URL="${dbConfig.databaseUrl}"\n`;
      envContent += `DIRECT_URL="${dbConfig.directUrl}"\n\n`;
      envContent += `FRONTEND_URL=http://localhost:3000\n\n`;
      
      // Write env file with current content before running prisma commands
      await fs.writeFile(path.join(projectDir, '.env'), envContent);

      // Run initial database migration and generate types
      spinner.start('Setting up database tables and generating types...');
      try {
        // Generate and apply Prisma migrations
        await execa('pnpm', ['dlx', 'prisma', 'generate'], { cwd: projectDir });
        await execa('pnpm', ['dlx', 'prisma', 'db', 'push'], { cwd: projectDir });
        
        // Generate Supabase types
        const { stdout } = await execa('supabase', ['gen', 'types', 'typescript', '--local'], { 
          cwd: projectDir,
          stdio: 'pipe' 
        });
        
        // Write the generated types to the existing file
        await fs.writeFile(path.join(projectDir, 'types', 'supabase.ts'), stdout);

        spinner.succeed('Database tables created and types generated successfully');
      } catch (error) {
        spinner.fail('Failed to setup database');
        console.error(chalk.red('Error:'), error);
        console.log(chalk.yellow('\nMake sure you have Docker running and try again.'));
        console.log(chalk.yellow('\nYou can try running these commands manually:'));
        console.log(chalk.cyan('  cd ' + projectDir));
        console.log(chalk.cyan('  pnpm prisma generate'));
        console.log(chalk.cyan('  pnpm prisma db push'));
        console.log(chalk.cyan('  supabase gen types typescript --local > types/supabase.ts'));
        process.exit(1);
      }

      console.log(chalk.green('\nLocal Supabase is running! 🚀'));
      console.log(chalk.cyan('Access Supabase Studio at: http://127.0.0.1:54323'));
    } catch (error) {
      spinner.fail('Failed to setup local Supabase');
      console.error(chalk.red('\nError: Docker is not running.'));
      console.log(chalk.yellow('\nPlease:'));
      console.log(chalk.cyan('1. Install Docker/Orbstack if not installed:'));
      console.log(chalk.cyan('   - Mac: https://docs.docker.com/desktop/install/mac-install/'));
      console.log(chalk.cyan('   - Windows: https://docs.docker.com/desktop/install/windows-install/'));
      console.log(chalk.cyan('2. Start Docker/Orbstack'));
      console.log(chalk.cyan('3. Wait a few seconds for Docker to be ready'));
      console.log(chalk.cyan('4. Run this command again\n'));
      process.exit(1);
    }

    // Payments Configuration
    spinner.stop();
    const paymentConfig = await prompts([
      {
        type: 'text',
        name: 'stripePublicKey',
        message: 'Enter your Stripe Public Key:',
      },
      {
        type: 'password',
        name: 'stripeSecretKey',
        message: 'Enter your Stripe Secret Key:',
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
      console.log(chalk.red('All Stripe configuration values are required'));
      process.exit(1);
    }

    spinner.start('Configuring payments...');
    envContent += `STRIPE_SECRET_KEY=${paymentConfig.stripeSecretKey}\n`;
    envContent += `NEXT_PUBLIC_STRIPE_PUBLIC_KEY=${paymentConfig.stripePublicKey}\n`;
    envContent += `NEXT_PUBLIC_STRIPE_PRICE_ID=${paymentConfig.stripePriceId}\n\n`;
    spinner.succeed('Payments configured');

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
    await fs.rm(path.join(projectDir, '.env.template'));

    // Update config.ts
    const configPath = path.join(projectDir, 'config.ts');
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

    spinner.succeed(chalk.green('Project configured successfully! 🚀'));
    
    // Change into project directory and install dependencies
    spinner.start('Installing dependencies...');
    try {
      process.chdir(path.resolve(projectDir));
      await execa('pnpm', ['install'], { stdio: 'inherit' });
      spinner.succeed('Dependencies installed');
    } catch (error) {
      spinner.fail('Failed to install dependencies');
      console.error(chalk.red('Error installing dependencies:'), error);
      process.exit(1);
    }

    spinner.start('Setting up git repository...');
    try {
      // Simple git setup with fresh history
      await execa('rm', ['-rf', '.git']);
      await execa('git', ['init']);
      await execa('git', ['add', '.']);
      await execa('git', ['commit', '-m', 'Initial commit from Titan CLI']);
      await execa('git', ['remote', 'add', 'origin', githubRepo]);
      await execa('git', ['push', '-u', 'origin', 'main', '--force']);
      spinner.succeed('Git repository setup complete');
    } catch (error) {
      spinner.fail('Failed to setup git repository');
      console.error(chalk.red('Error setting up git:'), error);
      // Don't exit on git failure, allow the rest of setup to complete
      console.log(chalk.yellow('\nGit setup failed but continuing with project creation...'));
    }

    // Update README
    const readmeContent = `# ${projectName}

${projectDescription}

# ToDos

- Add todos here...
`;
    await fs.writeFile('README.md', readmeContent);

    // Delete packages folder
    try {
      await fs.rm(path.join(projectDir, 'packages'), { recursive: true, force: true });
    } catch (error) {
      // Silently continue if folder doesn't exist or can't be deleted
    }

    // Remove .git folder and initialize new git repository
    spinner.start('Initializing git repository...');
    await execa(...rmrf, [path.join(projectDir, '.git')]);
    await execa(...gitInit, [], { cwd: projectDir });
    spinner.succeed('Git repository initialized');

    // Write final .env file
    await fs.writeFile(path.join(projectDir, '.env'), envContent);

    console.log(chalk.green('\n✨ Project created and pushed to GitHub successfully! ✨'));
    console.log(chalk.cyan('\nNext steps:'));
    console.log(chalk.cyan('1. cd into your project'));
    console.log(chalk.cyan('2. Run pnpm install'));
    console.log(chalk.cyan('3. Run pnpm dev to start the development server'));
    
  } catch (error) {
    if (spinner) spinner.fail('Failed to create project');
    console.error(chalk.red('Error:'), error);
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