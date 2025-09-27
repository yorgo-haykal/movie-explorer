import './App.css';
import Search from './Search';
import Details from './Details';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Search />} />
        <Route path='/movie/:movieId' element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
