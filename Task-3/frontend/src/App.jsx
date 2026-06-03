import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const API = " https://maincrafts-5.onrender.com/api";
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
  <div
    style={{
      minHeight: "100vh",
      background: "#f5f7fb",
      padding: "40px",
      display: "flex",
      justifyContent: "center",
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: "700px",
        background: "#fff",
        padding: "30px",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#333",
          marginBottom: "25px",
        }}
      >
        ✨ Task Manager
      </h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Add a task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            fontSize: "16px",
          }}
        />

        <button
          onClick={addTask}
          style={{
            padding: "12px 20px",
            border: "none",
            borderRadius: "10px",
            background: "#4f46e5",
            color: "white",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      {tasks.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>
          No tasks yet 🚀
        </p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "15px",
              marginBottom: "12px",
              background: "#fafafa",
              borderRadius: "12px",
              border: "1px solid #eee",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
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
                  color: task.completed
                    ? "#999"
                    : "#333",
                }}
              >
                {task.text}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                gap: "8px",
              }}
            >
              <button
                onClick={() =>
                  updateTask(task._id, task.text)
                }
                style={{
                  background: "#fbbf24",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteTask(task._id)
                }
                style={{
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);
}

export default App;