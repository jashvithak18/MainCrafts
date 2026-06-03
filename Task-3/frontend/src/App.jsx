import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const API = "http://localhost:5000/api";
  const fetchTasks = async () => {
    const res = await axios.get(`${API}/tasks`);
    setTasks(res.data);
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!text.trim()) return;
    await axios.post(`${API}/add`, {
      text,
    });
    setText("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/delete/${id}`);
    fetchTasks();
  };

  const updateTask = async (id, oldText) => {
    const newText = prompt("Edit Task", oldText);
    if (!newText) return;
    await axios.put(`${API}/update/${id}`, {
      text: newText,
    });
    fetchTasks();
  };

  const toggleCompleted = async (task) => {
    await axios.put(`${API}/update/${task._id}`, {
      completed: !task.completed,
    });
    fetchTasks();
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Todo App</h1>

      <input
        type="text"
        placeholder="Enter task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={addTask}>
        Add
      </button>

      {tasks.map((task) => (
        <div
          key={task._id}
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleCompleted(task)}
          />

          <span
            style={{
              textDecoration: task.completed
                ? "line-through"
                : "none",
            }}
          >
            {task.text}
          </span>

          <button
            onClick={() =>
              updateTask(task._id, task.text)
            }
          >
            Edit
          </button>

          <button
            onClick={() =>
              deleteTask(task._id)
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;