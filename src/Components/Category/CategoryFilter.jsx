import React from "react";
import { Checkbox } from "antd";
function CategoryFilter(props) {
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <div className="category-filter">
      <div className="category-filter-box">
        <h3>DANH MỤC SẢN PHẨM</h3>
        <div className="filter checkbox">
          <Checkbox onChange={onChange}>Checkbox</Checkbox>
          <Checkbox onChange={onChange}>Checkbox</Checkbox>
          <Checkbox onChange={onChange}>Checkbox</Checkbox>
        </div>
      </div>
      <div className="category-filter-box">
        <h3>HÃNG SẢN XUẤT</h3>
        <div className="filter checkbox">
          <Checkbox onChange={onChange}>Checkbox</Checkbox>
          <Checkbox onChange={onChange}>Checkbox</Checkbox>
          <Checkbox onChange={onChange}>Checkbox</Checkbox>
        </div>
      </div>
      <div className="category-filter-box">
        <h3>KHOẢNG GIÁ</h3>
        <div className="filter checkbox">
          <Checkbox onChange={onChange}>Dưới 100 ngàn</Checkbox>
          <Checkbox onChange={onChange}>100 ngàn - 200 ngàn</Checkbox>
          <Checkbox onChange={onChange}>200 ngàn - 500 ngàn</Checkbox>
        </div>
      </div>
    </div>
  );
}

export default CategoryFilter;
