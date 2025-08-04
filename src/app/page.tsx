'use client';

import { useState } from 'react';
import MovieCard from './components/MovieCard';
import SearchBar from './components/SearchBar';
import FilterSection from './components/FilterSection';
import RecommendationSection from './components/RecommendationSection';
import { fetch } from './movies';

// Static mock data for display purposes
const SAMPLE_MOVIES = [
	{
		id: 1,
		title: 'The Dark Knight',
		poster:'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
		rating: 9.0,
		year: 2008,
		genres: ['Action', 'Crime', 'Drama'],
		description:
			'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.',
	},
	{
		id: 2,
		title: 'Inception',
		poster: 'https://via.placeholder.com/300x450/1f2937/ffffff?text=Inception',
		rating: 8.8,
		year: 2010,
		genres: ['Action', 'Sci-Fi', 'Thriller'],
		description:
			'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into a CEO\'s mind.',
	},
	{
		id: 3,
		title: 'Pulp Fiction',
		poster: 'https://via.placeholder.com/300x450/1f2937/ffffff?text=Pulp+Fiction',
		rating: 8.9,
		year: 1994,
		genres: ['Crime', 'Drama'],
		description:
			'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.',
	},
	{
		id: 4,
		title: 'The Matrix',
		poster: 'https://via.placeholder.com/300x450/1f2937/ffffff?text=The+Matrix',
		rating: 8.7,
		year: 1999,
		genres: ['Action', 'Sci-Fi'],
		description:
			'A computer programmer is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix.',
	},
	{
		id: 5,
		title: 'Interstellar',
		poster:
			'https://via.placeholder.com/300x450/1f2937/ffffff?text=Interstellar',
		rating: 8.6,
		year: 2014,
		genres: ['Drama', 'Sci-Fi'],
		description:
			'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
	},
	{
		id: 6,
		title: 'The Godfather',
		poster: 'https://via.placeholder.com/300x450/1f2937/ffffff?text=The+Godfather',
		rating: 9.2,
		year: 1972,
		genres: ['Crime', 'Drama'],
		description:
			'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
	},
	{
		id: 7,
		title: 'Avatar',
		poster: 'https://via.placeholder.com/300x450/1f2937/ffffff?text=Avatar',
		rating: 7.8,
		year: 2009,
		genres: ['Action', 'Adventure', 'Sci-Fi'],
		description:
			'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
	},
	{
		id: 8,
		title: 'Titanic',
		poster: 'https://via.placeholder.com/300x450/1f2937/ffffff?text=Titanic',
		rating: 7.9,
		year: 1997,
		genres: ['Drama', 'Romance'],
		description:
			'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.',
	},
];

const SAMPLE_RECOMMENDATIONS = [
	{
		id: 9,
		title: 'The Shawshank Redemption',
		poster:
			'https://via.placeholder.com/300x450/8b5cf6/ffffff?text=Shawshank+Redemption',
		rating: 9.3,
		year: 1994,
		genres: ['Drama'],
		description:
			'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
	},
	{
		id: 10,
		title: 'Fight Club',
		poster: 'https://via.placeholder.com/300x450/8b5cf6/ffffff?text=Fight+Club',
		rating: 8.8,
		year: 1999,
		genres: ['Drama', 'Thriller'],
		description:
			'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.',
	},
	{
		id: 11,
		title: 'Goodfellas',
		poster: 'https://via.placeholder.com/300x450/8b5cf6/ffffff?text=Goodfellas',
		rating: 8.7,
		year: 1990,
		genres: ['Crime', 'Drama'],
		description:
			'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners.',
	},
];

