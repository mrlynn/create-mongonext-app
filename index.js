#!/usr/bin/env node

const { program } = require('commander');
const inquirer = require('inquirer');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');

program
  .name('create-mongonext-app')
  .description('Create a new Next.js application with MongoDB Atlas integration')
  .version('0.1.0')
  .argument('[project-directory]', 'Directory to create the project in')
  .action(async (projectDir) => {
    try {
      if (!projectDir) {
        const { dir } = await inquirer.prompt([
          {
            type: 'input',
            name: 'dir',
            message: 'What is your project named?',
            default: 'my-mongonext-app',
          },
        ]);
        projectDir = dir;
      }

      const spinner = ora('Creating your project...').start();
      
      // Create project directory
      const projectPath = path.resolve(process.cwd(), projectDir);
      await fs.ensureDir(projectPath);

      // Copy template files
      const templatePath = path.join(__dirname, 'template');
      await fs.copy(templatePath, projectPath);

      spinner.succeed('Project created successfully!');
      
      console.log(chalk.green('\nNext steps:'));
      console.log(`  cd ${projectDir}`);
      console.log('  npm install');
      console.log('  npm run dev\n');
      
    } catch (error) {
      console.error(chalk.red('Error creating project:'), error);
      process.exit(1);
    }
  });

program.parse(); 