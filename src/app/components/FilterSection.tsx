interface FilterSectionProps {
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;
  selectedRating: string;
  setSelectedRating: (rating: string) => void;
}

export default function FilterSection({ 
  selectedGenres, 
  setSelectedGenres, 
  selectedRating, 
  setSelectedRating 
}: FilterSectionProps) {
  const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Crime'];
  const ratings = [
    { label: 'All Ratings', value: '' },
    { label: '9.0+', value: '9.0' },
    { label: '8.0+', value: '8.0' },
    { label: '7.0+', value: '7.0' },
    { label: '6.0+', value: '6.0' }
  ];

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres(
      selectedGenres.includes(genre) 
        ? selectedGenres.filter(g => g !== genre)
        : [...selectedGenres, genre]
    );
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-6">Filters</h3>
      
      {/* Genres */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-3">Genres</h4>
        <div className="space-y-2">
          {genres.map(genre => (
            <label key={genre} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre)}
                onChange={() => handleGenreToggle(genre)}
                className="w-4 h-4 text-purple-500 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
              />
              <span className="text-gray-300">{genre}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="text-lg font-semibold mb-3">Minimum Rating</h4>
        <select
          value={selectedRating}
          onChange={(e) => setSelectedRating(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {ratings.map(rating => (
            <option key={rating.value} value={rating.value}>
              {rating.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}