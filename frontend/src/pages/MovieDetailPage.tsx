import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ChevronLeft } from 'lucide-react';
import { topRatedMovies } from '../data/topRatedMovies';
import { newMovies } from '../data/newMovies';
import '../styles/App.css';

interface Comment {
  id: string;
  user: string;
  text: string;
  rating: number;
  date: string;
}

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const allMovies = [...topRatedMovies, ...newMovies];
  const movie = allMovies.find((m) => m.id === id);

  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      user: 'John Doe',
      text: 'Amazing movie! Highly recommended.',
      rating: 5,
      date: '2 days ago',
    },
    {
      id: '2',
      user: 'Jane Smith',
      text: 'Great storyline and excellent acting.',
      rating: 4,
      date: '5 days ago',
    },
  ]);

  if (!movie) {
    return (
      <div className="error-container">
        <p>Movie not found</p>
        <button onClick={() => navigate('/')} className="back-button">
          Back to Home
        </button>
      </div>
    );
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim() && userRating > 0) {
      const newComment: Comment = {
        id: String(comments.length + 1),
        user: 'You',
        text: comment,
        rating: userRating,
        date: 'now',
      };
      setComments([newComment, ...comments]);
      setComment('');
      setUserRating(0);
    }
  };

  return (
    <div className="movie-detail-page">
      <button
        onClick={() => navigate('/')}
        className="back-button"
      >
        <ChevronLeft size={20} />
        Back
      </button>

      <div className="detail-container">
        <div className="detail-header">
          <img src={movie.cover} alt={movie.title} className="detail-image" />
          <div className="detail-info">
            <h1 className="detail-title">{movie.title}</h1>
            <div className="detail-rating">
              <Star size={24} className="star-icon" />
              <span className="rating-value">{movie.rating.toFixed(1)}</span>
              <span className="rating-label">/10</span>
            </div>
            <p className="detail-description">
              This is a fascinating film with outstanding cinematography and
              compelling narrative. A must-watch for film enthusiasts.
            </p>
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
