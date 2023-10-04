import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import "./homeproduct.scss";
import { BsArrowRightShort } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { getProductByCategorySlice } from "../../services.js/api";
import { NavLink } from "react-router-dom";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
}

function HomeProduct(props) {
  const { categoryValue, categoryLabel } = props;
  const [listBrand, setListBrand] = useState();
  const [listProduct, setListProduct] = useState([]);
  const responsiveCarousel = [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false,
        dots: false,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
        dots: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ];

  //gt list products
  const handleGetProductSlice = async () => {
    let brands = [];
    const res = await getProductByCategorySlice(categoryValue);
    if (res && res.data) {
      setListProduct(res.data);
      res.data.map((e, index) => {
        brands.push(e.brand);
      });

      setListBrand(
        brands?.filter((item, index) => {
          return brands.indexOf(item) === index;
        })
      );
    }
  };

  useEffect(() => {
    handleGetProductSlice();
  }, []);
  return (
    <div className="home-category-product">
      <div className="box-title-group">
        <h2 className="title">{categoryLabel}</h2>
        <div className="box-title-group-search">
          {listBrand?.map((e) => {
            return (
              <a href="" key={e}>
                <h3>{e}</h3>
              </a>
            );
          })}

          {/* <a href="">
            <h3>LÓT CHUỘT CỠ 90X40</h3>
          </a>
          <a href="">
            <h3>LÓT CHUỘT CỠ 60X40</h3>
          </a> */}
          <NavLink to={`/category`} className="btn-view-more">
            <h3>
              XEM THÊM <BsArrowRightShort />
            </h3>
          </NavLink>
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
          responsive={responsiveCarousel}
        >
          {listProduct?.map((e) => {
            return (
              <div key={e._id} className="item-cover">
                <div className="item">
                  <a href="" className="item-img">
                    <img src={e.images[0]} alt="" />
                  </a>
                  {e.discount === "0" ? (
                    <div className="item-infor">
                      <a href="" className="item-infor-name">
                        {e.name}
                      </a>
                      <div className="item-infor-container">
                        <div className="item-infor-container-price">
                          <p className="main-price">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(e.priceAfter)}
                          </p>
                          <p className="old-price" style={{ color: "#ffffff" }}>
                            &nbsp;
                          </p>
                        </div>
                        <a href="" className="item-infor-container-cart">
                          <AiOutlineShoppingCart />
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="item-infor">
                      <a href="" className="item-infor-name">
                        {e.name}
                      </a>
                      <div className="item-infor-container">
                        <div className="item-infor-container-price">
                          <p className="old-price">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(e.price)}
                          </p>
                          <p className="main-price">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(e.priceAfter)}
                          </p>
                        </div>
                        <a href="" className="item-infor-container-cart">
                          <AiOutlineShoppingCart />
                        </a>
                      </div>
                      <div className="item-discount">{e.discount}%</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* <div className="item-cover">
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
          </div> */}
        </Carousel>
      </div>
    </div>
  );
}

export default HomeProduct;
