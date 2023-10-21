import React, { useEffect, useState } from "react";
import "./cartProduct.scss";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";
import { CreditCardOutlined } from "@ant-design/icons";
import { Radio } from "antd";
import { BsTrash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  deleteProduct,
  increaseQuantity,
} from "../../redux/cart/cartSlice";

function CartProduct(props) {
  const { dataCart } = props;
  const dispatch = useDispatch();
  const [totalCost, setTotalCost] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);

  //INCREASE QUANTITY
  const handleIncrease = (id) => {
    console.log("id product>>> ", id);
    dispatch(increaseQuantity(id));
  };

  //DECREASE QUANTITY
  const handledecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const totalCostCalculate = (array) => {
    return array.reduce(
      (total, item) =>
        parseInt(item.productId.priceAfter) * parseInt(item.quantity) + total,
      0
    );
  };

  const totalProductCalculate = (array) => {
    return array.reduce((total, item) => parseInt(item.quantity) + total, 0);
  };
  useEffect(() => {
    console.log("listCart>> ", dataCart);
    if (dataCart?.length === 0) {
      setTotalCost(0);
      setTotalProduct(0);
    } else {
      setTotalCost(totalCostCalculate(dataCart));
      setTotalProduct(totalProductCalculate(dataCart));
    }
  }, [dataCart]);
  return (
    <div className="cart-container container">
      <div className="cart-container-content">
        <div className="cart-container-content-left">
          <p className="left-title">Giỏ hàng của bạn</p>
          <p className="left-total">
            Bạn đang có <b>{totalProduct}</b> sản phẩm trong giỏ hàng
          </p>
          <div className="list-product">
            {dataCart?.map((e) => {
              return (
                <div
                  key={e.productId._id}
                  className="content-checkout pt-3 pb-3"
                >
                  <div className="image-product-checkout">
                    <img loading="lazy" src={e.productId.images[0]} />
                  </div>
                  <div className="content-product-checkout">
                    <div className="header-product-checkout">
                      <p className="header-product-checkout-name">
                        {e.productId.name}
                      </p>
                      <p className="header-product-checkout-price">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(e.productId.priceAfter)}
                      </p>
                    </div>
                    <div className="footer-product-checkout">
                      <p className="footer-product-checkout-after">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(
                          parseInt(e.productId.priceAfter) *
                            parseInt(e.quantity)
                        )}
                      </p>
                      <div className="quantity">
                        <span
                          className="minus"
                          onClick={() => handledecrease(e.productId._id)}
                        >
                          -
                        </span>
                        <span>{e.quantity}</span>
                        <span
                          className="plus"
                          onClick={() => handleIncrease(e.productId._id)}
                        >
                          +
                        </span>
                      </div>
                    </div>
                    <div className="delete">
                      <p
                        onClick={() => dispatch(deleteProduct(e.productId._id))}
                      >
                        <BsTrash />
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <h2>Thông tin vận chuyển</h2>
          <div className="address">
            <div className="address-left">
              <div className="full-size">
                <input type="text" placeholder="Email" className="input-name" />
              </div>
              <div className="full-size flex-row">
                <div className="half-size">
                  <input type="text" placeholder="Họ và   tên" />
                </div>
                <div className="half-size">
                  <input type="text" placeholder="Số điện thoại" />
                </div>
              </div>
              <div className="full-size">
                <input type="text" placeholder="Xã" />
              </div>
              <div className="full-size">
                <input type="text" placeholder="Huyện" />
              </div>
              <div className="full-size">
                <input type="text" placeholder="Tỉnh" />
              </div>
            </div>
            <div className="address-right">
              <div className="full-size">
                <input type="text" placeholder="Địa chỉ" />
              </div>
              <div className="full-size">
                <textarea type="text" placeholder="Ghi chú" />
              </div>
            </div>
          </div>
        </div>
        <div className="cart-container-content-right">
          <div className="footer-detail">
            <h3>Thông tin đơn hàng</h3>
            <div className="shipping">
              <h5>Hình thức thanh toán</h5>

              <p>
                <input
                  type="radio"
                  defaultChecked
                  // checked={true}
                  style={{ cursor: "pointer" }}
                />
                Thanh toán khi nhận hàng
              </p>
              <p>
                <input
                  type="radio"
                  disabled={true}
                  style={{ cursor: "no-drop" }}
                />
                Thanh toán qua chuyển khoản
              </p>
            </div>
            <div className="price">
              <p className="price-title">Tổng tiền:</p>
              <p className="price-number">
                {" "}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(totalCost)}
              </p>
            </div>
            <p className="freeship">
              <b>FREESHIP</b> &nbsp; đã được áp dụng
            </p>
            <button>THANH TOÁN</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
