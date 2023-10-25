import React from "react";

function OrderProduct(props) {
  return (
    <div className="user-order-container mt-3">
      <div className="user-order-header">
        <div>
          <div className="order-header-right">#12155151</div>
          <div className="order-header-right-500">09:32:40 06/08/2023</div>
        </div>
        <div className="state-order">
          <div className="order-cancel">Đã huỷ</div>
        </div>
      </div>
      <div className="user-order-content">
        <div className="top  p-3">
          <div className="image-detail-order">
            <img
              loading="lazy"
              className="image-detail"
              src="https://lacdau.com/media/product/250-608-365bebe017fe978757221742d19d706f.jpg"
            />
          </div>
          <div className="detail-order">
            <span>TEN SP</span>
            <span>x2</span>
          </div>
          <div className="button-rate1">
            <span>300.000đ</span>
          </div>
        </div>
      </div>
      <div className="user-order-footer d-flex justify-content-between">
        <div>
          {/* <span className="delete-order">Huỷ đơn</span> */}
          <span className="btn-hide">Huỷ đơn</span>
        </div>
        <div className="total-price">
          <span className="title-total">Tổng tiền</span>: &nbsp;
          <span style={{ fontWeight: 600 }}>200000</span>
        </div>
      </div>
    </div>
  );
}

export default OrderProduct;
