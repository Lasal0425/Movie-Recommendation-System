"use client";

import { useState, useEffect } from 'react';
import MovieCard from './components/MovieCard';
import SearchBar from './components/SearchBar';
import FilterSection from './components/FilterSection';
import RecommendationSection from './components/RecommendationSection';

export default function Home() {
  const [movies, setMovies] = useState<any[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock data - replace with your API calls
  const mockMovies = [
    {
      id: 1,
      title: "The Dark Knight",
      poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=The+Dark+Knight",
      rating: 9.0,
      year: 2008,
      genres: ["Action", "Crime", "Drama"],
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham..."
    },
    {
      id: 2,
      title: "Inception",
      poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Inception",
      rating: 8.8,
      year: 2010,
      genres: ["Action", "Sci-Fi", "Thriller"],
      description: "A thief who steals corporate secrets through dream-sharing technology..."
    },
    {
      id: 3,
      title: "Pulp Fiction",
      poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Pulp+Fiction",
      rating: 8.9,
      year: 1994,
      genres: ["Crime", "Drama"],
      description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine..."
    },
    {
      id: 4,
      title: "The Matrix",
      poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=The+Matrix",
      rating: 8.7,
      year: 1999,
      genres: ["Action", "Sci-Fi"],
      description: "A computer programmer is led to fight an underground war against powerful computers..."
    },
    {
      id: 5,
      title: "Interstellar",
      poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Interstellar",
      rating: 8.6,
      year: 2014,
      genres: ["Drama", "Sci-Fi"],
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival..."
    },
    {
      id: 6,
      title: "The Godfather",
      poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=The+Godfather",
      rating: 9.2,
      year: 1972,
      genres: ["Crime", "Drama"],
      description: "The aging patriarch of an organized crime dynasty transfers control to his reluctant son..."
    }
  ];

  useEffect(() => {
    // Initialize with mock data - replace with actual API call
    setMovies(mockMovies);
    setFilteredMovies(mockMovies);
  }, []);

  useEffect(() => {
    // Filter movies based on search and filters
    let filtered = movies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenres.length === 0 || 
        selectedGenres.some(genre => movie.genres.includes(genre));
      const matchesRating = !selectedRating || movie.rating >= parseFloat(selectedRating);
      
      return matchesSearch && matchesGenre && matchesRating;
    });
    
    setFilteredMovies(filtered);
  }, [searchQuery, selectedGenres, selectedRating, movies]);

  const handleGetRecommendations = async (movieId) => {
    setLoading(true);
    // Replace with your ML API call
    try {
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock recommendations - replace with actual API response
      const mockRecommendations = mockMovies.filter(movie => movie.id !== movieId).slice(0, 3);
      setRecommendations(mockRecommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold">MR</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                MovieRec
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="hover:text-purple-400 transition-colors">Home</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Browse</a>
              <a href="#" className="hover:text-purple-400 transition-colors">My List</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 via-gray-900 to-pink-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Discover Your Next Favorite Movie
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Powered by advanced machine learning algorithms to find movies you'll love based on your preferences
          </p>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:w-1/4">
            <FilterSection 
              selectedGenres={selectedGenres}
              setSelectedGenres={setSelectedGenres}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
            />
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Movies Grid */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6">
                {searchQuery ? `Search Results for "${searchQuery}"` : 'Popular Movies'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMovies.map(movie => (
                  <MovieCard 
                    key={movie.id} 
                    movie={movie} 
                    onGetRecommendations={handleGetRecommendations}
                  />
                ))}
              </div>
            </div>

            {/* Recommendations Section */}
            {recommendations.length > 0 && (
              <RecommendationSection 
                recommendations={recommendations}
                loading={loading}
                onGetRecommendations={handleGetRecommendations}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}