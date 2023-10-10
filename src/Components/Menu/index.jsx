import React from "react";
import { LuKeyboard, LuLampDesk } from "react-icons/lu";
import { SlEarphones } from "react-icons/sl";
import { BsSpeaker, BsMouse2 } from "react-icons/bs";
import { PiOfficeChair } from "react-icons/pi";
import { MdDesk } from "react-icons/md";
import { BiCubeAlt, BiJoystick, BiBandAid } from "react-icons/bi";
import "./menu.scss";
import { useNavigate } from "react-router-dom";

function MenuCategory(props) {
  const { position, background, display, zindex } = props;
  const navigate = useNavigate();
  return (
    <div
      className="header-menu"
      style={{
        position: position,
        background: background,
        display: display,
        zIndex: zindex,
      }}
    >
      <div className="header-menu-item">
        <a onClick={() => navigate("/category/lot-chuot")}>
          <BiBandAid /> &nbsp; LÓT CHUỘT
        </a>
        <div className="submenu"></div>
      </div>
      <div className="header-menu-item">
        <a onClick={() => navigate("/category/chuot-gaming")}>
          <BsMouse2 /> &nbsp; CHUỘT GAMING
        </a>
        <div className="submenu"></div>
      </div>
      <div className="header-menu-item">
        <a onClick={() => navigate("/category/ban-phim-gaming")}>
          <LuKeyboard /> &nbsp; BÀN PHÍM GAMING
        </a>
        <div className="submenu"></div>
      </div>
      <div className="header-menu-item">
        <a onClick={() => navigate("/category/tai-nghe")}>
          <SlEarphones /> &nbsp; TAI NGHE GAMING
        </a>
        <div className="submenu"></div>
      </div>
      <div className="header-menu-item">
        <a onClick={() => navigate("/category/tay-cam-gaming")}>
          <BiJoystick /> &nbsp; TAY CẦM GAMING
        </a>
        <div className="submenu"></div>
      </div>
      <div className="header-menu-item">
        <a onClick={() => navigate("/category/loa")}>
          <BsSpeaker /> &nbsp; LOA
        </a>
        <div className="submenu"></div>
      </div>
      <div className="header-menu-item">
        <a onClick={() => navigate("/category/mo-hinh")}>
          <BiCubeAlt /> &nbsp; MÔ HÌNH
        </a>
        <div className="submenu"></div>
      </div>
      <div className="header-menu-item">
        <a onClick={() => navigate("/category/phu-kien")}>
          <LuLampDesk /> &nbsp; PHỤ KIỆN
        </a>
        <div className="submenu"></div>
      </div>
      <div className="header-menu-item">
        <a onClick={() => navigate("/category/ghe-gaming")}>
          <PiOfficeChair /> &nbsp; GHẾ GAMING
        </a>
        <div className="submenu"></div>
      </div>
      <div className="header-menu-item">
        <a onClick={() => navigate("/category/ban-gaming")}>
          <MdDesk /> &nbsp; BÀN GAMING
        </a>
        <div className="submenu"></div>
      </div>
    </div>
  );
}

export default MenuCategory;
