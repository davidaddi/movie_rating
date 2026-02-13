import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ChevronLeft, User, Calendar, Film } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import type { Director } from '../types/Director';
import '../styles/App.css';

export default function DirectorDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [director, setDirector] = useState<Director | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/directors/${id}/movies`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Director not found');
        }
        return response.json();
      })
      .then((data) => {
        setDirector(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="error-container">
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !director) {
    return (
      <div className="error-container">
        <p>Director not found</p>
        <button onClick={() => navigate(-1)} className="back-button">
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="movie-detail-page">
      <button onClick={() => navigate(-1)} className="back-button">
        <ChevronLeft size={20} />
        Back
      </button>

      <div className="person-detail-container">
        <div className="person-header">
          <div className="person-avatar">
            <User size={80} />
          </div>
          <div className="person-info">
            <h1 className="person-title">
              {director.firstname} {director.lastname}
            </h1>
            <div className="person-metadata">
              <div className="metadata-item">
                <Calendar size={18} />
                <span>Born {new Date(director.birthdate).toLocaleDateString()}</span>
              </div>
              <div className="metadata-item">
                <Film size={18} />
                <span>{director.movies.length} movie{director.movies.length !== 1 ? 's' : ''} directed</span>
              </div>
            </div>
          </div>
        </div>

        <div className="movies-section">
          <h2>Filmography</h2>
          <div className="movies-grid">
            {director.movies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={String(movie.id)}
                title={movie.name}
                cover={movie.imageUrl}
                rating={0}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
