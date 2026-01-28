import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderLayout from './layouts/HeaderLayout';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import ActorDetailPage from './pages/ActorDetailPage';
import DirectorDetailPage from './pages/DirectorDetailPage';
import './styles/globals.css';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<HeaderLayout />}>
          <Route index element={<HomePage />} />
          <Route path="movie/:id" element={<MovieDetailPage />} />
          <Route path="actor/:id" element={<ActorDetailPage />} />
          <Route path="director/:id" element={<DirectorDetailPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;