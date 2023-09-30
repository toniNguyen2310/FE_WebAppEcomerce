import React, { useRef } from "react";
import { Carousel } from "antd";

import "./homepage.scss";
import MenuCategory from "../Menu";
function HomeBanner(props) {
  return (
    <div className="home-banner-group">
      {/* <div className="home-menu">
        <div className="home-menu-item">
          <a href="">
            <BiBandAid /> &nbsp; LÓT CHUỘT
          </a>
        </div>
        <div className="home-menu-item">
          <a href="">
            <BsMouse2 /> &nbsp; CHUỘT GAMING
          </a>
        </div>
        <div className="home-menu-item">
          <a href="">
            <LuKeyboard /> &nbsp; BÀN PHÍM GAMING
          </a>
        </div>
        <div className="home-menu-item">
          <a href="">
            <SlEarphones /> &nbsp; TAI NGHE GAMING
          </a>
        </div>
        <div className="home-menu-item">
          <a href="">
            <BiJoystick /> &nbsp; TAY CẦM GAMING
          </a>
        </div>
        <div className="home-menu-item">
          <a href="">
            <BsSpeaker /> &nbsp; LOA
          </a>
        </div>
        <div className="home-menu-item">
          <a href="">
            <BiCubeAlt /> &nbsp; MÔ HÌNH
          </a>
        </div>
        <div className="home-menu-item">
          <a href="">
            <LuLampDesk /> &nbsp; PHỤ KIỆN
          </a>
        </div>
        <div className="home-menu-item">
          <a href="">
            <PiOfficeChair /> &nbsp; GHẾ GAMING
          </a>
        </div>
        <div className="home-menu-item">
          <a href="">
            <MdDesk /> &nbsp; BÀN GAMING
          </a>
        </div>
      </div> */}
      <MenuCategory
        position={"static"}
        background={"white"}
        display={"block"}
        zindex={4}
      />

      {/* <div className="modal-menu">
        <MenuCategory position={"absolute"} background={"red"} />
      </div> */}

      <div className="home-center">
        <Carousel swipeToSlide draggable autoplay>
          <div>
            <a href="">
              <img
                src="https://lacdau.com/media/banner/04_Jul4b2820f0c4fe29e2d289589b90e47f4c.png"
                alt=""
              />
            </a>
          </div>
          <div>
            <a href="">
              <img
                src="	https://lacdau.com/media/banner/09_Jul9860edbd0f637428e39fde95121313ed.png"
                alt=""
              />
            </a>
          </div>
          {/* <div>
            <a href="">
              <img
                src="https://lacdau.com/media/banner/04_Jula2b2fecb48c5967badfe4d137f8508ec.png"
                alt=""
              />
            </a>
          </div>
          <div>
            <a href="">
              <img
                src="https://lacdau.com/media/banner/04_Jul476c025120f6806e9d46a90f17cebbdf.png"
                alt=""
              />
            </a>
          </div>
          <div>
            <a href="">
              <img
                src="https://lacdau.com/media/banner/04_Jul6bacdcd6a63d8b6a4e46c8337fc12342.png"
                alt=""
              />
            </a>
          </div> */}
        </Carousel>
      </div>
      <div className="home-right">
        <a href="" className="animation-small">
          <img
            src="https://lacdau.com/media/banner/04_Jul7f64f21fb6ba6d30b7932b6ad017b870.png"
            alt=""
          />
        </a>
        <a href="" className="animation-small">
          <img
            src="https://lacdau.com/media/banner/04_Julbc98282e1bb9acf041f8c94b05ccdfcb.png"
            alt=""
          />
        </a>
        <a href="" className="animation-small">
          <img
            src="https://lacdau.com/media/banner/04_Jul58a3f59ace6732aceb452a6e387c0c20.png"
            alt=""
          />
        </a>
      </div>
    </div>
  );
}

export default HomeBanner;
