import { useState } from 'react';
import './SearchBar.css'

export default function SearchBar({onSearch}) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("default");

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), type === "default" ? "" : type);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input className="search-bar-input" 
        type="text" value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <select name="type" id="type" value={type}
        onChange={(t) => setType(t.target.value)}>
        <option value="default">Select Type</option>
        <option value="movie">Movie</option>
        <option value="series">Series</option>
      </select>
      <button id='search-button' type='submit'>Search</button>
    </form>
  );
}