import express from "express";
import {
  addProduct,
  addUser,
  // authenticateUser,
  deleteProduct,
  editProduct,
  getAllCategories,
  getAllProducts,
  getCategory,
  getProduct,
  getUser,
} from "./database.js";
import cors from "cors";

const app = express();

app.use(cors());

import bodyParser from "body-parser";

app.use(bodyParser.json());

// Sample data storage
const products = [];
const users = [];
let currentProductId = 1;

// Admin route
app.get("/Admin", async (req, res) => {
  // const { email, password } = req.query;
  // Example: Authenticate admin user
  // const user = await authenticateUser(email, password);
  // if (user) {
  //   res.send("Admin authenticated");
  // } else {
  //   res.status(401).send("Unauthorized");
  // }
});

// Users route - GET
app.get("/Users", async (req, res) => {
  const { email } = req.query;
  const user = await getUser(email);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send("User not found");
  }
});

// Users route - POST
app.post("/Users", async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const newUser = await addUser(email, password);
    res.status(201).send("User created");
  } else {
    res.status(400).send("Invalid user data");
  }
});

// Products route - GET
app.get("/Products", async (req, res) => {
  const products = await getAllProducts();
  res.send(products);
});

// Products route - POST
app.post("/Products", async (req, res) => {
  const { id, name, price, img } = req.body;
  if (name && price) {
    const newProduct = await addProduct(id, name, price, img);
    res.status(201).send(newProduct);
  } else {
    res.status(400).send("Invalid product data");
  }
});

// Products route - GET by ID
app.get("/Products/:id", async (req, res) => {
  const product = await getProduct(req.params.id);
  console.log(product);
  const category = await getCategory(product.CategoryID);
  res.send({ ...product, ...category });
  // if (product) {
  // } else {
  // res.status(404).send("Product not found");
  // }
});

// Products route - PUT by ID
app.put("/Products/:id", async (req, res) => {
  const prevId = req.params.id;
  const { id, name, price, img } = req.body;
  const product = await getProduct(id);
  if (product) {
    const updatedProduct = await editProduct(prevId, id, name, price, img);
    res.send(updatedProduct);
  } else {
    res.status(404).send("Product not found");
  }
});

// Products route - DELETE by ID
app.delete("/Products/:id", async (req, res) => {
  const response = await deleteProduct(req.params.id);
  if (response === 1) {
    res.send("Product deleted");
  } else {
    res.status(404).send("Product not found");
  }
});

// Categories route - GET
app.get("/categories", async (req, res) => {
  const categories = await getAllCategories();
  res.send(categories);
});

// Categories route - GET by ID
app.get("/categories/:id", async (req, res) => {
  const category = await getCategory(req.params.id);
  if (category) {
    res.json(category);
  } else {
    res.status(404).send("Category not found");
  }
});

// Middleware to log requests
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("something broke!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
