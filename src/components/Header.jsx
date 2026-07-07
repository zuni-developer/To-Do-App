export default function Header({ title, theme, onToggleTheme }) {
  return (
    <div className="app-header">
      <h1 className="app-title">{title}</h1>
      <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme" title="Toggle light / dark">
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
    </div>
  );
}