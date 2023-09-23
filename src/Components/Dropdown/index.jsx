import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Divider, Button, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doLogoutAction } from "../../redux/account/accountSlice";
import { toast } from "react-toastify";
import { callLogout } from "../../services.js/api";
import { NavLink } from "react-router-dom";
const { useToken } = theme;
const items = [
  {
    key: "1",
    label: <NavLink to={`/`}>Trang chủ</NavLink>,
  },
  {
    key: "2",
    label: <a target="_blank">Thông tin tài khoản</a>,
  },
  {
    key: "3",
    label: <a target="_blank">Danh sách đơn hàng</a>,
    disabled: true,
  },
];
const DropdownComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.account.user);
  const nameAccount = user?.username;

  //BUG đăng xuất với ADMIN => khi đăng xuất chuyển về trang Login chứ ko phải trang hompage

  //HANDLE LOGOUT
  const handleLogout = async () => {
    const res = await callLogout();
    if (res && res.data) {
      console.log("res logout>>> ", res);
      dispatch(doLogoutAction());
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
            <Button type="primary" onClick={() => handleLogout()}>
              Đăng Xuất
            </Button>
          </Space>
        </div>
      )}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Hi, {nameAccount}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};
export default DropdownComponent;
