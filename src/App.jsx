import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import TodoItem from "./components/TodoItem.jsx";
import FilterTabs from "./components/FilterTabs.jsx";
import ProgressRing from "./components/ProgressRing.jsx";

function loadFromStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [todos, setTodos] = useState(() => loadFromStorage("todos", []));
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("medium");
  const [filter, setFilter] = useState("All");
  const [theme, setTheme] = useState(() => loadFromStorage("theme", "light"));

  useEffect(() => {
    const remaining = todos.filter((t) => !t.completed).length;
    document.title = remaining > 0 ? `(${remaining}) To-Do List` : "To-Do List";
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  function addTodo() {
    const trimmed = input.trim();
    if (trimmed === "") return;
    const newTodo = {
      id: Date.now(),
      text: trimmed,
      completed: false,
      priority,
    };
    setTodos([...todos, newTodo]);
    setInput("");
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTodo(id) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  function editTodo(id, newText) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, text: newText } : t)));
  }

  function clearCompleted() {
    setTodos(todos.filter((t) => !t.completed));
  }

  const filteredTodos = todos.filter((t) => {
    if (filter === "Active") return !t.completed;
    if (filter === "Completed") return t.completed;
    return true;
  });
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="app-card">
      <Header
        title="My To-Do List"
        theme={theme}
        onToggleTheme={() => setTheme(theme === "light" ? "dark" : "light")}
      />

      <div className="stats-row">
        <ProgressRing total={todos.length} completed={completedCount} />
        <div className="stats-text">
          <p className="stats-main">
            {completedCount} of {todos.length} done
          </p>
        </div>
      </div>

      <div className="input-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="Add a task..."
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button onClick={addTodo}>Add</button>
      </div>

      <FilterTabs current={filter} onChange={setFilter} />

      {filteredTodos.length === 0 ? (
        <p className="empty-state">
          {filter === "All"
            ? "No tasks yet!"
            : `No ${filter.toLowerCase()} tasks.`}
        </p>
      ) : (
        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))}
        </ul>
      )}

      {completedCount > 0 && (
        <button className="clear-btn" onClick={clearCompleted}>
          Clear completed ({completedCount})
        </button>
      )}
    </div>
  );
}
