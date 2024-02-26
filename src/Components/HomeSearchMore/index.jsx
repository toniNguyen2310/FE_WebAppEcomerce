import { Carousel } from "antd";
import React from "react";
import SearchMoreCard from "./SearchMoreCard";
import "./homeSearchMore.scss";
import { dataProductSearchMore } from "../../utils/constant";
function HomeSearchMore(props) {
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


  return (
    <div className="home-list-category">
      <div className="home-title">
        <span>
          <a>DANH MỤC SẢN PHẨM</a>
        </span>
      </div>
      <div className="home-category">
        <Carousel
          swipeToSlide
          draggable
          // autoplay
          // autoplaySpeed={2500}
          slidesPerRow={1}
          slidesToShow={10}
          dots={false}
          infinite={false}
          responsive={responsiveCarousel}
        >
          {dataProductSearchMore?.map((item) => {
            return <SearchMoreCard key={item.label} item={item} />;
          })}
        </Carousel>
      </div>
    </div>
  );
}

export default HomeSearchMore;
