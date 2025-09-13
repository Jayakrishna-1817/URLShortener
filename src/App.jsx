import { useState, useEffect } from 'react';
import URLShortener from './components/URLShortener';
import URLList from './components/URLList';
import Stats from './components/Stats';
import './App.css';

function App() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.classList.remove('light-mode', 'dark-mode');
    document.body.classList.add(theme === 'light' ? 'light-mode' : 'dark-mode');
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${API_BASE}/api/urls`);
      const data = await response.json();
      if (data.success) {
        setUrls(data.data);
      }
    } catch (error) {
      console.error('Error fetching URLs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUrlCreated = (newUrl) => {
    setUrls(prev => [newUrl, ...prev]);
  };

  const handleUrlDeleted = (shortCode) => {
    setUrls(prev => prev.filter(url => url.shortCode !== shortCode));
  };

  return (
    <div className={`app redesigned-app ${theme}-mode`}>
      <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
      <header className="modern-header">
        <div className="modern-container">
          <h1 className="modern-title">
            <span className="modern-icon">🔗</span>
            LinkForge
          </h1>
          <p className="modern-subtitle">A modern URL shortener with instant analytics</p>
        </div>
      </header>
      <main className="modern-container">
        <div className="modern-grid">
          <div className="modern-card shortener-card">
            <URLShortener onUrlCreated={handleUrlCreated} />
          </div>
          <div className="modern-card list-card">
            {loading ? (
              <div className="modern-loading">Loading...</div>
            ) : (
              <URLList urls={urls} onUrlDeleted={handleUrlDeleted} onRefresh={fetchUrls} />
            )}
          </div>
          <div className="modern-card stats-card">
            <Stats urls={urls} />
          </div>
        </div>
      </main>
      <footer className="modern-footer">
        <div className="modern-container">
          <span>&copy; {new Date().getFullYear()} LinkForge. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
