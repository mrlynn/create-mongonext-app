import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
const SAMPLE_MFLIX_URI = process.env.SAMPLE_MFLIX_URI;
// console.log('DEBUG SAMPLE_MFLIX_URI:', process.env.SAMPLE_MFLIX_URI);
if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined. Please check your .env.local file');
  // Instead of throwing, we'll allow the app to continue but with limited functionality
  // This is better for development when you might not always need the database
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { 
    conn: null, 
    promise: null,
    sampleConn: null,
    samplePromise: null
  };
}

async function connectDB() {
  if (!MONGODB_URI) {
    console.warn('MONGODB_URI is not defined. Database features will be disabled.');
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('Failed to connect to MongoDB:', e);
    return null;
  }

  return cached.conn;
}

async function connectSampleDB() {
  if (!SAMPLE_MFLIX_URI) {
    console.warn('SAMPLE_MFLIX_URI is not defined. Sample data features will be disabled.');
    return null;
  }

  if (cached.sampleConn) {
    return cached.sampleConn;
  }

  if (!cached.samplePromise) {
    const opts = {
      bufferCommands: false,
    };

    const conn = mongoose.createConnection(SAMPLE_MFLIX_URI, opts);
    cached.samplePromise = conn.asPromise().then(() => conn);
  }

  try {
    cached.sampleConn = await cached.samplePromise;
  } catch (e) {
    cached.samplePromise = null;
    console.error('Failed to connect to sample database:', e);
    return null;
  }

  return cached.sampleConn;
}

// Export default for backward compatibility with auth
export default connectDB;
// Export named functions for sample database
export { connectDB, connectSampleDB }; 