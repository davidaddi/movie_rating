import React, { useState } from 'react';
import { Search } from 'lucide-react';
import '../styles/App.css';

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch?.(e.target.value);
  };

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
              <label>Genre</label>
              <select>
                <option>All Genres</option>
                <option>Action</option>
                <option>Drama</option>
                <option>Comedy</option>
                <option>Thriller</option>
              </select>
            </div>
            <div className="advanced-field">
              <label>Year</label>
              <select>
                <option>All Years</option>
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
              </select>
            </div>
            <div className="advanced-field">
              <label>Rating</label>
              <select>
                <option>Any Rating</option>
                <option>9+ Stars</option>
                <option>8+ Stars</option>
                <option>7+ Stars</option>
              </select>
            </div>
            <div className="advanced-field">
              <label>Actor</label>
              <input type="text" placeholder="Actor name" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
