import React, { useEffect, useState } from "react";
import "./Profile.scss";
import Information from "./Information";
import Order from "./Order";
import { BiSolidUserDetail, BiLogOut } from "react-icons/bi";
import { AiFillSetting } from "react-icons/ai";
import { FaListAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { doLogoutAction } from "../../redux/account/accountSlice";
import { doLogoutCart } from "../../redux/cart/cartSlice";
import { callLogout } from "../../services.js/api";
import LoadingButton from "../Export/ExportVarible";
import SkeletonText from "../Skeleton/SkeletonText";

function ProfilePage(props) {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(1);
  const isAdmin = useSelector((state) => state.account.user.isAdmin);
  const [admin, setAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.account.user);

  const handleLogout = async () => {
    setIsLoading(true);
    setSelected(4);
    const res = await callLogout();
    if (res && res.data) {
      setIsLoading(false);
      dispatch(doLogoutAction());
      dispatch(doLogoutCart());
      message.success("Đăng Xuất thành công");
      navigate("/");
      return;
    } else {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (isAdmin) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [isAdmin]);
  return (
    <div className="profile-page p-4  pt-5">
      <nav className="cart-header">
        <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          TRANG CHỦ
        </span>
        &nbsp;/&nbsp;
        {selected === 1 ? "THÔNG TIN CÁ NHÂN" : "DANH SÁCH ĐƠN HÀNG"}
      </nav>
      <div className="profile-cover-2">
        <div className="colum-info">
          <h2>
            {user.username ? (
              <>
                <span>Tài khoản của</span> {user.username}{" "}
              </>
            ) : (
              <>
                <span>Tài khoản của</span> &nbsp;
                <SkeletonText width={"80px"} height={"18px"} />
              </>
            )}
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
          {admin && (
            <button
              className={`btn btn-white text-left ${
                selected == 3 ? "active" : ""
              }`}
              onClick={() => navigate("/admin")}
            >
              <AiFillSetting /> Quyền Admin
            </button>
          )}

          <button
            className={`btn btn-white text-left ${
              selected == 4 ? "active" : ""
            }`}
            onClick={() => handleLogout()}
          >
            <BiLogOut /> Đăng xuất
            {isLoading && (
              <LoadingButton
                color={"rgb(196, 194, 194)"}
                secondaryColor={"#ffffff"}
              />
            )}
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
