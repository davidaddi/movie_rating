import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';

interface Movie {
  id: string;
  title: string;
  cover: string;
  rating: number;
}

interface TopMoviesCarouselProps {
  movies: Movie[];
}

export default function TopMoviesCarousel({ movies }: TopMoviesCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemWidth = 256 + 16; // 16rem (256px) + 1rem (16px) gap

  // Dupliquer les films pour créer l'effet infini
  const infiniteMovies = [...movies, ...movies, ...movies];

  useEffect(() => {
    // Initialiser le scroll au premier film original
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = itemWidth * movies.length;
    }
  }, [movies.length, itemWidth]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let isScrolling: number;

    const handleScroll = () => {
      window.clearTimeout(isScrolling);
      isScrolling = window.setTimeout(() => {
        const scrollLeft = container.scrollLeft;
        const totalWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;
        
        // Si on approche de la fin de la liste (3ème set)
        if (scrollLeft >= totalWidth - clientWidth - itemWidth) {
          container.scrollLeft = itemWidth * movies.length - (totalWidth - scrollLeft - clientWidth);
        }
        // Si on approche du début de la liste (1er set)
        else if (scrollLeft <= itemWidth) {
          container.scrollLeft = itemWidth * movies.length + (scrollLeft - itemWidth);
        }
      }, 150);
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.clearTimeout(isScrolling);
    };
  }, [movies.length, itemWidth]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = itemWidth * 2;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="carousel-container-wrapper">
      <button onClick={() => scroll('left')}
        className="carousel-button carousel-button-left"
        aria-label="Scroll left">
          <ChevronLeft className="carousel-button-icon" />
      </button>

      <div ref={scrollContainerRef}
        className="carousel-scroll-container">
        {infiniteMovies.map((movie, index) => (
          <Link to={`/movie/${movie.id}`} key={`${movie.id}-${index}`} className="carousel-item" style={{ textDecoration: 'none' }}>
            <div className="carousel-item-image-wrapper">
              <img
                src={movie.cover}
                alt={movie.title}
                className="carousel-item-image"
              />
              <div className="carousel-item-overlay" />
              <div className="carousel-item-rating">
                <Star className="carousel-item-rating-star" />
                <span className="carousel-item-rating-text">{movie.rating.toFixed(1)}</span>
              </div>
            </div>
            <h3 className="carousel-item-title">
              {movie.title}
            </h3>
          </Link>
        ))}
      </div>

      <button
        onClick={() => scroll('right')}
        className="carousel-button carousel-button-right"
        aria-label="Scroll right"
      >
        <ChevronRight className="carousel-button-icon" />
      </button>
    </div>
  );
}