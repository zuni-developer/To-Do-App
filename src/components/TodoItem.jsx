export default function TodoItem(props) {
  const todo = props.todo;
  return (
    <li className="todo-item">
      <span className={todo.completed ? "todo-text completed" : "todo-text"} onClick={() => props.onToggle(todo.id)}>
        {todo.text}
      </span>
      <button className="delete-btn" onClick={() => props.onDelete(todo.id)}>
        delete
      </button>
    </li>
  );
}