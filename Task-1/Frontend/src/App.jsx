import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./components/ProductCard";
import "./App.css";
const API_URL = "http://localhost:5000/api/products";
function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", description: "" });
  const [loading, setLoading] = useState(true);
  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  // Add a product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    await axios.post(API_URL, { ...form, price: Number(form.price) });
    setForm({ name: "", price: "", description: "" });
    fetchProducts();
  };

  // Delete a product
  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchProducts();
  };
  return (
    <div className="app">
      <h1>🛒 Product Manager</h1>

      {/* Add Product Form */}
      <form onSubmit={handleSubmit} className="form">
        <input
          placeholder="Product name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          placeholder="Description (optional)"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit">Add Product</button>
      </form>

      {/* Product List */}
      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products yet. Add one above!</p>
      ) : (
        <div className="grid">
          {products.map((p) => (
            <div key={p._id} className="card-wrapper">
              <ProductCard name={p.name} price={p.price} description={p.description} />
              <button className="delete-btn" onClick={() => handleDelete(p._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default App;