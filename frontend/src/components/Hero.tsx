import "../styles/Hero.css";

type HeroProps = {
  search: string;
  setSearch: (value: string) => void;
};

function Hero({ search, setSearch }: HeroProps) {
  return (
    <section className="hero" id="home">
      <div className="hero-content">

        <div className="hero-badge">
          <span className="badge-dot"></span>
          DISCOVER YOUR NEXT FAVORITE
        </div>

        <h1>
          Find movies you'll
          <span> love watching.</span>
        </h1>

        <p className="hero-description">
          Explore amazing movies, discover hidden gems,
          and find personalized recommendations based
          on your interests.
        </p>

        <div className="search-container">
          <input
            type="search"
            aria-label="Search movies"
            placeholder="Search for a movie..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <a className="search-button" href="#movies">
            Search
          </a>
        </div>

        <div className="hero-features">
          <span>✦ Discover Movies</span>
          <span>✦ Personalized Picks</span>
          <span>✦ Smart Recommendations</span>
        </div>

      </div>
    </section>
  );
}

export default Hero;