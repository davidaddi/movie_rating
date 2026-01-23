import React from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/App.css';

interface MovieCardProps {
  id: string;
  title: string;
  cover: string;
  rating: number;
}

export default function MovieCard({
  id,
  title,
  cover,
  rating,
}: MovieCardProps) {
  return (
    <Link to={`/movie/${id}`} className="movie-card-link">
      <div className="movie-card">
        <div className="movie-image-wrapper">
          <img src={cover} alt={title} className="movie-image" />
          <div className="movie-overlay" />
          <div className="movie-rating">
            <Star size={16} className="rating-star" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>
        <h3 className="movie-title">{title}</h3>
      </div>
    </Link>
  );
}