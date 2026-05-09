import exp from 'express'
import mongoose from 'mongoose';
import cors from 'cors';
import {config} from 'dotenv'
import {Product} from "./models/ProductModel.js"
config()
const app = exp();
app.use(cors());
app.use(exp.json());
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/t1db")
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// GET all products
app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// GET single product
app.get("/api/products/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json(product);
});

// POST create product
app.post("/api/products", async (req, res) => {
  const { name, price, description } = req.body;
  const product = new Product({ name, price, description });
  await product.save();
  res.status(201).json(product);
});

// PUT update product
app.put("/api/products/:id", async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json(product);
});

// DELETE product
app.delete("/api/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));