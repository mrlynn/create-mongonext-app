import { getMovieModel } from '../models/Movie';
import { getCommentModel } from '../models/Comment';
import { getTheaterModel } from '../models/Theater';

// Helper function to get models for sample_mflix database
export const getSampleMflixModels = () => ({
  Movie: getMovieModel(true),
  Comment: getCommentModel(true),
  Theater: getTheaterModel(true),
});

// Movie CRUD operations
export const getSampleMovies = async (limit = 10, skip = 0) => {
  try {
    const Movie = await getMovieModel();
    const movies = await Movie.find().limit(limit).skip(skip);
    const total = await Movie.countDocuments();
    return { movies, total };
  } catch (error) {
    console.error('Error fetching sample movies:', error);
    return { movies: [], total: 0 };
  }
};

export const getSampleMovieById = async (id) => {
  const Movie = await getMovieModel();
  return await Movie.findById(id);
};

export const createSampleMovie = async (movieData) => {
  const Movie = await getMovieModel();
  const movie = new Movie(movieData);
  return await movie.save();
};

export const updateSampleMovie = async (id, movieData) => {
  const Movie = await getMovieModel();
  return await Movie.findByIdAndUpdate(id, movieData, { new: true });
};

export const deleteSampleMovie = async (id) => {
  const Movie = await getMovieModel();
  return await Movie.findByIdAndDelete(id);
};

// Comment operations
export const getMovieComments = async (movieId) => {
  const Comment = await getCommentModel();
  return await Comment.find({ movie_id: movieId });
};

// Theater operations
export const findNearbyTheaters = async (longitude, latitude, maxDistance = 10000) => {
  const Theater = await getTheaterModel();
  return await Theater.find({
    'location.geo': {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
        $maxDistance: maxDistance,
      },
    },
  });
}; 