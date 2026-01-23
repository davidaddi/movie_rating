import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderLayout from './layouts/HeaderLayout';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import './styles/globals.css';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<HeaderLayout />}>
          <Route index element={<HomePage />} />
          <Route path="movie/:id" element={<MovieDetailPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;