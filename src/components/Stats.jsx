const Stats = ({ urls }) => {
  const totalUrls = urls.length;
  const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0);
  const averageClicks = totalUrls > 0 ? (totalClicks / totalUrls).toFixed(1) : 0;
  const mostClicked = urls.length > 0 
    ? urls.reduce((max, url) => url.clicks > max.clicks ? url : max, urls[0])
    : null;
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const recentUrls = urls.filter(url => new Date(url.createdAt) > oneDayAgo);

  return (
    <div className="modern-stats">
      <div className="modern-stats-card">
        <h2 className="modern-stats-title">Analytics</h2>
        <div className="modern-stats-grid">
          <div className="modern-stat-block">
            <div className="modern-stat-value" title="Total URLs">{totalUrls}</div>
            <div className="modern-stat-label">Total URLs</div>
          </div>
          <div className="modern-stat-block">
            <div className="modern-stat-value" title="Total Clicks">{totalClicks}</div>
            <div className="modern-stat-label">Total Clicks</div>
          </div>
          <div className="modern-stat-block">
            <div className="modern-stat-value" title="Avg Clicks">{averageClicks}</div>
            <div className="modern-stat-label">Avg Clicks</div>
          </div>
          <div className="modern-stat-block">
            <div className="modern-stat-value" title="Last 24h">{recentUrls.length}</div>
            <div className="modern-stat-label">Last 24h</div>
          </div>
        </div>
        {mostClicked && (
          <div className="modern-top-performer">
            <h3 className="modern-top-title">Top Performer</h3>
            <div className="modern-top-url">
              <div className="modern-top-url-code">/{mostClicked.shortCode}</div>
              <div className="modern-top-url-clicks">{mostClicked.clicks} clicks</div>
              <div className="modern-top-url-original">{mostClicked.originalUrl}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;
