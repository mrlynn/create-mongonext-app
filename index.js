#!/usr/bin/env node

const { program } = require('commander');
const inquirer = require('inquirer');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const { version } = require('./package.json');

program
  .name('create-mongonext-app')
  .description('Create a new Next.js application with MongoDB Atlas integration')
  .version(version)
  .argument('[project-directory]', 'Directory to create the project in')
  .action(async (projectDir) => {
    try {
      if (!projectDir) {
        const { dir } = await inquirer.default.prompt([
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

program
  .command('seed')
  .description('Seed your MongoDB Atlas database with demo data')
  .option('--uri <mongodbUri>', 'MongoDB Atlas connection URI')
  .option('--clear', 'Delete existing documents before seeding')
  .action(async (options) => {
    try {
      let { uri, clear } = options;
      if (!uri) {
        const answers = await inquirer.default.prompt([
          {
            type: 'input',
            name: 'uri',
            message: 'Enter your MongoDB Atlas connection URI:',
            validate: (input) => input.startsWith('mongodb') || 'Please enter a valid MongoDB URI',
          },
        ]);
        uri = answers.uri;
      }
      const spinner = ora('Connecting to MongoDB...').start();
      const mongoose = require('mongoose');
      await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      spinner.succeed('Connected to MongoDB!');

      // Define simple schemas (for CLI use only)
      const Category = mongoose.model('Category', new mongoose.Schema({ name: String, slug: String, description: String, type: String }));
      const Product = mongoose.model('Product', new mongoose.Schema({ name: String, slug: String, price: Number, category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, image: String }));
      const BlogPost = mongoose.model('BlogPost', new mongoose.Schema({ title: String, slug: String, content: String, categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }], status: String }));
      const RagDocument = mongoose.model('RagDocument', new mongoose.Schema({ title: String, filetype: String, uploadedAt: Date }));

      if (clear) {
        spinner.start('Clearing existing data...');
        await Promise.all([
          Category.deleteMany({}),
          Product.deleteMany({}),
          BlogPost.deleteMany({}),
          RagDocument.deleteMany({}),
        ]);
        spinner.succeed('Cleared existing data.');
      }

      spinner.start('Seeding demo data...');
      // Seed categories
      const categories = await Category.insertMany([
        { name: 'Tech', slug: 'tech', description: 'Tech category', type: 'blog' },
        { name: 'Books', slug: 'books', description: 'Books category', type: 'product' },
        { name: 'Lifestyle', slug: 'lifestyle', description: 'Lifestyle category', type: 'both' },
      ]);
      // Seed products
      const products = await Product.insertMany([
        { name: 'MongoNext T-Shirt', slug: 'mongonext-tshirt', price: 25, category: categories[1]._id, image: '/images/tshirt.jpg' },
        { name: 'MongoNext Mug', slug: 'mongonext-mug', price: 15, category: categories[1]._id, image: '/images/mug.jpg' },
      ]);
      // Seed blog posts
      const blogPosts = await BlogPost.insertMany([
        { title: 'Welcome to MongoNext', slug: 'welcome-to-mongonext', content: '<p>This is a demo blog post.</p>', categories: [categories[0]._id], status: 'published' },
        { title: 'How to Seed Data', slug: 'how-to-seed-data', content: '<p>Seeding data is easy!</p>', categories: [categories[2]._id], status: 'draft' },
      ]);
      // Seed rag documents (metadata only)
      const ragDocs = await RagDocument.insertMany([
        { title: 'Demo PDF', filetype: 'pdf', uploadedAt: new Date() },
        { title: 'Demo Markdown', filetype: 'md', uploadedAt: new Date() },
      ]);
      spinner.succeed('Demo data seeded!');
      console.log(chalk.green(`\nSeeded: ${categories.length} categories, ${products.length} products, ${blogPosts.length} blog posts, ${ragDocs.length} rag documents.`));
      await mongoose.disconnect();
    } catch (error) {
      console.error(chalk.red('Error seeding data:'), error);
      process.exit(1);
    }
  });

program.parse(); 