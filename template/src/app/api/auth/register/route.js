import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    // Validate input
    if (!name || !email || !password) {
      return Response.json(
        { message: 'Please provide all required fields' }, 
        { status: 400 }
      );
    }

    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json(
        { message: 'User already exists' }, 
        { status: 400 }
      );
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
    });

    return Response.json(
      { 
        message: 'User created successfully', 
        user: { id: user._id.toString(), email: user.email } 
      }, 
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return Response.json(
      { message: error.message || 'Error creating user' }, 
      { status: 500 }
    );
  }
} 