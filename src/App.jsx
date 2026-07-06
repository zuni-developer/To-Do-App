import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import TodoItem from "./components/TodoItem.jsx";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const remaining = todos.filter(function (todo) {
      return !todo.completed;
    }).length;
    document.title = remaining > 0 ? `(${remaining}) To-Do List` : "To-Do List";
  }, [todos]);

  function addTodo() {
    const trimmed = input.trim();
    if (trimmed === "") return;
    const newTodo = {
      id: Date.now(),
      text: trimmed,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInput("");
  }

  function toggleTodo(id) {
    setTodos(
      todos.map(function (todo) {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  }

  function deleteTodo(id) {
    setTodos(
      todos.filter(function (todo) {
        return todo.id !== id;
      })
    );
  }

  return (
    <div className="app-card">
      <Header title="My To-Do List" />
      <div className="input-row">
        <input
          value={input}
          onChange={function (e) {
            setInput(e.target.value);
          }}
          onKeyDown={function (e) {
            if (e.key === "Enter") addTodo();
          }}
          placeholder="Add a task..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      {todos.length === 0 ? (
        <p className="empty-state">No tasks yet!</p>
      ) : (
        <ul className="todo-list">
          {todos.map(function (todo) {
            return (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}