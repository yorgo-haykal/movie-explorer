import { use, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import placeholder from "./assets/poster-placeholder.jpg"; 
import { Link } from 'react-router-dom';

function Search() {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function handleSearch(query) {
    setStatus("loading");
    setError("");

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${
          import.meta.env.VITE_OMDB_API_KEY
        }&s=${encodeURIComponent(query)}`
      );
      const data = await res.json();

      if (data.Response === "False") {
        setMovies([]);
        setError(data.Error);
        setStatus("error");
      } else {
        setMovies(data.Search);
        setStatus("success");
      }
    } catch (err) {
      setError("Network error");
      setStatus("error");
    }
  }

  return (
    <div className="App">
      <header className="App-header">
      <h1>Movie Explorer</h1>
      </header>
      <main>
        <SearchBar onSearch={handleSearch} />

        {status === "idle" && <p>Search for a movie…</p>}
        {status === "loading" && <p>Loading…</p>}
        {status === "error" && <p style={{ color: "red" }}>{error}</p>}

        {status === "success" && (
          <ul>
            {movies.map((m) => (
              <Link to={`/movie/${m.imdbID}`}>
                <li key={m.imdbID}>
                  <img
                    src={m.Poster !== "N/A" ? m.Poster : placeholder}
                    alt={m.Title}
                    style={{ width: 100 }}
                  />
                  {m.Title} ({m.Year})
                </li>
              </Link>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default Search;