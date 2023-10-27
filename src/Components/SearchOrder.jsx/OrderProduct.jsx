import React, { useEffect } from "react";

function OrderProduct(props) {
  const { item } = props;

  useEffect(() => {
    console.log(item);
  }, []);
  return (
    <div className="user-order-container mt-3">
      <div className="user-order-header">
        <div>
          <div className="order-header-right">#{item._id.slice(14)}</div>
          <div className="order-header-right-500">
            {new Date(item.createdAt).toLocaleString("en-GB", {
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
            className={`order-cancel `}
            style={{
              color: item.status === "Chờ xác nhận" ? "#000" : "red",
            }}
          >
            {item.status}
            {item.status === "Chờ xác nhận" ? "..." : null}
          </div>
        </div>
      </div>
      <div className="user-order-content">
        {item.listCart.map((e) => {
          return (
            <div key={e.productId._id} className="top  p-3">
              <div className="image-detail-order">
                <img
                  loading="lazy"
                  className="image-detail"
                  src={e.productId.images[0]}
                />
              </div>
              <div className="detail-order">
                <span>{e.productId.name}</span>
                <span>x{e.quantity}</span>
              </div>
              <div className="button-rate1">
                <div className="button-rate1">
                  <span>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(e.productId.priceAfter)}
                  </span>
                  {e.productId.discount === "0" ? null : (
                    <span className="price-sale">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(e.productId.price)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="user-order-footer d-flex justify-content-between">
        <div>
          {/* <span className="delete-order">Huỷ đơn</span> */}
          <span className="btn-hide">Huỷ đơn</span>
        </div>
        <div className="total-price">
          <span className="title-total">Tổng tiền</span>: &nbsp;
          <span style={{ fontWeight: 600 }}>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(
              item.listCart.reduce(
                (total, e) =>
                  parseInt(e.productId.priceAfter) * parseInt(e.quantity) +
                  total,
                0
              )
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default OrderProduct;
