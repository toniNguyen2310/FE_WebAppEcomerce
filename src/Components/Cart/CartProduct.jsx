import React, { useEffect, useRef, useState } from "react";
import "./cartProduct.scss";
import "react-image-gallery/styles/scss/image-gallery.scss";
import { BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Empty } from "antd";
import { convertSlug } from "../Homepage";

import { Button, message, Space, Popconfirm } from "antd";

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
import LoadingButton from "../Export/ExportVarible";

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
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const refInput = useRef(null);
  const refname = useRef(null);
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Bạn đã đặt hàng thành công!",
    });
  };

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

  //CONFIRM DELETE
  const confirm = (id) => {
    console.log(id);
    dispatch(deleteProduct(id));
    message.success("Xóa sản phẩm Thành công");
  };

  const cancel = (e) => {
    return;
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
  const regexName = (name) => {
    const regexEmailCheck =
      /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/g;

    return name.match(regexEmailCheck) ? true : false;
  };

  //HANDLE CHECKOUT SUBMIT
  const submitCheckout = async () => {
    setLoadingCheckout(true);
    if (!name || !email || !phone || !address) {
      if (!email) {
        message.info("Email không được để trống");
        refInput.current.focus();
        refInput.current.scrollIntoView();
        setLoadingCheckout(false);
        return;
      }
      if (!name) {
        message.info("Tên không được để trống");
        setLoadingCheckout(false);
        return;
      }
      if (!phone) {
        message.info("SĐT không được để trống");
        setLoadingCheckout(false);
        return;
      }

      if (!address) {
        message.info("Địa chỉ không được để trống");
        setLoadingCheckout(false);
        return;
      }
    }
    if (!regexEmail(email)) {
      message.error("Email không đúng định dạng");
      setLoadingCheckout(false);
      return;
    }
    if (!regexName(name)) {
      message.error("Tên phải ít nhất 2 từ");
      refname.current.focus();
      refname.current.scrollIntoView();
      setLoadingCheckout(false);
      return;
    }
    if (!validatePhone(phone)) {
      message.error("SĐT không đúng định dạng");
      setLoadingCheckout(false);
      return;
    }

    let dataCart = listCart;
    dataCart = dataCart.map((e) => {
      return {
        productId: e.productId._id,
        quantity: e.quantity,
      };
    });
    // console.log("SAVE1>>> ", { id: user._id, cart: dataCart });

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
        setLoadingCheckout(false);
        console.log("res>> ", res.data);
        success();
        dispatch(deleteAllCart());
        return;
      } else {
        setLoadingCheckout(false);
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
      // console.log("DATA>> ", data);
      const res = await createOrder(data);
      if (res && res.data) {
        setLoadingCheckout(false);
        // console.log("res>> ", res.data);
        success();
        dispatch(deleteAllCart());
        return;
      } else {
        setLoadingCheckout(false);
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
      {contextHolder}
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
                    Bạn đang có <b>{totalProduct} sản phẩm</b> sản phẩm trong
                    giỏ hàng
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
                              {/* <p
                                onClick={() =>
                                  dispatch(deleteProduct(e.productId._id))
                                }
                              >
                                <BsTrash />
                              </p> */}

                              <Popconfirm
                                title="Bạn chắc chắn muốn bỏ sản phẩm này ra khỏi giỏ hàng?"
                                // description="Bạn chắc chắn muốn bỏ sản phẩm này ra khỏi giỏ hàng?"
                                onConfirm={() => confirm(e.productId._id)}
                                onCancel={() => cancel(e.productId._id)}
                                okText="Yes"
                                cancelText="No"
                              >
                                <p>
                                  <BsTrash />
                                </p>
                              </Popconfirm>
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
                    refInput={refInput}
                    refname={refname}
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
                    <button onClick={submitCheckout}>
                      THANH TOÁN
                      {loadingCheckout && (
                        <LoadingButton
                          color={"#ff0000"}
                          secondaryColor={"#ffffff"}
                        />
                      )}
                    </button>
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
