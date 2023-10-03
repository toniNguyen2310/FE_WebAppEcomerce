import React from "react";
import { Carousel } from "antd";
import "./detailProduct.scss";
function DetailProduct(props) {
  const images = [
    "https://lacdau.com/media/product/250-3441-akko-asa-shine-through-keycap-set-black-05--1-.jpg",
    "https://lacdau.com/media/product/250-3441-aa.jpg",
    "https://lacdau.com/media/product/250-3441-akko-asa-shine-through-keycap-set-black-05--1-.jpg",
  ];
  const settings = {
    // customPaging: function (i) {
    //   return (
    //     <a>
    //       {/* <img src={`${baseUrl}/abstract0${i + 1}.jpg`} /> */}
    //       <img src="https://lacdau.com/media/product/250-3441-aa.jpg" />
    //     </a>
    //   );
    // },
    // dotsClass: "slick-dots slick-thumb",
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    draggable: true,
    infinite: true,
  };
  return (
    <div className="page-cover">
      <div className="product">
        <nav className="product-header">
          Trang chủ /Chuột Gaming/ Tên Product
        </nav>
        <div className="product-detail">
          <div className="product-detail-img">
            <Carousel {...settings}>
              <div className="carousel-image">
                <a href="">
                  <img src={images[0]} alt="" />
                </a>
              </div>
              <div className="carousel-image">
                <a href="">
                  <img src={images[1]} alt="" />
                </a>
              </div>
              <div className="carousel-image">
                <a href="">
                  <img src={images[2]} alt="" />
                </a>
              </div>
            </Carousel>
          </div>
          <div className="product-detail-info">
            <div className="product-detail-info-text">
              <p className="product-name">BỘ KEYCAP AKKO SHINE THROUGH BLACK</p>
              <div className="product-description">
                <p className="product-description-title">Thông số sản phẩm</p>
                <p className="product-description-feature">
                  AKKO ASA Shine-Through Keycap set – Black cung cấp trải nghiệm
                  cao cấp hơn cho người dùng yêu thích LED RGB, đặc biệt là
                  trong không gian tối.
                </p>
              </div>
            </div>
            <div className="product-detail-info-price">
              {/* Sản phẩm có discount */}
              <div className="price">
                <div className="price-detail">
                  <p className="price-detail-title ">Giá bán</p>
                  <p className="price-detail-number price-intial">
                    890.000<u>đ</u>
                  </p>
                </div>
                <div className="price-detail">
                  <p className="price-detail-title title-discount">
                    Giá khuyến mại
                  </p>
                  <p className="price-detail-number price-discount">
                    445.000<u>đ</u> &nbsp; <small>(Tiết kiệm: 50%)</small>
                  </p>
                </div>
              </div>

              {/* Sản phẩm không có discount */}
              {/* <div className="price">
                <div className="price-detail ">
                  <p className="price-detail-title title-discount">
                    Giá khuyến mại
                  </p>
                  <p className="price-detail-number price-discount">
                    445.000<u>đ</u>
                  </p>
                </div>
              </div> */}
            </div>
            <div className="btn-buy">
              <a href="">Mua ngay</a>
              <a href="">Thêm vào giỏ</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
