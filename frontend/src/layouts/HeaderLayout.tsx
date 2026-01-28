import { Outlet } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import '../styles/App.css';

export default function HeaderLayout() {
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
        <SearchBar />
        <Outlet />
      </main>

      <footer className="footer">
        <p className="footer-text">© 2026 MovieDB. All rights reserved.</p>
      </footer>
    </div>
  );
}
