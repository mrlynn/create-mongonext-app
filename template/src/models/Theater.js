import mongoose from 'mongoose';
import { connectSampleDB } from '@/lib/mongodb';

const TheaterSchema = new mongoose.Schema({
  theaterId: {
    type: Number,
    required: true,
    unique: true,
  },
  location: {
    address: {
      street1: String,
      city: String,
      state: String,
      zipcode: String,
    },
    geo: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
}, {
  timestamps: true,
});

// Create geospatial index for location queries
TheaterSchema.index({ 'location.geo': '2dsphere' });

// Export model factory function
export const getTheaterModel = async () => {
  const conn = await connectSampleDB();
  return conn.models.Theater || conn.model('Theater', TheaterSchema);
};

// Default export for main database
export default async function Theater() {
  const model = await getTheaterModel();
  return model;
} 