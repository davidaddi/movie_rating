import { useState, useEffect } from 'react';
import TopMoviesCarousel from '../components/TopMoviesCarousel';
import MovieCard from '../components/MovieCard';
import { topRatedMovies } from '../data/topRatedMovies';
import { newMovies } from '../data/newMovies';
import { useSearchContext } from '../layouts/HeaderLayout';
import '../styles/App.css';

interface Movie {
  id: number;
  name: string;
  description?: string;
  releaseDate?: string;
  imageUrl?: string;
}

export default function HomePage() {
  const { searchFilters } = useSearchContext();
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!searchFilters) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    // Check if any filter is active
    const hasActiveFilters = searchFilters.query || searchFilters.description || 
                            searchFilters.actor || searchFilters.year || searchFilters.minRating;
    
    if (!hasActiveFilters) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    const fetchSearchResults = async () => {
      try {
        const params = new URLSearchParams();
        if (searchFilters.query) params.append('name', searchFilters.query);
        if (searchFilters.description) params.append('description', searchFilters.description);
        if (searchFilters.actor) params.append('actor', searchFilters.actor);
        if (searchFilters.year) params.append('year', searchFilters.year);
        if (searchFilters.minRating) params.append('minRating', searchFilters.minRating);

        const response = await fetch(`http://localhost:8080/api/movies/search?${params.toString()}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error searching movies:', error);
        setSearchResults([]);
      }
    };

    fetchSearchResults();
  }, [searchFilters]);

  return (
    <>
      {isSearching ? (
        <section className="movies-section">
          <h2 className="section-title">Search Results ({searchResults.length} found)</h2>
          {searchResults.length > 0 ? (
            <div className="movies-grid">
              {searchResults.map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={String(movie.id)}
                  title={movie.name}
                  cover={movie.imageUrl || 'https://via.placeholder.com/300x450'}
                  rating={0}
                />
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
              No movies found matching your criteria.
            </p>
          )}
        </section>
      ) : (
        <>
          <section className="movies-section">
            <h2 className="section-title">Top Rated Movies</h2>
            <TopMoviesCarousel movies={topRatedMovies} />
          </section>

          <section className="movies-section">
            <h2 className="section-title">New Releases</h2>
            <div className="movies-grid">
              {newMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  cover={movie.cover}
                  rating={movie.rating}
                />
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
}
