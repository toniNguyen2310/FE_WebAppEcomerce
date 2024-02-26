import React from "react";
import "./homeTrend.scss";
import { BiRightArrowAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { bannerHomeTrend } from "../../utils/constant";

function HomeTrend(props) {
  const navigate = useNavigate();

  return (
    <div className="home-trend-group">
      <h2 className="home-trend-title">XU HƯỚNG MUA SẮM</h2>
      <div className="home-trend-category"> 
      {bannerHomeTrend && bannerHomeTrend.map((e, index)=>{
        return(
          <a
          key={index}
          onClick={() => navigate(`/category/${e.slug}`)}
          className="home-trend-category-item"
        >
          <img
            loading="lazy"
            src={e.img}
            alt=""
          />
          <p className="home-trend-category-item-text">
            <span>{e.name}</span>
            <span>{e.inforDiscount}</span>
            <BiRightArrowAlt />
          </p>
        </a>
        )
      })}
      </div>
    </div>
  );
}

export default HomeTrend;
