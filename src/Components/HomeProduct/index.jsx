import React, { useState } from "react";
import { Carousel } from "antd";
import "./homeproduct.scss";
import { BsArrowRightShort } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
}

function HomeProduct(props) {
  return (
    <div className="home-category-product">
      <div className="box-title-group">
        <h2 className="title">LÓT CHUỘT</h2>
        <div className="box-title-group-search">
          <a href="">
            <h3>LÓT CHUỘT CỠ 80X30</h3>
          </a>
          <a href="">
            <h3>LÓT CHUỘT CỠ 90X40</h3>
          </a>
          <a href="">
            <h3>LÓT CHUỘT CỠ 60X40</h3>
          </a>
          <a href="" className="btn-view-more">
            <h3>
              XEM THÊM <BsArrowRightShort />
            </h3>
          </a>
        </div>
      </div>
      <div className="box-product-group">
        <Carousel
          arrows
          prevArrow={<SamplePrevArrow />}
          nextArrow={<SampleNextArrow />}
          swipeToSlide
          draggable
          autoplay
          autoplaySpeed={2500}
          slidesPerRow={1}
          slidesToShow={5}
          dots={false}
          infinite={false}
        >
          <div className="item-cover">
            <div className="item">
              <a href="" className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </a>
              <div className="item-infor">
                <a href="" className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </a>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="old-price">
                      60.000<u>đ</u>
                    </p>
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <a href="" className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </a>
                </div>
                <div className="item-discount">-20%</div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <a href="" className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </a>

              <div className="item-infor">
                <a href="" className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </a>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <a href="" className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <a href="" className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </a>

              <div className="item-infor">
                <a href="" className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </a>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <a href="" className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <a href="" className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </a>

              <div className="item-infor">
                <a href="" className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </a>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <a href="" className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <a href="" className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </a>

              <div className="item-infor">
                <a href="" className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </a>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <a href="" className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <a href="" className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </a>

              <div className="item-infor">
                <a href="" className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </a>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <a href="" className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <a href="" className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </a>

              <div className="item-infor">
                <a href="" className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </a>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <a href="" className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <a href="" className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </a>

              <div className="item-infor">
                <a href="" className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </a>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <a href="" className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <a href="" className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </a>

              <div className="item-infor">
                <a href="" className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </a>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <a href="" className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <a href="" className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </a>

              <div className="item-infor">
                <a href="" className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </a>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <a href="" className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export default HomeProduct;
