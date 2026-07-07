const FILTERS = ["All", "Active", "Completed"];

export default function FilterTabs({ current, onChange }) {
  return (
    <div className="filter-tabs" role="tablist">
      {FILTERS.map((label) => (
        <button
          key={label}
          role="tab"
          aria-selected={current === label}
          className={`filter-tab ${current === label ? "active" : ""}`}
          onClick={() => onChange(label)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
