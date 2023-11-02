import React from "react";
import { BiBandAid, BiCubeAlt, BiJoystick } from "react-icons/bi";
import { BsMouse2, BsSpeaker } from "react-icons/bs";
import { LuKeyboard, LuLampDesk } from "react-icons/lu";
import { MdDesk } from "react-icons/md";
import { PiOfficeChair } from "react-icons/pi";
import { SlEarphones } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import {
  banGaming,
  banPhimGaming,
  chuotGaming,
  gheGaming,
  loaIcon,
  lotChuot,
  moHinh,
  phuKien,
  taiNghe,
  tayCamGaming,
} from "../Export/ExportVarible";
import "./menu.scss";

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
        <div className="submenu">
          {lotChuot.map((e) => {
            return (
              <div
                key={e.label}
                className="brand-container"
                onClick={() => navigate(`/category/lot-chuot?brand=${e.value}`)}
              >
                <div className="brand-container-img">
                  <img src={e.logo} alt="" />
                </div>
                <div className="brand-container-title">LÓT CHUỘT {e.label}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="header-menu-item">
        <a onClick={() => navigate("/category/chuot-gaming")}>
          <BsMouse2 /> &nbsp; CHUỘT GAMING
        </a>
        <div className="submenu">
          {chuotGaming.map((e) => {
            return (
              <div
                key={e.label}
                className="brand-container"
                onClick={() =>
                  navigate(`/category/chuot-gaming?brand=${e.value}`)
                }
              >
                <div className="brand-container-img">
                  <img src={e.logo} alt="" />
                </div>
                <div className="brand-container-title">CHUỘT {e.label}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="header-menu-item">
        <a onClick={() => navigate("/category/ban-phim-gaming")}>
          <LuKeyboard /> &nbsp; BÀN PHÍM GAMING
        </a>
        <div className="submenu">
          {banPhimGaming.map((e) => {
            return (
              <div
                key={e.label}
                className="brand-container"
                onClick={() =>
                  navigate(`/category/ban-phim-gaming?brand=${e.value}`)
                }
              >
                <div className="brand-container-img">
                  <img src={e.logo} alt="" />
                </div>
                <div className="brand-container-title">BÀN PHÍM {e.label}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="header-menu-item">
        <a onClick={() => navigate("/category/tai-nghe")}>
          <SlEarphones /> &nbsp; TAI NGHE GAMING
        </a>
        <div className="submenu">
          {taiNghe.map((e) => {
            return (
              <div
                key={e.label}
                className="brand-container"
                onClick={() => navigate(`/category/tai-nghe?brand=${e.value}`)}
              >
                <div className="brand-container-img">
                  <img src={e.logo} alt="" />
                </div>
                <div className="brand-container-title">TAI NGHE {e.label}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="header-menu-item">
        <a onClick={() => navigate("/category/tay-cam-gaming")}>
          <BiJoystick /> &nbsp; TAY CẦM GAMING
        </a>
        <div className="submenu">
          {tayCamGaming.map((e) => {
            return (
              <div
                key={e.label}
                className="brand-container"
                onClick={() =>
                  navigate(`/category/tay-cam-gaming?brand=${e.value}`)
                }
              >
                <div className="brand-container-img">
                  <img src={e.logo} alt="" />
                </div>
                <div className="brand-container-title">TAY CẦM {e.label}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="header-menu-item">
        <a onClick={() => navigate("/category/loa")}>
          <BsSpeaker /> &nbsp; LOA
        </a>
        <div className="submenu">
          {loaIcon.map((e) => {
            return (
              <div
                key={e.label}
                className="brand-container"
                onClick={() => navigate(`/category/loa?brand=${e.value}`)}
              >
                <div className="brand-container-img">
                  <img src={e.logo} alt="" />
                </div>
                <div className="brand-container-title">LOA {e.label}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="header-menu-item">
        <a onClick={() => navigate("/category/mo-hinh")}>
          <BiCubeAlt /> &nbsp; MÔ HÌNH
        </a>
        <div className="submenu">
          {moHinh.map((e) => {
            return (
              <div
                key={e.label}
                className="brand-container"
                onClick={() => navigate(`/category/mo-hinh?brand=${e.value}`)}
              >
                <div className="brand-container-img">
                  <img src={e.logo} alt="" />
                </div>
                <div className="brand-container-title">MÔ HÌNH {e.label}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="header-menu-item">
        <a onClick={() => navigate("/category/phu-kien")}>
          <LuLampDesk /> &nbsp; PHỤ KIỆN
        </a>
        <div className="submenu">
          {phuKien.map((e) => {
            return (
              <div
                key={e.label}
                className="brand-container"
                onClick={() => navigate(`/category/phu-kien?brand=${e.value}`)}
              >
                <div className="brand-container-img">
                  <img src={e.logo} alt="" />
                </div>
                <div className="brand-container-title"> {e.label}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="header-menu-item">
        <a onClick={() => navigate("/category/ghe-gaming")}>
          <PiOfficeChair /> &nbsp; GHẾ GAMING
        </a>
        <div className="submenu">
          {gheGaming.map((e) => {
            return (
              <div
                key={e.label}
                className="brand-container"
                onClick={() =>
                  navigate(`/category/ghe-gaming?brand=${e.value}`)
                }
              >
                <div className="brand-container-img">
                  <img src={e.logo} alt="" />
                </div>
                <div className="brand-container-title">GHẾ {e.label}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="header-menu-item">
        <a onClick={() => navigate("/category/ban-gaming")}>
          <MdDesk /> &nbsp; BÀN GAMING
        </a>
        <div className="submenu">
          {banGaming.map((e) => {
            return (
              <div
                key={e.label}
                className="brand-container"
                onClick={() =>
                  navigate(`/category/ban-gaming?brand=${e.value}`)
                }
              >
                <div className="brand-container-img">
                  <img src={e.logo} alt="" />
                </div>
                <div className="brand-container-title">
                  BÀN GAMING {e.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MenuCategory;
