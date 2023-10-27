import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Divider, Button, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  doLogoutAction,
  doGetAccountPending,
} from "../../redux/account/accountSlice";
import { toast } from "react-toastify";
import { callLogout } from "../../services.js/api";
import { NavLink } from "react-router-dom";
import { doLogoutCart } from "../../redux/cart/cartSlice";
const { useToken } = theme;

const DropdownComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.account.isLoading);
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
    dispatch(doGetAccountPending());
    console.log("Loading>>> ", isLoading);
    if (res && res.data) {
      console.log("res logout>>> ", res);
      dispatch(doLogoutAction());
      dispatch(doLogoutCart());
      toast.success("Đăng Xuất thành công");
      navigate("/");
    }
  };

  //ant design
  const { token } = useToken();
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
    marginLeft: "-25px",
    marginTop: "8px",
  };
  const menuStyle = {
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
            <Button
              type="primary"
              style={{ background: "#29a07e", borderColor: "#29a07e" }}
              onClick={() => handleLogout()}
            >
              Đăng Xuất
            </Button>
          </Space>
        </div>
      )}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Xin chào, {nameAccount}
          {/* <DownOutlined /> */}
        </Space>
      </a>
    </Dropdown>
  );
};
export default DropdownComponent;
