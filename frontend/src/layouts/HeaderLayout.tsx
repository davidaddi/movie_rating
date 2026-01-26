import { Outlet, useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import type { SearchFilters } from '../types/Search';
import '../styles/App.css';

export default function HeaderLayout() {
  const [searchFilters, setSearchFilters] = useState<SearchFilters | null>(null);

  const handleSearch = (filters: SearchFilters) => {
    setSearchFilters(filters);
  };

  return (
    <div className="layout-container">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">MovieDB</h1>
          <div className="auth-buttons">
            <button className="sign-in-button">Sign In</button>
            <button className="sign-up-button">Sign Up</button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <SearchBar onSearch={handleSearch} />
        <Outlet context={{ searchFilters }} />
      </main>

      <footer className="footer">
        <p className="footer-text">© 2026 MovieDB. All rights reserved.</p>
      </footer>
    </div>
  );
}

export function useSearchContext() {
  return useOutletContext<{ searchFilters: SearchFilters | null }>();
}
