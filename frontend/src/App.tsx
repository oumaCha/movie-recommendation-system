import { useState, useCallback } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MovieCard from "./components/MovieCard";
import MovieModal from "./components/MovieModal";
import Footer from "./components/Footer";

import type { Movie } from "./types/Movie";

import "./App.css";
import "./styles/Movies.css";
import "./styles/Recommendations.css";

// Temporary movie data
// Later, movies will come from FastAPI.

const movies: Movie[] = [
  {
    id: 1,
    title: "Toy Story",
    year: 1995,
    rating: 4.5,
    genre: "Animation",
    image: "/poster-placeholder.jpg",
    description:
      "A group of toys experiences an unexpected adventure when a new toy arrives.",
  },
  {
    id: 2,
    title: "Star Wars",
    year: 1977,
    rating: 4.6,
    genre: "Sci-Fi",
    image: "/poster-placeholder.jpg",
    description:
      "A young hero joins an intergalactic adventure against a powerful empire.",
  },
  {
    id: 3,
    title: "Fargo",
    year: 1996,
    rating: 4.3,
    genre: "Crime",
    image: "/poster-placeholder.jpg",
    description:
      "A crime investigation unfolds after a plan goes unexpectedly wrong.",
  },
  {
    id: 4,
    title: "Scream",
    year: 1996,
    rating: 4.1,
    genre: "Horror",
    image: "/poster-placeholder.jpg",
    description:
      "A group of teenagers becomes caught up in a mysterious series of frightening events.",
  },
];

const genres = [
  "All",
  "Animation",
  "Sci-Fi",
  "Crime",
  "Horror",
];

function App() {
  // Search state
  const [search, setSearch] = useState("");

  // Genre filter state
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Selected movie state
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // Filter movies by search and genre
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesGenre =
      selectedGenre === "All" ||
      movie.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  // Open movie modal
  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  // Close movie modal
  const handleCloseModal = useCallback(() => {
    setSelectedMovie(null);
  }, []);

  // Temporary recommendation function
  const handleFindSimilar = (movie: Movie) => {
    alert(`Recommendations for ${movie.title} coming soon!`);
  };

  return (
    <div className="app">

      {/* NAVBAR */}
      <Navbar />

      <main>

        {/* HERO */}
        <Hero search={search} setSearch={setSearch} />

        {/* POPULAR MOVIES */}
        <section className="movie-section" id="movies">

          <div className="section-heading">
            <div>
              <p className="section-label">EXPLORE</p>
              <h2>Popular Movies</h2>
            </div>

            <span className="movie-count">
              {filteredMovies.length} movies
            </span>
          </div>

          {/* GENRE FILTERS */}
          <div className="genre-filters">
            {genres.map((genre) => (
              <button
                key={genre}
                type="button"
                className={
                  selectedGenre === genre
                    ? "genre-button active"
                    : "genre-button"
                }
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* MOVIE GRID */}
          <div className="movie-grid">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                title={movie.title}
                year={movie.year}
                rating={movie.rating}
                image={movie.image}
                onClick={() => handleMovieClick(movie)}
              />
            ))}
          </div>

          {/* NO RESULTS */}
          {filteredMovies.length === 0 && (
            <p className="no-results">
              No movies found. Try another title.
            </p>
          )}

        </section>

        {/* RECOMMENDATIONS PREVIEW */}
        <section
          className="recommendations-section"
          id="recommendations"
        >
          <div className="recommendations-content">

            <div className="recommendations-icon">
              ✨
            </div>

            <p className="section-label">
              COMING SOON
            </p>

            <h2>
              Movies picked just for you.
            </h2>

            <p>
              Our recommendation system will help you
              discover movies based on your preferences
              and ratings.
            </p>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <Footer />

      {/* MOVIE MODAL */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={handleCloseModal}
          onFindSimilar={handleFindSimilar}
        />
      )}

    </div>
  );
}

export default App;