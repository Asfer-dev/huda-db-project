import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const FilteredProducts = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => {
        const productData = res.data;
        const newData = productData.map((product) => {
          const {
            ProductId: id,
            ProductName: name,
            MRP: price,
            img,
            CategoryID,
          } = product;
          return { id, name, price, img, CategoryID };
        });
        setProducts(newData);
        setProducts((prev) => {
          return prev.filter((product) => {
            return product.CategoryID == categoryId;
          });
        });
      })
      .catch((err) => console.log(err));
  }, [categoryId]);

  const handleCart = (prodId) => {};

  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        User Dashboard
      </h1>
      <div
        style={{
          display: "flex",
          justifySelf: "flex-start",
          paddingTop: "20px",
          paddingLeft: "70px",
        }}
      >
        {/* <span style={{ marginRight: "10px" }}>Search: </span>
        <input
          type="text"
          placeholder="search......."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        /> */}
      </div>

      <br />
      <br />
      <div className="products-container">
        {products?.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.img}
              alt={product.name}
              className="product-image"
            />
            <div className="product-details">
              <div>ID: {product.id}</div>
              <div>NAME: {product.name}</div>
              <div>PRICE: {product.price}</div>
            </div>
            <div className="product-actions">
              <button>
                <Link
                  to={`/productDetails/${product.id}`}
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  View Details
                </Link>
              </button>
              <button
                onClick={() => handleCart(product.id)}
                style={{ backgroundColor: "orange" }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FilteredProducts;
