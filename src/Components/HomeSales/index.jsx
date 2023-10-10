/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import { BsArrowRightCircle } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosFlash } from "react-icons/io";
import "./homeSales.scss";
import { getProductByDiscountSlice } from "../../services.js/api";
import { useNavigate } from "react-router-dom";
import { convertSlug } from "../Homepage";
import CardProduct from "../CardProduct/CardProduct";

function HomeSales(props) {
  const [listProductSales, setListProductSales] = useState([]);
  const navigate = useNavigate();
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
        arrows: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
      },
    },
  ];
  function NextArrow(props) {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style }} onClick={onClick} />;
  }
  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style }} onClick={onClick} />;
  }

  //TIME COUNTER
  const [timeFlashSale, setTimeFlashSale] = useState(0);
  const [displayTimeFlashSale, setdisplayTimeFlashSale] = useState({
    hour: 0,
    minute: 0,
    second: 0,
  });
  const newDate = new Date();

  const countTimeFlashSale = () => {
    let timeCurrent =
      newDate.getHours() * 60 * 60 +
      newDate.getMinutes() * 60 +
      newDate.getSeconds();
    let timeOneDay = 86400;

    setTimeFlashSale(timeOneDay - timeCurrent);
  };

  const handleGetDataSale = async () => {
    const res = await getProductByDiscountSlice();
    if (res && res.data) {
      setListProductSales(res.data);
    }
  };

  useEffect(() => {
    let timeCountDown = setTimeout(() => {
      if (timeFlashSale < 1) {
        clearTimeout(timeCountDown);
      } else {
        setTimeFlashSale((prev) => prev - 1);
      }
    }, 1000);
    const h = Math.floor(timeFlashSale / 3600)
        .toString()
        .padStart(2, "0"),
      m = Math.floor((timeFlashSale % 3600) / 60)
        .toString()
        .padStart(2, "0"),
      s = Math.floor(timeFlashSale % 60)
        .toString()
        .padStart(2, "0");

    setdisplayTimeFlashSale({
      hour: h,
      minute: m,
      second: s,
    });
    return () => {
      clearTimeout(timeCountDown);
    };
  }, [timeFlashSale]);

  //Handle rederect product
  const handleRederectDetailProduct = (product) => {
    // console.log("product>> ", product);
    const slug = convertSlug(product.name);
    // console.log("slug>> ", slug);
    navigate(`/${slug}?id=${product._id}`);
  };

  useEffect(() => {
    handleGetDataSale();
    countTimeFlashSale();

    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home-sale">
      <div className="box-sale-title">
        <h2 className="title-sale">
          <IoIosFlash /> FLASHSALE
        </h2>
        <div className="box-countdown">
          <p className="text-countdow"> Ưu đãi kết thúc sau:</p>
          <div className="box-time">
            <p className="time">0</p>
            <p className="text">Ngày</p>
          </div>
          <div className="box-time">
            <p className="time">{displayTimeFlashSale.hour}</p>
            <p className="text">Giờ</p>
          </div>
          <div className="box-time">
            <p className="time">{displayTimeFlashSale.minute}</p>
            <p className="text">Phút</p>
          </div>
          <div className="box-time">
            <p className="time">{displayTimeFlashSale.second}</p>
            <p className="text">Giây</p>
          </div>
        </div>
      </div>
      <div className="box-sale-list">
        <Carousel
          arrows
          prevArrow={<NextArrow />}
          nextArrow={<PrevArrow />}
          swipeToSlide
          draggable
          // autoplay
          // autoplaySpeed={5000}
          emulateTouch={true}
          slidesPerRow={1}
          slidesToShow={5}
          slidesToScroll={1}
          dots={false}
          infinite={false}
          responsive={responsiveCarousel}
        >
          {listProductSales?.map((product) => {
            return (
              <CardProduct
                key={product?.id || product?._id}
                product={product}
                handleRederectDetailProduct={handleRederectDetailProduct}
              />
            );
          })}

          {/* <div className="item-cover">
            <div className="item">
              <div className="item-img">
                <img loading="lazy"
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </div>

              <div className="item-infor">
                <div className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </div>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <div className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <div className="item-img">
                <img loading="lazy"
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </div>

              <div className="item-infor">
                <div className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </div>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <div className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <div className="item-img">
                <img loading="lazy"
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </div>

              <div className="item-infor">
                <div className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </div>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <div className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <div className="item-img">
                <img loading="lazy"
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </div>

              <div className="item-infor">
                <div className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </div>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <div className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <div className="item-img">
                <img loading="lazy"
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </div>

              <div className="item-infor">
                <div className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </div>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <div className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <div className="item-img">
                <img loading="lazy"
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </div>

              <div className="item-infor">
                <div className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </div>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <div className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <div className="item-img">
                <img loading="lazy"
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </div>

              <div className="item-infor">
                <div className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </div>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <div className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <div className="item-img">
                <img loading="lazy"
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </div>

              <div className="item-infor">
                <div className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </div>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <div className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <div className="item-img">
                <img loading="lazy"
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </div>

              <div className="item-infor">
                <div className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </div>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <div className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </Carousel>
      </div>
      <div className="box-sale-button">
        <div className="button">
          Xem tất cả <BsArrowRightCircle />
        </div>
      </div>
    </div>
  );
}

export default HomeSales;
