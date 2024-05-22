import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { register, handleSubmit } = useForm();

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

  const navigate = useNavigate();

  const onSubmit = (data) => {
    axios.post("http://localhost:5000/products", data).then(() => {
      console.log(data);
      alert("added");
      navigate("/adminProduct");
    });
  };

  return (
    <form className="product-form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="id">id: </label>
      <input
        id="id"
        name="id"
        {...register("id", { required: true, maxLength: 10 })}
      />
      <br />

      <label htmlFor="name">name: </label>
      <input
        id="name"
        name="name"
        {...register("name", { required: true, maxLength: 20 })}
      />
      <br />

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

      <label htmlFor="price">price: </label>
      <input
        id="price"
        name="price"
        {...register("price", { required: true })}
      />
      <br />

      <label htmlFor="img">Image:</label>
      <input
        id="img"
        name="img"
        type="text"
        {...register("img", { required: true })}
      />

      <input type="submit" />
    </form>
  );
};

export default AddProduct;
