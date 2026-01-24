import TopMoviesCarousel from '../components/TopMoviesCarousel';
import MovieCard from '../components/MovieCard';
import { topRatedMovies } from '../data/topRatedMovies';
import { newMovies } from '../data/newMovies';
import '../styles/App.css';

export default function HomePage() {
  return (
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
  );
}
