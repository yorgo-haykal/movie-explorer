import './SearchBar.css'

export default function SearchBar() {
  return (
    <div>
      <input className="search-bar-input" type="text"></input>
      <button id='search-button'>Search</button>
    </div>
  );
}