import React from "react";
import CategoryFilter from "./CategoryFilter";
import "./category.scss";
import CategoryProduct from "./CategoryProduct";
function Category(props) {
  return (
    <div className="page-category">
      <div className="category">
        <nav className="category-header">Trang chủ / Danh mục / Lót chuột</nav>
        <div className="category-container">
          <CategoryFilter />
          <CategoryProduct />
        </div>
      </div>
    </div>
  );
}

export default Category;
