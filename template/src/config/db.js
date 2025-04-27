import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
const SAMPLE_MFLIX_URI = process.env.SAMPLE_MFLIX_URI;

// Create connections
const mainConnection = mongoose.createConnection(MONGODB_URI);
const sampleMflixConnection = mongoose.createConnection(SAMPLE_MFLIX_URI);

// Export connections
export { mainConnection, sampleMflixConnection };

// Helper function to get the appropriate connection based on context
export const getConnection = (useSampleMflix = false) => {
  return useSampleMflix ? sampleMflixConnection : mainConnection;
}; 