import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: "127.0.0.1",
    user: "root",
    password: "admin",
    database: "ecommerce_sys",
  })
  .promise();

export const getAllProducts = async () => {
  const result = await pool.query("select * from product");
  return result[0];
};

export const getProduct = async (prodId) => {
  const result = await pool.query(
    "select * from product where ProductId=" + prodId
  );
  return result[0][0];
};

export const getAllCategories = async () => {
  const result = await pool.query("select * from category");
  return result[0];
};

export const getCategory = async (catId) => {
  const result = await pool.query(
    "select * from category where CategoryId=" + catId
  );
  return result[0][0];
};

export const addProduct = async (id, name, price, img) => {
  // const id = Math.floor(10000 + Math.random() * 90000);
  const result = await pool.query(
    "INSERT INTO product (ProductId, ProductName, MRP, img) VALUES ('" +
      id +
      "', '" +
      name +
      "', '" +
      price +
      "', '" +
      img +
      "')"
  );
  console.log(result);
  return getProduct(id);
};

export const editProduct = async (prevId, id, name, price, img) => {
  // const id = Math.floor(10000 + Math.random() * 90000);
  const result = await pool.query(
    "UPDATE product SET ProductId='" +
      id +
      "', ProductName='" +
      name +
      "', MRP='" +
      price +
      "', img='" +
      img +
      "' WHERE ProductId=" +
      prevId
  );
  console.log(result);
  return getProduct(id);
};

export const deleteProduct = async (id) => {
  const result = await pool.query("DELETE FROM product WHERE ProductId=" + id);
  return result[0].affectedRows;
};

export const addUser = async (email, password) => {
  const result = await pool.query(
    "INSERT INTO user (email, password) VALUES ('" +
      email +
      "', '" +
      password +
      "')"
  );
  console.log(result);
  return getUser(email);
};

export const getUser = async (email) => {
  const result = await pool.query(
    "select * from user WHERE email='" + email + "'"
  );
  const user = result[0][0];
  return user;
};

export const addAdmin = async (email, password) => {
  const result = await pool.query(
    "INSERT INTO admin (email, password) VALUES ('" +
      email +
      "', '" +
      password +
      "')"
  );
  console.log(result);
  return getAdmin(email);
};

export const getAdmin = async (email) => {
  const result = await pool.query(
    "select * from admin WHERE email='" + email + "'"
  );
  const admin = result[0][0];
  return admin;
};

export const getCart = async (userId) => {
  const result = await pool.query(
    "select * from cart WHERE userId='" + userId + "'"
  );
  return result[0][0];
};
export const getCartItem = async (userId, prodId) => {
  const result = await pool.query(
    "select * from cart WHERE userId='" +
      userId +
      "' and Product_ProductId='" +
      prodId +
      "'"
  );
  return result[0][0];
};

export const addToCart = async (userId, prodId) => {
  const result = await pool.query(
    "INSERT INTO cart (userId, Product_ProductId, quantity) VALUES ('" +
      userId +
      "', '" +
      prodId +
      "', 1)"
  );
  return getCartItem(userId, prodId);
};

export const updateCart = async (userId, prodId) => {
  const result = await pool.query(
    "UPDATE FROM cart SET quantity = quantity + 1 WHERE userId='" +
      userId +
      "' + Product_ProductId='" +
      prodId +
      "'"
  );
  return getCartItem(userId, prodId);
};
