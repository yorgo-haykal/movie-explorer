import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

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
        <h1>{movie.Title}</h1>
      )}
    </>
  );
}

export default Details;