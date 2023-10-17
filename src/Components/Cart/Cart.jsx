import React, { useEffect, useState } from "react";
import "./cartPage.scss";
import ProductCart from "./ProductCart";
import { useSelector } from "react-redux";
import { useDebounce } from "../../utils/hook";
import Loading from "../Loading";

function Cart(props) {
  const [ischangeAddress, setIsChangeAddress] = useState(false);
  const listCart = useSelector((state) => state.cart.listCart);

  const isLoadingCart = useSelector((state) => state.cart.isLoadingCart);

  let [totalCost, setTotalCost] = useState(0);

  const changeAddress = (event) => {
    event.preventDefault();
    setIsChangeAddress(!ischangeAddress);
  };

  const totalCostCalculate = (array) => {
    return array.reduce(
      (total, item) =>
        parseInt(item.productId.priceAfter) * parseInt(item.quantity) + total,
      0
    );
  };

  const debouncelistCart = useDebounce(listCart, 300);

  //SAVE LIST DATA WHEN LISTCART CHANGE
  useEffect(() => {
    console.log("listcart>> ", listCart);
    console.log("TOTAL>> ");
    if (listCart.length === 0) {
      setTotalCost(0);
    } else {
      setTotalCost(totalCostCalculate(listCart));
    }
  }, [debouncelistCart]);

  return (
    <>
      {isLoadingCart ? (
        <div style={{ height: "500px" }}>
          <Loading />
        </div>
      ) : listCart?.length === 0 &&
        JSON.parse(localStorage.getItem("listCart"))?.length === 0 ? (
        <>
          <div>KO CO SAN PHAM TRONG GIO HANG</div>
        </>
      ) : (
        <div className="page-shopping-cart">
          <div className="cart">
            <nav className="cart-header">Trang chủ / Thông tin giỏ hàng</nav>
            <div className="cart-container">
              <div className="cart-container-title">
                <h2>Giỏ hàng của bạn</h2>
                <p>
                  Bạn đang có <b>{listCart?.length} sản phẩm</b> trong giỏ hàng
                </p>
              </div>
              <div className="cart-container-list">
                {listCart?.map((e) => {
                  return <ProductCart key={e._id} cart={e} />;
                })}
              </div>
            </div>
            <div className="cart-checkout">
              <div className="cart-checkout-address">
                <h2>Địa chỉ giam hàng</h2>
                <a href="" className="change-address" onClick={changeAddress}>
                  Thay đổi
                </a>
                <p>
                  Café Thư Viện Sách Đông Tây, N11A P. Trần Quý Kiên, Dịch Vọng,
                  Cầu Giấy, Hà Nội, Việt Nam, Phường Dịch Vọng Hậu, Quận Cầu
                  Giấy, Hà Nội
                </p>
              </div>

              <div className="cart-checkout-total-price">
                <div className="total-price-title">
                  <h2>HÌNH THỨC THANH TOÁN</h2>
                  <p># Thanh toán tiền mặt</p>
                  <p>Thanh toán chuyển khoản</p>
                </div>
                <div className="total-price-number">
                  <h2 className="text-price">Tổng tiền hàng </h2>
                  <p className="number-price">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(totalCost)}
                  </p>
                </div>
                <div className="total-price-button">
                  <a href="" className="btn-buy">
                    ĐẶT HÀNG
                  </a>
                </div>
              </div>
            </div>
            <div
              className="cart-address"
              style={
                ischangeAddress ? { display: "flex" } : { display: "none" }
              }
            >
              <div className="address">
                NHẬP ĐỊA CHỈ THÔNG TIN KHÁCH HÀNG Ở ĐÂY
                <a href="" onClick={changeAddress}>
                  hủy
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
