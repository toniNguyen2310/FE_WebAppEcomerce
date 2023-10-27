import React, { useEffect, useState } from "react";
import "./cartProduct.scss";
import "react-image-gallery/styles/scss/image-gallery.scss";
import { BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Empty } from "antd";
import { convertSlug } from "../Homepage";
import { toast } from "react-toastify";
import {
  decreaseQuantity,
  deleteAllCart,
  deleteProduct,
  increaseQuantity,
} from "../../redux/cart/cartSlice";
import SkeletonCart from "../Skeleton/SkeletonCart";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../services.js/api";
import InforCheckout from "./InforCheckout";

function CartProduct(props) {
  const { dataCart } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [totalCost, setTotalCost] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const isLoadingCart = useSelector((state) => state.cart.isLoadingCart);
  const user = useSelector((state) => state.account.user);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const listCart = useSelector((state) => state.cart.listCart);

  //CHECKOUT
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

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

  //HANDLE DERECT PRODUCT
  const handleRederectDetailProductSearch = (product) => {
    console.log("product>> ", product);
    // return;
    const slug = convertSlug(product.name);
    // console.log("slug>> ", slug);
    navigate(`/product/${slug}?id=${product._id}`);
  };

  //REGEX
  const validatePhone = (value) => {
    const regexPhone = /[0-9]{10}\b/g;
    let isValid = regexPhone.test(value);
    return isValid;
  };

  const regexEmail = (email) => {
    const regexEmailCheck = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    return email.match(regexEmailCheck) ? true : false;
  };

  //HANDLE CHECKOUT SUBMIT
  const submitCheckout = async () => {
    if (!name || !email || !phone || !address) {
      if (!email) {
        toast.error("Email không được để trống!");
        return;
      }
      if (!name) {
        toast.error("Tên không được để trống!");
        return;
      }
      if (!phone) {
        toast.error("SĐT không được để trống!");

        return;
      }

      if (!address) {
        toast.error("Địa chỉ không được để trống");
        return;
      }
    }
    if (!regexEmail(email)) {
      toast.error("Email không đúng định dạng!");
      return;
    }
    console.log("phone>> ", phone);
    if (!validatePhone(phone)) {
      toast.error("SĐT không đúng");
      return;
    }

    let dataCart = listCart;
    dataCart = dataCart.map((e) => {
      return {
        productId: e.productId._id,
        quantity: e.quantity,
      };
    });
    console.log("SAVE1>>> ", { id: user._id, cart: dataCart });

    if (isAuthenticated) {
      let data = {
        userId: user._id.trim(),
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        note: note.trim(),
        address: address.trim(),
        listCart: dataCart,
      };
      console.log("DATA>> ", data);
      const res = await createOrder(data);
      if (res && res.data) {
        console.log("res>> ", res.data);
        toast.success("Đặt hàng thành công");
        dispatch(deleteAllCart());
      }
    } else {
      let data = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        note: note.trim(),
        address: address.trim(),
        listCart: dataCart,
      };
      console.log("DATA>> ", data);
      const res = await createOrder(data);
      if (res && res.data) {
        console.log("res>> ", res.data);
        toast.success("Đặt hàng thành công");
        dispatch(deleteAllCart());
      }
    }
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

  useEffect(() => {
    if (isLoadingCart === isLoading) {
      return;
    } else {
      setIsLoading(isLoadingCart);
    }
  }, [isLoadingCart]);
  return (
    <>
      {isLoading ? (
        <div className="cart-container container">
          <div className="cart-container-content">
            <div className="cart-container-content-left height-skeleton">
              <SkeletonCart height={500} width={840} />
            </div>
            <div className="cart-container-content-right height-skeleton">
              <SkeletonCart height={500} width={310} />
            </div>
          </div>
        </div>
      ) : (
        <>
          {dataCart?.length === 0 ? (
            <div style={{ height: "220px", width: "100%" }}>
              <Empty description={"GIỎ HÀNG CỦA BẠN ĐANG TRỐNG"} />
            </div>
          ) : (
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
                              <p
                                className="header-product-checkout-name"
                                onClick={() =>
                                  handleRederectDetailProductSearch(e.productId)
                                }
                              >
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
                                  onClick={() =>
                                    handledecrease(e.productId._id)
                                  }
                                >
                                  -
                                </span>
                                <span>{e.quantity}</span>
                                <span
                                  className="plus"
                                  onClick={() =>
                                    handleIncrease(e.productId._id)
                                  }
                                >
                                  +
                                </span>
                              </div>
                            </div>
                            <div className="delete">
                              <p
                                onClick={() =>
                                  dispatch(deleteProduct(e.productId._id))
                                }
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
                  <InforCheckout
                    name={name}
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    phone={phone}
                    setPhone={setPhone}
                    address={address}
                    setAddress={setAddress}
                    note={note}
                    setNote={setNote}
                  />
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
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(totalCost)}
                      </p>
                    </div>
                    <p className="freeship">
                      <b>FREESHIP</b> &nbsp; đã được áp dụng
                    </p>
                    <button onClick={submitCheckout}>THANH TOÁN</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default CartProduct;
