import { useState } from 'react';

const URLList = ({ urls, onUrlDeleted, onRefresh }) => {
  const [deletingId, setDeletingId] = useState(null);

  const getShortUrl = (shortCode) => {
    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    return `${API_BASE}/${shortCode}`;
  };

  const getDisplayUrl = (shortCode) => {
    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    return API_BASE.replace('http://', '').replace('https://', '') + `/${shortCode}`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {});
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const handleDelete = async (shortCode) => {
    if (!confirm('Are you sure you want to delete this URL?')) return;

    setDeletingId(shortCode);

    try {
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${API_BASE}/api/urls/${shortCode}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        onUrlDeleted(shortCode);
      } else {
        alert('Failed to delete URL');
      }
    } catch {
      alert('Failed to delete URL');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="modern-url-list">
      {urls.length === 0 ? (
        <div className="modern-empty-list">No URLs yet. Shorten one above!</div>
      ) : (
        <div className="modern-list-grid">
          {urls.map(url => (
            <div key={url.shortCode} className="modern-url-card">
              <div className="modern-url-header">
                <a href={getShortUrl(url.shortCode)} target="_blank" rel="noopener noreferrer" className="modern-short-link">
                  {getDisplayUrl(url.shortCode)}
                </a>
                <button className="modern-copy-btn" onClick={() => copyToClipboard(getShortUrl(url.shortCode))} title="Copy short URL">
                  📋
                </button>
              </div>
              <div className="modern-original-url">{url.originalUrl}</div>
              <div className="modern-url-meta">
                <span className="modern-created-at">{formatDate(url.createdAt)}</span>
                <span className="modern-clicks">{url.clicks} clicks</span>
              </div>
              <button
                className="modern-delete-btn"
                onClick={() => handleDelete(url.shortCode)}
                disabled={deletingId === url.shortCode}
                title="Delete URL"
              >
                {deletingId === url.shortCode ? '⏳' : '🗑️'}
              </button>
            </div>
          ))}
        </div>
      )}
      <button className="modern-refresh-btn" onClick={onRefresh} title="Refresh list">
        Refresh
      </button>
    </div>
  );
};

export default URLList;
