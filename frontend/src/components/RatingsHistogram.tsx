import { BarChart3 } from 'lucide-react';
import '../styles/App.css';

interface Movie {
  avgRating: number;
}

interface RatingsHistogramProps {
  movies: Movie[];
}

export default function RatingsHistogram({ movies }: RatingsHistogramProps) {
  const bins = [
    { label: '0-1★', min: 0, max: 2, count: 0, color: '#EF4444' },
    { label: '1-2★', min: 2, max: 4, count: 0, color: '#F97316' },
    { label: '2-3★', min: 4, max: 6, count: 0, color: '#EAB308' },
    { label: '3-4★', min: 6, max: 8, count: 0, color: '#84CC16' },
    { label: '4-5★', min: 8, max: 10, count: 0, color: '#22C55E' },
  ];

  movies.forEach((movie) => {
    const rating = movie.avgRating || 0;
    for (const bin of bins) {
      if (rating >= bin.min && rating < bin.max) {
        bin.count++;
        break;
      }
      
      if (rating === 10 && bin.max === 10) {
        bin.count++;
        break;
      }
    }
  });

  const maxCount = Math.max(...bins.map(b => b.count), 1);

  return (
    <div className="ratings-histogram">
      <div className="histogram-header">
        <BarChart3 size={24} />
        <h3>Ratings Distribution</h3>
      </div>
      <div className="histogram-chart">
        <div className="histogram-bars">
          {bins.map((bin, index) => (
            <div key={index} className="histogram-bar-column">
              <div className="histogram-bar-wrapper">
                <div 
                  className="histogram-bar-vertical"
                  style={{ 
                    height: `${(bin.count / maxCount) * 100}%`,
                    backgroundColor: bin.color,
                    minHeight: bin.count > 0 ? '20px' : '0'
                  }}
                >
                  {bin.count > 0 && <span className="histogram-count-vertical">{bin.count}</span>}
                </div>
              </div>
              <div className="histogram-label-vertical">{bin.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
