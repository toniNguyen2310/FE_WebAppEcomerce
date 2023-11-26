import { HomeOutlined, ShopOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DropdownComponent from "../Dropdown";
const { Header, Content, Footer, Sider } = Layout;
const items = [
  {
    label: <NavLink to={`/admin`}>DASHBOARD</NavLink>,
    key: "dashboard",
    icon: <ShopOutlined />,
  },
  {
    label: <NavLink to={`/admin/products`}>MANAGER PRODUCTS</NavLink>,
    key: "products",
    icon: <ShopOutlined />,
  },
];

//LAYOUT
const LayoutAdmin = () => {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClick = (e) => {
    // console.log("click ", e);
  };
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          onClick={onClick}
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            position: "sticky",
            zIndex: 1,
            width: "100%",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <span>
            <FaUserCircle />
            {isAuthenticated ? (
              <DropdownComponent />
            ) : (
              <>
                <NavLink
                  to={`/register`}
                  className="header__top__right-title-user"
                >
                  &nbsp; Đăng ký&nbsp;/&nbsp;
                </NavLink>
                <NavLink
                  to={`/login`}
                  className="header__top__right-title-user"
                >
                  Đăng nhập
                </NavLink>
              </>
            )}
          </span>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
            items={[
              {
                href: "",
                title: <HomeOutlined />,
              },
              {
                href: "",
                title: (
                  <>
                    <UserOutlined />
                    <span>Application List</span>
                  </>
                ),
              },
              {
                title: "Application",
              },
            ]}
          />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        theme="light"
      />
    </Layout>
  );
};
export default LayoutAdmin;