export default function Home() {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
	const [selectedRating, setSelectedRating] = useState('');
	const [showRecommendations, setShowRecommendations] = useState(false);
	const [loading, setLoading] = useState(false);

	// Filter movies based on current filters (frontend only)
	const filteredMovies = SAMPLE_MOVIES.filter(movie => {
		const matchesSearch = movie.title
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		const matchesGenre =
			selectedGenres.length === 0 ||
			selectedGenres.some(genre => movie.genres.includes(genre));
		const matchesRating =
			!selectedRating || movie.rating >= parseFloat(selectedRating);

		return matchesSearch && matchesGenre && matchesRating;
	});

	// Simulate getting recommendations (just for UI demo)
	const handleGetRecommendations = async () => {
		setLoading(true);
		// Simulate API delay
		setTimeout(() => {
			setLoading(false);
			setShowRecommendations(true);
		}, 1500);
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
							<button className="hover:text-purple-400 transition-colors">
								Home
							</button>
							<button className="hover:text-purple-400 transition-colors">
								Browse
							</button>
							<button className="hover:text-purple-400 transition-colors">
								My List
							</button>
							<button className="hover:text-purple-400 transition-colors">
								About
							</button>
						</nav>
						<div className="md:hidden">
							<button className="text-white hover:text-purple-400">
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							</button>
						</div>
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
						Powered by advanced machine learning algorithms to find movies you&apos;ll love based on your preferences and viewing history
					</p>
					<SearchBar
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
					/>
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
							<div className="flex items-center justify-between mb-6">
								<h3 className="text-2xl font-bold">
									{searchQuery
										? `Search Results for "${searchQuery}"`
										: 'Popular Movies'}
								</h3>
								<div className="text-gray-400">
									{filteredMovies.length} movies found
								</div>
							</div>

							{filteredMovies.length === 0 ? (
								<div className="text-center py-12">
									<div className="text-gray-400 text-lg mb-4">
										No movies found matching your criteria
									</div>
									<button
										onClick={() => {
											setSearchQuery('');
											setSelectedGenres([]);
											setSelectedRating('');
										}}
										className="bg-purple-500 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
									>
										Clear Filters
									</button>
								</div>
							) : (
								<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
									{filteredMovies.map(movie => (
										<MovieCard
											key={movie.id}
											movie={movie}
											onGetRecommendations={handleGetRecommendations}
										/>
									))}
								</div>
							)}
						</div>

						{/* Recommendations Section */}
						<RecommendationSection
							recommendations={
								showRecommendations ? SAMPLE_RECOMMENDATIONS : []
							}
							loading={loading}
							onGetRecommendations={handleGetRecommendations}
						/>
					</div>
				</div>
			</div>

			{/* Footer */}
			<footer className="bg-gray-800 border-t border-gray-700 py-8">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						<div>
							<div className="flex items-center space-x-2 mb-4">
								<div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
									<span className="text-sm font-bold">MR</span>
								</div>
								<span className="text-lg font-bold">MovieRec</span>
							</div>
							<p className="text-gray-400 text-sm">
								AI-powered movie recommendations for cinephiles worldwide.
							</p>
						</div>
						<div>
							<h4 className="text-white font-semibold mb-4">Features</h4>
							<ul className="space-y-2 text-gray-400 text-sm">
								<li>Smart Recommendations</li>
								<li>Genre Filtering</li>
								<li>Rating Search</li>
								<li>Personalized Lists</li>
							</ul>
						</div>
						<div>
							<h4 className="text-white font-semibold mb-4">Company</h4>
							<ul className="space-y-2 text-gray-400 text-sm">
								<li>About Us</li>
								<li>Contact</li>
								<li>Privacy Policy</li>
								<li>Terms of Service</li>
							</ul>
						</div>
						<div>
							<h4 className="text-white font-semibold mb-4">Connect</h4>
							<div className="flex space-x-4">
								<button className="text-gray-400 hover:text-purple-400 transition-colors">
									<svg
										className="w-5 h-5"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
									</svg>
								</button>
								<button className="text-gray-400 hover:text-purple-400 transition-colors">
									<svg
										className="w-5 h-5"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21c7.88 0 12.21-6.54 12.21-12.21 0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
									</svg>
								</button>
								<button className="text-gray-400 hover:text-purple-400 transition-colors">
									<svg
										className="w-5 h-5"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.747.097.118.112.222.083.343-.09.369-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.017 0z" />
									</svg>
								</button>
							</div>
						</div>
					</div>
					<div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
						<p>
							&copy; 2024 MovieRec. All rights reserved. Powered by Machine
							Learning.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}