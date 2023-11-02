import { Carousel } from "antd";
import React, { useEffect, useState } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { IoIosFlash } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { getProductByDiscountSlice } from "../../services.js/api";
import CardProduct from "../CardProduct/CardProduct";
import CardProductSkl from "../CardProduct/CardProductSkl";
import { convertSlug } from "../Homepage";
import "./homeSales.scss";
import CountDownSale from "./CountDownSale";

function HomeSales(props) {
  const [listProductSales, setListProductSales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [listProductFake, setListFake] = useState([...Array(10).keys()]);

  const navigate = useNavigate();
  const responsiveCarousel = [
    {
      breakpoint: 1150,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false,
        dots: false,
      },
    },
    // {
    //   breakpoint: 1024,
    //   settings: {
    //     slidesToShow: 4,
    //     slidesToScroll: 1,
    //     infinite: false,
    //     dots: false,
    //   },
    // },
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

  const handleGetDataSale = async () => {
    if (localStorage.getItem("homeSale")) {
      setIsLoading(false);
      setListProductSales(JSON.parse(localStorage.getItem("homeSale")));

      return;
    }
    const res = await getProductByDiscountSlice();
    if (res && res.data) {
      setIsLoading(false);
      setListProductSales(res.data);
      localStorage.setItem(`homeSale`, JSON.stringify(res.data));
    }
  };

  //Handle rederect product
  const handleRedirectDetailProduct = (product) => {
    const slug = convertSlug(product.name);
    navigate(`/product/${slug}?id=${product._id}`);
  };

  useEffect(() => {
    handleGetDataSale();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home-sale">
      <CountDownSale />
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
          {isLoading
            ? listProductFake.map((e) => {
                return <CardProductSkl key={e} />;
              })
            : listProductSales.map((product) => {
                return (
                  <CardProduct
                    key={product?.id || product?._id}
                    product={product}
                    handleRedirectDetailProduct={handleRedirectDetailProduct}
                  />
                );
              })}
        </Carousel>
      </div>
      <div className="box-sale-button">
        <div className="button" onClick={() => navigate("/category/lot-chuot")}>
          Xem tất cả <BsArrowRightCircle />
        </div>
      </div>
    </div>
  );
}

export default HomeSales;
