import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const catId = 0;
    axios
      .get(`http://localhost:5000/Products/${id}`)
      .then((res) => {
        const {
          ProductId: id,
          ProductName: name,
          MRP: price,
          img,
          Brand,
          CategoryID,
          CategoryName,
          ctgryDescription,
        } = res.data;
        setProduct({
          id,
          name,
          price,
          img,
          Brand,
          CategoryID,
          CategoryName,
          ctgryDescription,
        });
      })
      .catch((err) => console.log(err));
    const fetchCategory = async () => {
      const respone = await axios.get(
        `http://localhost:5000/categories/${catId}`
      );
      setCategory(respone.data);
    };
    // axios
    //   .get(`http://localhost:5000/categories/${product?.CategoryID || 1}`)
    //   .then((res) => {
    //     setCategory(res.data);
    //   })
    //   .catch((err) => console.log(err));

    const fetchProduct = async () => {
      const data = await fetch(`http://localhost:5000/Products/${id}`);
      const {
        ProductId: id,
        ProductName: name,
        MRP: price,
        Brand,
        CategoryID,
      } = await data.json();
      catId = CategoryID;
      setProduct({ id, name, price, Brand, CategoryID });
    };
    // fetchProduct();
    // fetchCategory();
  }, [id]);

  return (
    <>
      <div className="container mt-5" style={{ width: "300px" }}>
        {product ? (
          <div
            className="card border-primary"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div>
              <img
                src={product.img}
                className="card-img-top"
                alt={product.name}
                style={{
                  maxHeight: "300px",
                  maxWidth: "300px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">Price: ${product.price}</p>
              <p className="card-text">
                Description: {product.ctgryDescription}
              </p>
              <p className="card-text">Category: {product.CategoryName}</p>
              <p className="card-text">Manufacturer: {product.Brand}</p>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
