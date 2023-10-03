import React from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
function ProductCart(props) {
  return (
    <div className="cart-detail">
      <img src="https://lacdau.com/media/product/250-1389-cee443f13b710b757de6b494265fc813.jpg" />
      <p className="cart-detail-name">BỘ KEYCAP AKKO 9009 PBT SUBLIMATION</p>
      {/* Trường hợp có giảm giá */}
      <div className="cart-detail-price">
        <p className="price-after">
          380.000<u>đ</u>
        </p>
        <p className="price-defaul">
          450.000<u>đ</u>
        </p>
      </div>

      {/* Trưởng hợp không có giảm giá (discount) */}
      {/* <div className="cart-detail-price">
        <p className="price-after">
          380.000 <u>đ</u>
        </p>
      </div> */}
      <div className="cart-detail-count">
        <div className="decrease-count count-box">-</div>
        <div className="count count-box">5</div>
        <div className="increase-count count-box">+</div>
      </div>
      <div className="cart-detail-total">
        1.170.000 <u>đ</u>
        {/* {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(1170000)} */}
      </div>
      <p className="cart-detail-delete">
        <BsFillTrash3Fill />
      </p>
    </div>
  );
}

export default ProductCart;
