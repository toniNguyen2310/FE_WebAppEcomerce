import React from "react";
import { useNavigate } from "react-router-dom";
import "./SearchOrder.scss";
import OrderProduct from "./OrderProduct";
function SearchOrder(props) {
  const navigate = useNavigate();
  return (
    <div className="search-product">
      <div className="page-cover">
        <nav className="search-header">
          <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            TRANG CHỦ
          </span>
          &nbsp;/&nbsp; TRA CỨU ĐƠN HÀNG
        </nav>
        <div className="search-content">
          <div className="search-content-search">
            <p className="search-content-search-title">TRA CỨU ĐƠN HÀNG</p>
            <input
              type="text"
              placeholder="Tìm kiếm đơn hàng theo số điện thoại của bạn!!!"
            />
            <button className="search-content-search-button">
              Tìm đơn hàng
            </button>
          </div>
          <div className="search-list-order">
            <OrderProduct />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchOrder;
