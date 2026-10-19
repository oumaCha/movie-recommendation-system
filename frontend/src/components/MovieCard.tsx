import "../styles/MovieCard.css";

type MovieCardProps = {
  title: string;
  year: number;
  rating: number;
  image: string;
  onClick: () => void;
};

function MovieCard({
  title,
  year,
  rating,
  image,
  onClick,
}: MovieCardProps) {
  return (
    <article className="movie-card">

      <button
        className="movie-card-button"
        type="button"
        onClick={onClick}
        aria-label={`View details for ${title}`}
      >
        <div className="movie-poster">
          <img
            src={image}
            alt={`${title} poster`}
            loading="lazy"
          />

          <div className="rating-badge">
            ★ {rating.toFixed(1)}
          </div>
        </div>

        <div className="movie-info">
          <h3>{title}</h3>

          <div className="movie-details">
            <span>{year}</span>
            <span>View Details →</span>
          </div>
        </div>
      </button>

    </article>
  );
}

export default MovieCard;