import { Checkbox, Menu } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dataCategory, dataPrice } from "../AdminControl/ManagerProducts";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
function CategoryFillterResponsive(props) {
  const {
    filterValue,
    listBrand,
    setCheckSort,
    setParams,
    params,
    filterRes,
    setFilterRes,
  } = props;

  const navigate = useNavigate();

  //FILTER MENU CATEGORY
  const itemsCategory = [
    getItem(
      "Danh mục sản phẩm",
      "category",
      null,
      dataCategory.slice(1).map((e) => {
        return getItem(e.label, e.value);
      })
    ),
  ];

  //Filter Category
  const onchangeCategory = (category) => {
    if (category === filterValue.category) {
      return;
    }
    setCheckBrand("");
    setCheckSort("");
    setCheckFilterPrice("");
    setParams({ brand: "", price: "", sort: "" });
    navigate(`/category/${category}`);
  };

  //Filter Brand
  const onChangeBrand = (e) => {
    let paramsBrand = `brand=${e.target.value}`;
    if (e.target.checked) {
      setParams({ ...params, brand: paramsBrand });
      setCheckBrand(e.target.value);
      return;
    }
    if (e.target.checked === false) {
      setCheckBrand("");
      setParams({ ...params, brand: "" });
      return;
    }
  };

  //Filter Option Price
  const onchangeFilterPrice = (e) => {
    // console.log("change price>>> ", e);
    let paramsPrice = `price=${e.target.value}`;
    if (e.target.checked) {
      setCheckFilterPrice(e.target.value);
      setParams({ ...params, price: paramsPrice });
    } else {
      setCheckFilterPrice("");
      setParams({ ...params, price: "" });
    }
  };

  //FILTER MENU BRAND
  const itemsBrand = [
    getItem(
      "Nhà cung cấp",
      "Brand",
      null,
      listBrand.map((e) => {
        return getItem(
          <Checkbox
            checked={e.value === filterValue.brand ? true : false}
            value={e.value}
            onChange={onChangeBrand}
          >
            {e.label}
          </Checkbox>,
          e.value
        );
      })
    ),
  ];

  //FILTER PRICE SELECT
  const itemsPrice = [
    getItem(
      "Khoảng giá",
      "price",
      null,
      dataPrice.map((e) => {
        return getItem(
          <Checkbox
            value={e.value}
            checked={filterValue.price === e.value ? true : false}
            onChange={onchangeFilterPrice}
          >
            {e.label}
          </Checkbox>,
          e.value
        );
      })
    ),
  ];

  //CANCEL FILTER
  const setCalcelFilter = () => {
    setFilterRes(false);
    setParams({ brand: "", price: "", sort: "" });
  };

  return (
    <>
      <div
        style={{ display: filterRes ? "block" : "none" }}
        className={`category-filter  filterResponsive `}
      >
        <div className="category-filter-category category-filter-general">
          <Menu
            onClick={(e) => onchangeCategory(e.key)}
            style={{
              width: 250,
            }}
            defaultOpenKeys={["category"]}
            selectedKeys={[filterValue?.category]}
            mode="inline"
            items={itemsCategory}
          />
        </div>
        <div className="category-filter-brand category-filter-general">
          <Menu
            style={{
              width: 250,
            }}
            defaultOpenKeys={["Brand"]}
            selectedKeys={[filterValue?.brand]}
            mode="inline"
            items={itemsBrand}
          />
        </div>
        <div className="category-filter-price category-filter-general">
          <Menu
            style={{
              width: 250,
            }}
            defaultOpenKeys={["price"]}
            selectedKeys={[filterValue?.price]}
            mode="inline"
            items={itemsPrice}
          />
        </div>
        <div className="filter-responsive-button">
          <button
            className="respon-filter-btn calcel"
            onClick={setCalcelFilter}
          >
            HỦY
          </button>
          <button
            className="respon-filter-btn apply"
            onClick={() => setFilterRes(false)}
          >
            ÁP DỤNG
          </button>
        </div>
      </div>
    </>
  );
}

export default CategoryFillterResponsive;