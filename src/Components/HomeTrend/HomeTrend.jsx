import React from "react";
import "./homeTrend.scss";
import { BiRightArrowAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function HomeTrend(props) {
  const navigate = useNavigate();
  return (
    <div className="home-trend-group">
      <h2 className="home-trend-title">XU HƯỚNG MUA SẮM</h2>
      <div className="home-trend-category">
        <a
          onClick={() => navigate("/category/ban-phim-gaming")}
          className="home-trend-category-item"
        >
          <img
            loading="lazy"
            src="https://lacdau.com/media/lib/26-07-2022/1.png"
            alt=""
          />
          <p className="home-trend-category-item-text">
            <span>Bàn phím gaming</span>
            <span>Giảm đến 30%</span>
            <BiRightArrowAlt />
          </p>
        </a>
        <a
          onClick={() => navigate("/category/chuot-gaming")}
          className="home-trend-category-item"
        >
          <img
            loading="lazy"
            src="https://lacdau.com/media/lib/06-07-2022/group75.png"
            alt=""
          />
          <p className="home-trend-category-item-text">
            <span>Chuột gaming</span>
            <span>Ưu đãi chỉ từ 100k</span>
            <BiRightArrowAlt />
          </p>
        </a>
        <a
          onClick={() => navigate("/category/tai-nghe ")}
          className="home-trend-category-item"
        >
          <img
            loading="lazy"
            src="https://lacdau.com/media/lib/26-07-2022/2.png"
            alt=""
          />
          <p className="home-trend-category-item-text">
            <span>Tai nghe gaming</span>
            <span>Ưu đãi chỉ từ 100k</span>
            <BiRightArrowAlt />
          </p>
        </a>
        <a
          onClick={() => navigate("/category/loa")}
          className="home-trend-category-item"
        >
          <img
            loading="lazy"
            src="https://lacdau.com/media/lib/26-07-2022/3.png"
            alt=""
          />
          <p className="home-trend-category-item-text">
            <span>Loa </span>
            <span>Giảm đến 40%</span>
            <BiRightArrowAlt />
          </p>
        </a>
      </div>
    </div>
  );
}

export default HomeTrend;
