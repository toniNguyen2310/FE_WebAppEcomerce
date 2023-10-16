/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayMenu, notDisplayMenu } from "../../redux/menu/menuSlice,";
import HeaderExport from "./HeaderExport";
import "./header.scss";
import { useDebounce } from "../../utils/hook";
import { useLocation } from "react-router-dom";
import { fetchCartByUseAPI } from "../../services.js/api";
import {
  displayCart,
  doFetchListCartError,
  doFetchListCartPending,
} from "../../redux/cart/cartSlice";
function Header(props) {
  const dispatch = useDispatch();
  const [checkLocation, setCheckLocation] = useState("");
  const [offset, setOffset] = useState(0);
  const [isScroll, setIsScroll] = useState(false);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  // const [isDisplayMenu, setIsDisplayMenu] = useState(false);
  const isDisplayMenu = useSelector((state) => state.menu.isDisplayMenu);
  const user = useSelector((state) => state.account.user);
  const [cartLocalStorage, setCartLocalStorage] = useState(
    localStorage.getItem("listCart")
  );
  const debounceOffset = useDebounce(offset, 10);

  //SCROLL
  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    // console.log(window.pageYOffset);
    if (window.pageYOffset > 400) {
      setIsScroll(true);
    } else if (window.pageYOffset < 450) {
      setIsScroll(false);
    }
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [debounceOffset]);

  const openMenu = () => {
    dispatch(displayMenu());
  };
  const closeMenu = () => {
    dispatch(notDisplayMenu());
  };

  //LOCATION
  const location = useLocation();
  const debounceLocation = useDebounce(location, 100);

  //FETCH DATA CART WHEN CHANGE LOCATION
  const fetchListCart = async () => {
    if (user && user._id) {
      console.log("user>> ", user);
      //RENDER LIST CART BY API
      const res = await fetchCartByUseAPI(user._id);
      dispatch(doFetchListCartPending());
      // return;
      if (res && res.data) {
        console.log("CART>> ", res.data);
        dispatch(displayCart(res.data.listCart));
        localStorage.setItem("listCart", JSON.stringify(res.data.listCart));
      } else {
        dispatch(doFetchListCartError());
      }
    } else {
      console.log("KO CO USER");
      //XU LY CART BANG LOCAL STORAGE ( NO API)
    }
  };

  useEffect(() => {
    console.log("location>> HOME", location.pathname);
    console.log("checkLocation>> ", checkLocation);

    fetchListCart();
    setCheckLocation(location.pathname);
  }, [debounceLocation, user]);

  return (
    <>
      <HeaderExport
        isDisplayMenu={isDisplayMenu}
        closeMenu={closeMenu}
        isAuthenticated={isAuthenticated}
        openMenu={openMenu}
        positionFixed={false}
        showSmallHeader={false}
        fixedHeader={false}
      />

      <HeaderExport
        isDisplayMenu={isDisplayMenu}
        closeMenu={closeMenu}
        isAuthenticated={isAuthenticated}
        openMenu={openMenu}
        showSmallHeader={isScroll}
        fixedHeader={true}
      />

      <div
        style={isDisplayMenu ? { display: "block" } : { display: "none" }}
        onClick={() => closeMenu()}
        className="modal"
      ></div>
    </>
  );
}

export default Header;
