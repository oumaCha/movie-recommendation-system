import { useEffect, useRef } from "react";
import type { Movie } from "../types/Movie";

import "../styles/MovieModal.css";

type MovieModalProps = {
  movie: Movie;
  onClose: () => void;
  onFindSimilar: (movie: Movie) => void;
};

function MovieModal({
  movie,
  onClose,
  onFindSimilar,
}: MovieModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "Tab") {
        const dialog = closeButtonRef.current?.closest(".modal-content");

        if (!dialog) return;

        const buttons = Array.from(
          dialog.querySelectorAll<HTMLButtonElement>(
            "button:not([disabled])"
          )
        );

        if (buttons.length === 0) return;

        const firstButton = buttons[0];
        const lastButton = buttons[buttons.length - 1];

        if (event.shiftKey && document.activeElement === firstButton) {
          event.preventDefault();
          lastButton.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === lastButton
        ) {
          event.preventDefault();
          firstButton.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);

      if (previousFocus instanceof HTMLElement) {
        previousFocus.focus();
      }
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>

      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="movie-modal-title"
        onClick={(event) => event.stopPropagation()}
      >

        <button
          ref={closeButtonRef}
          className="modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close movie details"
        >
          ✕
        </button>

        <div className="modal-body">

          <div className="modal-poster">
            <img
              src={movie.image}
              alt={`${movie.title} poster`}
            />
          </div>

          <div className="modal-info">

            <span className="modal-genre">
              {movie.genre}
            </span>

            <h2 id="movie-modal-title">
              {movie.title}
            </h2>

            <div className="modal-meta">
              <span>⭐ {movie.rating.toFixed(1)} / 5</span>
              <span>{movie.year}</span>
            </div>

            <p className="modal-description">
              {movie.description}
            </p>

            <button
              className="similar-button"
              type="button"
              onClick={() => onFindSimilar(movie)}
            >
              Find Similar Movies →
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default MovieModal;