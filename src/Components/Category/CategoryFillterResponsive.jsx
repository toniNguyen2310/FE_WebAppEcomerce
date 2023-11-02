import { Checkbox, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dataCategory, dataPrice } from "../AdminControl/ManagerProducts";

import { FiFilter } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

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
    firstLoad,
    setFirstLoad,
    checkBrand,
    setCheckBrand,
    checkPrice,
    setCheckPrice,
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
    setCheckPrice("");
    setParams({ brand: "", price: "", sort: "" });
    navigate(`/category/${category}`);
  };

  //Filter Brand
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

  //Filter Option Price
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

  //FILTER MENU BRAND
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

  //FILTER PRICE SELECT
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

  //CANCEL FILTER
  const setCalcelFilter = () => {
    setFilterRes(false);
    // setParams({ brand: "", price: "", sort: "" });
  };
  useEffect(() => {
    if (filterRes) {
      document.body.style.overflowY = "hidden";
      document.getElementById("modal-filter-category").scrollTo(0, 0);
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [filterRes]);

  window.onclick = function (event) {
    if (event.target == document.getElementById("modal-filter-category")) {
      setFilterRes(false);
    }
  };

  return (
    <>
      <div
        style={filterRes ? { display: "block" } : { display: "none" }}
        className={`category-filter  filterResponsive `}
        id="modal-filter-category"
      >
        <div className="content-modal-filter" id="totopMenuFilter">
          <div className="filter-title">
            <p>
              <FiFilter />
              BỘ LỌC
            </p>
            <p>
              <AiOutlineClose
                className="close-menu-res"
                onClick={() => setFilterRes(false)}
              />
            </p>
          </div>
          <div className="category-filter-category category-filter-general">
            <Menu
              className="top-menu"
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
              className="center-menu"
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
              className="bottom-menu"
              style={{
                width: 250,
              }}
              defaultOpenKeys={["price"]}
              selectedKeys={[checkPrice]}
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
      </div>
    </>
  );
}

export default CategoryFillterResponsive;
