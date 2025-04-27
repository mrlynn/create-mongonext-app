import mongoose from 'mongoose';
import { connectSampleDB } from '@/lib/mongodb';

const CommentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  movie_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Create index on movie_id for faster queries
CommentSchema.index({ movie_id: 1 });

// Export model factory function
export const getCommentModel = async () => {
  const conn = await connectSampleDB();
  return conn.models.Comment || conn.model('Comment', CommentSchema);
};

// Default export for main database
export default async function Comment() {
  const model = await getCommentModel();
  return model;
} 