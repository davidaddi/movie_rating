import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, ChevronLeft, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/App.css';
import type { MovieDetails } from '../types/Movie';


export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isConnected } = useAuth();

  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [hasExistingReview, setHasExistingReview] = useState(false);

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
        
        // Check if current user has already reviewed this movie
        if (isConnected && data.reviews) {
          const existingReview = data.reviews.find(
            (r: { username: string }) => r.username === 'john_doe'
          );
          if (existingReview) {
            setHasExistingReview(true);
          }
        }
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id, isConnected]);

  const refreshMovie = () => {
    fetch(`http://localhost:8080/api/movies/${id}`)
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch(console.error);
  };

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

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || userRating === 0 || submitting) return;

    setSubmitting(true);
    try {
      const response = await fetch(`http://localhost:8080/api/movies/${id}/ratings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating: userRating,
          comment: comment.trim(),
          username: 'john_doe', // Simulated logged-in user
        }),
      });

      if (response.ok) {
        setHasExistingReview(true);
        refreshMovie();
      }
    } catch (err) {
      console.error('Failed to submit comment:', err);
    } finally {
      setSubmitting(false);
    }
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
              <span className="rating-value">
                {movie.reviews && movie.reviews.length > 0
                  ? (movie.reviews.reduce((sum, r) => sum + r.rating, 0) / movie.reviews.length).toFixed(1)
                  : 'N/A'}
              </span>
              <span className="rating-label">/5</span>
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
          {isConnected ? (
            hasExistingReview ? (
              <p className="existing-review-notice" style={{ color: '#60a5fa', fontSize: '0.95rem' }}>
                You have already reviewed this movie.
              </p>
            ) : (
              <>
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
                    disabled={!comment.trim() || userRating === 0 || submitting}
                  >
                    {submitting ? 'Posting...' : 'Post Comment'}
                  </button>
                </form>
              </>
            )
          ) : (
            <p className="login-prompt">
              Sign up or sign in to leave a comment
            </p>
          )}
        </div>
        <div className="comments-section">
          <div className="comments-list">
            <h3>Comments ({movie.reviews?.length || 0})</h3>
            {movie.reviews && movie.reviews.length > 0 ? (
              movie.reviews.map((review) => (
                <div key={review.id} className="comment-item">
                  <div className="comment-header">
                    <span className="comment-user">{review.username}</span>
                    <div className="comment-rating">
                      {[...Array(Math.round(review.rating))].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className="comment-star"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="comment-text">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="no-comments">No comments yet. Be the first to share your thoughts!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
