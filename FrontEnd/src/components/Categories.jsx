import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Categories = () => {
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

  return (
    <div className="mx-4">
      <h2>Categories</h2>
      <ul>
        {categories?.map((category) => (
          <li>
            <Link to={"/product?category=" + category.CategoryId}>
              {category.CategoryName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
