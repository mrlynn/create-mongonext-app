import mongoose from 'mongoose';

const RagChunkSchema = new mongoose.Schema({
  document: { type: mongoose.Schema.Types.ObjectId, ref: 'RagDocument', required: true },
  chunkIndex: { type: Number, required: true },
  text: { type: String, required: true },
  embedding: { type: [Number] }, // OpenAI text-embedding-3-small
  createdAt: { type: Date, default: Date.now },
});

RagChunkSchema.index({ embedding: '2dsphere' }); // For Atlas vector search

export default mongoose.models.RagChunk || mongoose.model('RagChunk', RagChunkSchema); 