import React from "react";

function Test(props) {
  return (
    <div className="product-detail">
      <div className="product-detail-img">
        <Carousel {...settings}>
          {dataProduct?.images?.map((e) => {
            return (
              <div key={e} className="carousel-image">
                <a href="">
                  <img loading="lazy" src={e} alt="" />
                </a>
              </div>
            );
          })}
        </Carousel>
      </div>
      <div className="product-detail-info">
        <div className="product-detail-info-text">
          <p className="product-name">{dataProduct.name}</p>
          <div className="product-description">
            <p className="product-description-title">Thông số sản phẩm</p>
            <p className="product-description-feature">
              {dataProduct.description}
            </p>
          </div>
        </div>
        <div className="product-detail-info-price">
          {/* Sản phẩm có discount */}
          {dataProduct?.discount === "0" ? (
            <div className="price">
              <div className="price-detail ">
                <p className="price-detail-title title-discount">
                  Giá khuyến mại
                </p>
                <p className="price-detail-number price-discount">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(dataProduct?.priceAfter)}
                </p>
              </div>
            </div>
          ) : (
            <div className="price">
              <div className="price-detail">
                <p className="price-detail-title ">Giá bán</p>
                <p className="price-detail-number price-intial">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(dataProduct?.price)}
                </p>
              </div>
              <div className="price-detail">
                <p className="price-detail-title title-discount">
                  Giá khuyến mại
                </p>
                <p className="price-detail-number price-discount">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(dataProduct?.priceAfter)}
                  &nbsp;
                  <small>(Tiết kiệm: {dataProduct?.discount}%)</small>
                </p>
              </div>
            </div>
          )}

          {/* Sản phẩm không có discount */}
        </div>
        <div className="btn-buy">
          <a href="">Mua ngay</a>
          <a href="">Thêm vào giỏ</a>
        </div>
      </div>
    </div>
  );
}

export default Test;
