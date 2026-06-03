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
      background: "linear-gradient(135deg,#eef2ff,#f8fafc)",
      padding: "40px",
      boxSizing: "border-box",
    }}
  >
    <div
      style={{
        width: "100%",
        minHeight: "calc(100vh - 80px)",
        background: "#fff",
        borderRadius: "24px",
        padding: "40px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "48px",
          marginBottom: "30px",
          color: "#1e293b",
        }}
      >
        🗒️ ToDo List
      </h1>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          placeholder="Enter a new task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            flex: 1,
            padding: "16px",
            borderRadius: "12px",
            border: "1px solid #d1d5db",
            fontSize: "18px",
            outline: "none",
          }}
        />

        <button
          onClick={addTask}
          style={{
            padding: "16px 24px",
            border: "none",
            borderRadius: "12px",
            background: "#4f46e5",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Add Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            marginTop: "100px",
            color: "#94a3b8",
            fontSize: "22px",
          }}
        >
          No tasks yet 
        </div>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#f8fafc",
              padding: "18px",
              marginBottom: "15px",
              borderRadius: "14px",
              border: "1px solid #e2e8f0",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompleted(task)}
                style={{
                  width: "18px",
                  height: "18px",
                }}
              />

              <span
                style={{
                  fontSize: "18px",
                  color: "#334155",
                  textDecoration: task.completed
                    ? "line-through"
                    : "none",
                  opacity: task.completed ? 0.6 : 1,
                }}
              >
                {task.text}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                onClick={() =>
                  updateTask(task._id, task.text)
                }
                style={{
                  background: "#fbbf24",
                  color: "#000",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "600",
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
                  padding: "10px 16px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "600",
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