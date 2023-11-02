import React, { useEffect, useState } from "react";
import { calcelOrder, getListOrder } from "../../services.js/api";
import { useSelector } from "react-redux";
import LoadingButton from "../Export/ExportVarible";
import { SpinnerDotted } from "spinners-react";
import { convertSlug } from "../Homepage";
import { useNavigate } from "react-router-dom";

function Order(props) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.account.user);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const [listOrder, setListOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //FETCH LIST ORDER
  const fetchListOrder = async (id) => {
    setIsLoading(true);
    const res = await getListOrder(id);
    if (res && res.data) {
      setIsLoading(false);
      setListOrder(res.data);
    } else {
      setIsLoading(false);
    }
  };

  //CANCEL ORDER
  const cancelOrder = async (id) => {
    const res = await calcelOrder(id);
    if (res) {
      fetchListOrder(user._id);
    }
  };

  const handleRedirectDetailProductSearch = (product) => {
    const slug = convertSlug(product.name);
    navigate(`/product/${slug}?id=${product._id}`);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchListOrder(user._id);
    }
  }, [user]);

  return (
    <div className="user-profile">
      <h2 className="mg-20px title">Đơn hàng của tôi</h2>
      {isLoading ? (
        <div className="loading-order-profile">
          <SpinnerDotted size={80} thickness={100} speed={100} color="#333" />
        </div>
      ) : (
        <>
          {listOrder.length > 0 ? (
            <div className="listOrder">
              {listOrder.map((e) => {
                return (
                  <div key={e._id} className="user-order-container mt-3">
                    <div className="user-order-header">
                      <div className="user-order-header-left">
                        <div className="order-header-right">
                          Đơn hàng: #{e._id.slice(14)}
                        </div>
                        <div className="order-header-right-500">
                          Ngày đặt hàng:&nbsp;
                          {new Date(e.createdAt).toLocaleString("en-GB", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </div>
                      </div>
                      <div className="state-order">
                        <div
                          className="order-cancel"
                          style={
                            e.status === "Chờ xác nhận"
                              ? { color: "black", fontWeight: "500" }
                              : { color: "red" }
                          }
                        >
                          {e.status}
                          {e.status === "Chờ xác nhận" ? "..." : null}
                        </div>
                      </div>
                    </div>
                    <div className="user-order-content">
                      {e.listCart.map((item) => {
                        return (
                          <div key={item.productId._id} className="top  p-3">
                            <div
                              className="image-detail-order"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                handleRedirectDetailProductSearch(
                                  item.productId
                                )
                              }
                            >
                              <img
                                loading="lazy"
                                className="image-detail"
                                src={item.productId.images[0]}
                              />
                            </div>
                            <div className="detail-order">
                              <span
                                className="nameProduct414"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  handleRedirectDetailProductSearch(
                                    item.productId
                                  )
                                }
                              >
                                {item.productId.name}
                              </span>
                              <span>x{item.quantity}</span>
                              <span className="price414">
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(item.productId.priceAfter)}
                              </span>
                            </div>
                            <div className="button-rate1">
                              <span>
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(item.productId.priceAfter)}
                              </span>
                              {item.productId.discount === "0" ? null : (
                                <span className="price-sale">
                                  {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(item.productId.price)}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="user-order-footer d-flex justify-content-between">
                      <div>
                        {e.status === "Chờ xác nhận" ? (
                          <span
                            className="delete-order"
                            onClick={() => cancelOrder(e._id)}
                          >
                            {isLoading ? (
                              <LoadingButton
                                color={"red"}
                                secondaryColor={"#ffffff"}
                              />
                            ) : (
                              "Huỷ đơn"
                            )}
                          </span>
                        ) : null}
                        <span className="btn-hide">Huỷ đơn</span>
                      </div>
                      <div className="total-price">
                        <span className="title-total">Tổng tiền</span>: &nbsp;
                        <span style={{ fontWeight: 600 }}>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(
                            e.listCart.reduce(
                              (total, item) =>
                                parseInt(item.productId.priceAfter) *
                                  parseInt(item.quantity) +
                                total,
                              0
                            )
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-order">Bạn hiện chưa có đơn hàng nào</div>
          )}
        </>
      )}
    </div>
  );
}

export default Order;
