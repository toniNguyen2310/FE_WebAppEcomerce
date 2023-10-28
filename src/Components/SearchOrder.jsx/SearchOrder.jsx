import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchOrder.scss";
import OrderProduct from "./OrderProduct";

import { getListOrderByPhone } from "../../services.js/api";
import { message } from "antd";

function SearchOrder(props) {
  const navigate = useNavigate();
  const refInput = useRef(null);
  const [number, setNumber] = useState("");
  const [listData, setListData] = useState([]);

  //
  const handleKeyPress = (e) => {
    let key = e.keyCode || e.which;
    if (key === 13) {
      searchButton(e);
    }
  };

  //REGEX PHONE
  const validatePhone = (value) => {
    const regexPhone = /[0-9]{10}\b/g;
    let isValid = regexPhone.test(value);
    return isValid;
  };

  const searchButton = async () => {
    if (!number) {
      message.info("SĐT Không được để trống");
      return;
    }
    if (!validatePhone(number)) {
      message.error("SĐT Không được để trống");
      return;
    }
    const res = await getListOrderByPhone(number.trim());
    if (res && res.data) {
      if (res?.data.length > 0) {
        message.success("Đã tìm thấy đơn hàng");
      }
      console.log("DATA>> ", res);
      setListData(res.data);
    }
  };

  useEffect(() => {
    refInput.current.focus();
    console.log("number>>> "), number;
  }, []);

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
              type="number"
              placeholder="Tìm kiếm đơn hàng theo số điện thoại của bạn!!!"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              onKeyUp={(e) => handleKeyPress(e)}
              ref={refInput}
            />
            <button
              className="search-content-search-button"
              onClick={searchButton}
            >
              Tìm đơn hàng
            </button>
          </div>
          <div className="search-list-order">
            {number ? (
              listData.length === 0 ? (
                <p>Không tìm thấy đơn hàng</p>
              ) : (
                <>
                  {listData.map((e) => {
                    return <OrderProduct key={e._id} item={e} />;
                  })}
                </>
              )
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchOrder;
