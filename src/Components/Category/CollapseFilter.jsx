import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { dataCategory } from "../AdminControl/ManagerProducts";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Danh mục sản phẩm", "sub1", <MailOutlined />, [
    getItem("Lót chuột", "lot-chuot"),
    getItem("Bàn phím", "ban-phim-gaming"),
  ]),
];

function CollapseFilter(props) {
  const onClick = (e) => {
    console.log("click ", e.key);
  };
  return (
    <Menu
      onClick={onClick}
      style={{
        width: 250,
      }}
      // defaultSelectedKeys={["1"]}
      // defaultOpenKeys={["sub1"]}
      mode="inline"
      items={itemsCategory}
    />
  );
}

export default CollapseFilter;
