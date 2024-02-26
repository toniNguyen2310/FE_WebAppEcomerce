import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartProduct from "./CartProduct";
import "./cartPage.scss";

function Cart(props) {
  const navigate = useNavigate();
  const [dataCart, setDataCart] = useState([]);
  const listCart = useSelector((state) => state.cart.listCart);

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
