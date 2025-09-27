import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Details.css";

function Details() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState();
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
 
  async function fetchMovie(movieId) {
    setStatus("loading");
    setError("");

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${
          import.meta.env.VITE_OMDB_API_KEY
        }&i=${movieId}`
      );
      const data = await res.json();

      if (data.Response === "False") {
        setMovie(null);
        setError(data.Error);
        setStatus("error");
      } else {
        setMovie(data);
        setStatus("success");
      }
    } catch (err) {
      setError("Network error");
      setStatus("error");
    }
  }

  useEffect(() => {
    if (movieId) {
    fetchMovie(movieId);
    }
  }, [movieId]);

  if (status === "loading") return <p className="muted">Loading…</p>;
  if (status === "error") return (
    <div className="details">
      <Link className="back" to="/">← Back</Link>
      <p className="error">{error}</p>
    </div>
  );
  if (!movie) return null;

  return (
    <div className="details">
      <div className="details-header">
        <Link className="back" to="/">← Back</Link>
        <h1 className="title">
          {movie.Title} {movie.Year ? <span className="year">({movie.Year})</span> : null}
        </h1>
      </div>

      <div className="details-grid">
        <img
          className="poster"
          src={movie.Poster !== "N/A" ? movie.Poster : placeholder}
          alt={`${movie.Title} poster`}
          onError={(e) => (e.currentTarget.src = placeholder)}
        />

        <div className="info">
          {movie.Rated && <p><strong>Rated:</strong> {movie.Rated}</p>}
          {movie.Genre && <p><strong>Genre:</strong> {movie.Genre}</p>}
          {movie.Director && <p><strong>Director:</strong> {movie.Director}</p>}
          {movie.Actors && <p><strong>Actors:</strong> {movie.Actors}</p>}
          {movie.Runtime && <p><strong>Runtime:</strong> {movie.Runtime}</p>}
          {movie.BoxOffice && <p><strong>Box Office:</strong> {movie.BoxOffice}</p>}
        </div>
      </div>

      {movie.Plot && movie.Plot !== "N/A" && (
        <>
          <h2 className="section-title">Plot</h2>
          <p className="plot">{movie.Plot}</p>
        </>
      )}

      {Array.isArray(movie.Ratings) && movie.Ratings.length > 0 && (
        <>
          <h2 className="section-title">Ratings</h2>
          <ul className="ratings">
            {movie.Ratings.map((r, idx) => (
              <li key={`${r.Source}-${idx}`}>
                <span className="source">{r.Source}</span>
                <span className="value">{r.Value}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Details;