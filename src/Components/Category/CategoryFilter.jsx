import { Checkbox, Menu } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import {dataCategory,dataPrice } from "../../utils/constant";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

function CategoryFilter(props) {
  const {
    filterValue,
    listBrand,
    setCheckSort,
    setParams,
    params,
    setFirstLoad,
    checkBrand,
    setCheckBrand,
    checkPrice,
    setCheckPrice,
    setCurrentPage,
  } = props;

  const navigate = useNavigate();

  //Menu filter product by category
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

  ////Handle filter product by category
  const onchangeCategory = (category) => {
    if (category === filterValue.category) {
      return;
    }
    setCheckBrand("");
    setCheckPrice("");
    setCheckSort("");
    setCurrentPage(1);
    setParams({ brand: "", price: "", sort: "" });
    navigate(`/category/${category}`);
  };

  //Handle filter product by brand
  const onChangeBrand = (e) => {
    setFirstLoad(false);
    setCheckBrand(e.target.value);
    let paramsBrand = `brand=${e.target.value}`;

    if (e.target.checked) {
      setParams({ ...params, brand: paramsBrand });
      return;
    }
    if (e.target.checked === false) {
      setCheckBrand("");
      setParams({ ...params, brand: "" });
      return;
    }
  };

  //Handle filter product by price
  const onchangeFilterPrice = (e) => {
    setFirstLoad(false);
    setCheckPrice(e.target.value);
    let paramsPrice = `price=${e.target.value}`;

    if (e.target.checked) {
      setParams({ ...params, price: paramsPrice });
    } else {
      setCheckPrice("");
      setParams({ ...params, price: "" });
    }
  };

  //Menu filter product by brand
  const itemsBrand = [
    getItem(
      "Nhà cung cấp",
      "Brand",
      null,
      listBrand.map((e) => {
        return getItem(
          <Checkbox
            checked={e.value === checkBrand ? true : false}
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

  //Menu filter product by price
  const itemsPrice = [
    getItem(
      "Khoảng giá",
      "price",
      null,
      dataPrice.map((e) => {
        return getItem(
          <Checkbox
            checked={e.value === checkPrice ? true : false}
            value={e.value}
            onChange={onchangeFilterPrice}
          >
            {e.label}
          </Checkbox>,
          e.value
        );
      })
    ),
  ];

  return (
    <>
      <div className="category-filter">
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
            selectedKeys={[checkBrand]}
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
            selectedKeys={[checkPrice]}
            mode="inline"
            items={itemsPrice}
          />
        </div>
      </div>
    </>
  );
}

export default CategoryFilter;
