import { message } from "antd";
import React from "react";
import {
  BiHomeHeart,
  BiListUl,
  BiPhoneCall,
  BiSearchAlt,
} from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function MenuResponsive(props) {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  //NAVIGATE BUTTON AVATAR
  const navigateAuthentica = () => {
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="menu-responsive-sticky">
      <div className="menu-responsive-box" onClick={() => navigate("/")}>
        <BiHomeHeart />
        Trang chủ
      </div>
      <div
        className="menu-responsive-box"
        onClick={() => navigate("/category/lot-chuot")}
      >
        <BiListUl />
        Danh mục
      </div>
      {isAuthenticated ? (
        <div
          className="menu-responsive-box"
          onClick={() => message.info("TÍnh năng sẽ ra mắt trong tuần tới!!!")}
        >
          <BiPhoneCall />
          Hotline
        </div>
      ) : (
        <div
          className="menu-responsive-box"
          onClick={() => navigate("/search-order")}
        >
          <BiSearchAlt />
          Đơn hàng
        </div>
      )}

      <div className="menu-responsive-box" onClick={navigateAuthentica}>
        <RxAvatar />
        Tài khoản
      </div>
    </div>
  );
}

export default MenuResponsive;
