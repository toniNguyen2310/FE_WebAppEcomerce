import React, { useEffect, useState } from "react";
import { Checkbox } from "antd";
import {
  dataBrand,
  dataCategory,
  dataPrice,
} from "../AdminControl/ManagerProducts";
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
      </div>
    </>
  );
}

export default CategoryFilter;
