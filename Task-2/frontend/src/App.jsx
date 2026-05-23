import { useState, useEffect } from 'react';
const API = 'http://localhost:5000/api';
export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  // Fetch all tasks on load
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch(`${API}/tasks`);
    const data = await res.json();
    setTasks(data);
  };
  const addTask = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const res = await fetch(`${API}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: input })
    });
    const newTask = await res.json();
    setTasks([newTask, ...tasks]);
    setInput('');
    setLoading(false);
  };
  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>📝 To-Do List</h1>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          placeholder="Enter a task..."
          style={{ flex: 1, padding: '8px', fontSize: '16px' }}
        />
        <button onClick={addTask} disabled={loading} style={{ padding: '8px 16px' }}>
          {loading ? '...' : 'Add Task'}
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li key={task._id} style={{
            padding: '10px',
            marginBottom: '8px',
            background: '#f0f0f0',
            borderRadius: '6px'
          }}>
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}