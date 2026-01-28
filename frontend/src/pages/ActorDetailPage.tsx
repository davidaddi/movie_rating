import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ChevronLeft, User, Calendar, Film } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import type { Actor } from '../types/Actor';
import '../styles/App.css';

export default function ActorDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [actor, setActor] = useState<Actor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/actors/${id}/movies`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Actor not found');
        }
        return response.json();
      })
      .then((data) => {
        setActor(data);
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

  if (error || !actor) {
    return (
      <div className="error-container">
        <p>Actor not found</p>
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
              {actor.firstname} {actor.lastname}
            </h1>
            <div className="person-metadata">
              <div className="metadata-item">
                <Calendar size={18} />
                <span>Born {new Date(actor.birthdate).toLocaleDateString()}</span>
              </div>
              <div className="metadata-item">
                <Film size={18} />
                <span>{actor.movies.length} movie{actor.movies.length !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="movies-section">
          <h2>Filmography</h2>
          <div className="movies-grid">
            {actor.movies.map((movie) => (
              <div key={movie.id} className="actor-movie-card">
                <MovieCard
                  id={String(movie.id)}
                  title={movie.name}
                  cover={movie.imageUrl}
                  rating={0}
                />
                <p className="role-name">as {movie.roleInMovie}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
