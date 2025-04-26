import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Category description is required']
  },
  image: {
    type: String,
    default: '/images/default-category.jpg'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Create indexes
categorySchema.index({ name: 'text' });

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

export default Category; 