const MarkdownIcon = () => (
  <svg
    className="mp-logo-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M7 15V9l3 3 3-3v6" />
    <path d="M17 9v6M15 12l2 3 2-3" />
  </svg>
);

const SunIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const DownloadIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export function Header({ stats, theme, onReset, onToggleTheme, onDownload }) {
  return (
    <header className="mp-header">
      <div className="mp-logo">
        <MarkdownIcon />
        Markdown Previewer
      </div>

      <div className="mp-header-badges">
        <span className="mp-badge">{stats.words} words</span>
        <span className="mp-badge">{stats.chars} chars</span>
        <span className="mp-badge">{stats.lines} lines</span>
        <span className="mp-badge">GFM</span>
        <span className="mp-badge mp-badge--live">● Live</span>

        <button
          className="mp-reset-btn"
          onClick={onReset}
          title="Reset to default content"
        >
          Reset
        </button>

        <button
          className="mp-icon-btn"
          onClick={onToggleTheme}
          title={
            theme === "light" ? "Switch to dark mode" : "Switch to light mode"
          }
          aria-label="Toggle theme"
        >
          {theme === "light" ? <MoonIcon /> : <SunIcon />}
        </button>

        <button
          className="mp-icon-btn mp-download-btn"
          onClick={onDownload}
          title="Download as .md file"
          aria-label="Download markdown"
        >
          <DownloadIcon />
          <span>Export</span>
        </button>
      </div>
    </header>
  );
}
