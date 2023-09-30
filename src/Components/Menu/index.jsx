import React from "react";
import { LuKeyboard, LuLampDesk } from "react-icons/lu";
import { SlEarphones } from "react-icons/sl";
import { BsSpeaker, BsMouse2 } from "react-icons/bs";
import { PiOfficeChair } from "react-icons/pi";
import { MdDesk } from "react-icons/md";
import { BiCubeAlt, BiJoystick, BiBandAid } from "react-icons/bi";
import "./menu.scss";

function MenuCategory(props) {
  const { position, background, display, zindex } = props;
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
        <a href="">
          <BiBandAid /> &nbsp; LÓT CHUỘT
        </a>
        <div className="submenu"></div>
      </div>
      <div className="header-menu-item">
        <a href="">
          <BsMouse2 /> &nbsp; CHUỘT GAMING
        </a>
        <div className="submenu"></div>
      </div>
      <div className="header-menu-item">
        <a href="">
          <LuKeyboard /> &nbsp; BÀN PHÍM GAMING
        </a>
        <div className="submenu"></div>
      </div>
      <div className="header-menu-item">
        <a href="">
          <SlEarphones /> &nbsp; TAI NGHE GAMING
        </a>
        <div className="submenu"></div>
      </div>
      <div className="header-menu-item">
        <a href="">
          <BiJoystick /> &nbsp; TAY CẦM GAMING
        </a>
        <div className="submenu"></div>
      </div>
      <div className="header-menu-item">
        <a href="">
          <BsSpeaker /> &nbsp; LOA
        </a>
        <div className="submenu"></div>
      </div>
      <div className="header-menu-item">
        <a href="">
          <BiCubeAlt /> &nbsp; MÔ HÌNH
        </a>
        <div className="submenu"></div>
      </div>
      <div className="header-menu-item">
        <a href="">
          <LuLampDesk /> &nbsp; PHỤ KIỆN
        </a>
        <div className="submenu"></div>
      </div>
      <div className="header-menu-item">
        <a href="">
          <PiOfficeChair /> &nbsp; GHẾ GAMING
        </a>
        <div className="submenu"></div>
      </div>
      <div className="header-menu-item">
        <a href="">
          <MdDesk /> &nbsp; BÀN GAMING
        </a>
        <div className="submenu"></div>
      </div>
    </div>
  );
}

export default MenuCategory;
