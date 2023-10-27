import React, { useEffect, useState } from "react";
import { calcelOrder, getListOrder } from "../../services.js/api";
import { useSelector } from "react-redux";

function Order(props) {
  const user = useSelector((state) => state.account.user);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const [listOrder, setListOrder] = useState([]);
  const [isCalcel, setIsCalcel] = useState(false);

  //FETCH LIST ORDER
  const fetchListOrder = async (id) => {
    const res = await getListOrder(id);

    if (res && res.data) {
      console.log("ress", res.data);
      setListOrder(res.data);
    }
  };

  //CANCEL ORDER
  const cancelOrder = async (id) => {
    const res = await calcelOrder(id);
    if (res) {
      setIsCalcel(true);
      fetchListOrder(user._id);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchListOrder(user._id);
    }
  }, [user]);

  return (
    <div className="user-profile">
      <h2 className="mg-20px title">Đơn hàng của tôi</h2>
      {listOrder.length > 0 ? (
        <div className="listOrder">
          {listOrder.reverse().map((e) => {
            return (
              <div key={e._id} className="user-order-container mt-3">
                <div className="user-order-header">
                  <div>
                    <div className="order-header-right">#{e._id.slice(14)}</div>
                    <div className="order-header-right-500">
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
                      style={{
                        color: e.status === "Chờ xác nhận" ? "black" : "red",
                      }}
                    >
                      {e.status}
                    </div>
                  </div>
                </div>
                <div className="user-order-content">
                  {e.listCart.map((item) => {
                    return (
                      <div key={item.productId._id} className="top  p-3">
                        <div className="image-detail-order">
                          <img
                            loading="lazy"
                            className="image-detail"
                            src={item.productId.images[0]}
                          />
                        </div>
                        <div className="detail-order">
                          <span>{item.productId.name}</span>
                          <span>x{item.quantity}</span>
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
                        Huỷ đơn
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
        <div>Bạn hiện chưa có đơn hàng nào</div>
      )}
    </div>
  );
}

export default Order;
