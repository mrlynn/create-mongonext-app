![MongoNext Logo](https://raw.githubusercontent.com/mrlynn/create-mongonext-app/main/logo-full-black.png)

# MongoNext

A modern, full-stack e-commerce and content management template built with Next.js, Material UI, and MongoDB Atlas (via Mongoose). This project is designed to be used as an npm library and installed via:

```
npx create-mongonext-app@latest my-app
```

---

## ⚡ Quick Start

To create a new project using MongoNext, simply run:

```bash
npx create-mongonext-app@latest my-app
cd my-app
npm install
npm run dev
```

This will scaffold a new project in the `my-app` directory with all dependencies and structure set up for you.

---

## 🚀 Features

- **Next.js 13+** App Router architecture
- **Material UI** for a beautiful, responsive UI
- **MongoDB Atlas** with Mongoose for data persistence
- **Admin Dashboard** for managing products, categories, users, and blog posts
- **Product Catalog** with image placeholders and category filtering
- **Blog** with markdown support
- **Authentication** (NextAuth.js)
- **API routes** for CRUD operations
- **Newsletter subscription form**
- **Consistent header/footer and modern layout**

---

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/)
- [Material UI](https://mui.com/)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Mongoose](https://mongoosejs.com/)
- [NextAuth.js](https://next-auth.js.org/)

---

## 📦 Getting Started (Manual Setup)

If you want to clone and develop the template itself:

### 1. Clone the repository

```bash
git clone https://github.com/mrlynn/create-mongonext-app.git
cd create-mongonext-app
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory and add:

```
MONGODB_URI=your-mongodb-atlas-connection-string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret
```

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🗂️ Project Structure

```
template/
├── src/
│   ├── app/
│   │   ├── components/      # Navbar, Footer, etc.
│   │   ├── admin/           # Admin dashboard pages
│   │   ├── products/        # Product catalog
│   │   ├── blog/            # Blog pages
│   │   ├── api/             # API routes
│   │   ├── terms/           # Terms of Service page
│   │   ├── privacy/         # Privacy Policy page
│   │   ├── models/          # Mongoose models
│   │   ├── lib/             # Database connection, helpers
│   ├── .env.local.example    # Example environment variables
│   ├── .gitignore
│   ├── README.md
```

---

## 📝 Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm start` — Start production server
- `npm run lint` — Lint code

---

## 🌐 Deployment

- Deploy to [Vercel](https://vercel.com/) for best Next.js support
- Set environment variables in your deployment dashboard
- MongoDB Atlas must be accessible from your deployment

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

---

## 📧 Contact

For questions or support, open an issue or email [merlynn+mongonext@gmail.com](mailto:merlynn+mongodnext@gmail.com).

---

## License

This project is licensed under the MIT License.

