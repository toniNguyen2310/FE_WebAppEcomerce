import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  AiFillFacebook,
  AiFillYoutube,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BsInstagram, BsFillBagCheckFill, BsSearch } from "react-icons/bs";
import { FaTiktok, FaUserCircle } from "react-icons/fa";
import { PiSpeakerSimpleHighBold } from "react-icons/pi";
import { GrLocation } from "react-icons/gr";
import { TfiMenuAlt } from "react-icons/tfi";
import { FiPhoneCall } from "react-icons/fi";
import "./header.scss";
import { useDispatch, useSelector } from "react-redux";
import DropdownComponent from "../Dropdown";
import { BiLogoGmail, BiSolidPhoneCall } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import MenuCategory from "../Menu";
import { displayMenu, notDisplayMenu } from "../../redux/menu/menuSlice,";
function Header(props) {
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);
  const [isScroll, setIsScroll] = useState(false);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  // const [isDisplayMenu, setIsDisplayMenu] = useState(false);
  const isDisplayMenu = useSelector((state) => state.menu.isDisplayMenu);

  useEffect(() => {
    console.log("isDisplayMenu>>> ", isDisplayMenu);
  }, []);

  //SCROLL
  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    // console.log(window.pageYOffset);
    if (window.pageYOffset > 380) {
      setIsScroll(true);
    } else if (window.pageYOffset < 380) {
      setIsScroll(false);
    }
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  const openMenu = () => {
    dispatch(displayMenu());
  };
  const closeMenu = () => {
    dispatch(notDisplayMenu());
  };

  return (
    <>
      <header
        className="header-container"
        id="header-check"
        onClick={() => (isDisplayMenu ? closeMenu() : null)}
        style={isScroll ? { position: "fixed" } : { position: "sticky" }}
      >
        <div
          className="header__top"
          style={isScroll ? { display: "none" } : null}
        >
          <div className="header__cover">
            <div className="header__top__left">
              <div className="header__top__left-item">
                <GrLocation />
                &nbsp;Địa chỉ liên hệ
                <div className="header__top__left-item-hover">
                  <p>
                    <a
                      href="https://www.google.com/maps/place/15+P.Y%C3%AAn+L%C3%A3ng,+Trung+Li%E1%BB%87t,+%C4%90%E1%BB%91ng+%C4%90a,+H%C3%A0+N%E1%BB%99i/@21.0132533,105.8163974,17z/data=!4m6!3m5!1s0x3135ab7d33b90bd5:0x9d9d6f5da32dda1e!8m2!3d21.0132533!4d105.8185914!16s%2Fg%2F11c5jk0mbd?hl=vi-VN&entry=ttu"
                      target="_blank"
                    >
                      <MdLocationOn />
                      15 P.Yên Lãng,Trung Liệt, Đống Đa
                    </a>
                  </p>
                  <p>
                    <BiLogoGmail /> lacdaushop@gmail.com
                  </p>
                  <p>
                    <BiSolidPhoneCall />
                    0349.xxx.461
                  </p>
                </div>
              </div>
              <a
                href="https://shopee.vn/shop/35610180?utm_campaign=-&utm_content=----&utm_medium=affiliates&utm_source=an_17015640017"
                className="header__top__left-title "
                target="_blank"
              >
                <BsFillBagCheckFill />
                &nbsp; Shoppe
              </a>
              <a
                href="https://www.instagram.com/lac.dau/"
                className="header__top__left-title"
                target="_blank"
              >
                <BsInstagram />
                &nbsp; Instagram
              </a>
              <a
                href="https://www.tiktok.com/@lacdaustore"
                className="header__top__left-title"
                target="_blank"
              >
                <FaTiktok />
                &nbsp; Tiktok
              </a>
              <a
                href="https://www.youtube.com/channel/UC0kL-L4W-QBwgwqCv408J2A"
                className="header__top__left-title"
                target="_blank"
              >
                <AiFillYoutube />
                &nbsp; Youtube
              </a>
              <a
                href="https://www.facebook.com/lacdaustore"
                className="header__top__left-title"
                target="_blank"
              >
                <AiFillFacebook />
                &nbsp; Facebook
              </a>
            </div>
            <div className="header__top__right">
              <a
                href="https://lacdau.com/tin-tuc"
                target="_blank"
                className="header__top__right-title"
              >
                <PiSpeakerSimpleHighBold />
                &nbsp; Tin tức
              </a>

              <span className="header__top__right-title margin-left__40px">
                <NavLink className="avatar" to={`/register`}>
                  <FaUserCircle />
                </NavLink>
                {isAuthenticated ? (
                  <DropdownComponent />
                ) : (
                  <div className="loginester">
                    <NavLink
                      to={`/register`}
                      className="header__top__right-title-user"
                    >
                      &nbsp; Đăng ký&nbsp;/&nbsp;
                    </NavLink>
                    <NavLink
                      to={`/login`}
                      className="header__top__right-title-user"
                    >
                      Đăng nhập
                    </NavLink>
                  </div>
                )}
              </span>
            </div>
          </div>
        </div>
        <div
          className="header__main"
          style={isScroll ? { height: "70px" } : null}
        >
          <nav className="header__main__cover">
            <div
              className="header__main__cover__left"
              style={isScroll ? { width: "50%" } : null}
            >
              <NavLink
                to={`/`}
                onClick={() => window.scrollTo(0, 0)}
                className="header__main__cover__left-logo margin-left__30px"
              >
                <img
                  className="header__main__cover__left-logo-img"
                  src="https://lacdau.com/static/assets/default/images/logo.png"
                  // src="https://e7.pngegg.com/pngimages/775/938/png-clipart-body-jewellery-font-baymax-baymax-body-jewellery.png"
                  alt=""
                />
              </NavLink>
              <div className="header__main__cover__left-menu margin-left__30px">
                <p
                  className="header__main__cover__left-menu-title"
                  // onClick={() => setIsDisplayMenu(!isDisplayMenu)}
                  onClick={() => (isDisplayMenu ? closeMenu() : openMenu())}
                >
                  <TfiMenuAlt /> &nbsp; DANH MỤC
                </p>
                <MenuCategory
                  display={isDisplayMenu ? "block" : "none"}
                  position={"absolute"}
                  background={"#ffffff"}
                  zindex={12}
                />
              </div>
              <div className="header__main__cover__left-search margin-left__10px">
                <button>
                  <BsSearch />
                </button>
                <input type="text" placeholder="Bạn cần tìm gì?" />
              </div>
            </div>
            <div className="header__main__cover__right">
              <div className="header__main__cover__right-hotline">
                <div className="header__main__cover__right-hotline-icon margin-left__30px ">
                  <FiPhoneCall className="skew-y-shake" />
                </div>
                <div className="header__main__cover__right-hotline-detail ">
                  <span className="numberPhone-text">Hotline</span>
                  <span className="main-color numberPhone  font-weight-600">
                    0349.xxx.461
                  </span>
                </div>
              </div>
              <div className="header__main-cart">
                <a href="" className="header__main-cart-icon">
                  <AiOutlineShoppingCart />
                  <span className="header__main-cart-icon-amount">20</span>
                </a>
                <a href="" className="header__main-cart-title">
                  Giỏ hàng
                </a>
                <div className="header__main-cart-detail">aa</div>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <div
        style={isDisplayMenu ? { display: "block" } : { display: "none" }}
        onClick={() => closeMenu()}
        className="modal"
      ></div>
    </>
  );
}

export default Header;
