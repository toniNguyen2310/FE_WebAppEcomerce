import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Divider, Button, theme, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  doLogoutAction,
  doGetAccountPending,
} from "../../redux/account/accountSlice";

import { callLogout } from "../../services.js/api";
import { NavLink } from "react-router-dom";
import { doLogoutCart } from "../../redux/cart/cartSlice";
import LoadingButton from "../Export/ExportVarible";

const { useToken } = theme;

const DropdownComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.account.user);
  const isAdmin = useSelector((state) => state.account.user.isAdmin);

  const nameAccount = user?.username;

  const items = [
    {
      key: "1",
      label: <NavLink to={`/`}>Trang chủ</NavLink>,
    },
    {
      key: "2",
      label: <NavLink to={`/profile`}>Tài khoản</NavLink>,
    },
    isAdmin
      ? {
          key: "3",
          label: <NavLink to={`/admin`}>Quản trị</NavLink>,
        }
      : null,
  ];
  //BUG đăng xuất với ADMIN => khi đăng xuất chuyển về trang Login chứ ko phải trang hompage

  //HANDLE LOGOUT
  const handleLogout = async () => {
    const res = await callLogout();
    setIsLoading(true);
    if (res && res.data) {
      setIsLoading(false);
      // console.log("res logout>>> ", res);
      dispatch(doLogoutAction());
      dispatch(doLogoutCart());
      message.success("Đăng Xuất thành công");
      navigate("/");
      return;
    }
  };

  //ant design
  const { token } = useToken();
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
    // marginLeft: "-20px",
    marginTop: "8px",
  };
  const menuStyle = {
    textAlign: "center",
    boxShadow: "none",
  };
  return (
    <Dropdown
      menu={{
        items,
      }}
      dropdownRender={(menu) => (
        <div style={contentStyle}>
          {React.cloneElement(menu, {
            style: menuStyle,
          })}
          <Divider
            style={{
              margin: 0,
            }}
          />
          <Space
            style={{
              padding: 8,
            }}
          >
            <button className="button-dropdown" onClick={() => handleLogout()}>
              Đăng xuất
            </button>
          </Space>
        </div>
      )}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>Xin chào, {nameAccount}</Space>
      </a>
    </Dropdown>
  );
};
export default DropdownComponent;
