import './App.css';
import Search from './Search';
import Details from './Details';
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function ThemeToggle() {
  const [theme, setTheme] = useState("dark"); // default dark

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      style={{ marginLeft: "1rem" }}
    >
      {theme === "dark" ? "🌙 Dark" : "🌞 Light"}
    </button>
  );
}


function App() {
  return (
    <>
      <header className="App-header">
        <h1>Movie Explorer</h1>
        <ThemeToggle />
      </header>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Search />} />
          <Route path='/movie/:movieId' element={<Details />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
