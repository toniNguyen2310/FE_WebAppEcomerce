import React, { useState } from "react";
import "./Profile.scss";
import Information from "./Information";
import Order from "./Order";
import { BiSolidUserDetail, BiLogOut } from "react-icons/bi";
import { FaListAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProfilePage(props) {
  const [selected, setSelected] = useState(1);
  const navigate = useNavigate();

  const user = useSelector((state) => state.account.user);

  return (
    <div className="profile-page p-4  pt-5">
      <nav className="cart-header">
        <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          TRANG CHỦ
        </span>
        &nbsp;/&nbsp;{" "}
        {selected === 1 ? "THÔNG TIN CÁ NHÂN" : "DANH SÁCH ĐƠN HÀNG"}
      </nav>
      <div className="profile-cover-2">
        <div className="colum-info">
          <h2>
            <span>Tài khoản của</span> {user.username}
          </h2>
          <button
            className={`btn btn-white text-left ${
              selected == 1 ? "active" : ""
            }`}
            onClick={() => setSelected(1)}
          >
            <BiSolidUserDetail /> Thông tin cá nhân
          </button>
          <button
            className={`btn btn-white text-left ${
              selected == 2 ? "active" : ""
            }`}
            onClick={() => setSelected(2)}
          >
            <FaListAlt /> Danh sách đơn hàng
          </button>
          <button
            // disabled={isLoading}
            className="btn btn-white text-left"
            // onClick={() => handleLogOut()}
          >
            <BiLogOut /> Đăng Xuất
            <div
              className="spinner-border spinner-border-sm mx-2"
              role="status"
              // hidden={!isLoading}
            >
              {/* <span className="visually-hidden">Loading...</span> */}
            </div>
          </button>
        </div>
        <div className="colum-detail">
          {selected === 1 ? <Information /> : <></>}
          {selected === 2 ? <Order /> : <></>}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
