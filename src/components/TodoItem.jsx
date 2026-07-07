import { useState } from "react";

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  function commitEdit() {
    const trimmed = draft.trim();
    if (trimmed) onEdit(todo.id, trimmed);
    else setDraft(todo.text);
    setIsEditing(false);
  }

  return (
    <li className={`todo-item priority-${todo.priority}`}>
      <button
        className={`checkbox ${todo.completed ? "checked" : ""}`}
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
      >
        {todo.completed && "✓"}
      </button>

      {isEditing ? (
        <input
          className="edit-input"
          value={draft}
          autoFocus
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={(e) => {
            if (e.key === "Enter") commitEdit();
            if (e.key === "Escape") {
              setDraft(todo.text);
              setIsEditing(false);
            }
          }}
        />
      ) : (
        <span
          className={`todo-text ${todo.completed ? "completed" : ""}`}
          onDoubleClick={() => setIsEditing(true)}
          title="Double-click to edit"
        >
          {todo.text}
        </span>
      )}

      <span className={`priority-dot priority-${todo.priority}`} />
      <button className="delete-btn" onClick={() => onDelete(todo.id)}>
        ✕
      </button>
    </li>
  );
}
