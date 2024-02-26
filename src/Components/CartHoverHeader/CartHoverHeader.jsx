import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { convertSlug } from "../../utils/constant";
import "./cartHoverHeader.scss";
import { useFormatNumberToMoney } from "../../utils/hooks/useFormatNumberToMoney";

function CartHoverHeader(props) {
  const [listData, setListData] = useState([]);
  const listCart = useSelector((state) => state.cart.listCart);
  const navigate = useNavigate();

  //Handle redirect detail product
  const handleRedirectDetailProductSearch = (product) => {
    const slug = convertSlug(product.name);
    navigate(`/product/${slug}?id=${product._id}`);
  };

  useEffect(() => {
    setListData(listCart);
  }, [listCart]);
  return (
    <>
      {listData.length == 0 ? (
        <div className="div-cover" style={{ overflow: "hidden" }}>
          <p className="zero-product">Có 0 sản phẩm trong sản phẩm</p>
        </div>
      ) : (
        <div
          className="div-cover"
          style={listData.length > 3 ? null : { overflow: "hidden" }}
        >
          <div className="user-order-container mt-3">
            <div className="user-order-content">
              {listData.map((e) => {
                return (
                  <div key={e.productId._id} className="top  p-3">
                    <div className="image-detail-order">
                      <img
                        onClick={() =>
                          handleRedirectDetailProductSearch(e.productId)
                        }
                        loading="lazy"
                        className="image-detail"
                        src={e.productId.images[0]}
                      />
                    </div>
                    <div className="detail-order">
                      <span
                        className="detail-order-title"
                        onClick={() =>
                          handleRedirectDetailProductSearch(e.productId)
                        }
                      >
                        {e.productId.name}
                      </span>
                      <span>x{e.quantity}</span>
                    </div>
                    <div className="button-rate1">
                      <div className="button-rate1">
                        <span className="price-bottom">
                        {useFormatNumberToMoney(parseInt(e.productId.priceAfter) *
                              parseInt(e.quantity))}

                        </span>
                        <span className="price-top-hide">3</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="user-order-footer d-flex justify-content-between">
              <div>
                <span
                  className="btn-checkout"
                  onClick={() => navigate("/cart")}
                >
                  THANH TOÁN NGAY
                </span>
              </div>
              <div className="total-price">
                <span className="total-price-title">Tổng tiền hàng:</span>
                <span className="total-price-price">
                  {useFormatNumberToMoney(listData.reduce(
                      (total, item) =>
                        parseInt(item.productId.priceAfter) *
                          parseInt(item.quantity) +
                        total,
                      0
                    ))}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CartHoverHeader;
