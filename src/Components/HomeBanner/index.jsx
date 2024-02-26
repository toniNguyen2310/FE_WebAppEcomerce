import { Carousel } from "antd";
import React, { useRef } from "react";

import { useNavigate } from "react-router-dom";
import MenuCategory from "../Menu";
import "./homeBanner.scss";
import { listProductBanner } from "../../utils/constant";
function HomeBanner(props) {
  const navigate = useNavigate();

  const pointer = useRef({ x: 0, y: 0 });
  const onMouseDown = (e) => {
    pointer.current = { x: e.clientX, y: e.clientY };
  };
  const onMouseUp = (e, sub) => {
    const { x, y } = pointer.current;
    if (Math.abs(e.clientX - x) < 10 && Math.abs(e.clientY - y) < 10) {
      if (sub === "lotchuot") {
        navigate("/category/lot-chuot");
      } else if (sub === "banphim") {
        navigate("/category/chuot-gaming");
      }
    }
  };

  return (
    <div className="home-banner-group">
      <MenuCategory
        position={"relative"}
        background={"white"}
        display={"block"}
        zindex={4}
      />

      <div className="home-center">
        <Carousel swipeToSlide draggable autoplay accessibility={true}>
          <div
            onMouseDown={onMouseDown}
            onMouseUp={(e) => onMouseUp(e, "lotchuot")}
          >
            <a>
              <img
                loading="lazy"
                src="https://lacdau.com/media/banner/04_Jul4b2820f0c4fe29e2d289589b90e47f4c.png"
                alt=""
              />
            </a>
          </div>
          <div
            onMouseDown={onMouseDown}
            onMouseUp={(e) => onMouseUp(e, "banphim")}
          >
            <a>
              <img
                loading="lazy"
                src="	https://lacdau.com/media/banner/09_Jul9860edbd0f637428e39fde95121313ed.png"
                alt=""
              />
            </a>
          </div>
        </Carousel>
      </div>
      <div className="home-right">
        {listProductBanner && listProductBanner.map((e,index)=>{
          return(
            <a
          key={index}
          onClick={() => navigate(`/category/${e.slug}`)}
          className="animation-small"
        >
          <img
            loading="lazy"
            src={e.img}
            alt={e.slug}
          />
        </a>
          )
        })}
      </div>
    </div>
  );
}

export default HomeBanner;
