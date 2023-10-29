import React, { useEffect, useRef, useState } from "react";
import "./cartPage.scss";

import { useSelector } from "react-redux";
import { useDebounce } from "../../utils/hook";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";
import CartProduct from "./CartProduct";

function Cart(props) {
  const navigate = useNavigate();

  const [dataCart, setDataCart] = useState([]);
  const [ischangeAddress, setIsChangeAddress] = useState(false);
  const listCart = useSelector((state) => state.cart.listCart);

  const changeAddress = (event) => {
    event.preventDefault();
    setIsChangeAddress(!ischangeAddress);
  };
  useEffect(() => {
    setDataCart(listCart);
  }, [listCart]);

  return (
    <>
      <div className="page-shopping-cart">
        <div className="cart">
          <nav className="cart-header">
            <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
              TRANG CHỦ
            </span>
            &nbsp;/&nbsp; THÔNG TIN GIỎ HÀNG
          </nav>
          <CartProduct dataCart={dataCart} />
        </div>
      </div>
    </>
  );
}

export default Cart;
