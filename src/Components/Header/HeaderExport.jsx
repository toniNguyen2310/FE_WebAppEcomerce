import { useEffect, useState } from "react";
import {
  AiFillFacebook,
  AiFillYoutube,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BiLogoGmail, BiSolidPhoneCall } from "react-icons/bi";
import { BsFillBagCheckFill, BsInstagram, BsSearch } from "react-icons/bs";
import { FaTiktok, FaUserCircle } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { MdLocationOn } from "react-icons/md";
import { PiSpeakerSimpleHighBold } from "react-icons/pi";
import { TfiMenuAlt } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { SpinnerDotted } from "spinners-react";
import { searchProductNavbarAPI } from "../../services.js/api";
import { useDebounce } from "../../utils/hook";
import CartHoverHeader from "../CartHoverHeader/CartHoverHeader";
import MenuCategory from "../Menu";
import ProductSearchBar from "./ProductSearchBar";
import "./header.scss";

function HeaderExport(props) {
  const {
    fixedHeader,
    isDisplayMenu,
    closeMenu,
    isAuthenticated,
    openMenu,
    showSmallHeader,
    idUnique,
  } = props;
  const [displaySearch, setDisPlaySearch] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  const debounceSearchProduct = useDebounce(searchProduct, 1000);
  const listCart = useSelector((state) => state.cart.listCart);
  const [listProductSearch, setListProductSearch] = useState([]);
  const nameAccount = useSelector((state) => state.account.user.username);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);

  //SEARCH PRODUCT
  const getListPRoductsWhenSearch = async (value) => {
    if (value) {
      setIsLoadingSearch(true);
      const res = await searchProductNavbarAPI(value.trim());
      if (res && res.data) {
        setIsLoadingSearch(false);
        setListProductSearch(res.data);
      } else {
        setIsLoadingSearch(false);
        setListProductSearch([]);
      }
    } else if (!value) {
      setListProductSearch([]);
    }
  };

  useEffect(() => {
    if (!searchProduct) {
      getListPRoductsWhenSearch();
    } else {
      getListPRoductsWhenSearch(searchProduct);
    }
  }, [debounceSearchProduct]);

  window.addEventListener("click", function (event) {
    if (!event.target.closest(`#Seachbar${idUnique}`)) {
      setDisPlaySearch(false);
    } else {
      setDisPlaySearch(true);
    }
  });

  return (
    <>
      <header
        className={`header-container ${fixedHeader ? "hidewhenres" : null} ${
          showSmallHeader ? "header-small-show" : "header-small-hidden"
        }`}
        id="header-check"
        onClick={() => (isDisplayMenu ? closeMenu() : null)}
        style={
          fixedHeader
            ? { position: `fixed`, top: showSmallHeader ? "0" : "-900px" }
            : { position: "relative" }
        }
      >
        <div className="header__top">
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
                {isAuthenticated ? (
                  // <DropdownComponent />
                  <>
                    <a className="avatar">
                      <FaUserCircle />
                    </a>
                    <div className="loginester">
                      <NavLink
                        to={`/profile`}
                        className="header__top__right-title-user"
                      >
                        &nbsp; Xin chào, {nameAccount}
                      </NavLink>
                    </div>
                  </>
                ) : (
                  <>
                    <NavLink className="avatar" to={`/register`}>
                      <FaUserCircle />
                    </NavLink>
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
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
        <div
          className="header__main"
          style={fixedHeader ? { height: "70px" } : null}
        >
          <nav className="header__main__cover">
            <div
              className="header__main__cover__left"
              // style={fixedHeader ? { width: "50%" } : null}
            >
              <NavLink
                to={`/`}
                onClick={() => window.scrollTo(0, 0)}
                className="header__main__cover__left-logo margin-left__30px"
                style={fixedHeader ? { width: "15%" } : null}
              >
                <img
                  loading="lazy"
                  className="header__main__cover__left-logo-img"
                  src="https://lacdau.com/static/assets/default/images/logo.png"
                  alt=""
                />
              </NavLink>
              <div className="header__main__cover__left-menu margin-left__30px">
                <p
                  className="header__main__cover__left-menu-title"
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
                  {isLoadingSearch ? (
                    <SpinnerDotted
                      size={25}
                      thickness={180}
                      speed={164}
                      color="#29a07e"
                    />
                  ) : (
                    <BsSearch />
                  )}
                </button>
                <input
                  type="text"
                  placeholder="Bạn cần tìm gì?"
                  value={searchProduct}
                  onChange={(e) => setSearchProduct(e.target.value)}
                  id={`Seachbar${idUnique}`}
                />
                <ProductSearchBar
                  className={"max600"}
                  listProductSearch={listProductSearch}
                  setSearchProduct={setSearchProduct}
                  displaySearch={displaySearch}
                />
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
                <NavLink to={`/cart`} className="header__main-cart-icon">
                  <AiOutlineShoppingCart />
                  <span className="header__main-cart-icon-amount">
                    {listCart?.length ? listCart?.length : "0"}
                  </span>
                </NavLink>
                <NavLink to={`/cart`} className="header__main-cart-title">
                  Giỏ hàng
                </NavLink>
                <CartHoverHeader />
              </div>
            </div>
          </nav>
          <ProductSearchBar
            className={"min600"}
            listProductSearch={listProductSearch}
            setSearchProduct={setSearchProduct}
            displaySearch={displaySearch}
          />
        </div>
      </header>
    </>
  );
}

export default HeaderExport;
