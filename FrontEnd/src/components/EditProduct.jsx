import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./EditProduct.css";

const EditProduct = () => {
  const { id } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((res) => {
        const categoriesData = res.data;

        setCategories(categoriesData);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
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
        } = res.data;
        console.log(CategoryID);
        setProduct({ id, name, price, img, Brand, CategoryID });
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (product) {
      setValue("id", product.id);
      setValue("name", product.name);
      setValue("price", product.price);
      setValue("img", product.img);
    }
  }, [product, setValue]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:5000/Products/${id}`, data);
      alert("Product updated successfully");
      navigate("/adminProduct");
    } catch (error) {
      console.log("Error updating product:", error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Product</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="edit-product-form product-form"
      >
        <label htmlFor="id">ID:</label>
        <input
          id="id"
          name="id"
          type="text"
          {...register("id", { required: true, maxLength: 10 })}
        />
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          {...register("name", { required: true, maxLength: 20 })}
        />
        <label htmlFor="category">category: </label>

        <select
          id="category"
          name="category"
          {...register("category", { required: true, maxLength: 20 })}
        >
          {categories?.map((category) => (
            <option value={category.CategoryId}>{category.CategoryName}</option>
          ))}
        </select>
        <br />

        <label htmlFor="price">Price:</label>
        <input
          id="price"
          name="price"
          type="text"
          {...register("price", { required: true })}
        />
        <label htmlFor="img">Image:</label>
        <input
          id="img"
          name="img"
          type="text"
          {...register("img", { required: true })}
        />

        <input type="submit" value="Update" />
      </form>
    </div>
  );
};

export default EditProduct;
