import { Outlet, useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import type { SearchFilters } from '../types/Search';
import { useAuth } from '../contexts/AuthContext';
import '../styles/App.css';

export default function HeaderLayout() {
  const [searchFilters, setSearchFilters] = useState<SearchFilters | null>(null);
  const { isConnected, setIsConnected } = useAuth();

  const handleSearch = (filters: SearchFilters) => {
    setSearchFilters(filters);
  };

  return (
    <div className="layout-container">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">MovieDB</h1>
          <div className="auth-buttons">
            <select
              className="connection-dropdown"
              value={isConnected ? 'connected' : 'not-connected'}
              onChange={(e) => setIsConnected(e.target.value === 'connected')}
            >
              <option value="not-connected">Not Connected</option>
              <option value="connected">Connected</option>
            </select>
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
