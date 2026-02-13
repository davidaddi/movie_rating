import { useState, useEffect } from 'react';
import TopMoviesCarousel from '../components/TopMoviesCarousel';
import MovieCard from '../components/MovieCard';
import MoviesDataGrid from '../components/MoviesDataGrid';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/Tabs';
import { useSearchContext } from '../layouts/HeaderLayout';
import { LayoutGrid, Table } from 'lucide-react';
import '../styles/App.css';

interface Movie {
  id: number;
  name: string;
  description?: string;
  releaseDate?: string;
  imageUrl?: string;
  ratings?: { rating: number }[];
  rating?: number;
  avgRating?: number;
}

interface CarouselMovie {
  id: string;
  title: string;
  cover: string | null;
  rating: number;
}

export default function HomePage() {
  const { searchFilters } = useSearchContext();
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [topMovies, setTopMovies] = useState<CarouselMovie[]>([]);
  const [newMovies, setNewMovies] = useState<CarouselMovie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/movies');
        const data: Movie[] = await response.json();
        
        const newest = data
          .filter(m => m.id >= 6)
          .sort((a, b) => b.id - a.id)
          .slice(0, 12)
          .map(m => ({
            id: String(m.id),
            title: m.name,
            cover: m.imageUrl ?? null,
            rating: typeof m.avgRating === 'number' ? m.avgRating : 0
          }));
        
        const top = data
          .filter(m => m.id <= 5)
          .map(m => ({
            id: String(m.id),
            title: m.name,
            cover: m.imageUrl ?? null,
            rating: typeof m.avgRating === 'number' ? m.avgRating : 0
          }));
        
        setNewMovies(newest);
        setTopMovies(top);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

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
    setIsLoading(true);

    const fetchSearchResults = async () => {
      try {
        const params = new URLSearchParams();
        if (searchFilters.query) params.append('name', searchFilters.query);
        if (searchFilters.description) params.append('description', searchFilters.description);
        if (searchFilters.actor) params.append('actor', searchFilters.actor);
        if (searchFilters.year) params.append('year', searchFilters.year);
        if (searchFilters.minRating) params.append('minRating', searchFilters.minRating);

        const response = await fetch(`http://localhost:8080/api/movies/search?${params.toString()}`);
        let data = await response.json();

        // Use avgRating from backend (already computed), ensure it's between 0 and 5
        data = data.map((movie: any) => {
          let avgRating = movie.avgRating;
          if (typeof avgRating !== 'number' || isNaN(avgRating)) avgRating = 0;
          avgRating = Math.max(0, Math.min(5, avgRating));
          return { ...movie, avgRating };
        });

        setSearchResults(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error searching movies:', error);
        setSearchResults([]);
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchFilters]);

  return (
    <>
      {isSearching ? (
        <section className="movies-section">
          <h2 className="section-title">
            {isLoading ? 'Searching...' : `Search Results (${searchResults.length} found)`}
          </h2>
          {searchResults.length > 0 ? (
            <Tabs defaultValue="grid">
              <TabsList>
                <TabsTrigger value="grid">
                  <LayoutGrid size={18} style={{ marginRight: '0.5rem' }} />
                  Grid View
                </TabsTrigger>
                <TabsTrigger value="table">
                  <Table size={18} style={{ marginRight: '0.5rem' }} />
                  Table View
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="grid">
                <div className="movies-grid">
                  {searchResults.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      id={String(movie.id)}
                      title={movie.name}
                      cover={movie.imageUrl ?? null}
                      rating={typeof movie.avgRating === 'number' ? movie.avgRating : 0}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="table">
                <MoviesDataGrid movies={searchResults} />
              </TabsContent>
            </Tabs>
          ) : isLoading ? (
            <p style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
              Loading...
            </p>
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
            <TopMoviesCarousel movies={topMovies} />
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
