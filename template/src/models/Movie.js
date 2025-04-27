import mongoose from 'mongoose';
import { connectSampleDB } from '@/lib/mongodb';

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  year: {
    type: Number,
    required: true,
  },
  runtime: {
    type: Number,
  },
  released: {
    type: Date,
  },
  poster: {
    type: String,
  },
  plot: {
    type: String,
  },
  fullplot: {
    type: String,
  },
  lastupdated: {
    type: String,
  },
  type: {
    type: String,
  },
  directors: [{
    type: String,
  }],
  imdb: {
    rating: Number,
    votes: Number,
    id: Number,
  },
  cast: [{
    type: String,
  }],
  countries: [{
    type: String,
  }],
  genres: [{
    type: String,
  }],
  tomatoes: {
    viewer: {
      rating: Number,
      numReviews: Number,
      meter: Number,
    },
    critic: {
      rating: Number,
      numReviews: Number,
      meter: Number,
    },
    lastUpdated: Date,
    rotten: Number,
    production: String,
    fresh: Number,
  },
  num_mflix_comments: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Create text index for search functionality
MovieSchema.index({ 
  title: 'text', 
  plot: 'text', 
  fullplot: 'text', 
  cast: 'text', 
  directors: 'text', 
  genres: 'text' 
});

// Export model factory function
export const getMovieModel = async () => {
  const conn = await connectSampleDB();
  return conn.models.Movie || conn.model('Movie', MovieSchema);
};

// Default export for main database
export default async function Movie() {
  const model = await getMovieModel();
  return model;
} 