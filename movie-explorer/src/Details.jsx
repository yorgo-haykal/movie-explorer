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

  return (
    <>
      {status === "loading" && <p>Loading…</p>}
      {status === "error" && <p style={{ color: "red" }}>{error}</p>}
      {status === "success" && (
        <div className="details">
          <Link to={"/"}>
            Return
          </Link>
          <h1>{movie.Title} ({movie.Year})</h1>
          <div className="d">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : placeholder}
              alt={movie.Title}
            />
            <div className="infos">
              <p>Rated {movie.Rated}</p>
              <p>Genre: {movie.Genre}</p>
              <p>Directed by {movie.Director}</p>
              <p>Actors: {movie.Actors}</p>
              <p>Box office: {movie.BoxOffice}</p>
            </div>
          </div>
          <h3>Plot</h3>
          <p>{movie.Plot}</p>
          <p>Ratings: </p>
          <ul>
            {movie.Ratings.map((rating) => (
              <li>
                {rating.Source} : {rating.Value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Details;