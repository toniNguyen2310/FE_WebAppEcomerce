import React, { useEffect, useState } from "react";
import { Checkbox } from "antd";
import { dataBrand, dataCategory } from "../AdminControl/ManagerProducts";
import { useNavigate } from "react-router-dom";
import { getListBrandByCategory } from "../../services.js/api";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

import SubMenu from "antd/es/menu/SubMenu";

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
    listData,
    currentPage,
    listBrand,
    setCheckSort,
    setParams,
    params,
  } = props;
  const [checkBrand, setCheckBrand] = useState("");
  const [checkFilterPrice, setCheckFilterPrice] = useState("");
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

  //FILTER MENU BRAND
  const itemsBrand = [];

  //Filter Category
  const onchangeCategory = (category) => {
    if (category === filterValue.category) {
      return;
    }
    console.log("TESTDAY", category, filterValue.category);
    setCheckBrand("");
    setCheckSort("");
    setCheckFilterPrice("");
    setParams({ brand: "", price: "", sort: "" });
    navigate(`/category/${category}`);
    // renderListBrand(category);
  };

  //Filter Brand
  const onChangeBrand = (e) => {
    let paramsBrand = `brand=${e.target.value}`;
    console.log(`checked `, e);
    if (e.target.checked) {
      setParams({ ...params, brand: paramsBrand });
      console.log("chon");
      setCheckBrand(e.target.value);
      // navigate(`?${paramsBrand}`);
      return;
    }
    if (e.target.checked === false) {
      console.log("ko chon");
      setCheckBrand("");
      setParams({ ...params, brand: "" });
      // navigate(``);
      return;
    }
  };

  //Filter Option Price
  const onchangeFilterPrice = (e) => {
    console.log("change price>>> ", e);
    let paramsPrice = `price=${e.target.value}`;
    if (e.target.checked) {
      setCheckFilterPrice(e.target.value);
      setParams({ ...params, price: paramsPrice });
    } else {
      setCheckFilterPrice("");
      setParams({ ...params, price: "" });
    }
  };

  return (
    <>
      <div className="category-filter">
        <div className="category-filter-category category-filter-general">
          <Menu
            onClick={(e) => onchangeCategory(e.key)}
            style={{
              width: 250,
            }}
            // defaultSelectedKeys={[filterValue?.category]}
            defaultOpenKeys={["category"]}
            selectedKeys={[filterValue?.category]}
            mode="inline"
            items={itemsCategory}
          />
        </div>
        <div className="category-filter-brand category-filter-general">
          <Menu
            mode="inline"
            defaultOpenKeys={["brand"]}
            selectedKeys={[filterValue?.brand]}
          >
            <SubMenu
              key="brand"
              title={
                <span>
                  <span className="title">Nhà cung cấp</span>
                </span>
              }
            >
              {listBrand?.map((e) => {
                return (
                  <Menu.Item key={e.value}>
                    <Checkbox
                      checked={e.value === filterValue.brand ? true : false}
                      value={e.value}
                      onChange={onChangeBrand}
                    >
                      {e.label}
                    </Checkbox>
                  </Menu.Item>
                );
              })}
            </SubMenu>
          </Menu>
        </div>
        <div className="category-filter-price category-filter-general">
          <Menu
            mode="inline"
            defaultOpenKeys={["price"]}
            selectedKeys={[filterValue?.price]}
          >
            <SubMenu
              key="price"
              title={
                <span>
                  <span className="title">Khoảng giá</span>
                </span>
              }
            >
              <Menu.Item key={"op01"}>
                <Checkbox
                  checked={filterValue.price === "op01" ? true : false}
                  // checked={checkFilterPrice === "op01" ? true : false}
                  value={"op01"}
                  onChange={onchangeFilterPrice}
                >
                  Dưới 100 ngàn
                </Checkbox>
              </Menu.Item>
              <Menu.Item key={"op12"}>
                <Checkbox
                  value={"op12"}
                  checked={filterValue.price === "op12" ? true : false}
                  // checked={checkFilterPrice === "op12" ? true : false}
                  onChange={onchangeFilterPrice}
                >
                  100 - 200 ngàn
                </Checkbox>
              </Menu.Item>
              <Menu.Item key={"op25"}>
                <Checkbox
                  value={"op25"}
                  checked={filterValue.price === "op25" ? true : false}
                  onChange={onchangeFilterPrice}
                >
                  200 - 500 ngàn
                </Checkbox>
              </Menu.Item>
              <Menu.Item key={"op50"}>
                <Checkbox
                  value={"op50"}
                  checked={filterValue.price === "op50" ? true : false}
                  onChange={onchangeFilterPrice}
                >
                  Trên 500 ngàn
                </Checkbox>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </div>
      </div>

      {/* <>
        <div className="category-filter">
          <div className="category-filter-box">
            <h3>DANH MỤC SẢN PHẨM</h3>

            <div className="filter checkbox">
              {dataCategory?.slice(1).map((e) => {
                return (
                  <div
                    key={e.value}
                    className={`box-category ${
                      filterValue?.category === e.value ? "active" : null
                    }`}
                    onClick={() => onchangeCategory(e.value)}
                  >
                    <span>{e.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="category-filter-box">
            <h3>HÃNG SẢN XUẤT</h3>
            <div className="filter checkbox">
              {listBrand?.map((e) => {
                return (
                  <Checkbox
                    checked={e.value === filterValue.brand ? true : false}
                    value={e.value}
                    onChange={onChangeBrand}
                    key={e.label}
                  >
                    {e.label}
                  </Checkbox>
                );
              })}
            </div>
          </div>
          <div className="category-filter-box">
            <h3>KHOẢNG GIÁ</h3>
            <div className="filter checkbox">
              <Checkbox
                checked={filterValue.price === "op01" ? true : false}
                // checked={checkFilterPrice === "op01" ? true : false}
                value={"op01"}
                onChange={onchangeFilterPrice}
              >
                Dưới 100 ngàn
              </Checkbox>
              <Checkbox
                value={"op12"}
                checked={filterValue.price === "op12" ? true : false}
                // checked={checkFilterPrice === "op12" ? true : false}
                onChange={onchangeFilterPrice}
              >
                100 ngàn - 200 ngàn
              </Checkbox>
              <Checkbox
                value={"op25"}
                checked={filterValue.price === "op25" ? true : false}
                onChange={onchangeFilterPrice}
              >
                200 ngàn - 500 ngàn
              </Checkbox>
              <Checkbox
                value={"op50"}
                checked={filterValue.price === "op50" ? true : false}
                onChange={onchangeFilterPrice}
              >
                Trên 500 ngàn
              </Checkbox>
            </div>
          </div>
        </div>
      </> */}
    </>
  );
}

export default CategoryFilter;
