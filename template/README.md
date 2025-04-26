# MongoNext App

A modern Next.js application template with MongoDB Atlas integration and Material UI.

## Features

- Next.js 14 with App Router
- MongoDB Atlas integration with Mongoose
- Material UI components and theming
- NextAuth.js authentication
- Environment variable configuration
- ESLint and Prettier setup

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file based on `.env.example`
4. Set up your MongoDB Atlas connection string
5. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env.local` file based on the provided `.env.local.example` file:

```env
# MongoDB connection string
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/your-database?retryWrites=true&w=majority

# NextAuth.js secret key - generate a secure random string
# You can generate one using `openssl rand -base64 32`
NEXTAUTH_SECRET=your-nextauth-secret-key-here

# Next Auth Site URL
NEXTAUTH_URL=http://localhost:3000
```

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # Reusable UI components
├── lib/             # Utility functions and configurations
└── styles/          # Global styles and theme
```

## Contributing

Feel free to submit issues and enhancement requests.

## License

This project is licensed under the MIT License. 