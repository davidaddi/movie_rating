import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import '../styles/App.css';

interface SearchBarProps {
  onSearch?: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  query: string;
  description: string;
  actor: string;
  year: string;
  minRating: string;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [description, setDescription] = useState(searchParams.get('description') || '');
  const [actor, setActor] = useState(searchParams.get('actor') || '');
  const [year, setYear] = useState(searchParams.get('year') || '');
  const [minRating, setMinRating] = useState(searchParams.get('minRating') || '');

  useEffect(() => {
    // Sync with URL params on mount
    const filters = {
      query: searchParams.get('query') || '',
      description: searchParams.get('description') || '',
      actor: searchParams.get('actor') || '',
      year: searchParams.get('year') || '',
      minRating: searchParams.get('minRating') || ''
    };
    
    const hasFilters = Object.values(filters).some(v => v !== '');
    if (hasFilters) {
      onSearch?.(filters);
    }
  }, []);

  const updateUrlParams = (filters: SearchFilters) => {
    const params = new URLSearchParams();
    if (filters.query) params.set('query', filters.query);
    if (filters.description) params.set('description', filters.description);
    if (filters.actor) params.set('actor', filters.actor);
    if (filters.year) params.set('year', filters.year);
    if (filters.minRating) params.set('minRating', filters.minRating);
    
    setSearchParams(params);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    const filters = {
      query: value,
      description,
      actor,
      year,
      minRating
    };
    updateUrlParams(filters);
    onSearch?.(filters);
  };

  const handleAdvancedSearch = () => {
    const filters = {
      query: searchQuery,
      description,
      actor,
      year,
      minRating
    };
    updateUrlParams(filters);
    onSearch?.(filters);
  };

  const handleReset = () => {
    setSearchQuery('');
    setDescription('');
    setActor('');
    setYear('');
    setMinRating('');
    setSearchParams(new URLSearchParams());
    onSearch?.({
      query: '',
      description: '',
      actor: '',
      year: '',
      minRating: ''
    });
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <section className="search-section">
      <div className="search-container">
        <div className="search-input-wrapper">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        <button
          className="advanced-button"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          Advanced Search
        </button>
      </div>

      {showAdvanced && (
        <div className="advanced-search">
          <div className="advanced-grid">
            <div className="advanced-field">
              <label>Description</label>
              <input
                type="text"
                placeholder="Search in description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="advanced-field">
              <label>Actor</label>
              <input
                type="text"
                placeholder="Actor name..."
                value={actor}
                onChange={(e) => setActor(e.target.value)}
              />
            </div>
            <div className="advanced-field">
              <label>Year</label>
              <select value={year} onChange={(e) => setYear(e.target.value)}>
                <option value="">All Years</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            <div className="advanced-field">
              <label>Minimum Rating</label>
              <select value={minRating} onChange={(e) => setMinRating(e.target.value)}>
                <option value="">Any Rating</option>
                <option value="9">9+ Stars</option>
                <option value="8">8+ Stars</option>
                <option value="7">7+ Stars</option>
                <option value="6">6+ Stars</option>
                <option value="5">5+ Stars</option>
              </select>
            </div>
          </div>
          <div className="advanced-actions">
            <button
              className="advanced-button"
              onClick={handleAdvancedSearch}
            >
              Apply Filters
            </button>
            <button
              className="reset-button"
              onClick={handleReset}
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
