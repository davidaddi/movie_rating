import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, ChevronLeft, User } from 'lucide-react';
import { comments } from '../data/comments';
import '../styles/App.css';
import type { MovieDetails } from '../types/Movie';


export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8080/api/movies/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Movie not found');
        }
        return response.json();
      })
      .then((data) => {
        setMovie(data);
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

  if (error || !movie) {
    return (
      <div className="error-container">
        <p>Movie not found</p>
        <button onClick={() => navigate(-1)} className="back-button">
          Back
        </button>
      </div>
    );
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement comment submission logic
  };

  return (
    <div className="movie-detail-page">
      <button
        onClick={() => navigate(-1)}
        className="back-button"
      >
        <ChevronLeft size={20} />
        Back
      </button>

      <div className="detail-container">
        <div className="detail-header">
          <img src={movie.imageUrl} alt={movie.name} className="detail-image" />
          <div className="detail-info">
            <h1 className="detail-title">{movie.name}</h1>
            <div className="detail-rating">
              <Star size={24} className="star-icon" />
              <span className="rating-value">8.5</span>
              <span className="rating-label">/10</span>
            </div>
            
            <p className="detail-description">
              {movie.description || 'This is a fascinating film with outstanding cinematography and compelling narrative. A must-watch for film enthusiasts.'}
            </p>
            {movie.director && (
              <div className="movie-director">
                <strong>Director:</strong>{' '}
                <Link 
                  to={`/director/${movie.director.id}`} 
                  className="person-link"
                >
                  {movie.director.firstname} {movie.director.lastname}
                </Link>
              </div>
            )}

            {movie.actors && movie.actors.length > 0 && (
              <div className="movie-actors">
                <strong>Cast:</strong>
                <div className="actors-list">
                  {movie.actors.map((actor) => (
                    <Link
                      key={actor.id}
                      to={`/actor/${actor.id}`}
                      className="actor-card"
                    >
                      <div className="actor-avatar-small">
                        <User size={24} />
                      </div>
                      <div className="actor-info-small">
                        <div className="actor-name">
                          {actor.firstname} {actor.lastname}
                        </div>
                        <div className="actor-role">{actor.roleInMovie}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
          
         <div className="user-rating-section">
          <h2><strong>Rate this movie</strong></h2>
          <div className="stars-wrapper">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={`star-button ${
                  star <= (hoveredRating || userRating) ? 'active' : ''
                }`}
                onClick={() => setUserRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
              >
                <Star size={32} />
              </button>
            ))}
          </div>
          {userRating > 0 && (
            <p className="rating-display">
              You rated this movie {userRating} star{userRating !== 1 ? 's' : ''}
            </p>
          )}

          <form onSubmit={handleSubmitComment}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts about this movie..."
              className="comment-input"
              rows={4}
            />
            <button
              type="submit"
              className="submit-button"
              disabled={!comment.trim() || userRating === 0}
            >
              Post Comment
            </button>
          </form>
        </div>
        <div className="comments-section">
          <div className="comments-list">
            <h3>Comments ({comments.length})</h3>
            {comments.map((c) => (
              <div key={c.id} className="comment-item">
                <div className="comment-header">
                  <span className="comment-user">{c.user}</span>
                  <div className="comment-rating">
                    {[...Array(c.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="comment-star"
                      />
                    ))}
                  </div>
                  <span className="comment-date">{c.date}</span>
                </div>
                <p className="comment-text">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
