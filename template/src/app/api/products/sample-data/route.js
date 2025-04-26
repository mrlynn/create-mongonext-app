import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';

export async function POST() {
  try {
    await connectDB();

    // Sample categories
    const categoriesData = [
      { name: 'Electronics', description: 'Electronic gadgets and devices', image: '/images/electronics.jpg' },
      { name: 'Books', description: 'Books and literature', image: '/images/books.jpg' },
      { name: 'Clothing', description: 'Apparel and accessories', image: '/images/clothing.jpg' },
    ];

    // Insert categories if they don't exist
    const categories = [];
    for (const cat of categoriesData) {
      let category = await Category.findOne({ name: cat.name });
      if (!category) {
        category = await Category.create(cat);
      }
      categories.push(category);
    }

    // Sample products
    const productsData = [
      {
        name: 'Smartphone',
        description: 'A modern smartphone with a great camera.',
        price: 699,
        category: categories[0]._id,
        image: '/images/smartphone.jpg',
        stock: 50
      },
      {
        name: 'Laptop',
        description: 'A powerful laptop for work and play.',
        price: 1299,
        category: categories[0]._id,
        image: '/images/laptop.jpg',
        stock: 30
      },
      {
        name: 'Novel',
        description: 'A best-selling fiction novel.',
        price: 19.99,
        category: categories[1]._id,
        image: '/images/novel.jpg',
        stock: 100
      },
      {
        name: 'T-Shirt',
        description: 'Comfortable cotton t-shirt.',
        price: 14.99,
        category: categories[2]._id,
        image: '/images/tshirt.jpg',
        stock: 200
      }
    ];

    // Insert products
    for (const prod of productsData) {
      const exists = await Product.findOne({ name: prod.name });
      if (!exists) {
        await Product.create(prod);
      }
    }

    return NextResponse.json({ message: 'Sample categories and products inserted.' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 