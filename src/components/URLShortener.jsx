import { useState } from 'react';

const URLShortener = ({ onUrlCreated }) => {
  const [formData, setFormData] = useState({ url: '', customCode: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
    if (result) setResult(null);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.url.trim()) {
      setError('Please enter a URL');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const apiUrl = API_BASE.endsWith('/api') ? `${API_BASE}/shorten` : `${API_BASE}/api/shorten`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: formData.url.trim(),
          customCode: formData.customCode.trim() || undefined
        })
      });
      const data = await response.json();
      if (data.success) {
        setResult(data);
        setFormData({ url: '', customCode: '' });
        onUrlCreated(data.data);
      } else {
        setError(data.error || 'Failed to shorten URL');
      }
    } catch {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="modern-url-form" onSubmit={handleSubmit} autoComplete="off">
      <label className="modern-label" htmlFor="url-input">Long URL</label>
      <input
        id="url-input"
        className="modern-input"
        type="url"
        name="url"
        placeholder="Paste your long URL here..."
        value={formData.url}
        onChange={handleInputChange}
        disabled={loading}
        required
      />
      <label className="modern-label" htmlFor="custom-input">Custom short code <span className="modern-optional">(optional)</span></label>
      <input
        id="custom-input"
        className="modern-input"
        type="text"
        name="customCode"
        placeholder="e.g. my-link"
        value={formData.customCode}
        onChange={handleInputChange}
        disabled={loading}
      />
      {error && <div className="modern-error">{error}</div>}
      <button type="submit" className="modern-btn" disabled={loading}>
        {loading ? '⏳ Shortening...' : '✂️ Shorten URL'}
      </button>
      {result && result.data && (
        <div className="modern-result">
          <span>Short URL:</span>
          <a href={result.data.shortUrl} target="_blank" rel="noopener noreferrer" className="modern-short-link">
            {result.data.shortUrl}
          </a>
          <button type="button" className="modern-copy-btn" onClick={() => navigator.clipboard.writeText(result.data.shortUrl)} title="Copy short URL">
            📋
          </button>
        </div>
      )}
    </form>
  );
}

export default URLShortener;
