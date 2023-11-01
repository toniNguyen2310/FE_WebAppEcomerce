import React from "react";
import "./homeSearchMore.scss";
import SearchMoreCard from "./SearchMoreCard";
import { Carousel } from "antd";
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

  const dataSearchMore = [
    {
      value: "lot-chuot",
      label: "Lót chuột",
      img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/l/o/lot-chuot-s-case-chong-moi-co-tay.png",
    },
    {
      value: "chuot-gaming",
      label: "Chuột gaming",
      img: "https://file.hstatic.net/200000722513/file/chuot_aa348bf0177b4795a39ab66d51e62ed7.jpg",
    },
    {
      value: "ban-phim-gaming",
      label: "Bàn phím ",
      img: "https://product.hstatic.net/200000722513/product/ban-phim-co-gaming-dareu-ek87-v2-led-rgb-04_4233d17ae0734ed198d0e5b927f6aa11_master.png",
    },
    {
      value: "tai-nghe",
      label: "Tai nghe",
      img: "https://file.hstatic.net/200000722513/file/tai_nghe_ed3b4f52172f40929e1d3ab493099b73.jpg",
    },
    {
      value: "tay-cam-gaming",
      label: "Tay cầm",
      img: "https://product.hstatic.net/200000722513/product/photo_2023-05-20_11-31-09_f50b9da563444097b85cb643726fdf81_016f95a091be451d8024299ba4d66484_master.jpg",
    },
    {
      value: "loa",
      label: "Loa",
      img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/m/a/marshall_emberton_2.png",
    },
    {
      value: "mo-hinh",
      label: "Mô hình",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnaj8Zy9CcUf1CQelg2TKRTY_v9LAbbsP_atw-jNyGuQhzH-p2p-xsv9Fmp3TfF4S0E2A&usqp=CAU",
    },
    {
      value: "phu-kien",
      label: "Phụ kiện",
      img: "https://product.hstatic.net/200000722513/product/hinh_1b929023834c4b45917667f21ce70fae_medium.gif",
    },
    {
      value: "ghe-gaming",
      label: "Ghế gaming",
      img: "https://file.hstatic.net/200000722513/file/ghe_e1ff4e3493f14aa982676b3c4574135e.jpg",
    },
    {
      value: "ban-gaming",
      label: "Bàn gaming",
      img: "https://product.hstatic.net/200000722513/product/345_dff6987a86c3729d2bd253_8b4d40fa7ccf4b98aa0b0ccbd3e782a5_96cefaa165794d6ebfe4067b87574283_master.jpg",
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
          {dataSearchMore?.map((item) => {
            return <SearchMoreCard key={item.label} item={item} />;
          })}
        </Carousel>
      </div>
    </div>
  );
}

export default HomeSearchMore;
