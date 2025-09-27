import { useState } from 'react';
import './SearchBar.css'

export default function SearchBar({onSearch}) {
  const [query, setQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input className="search-bar-input" 
        type="text" value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button id='search-button' type='submit'>Search</button>
    </form>
  );
}