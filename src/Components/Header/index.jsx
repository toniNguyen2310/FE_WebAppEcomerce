/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  displayCart,
  doFetchListCartError,
  doFetchListCartPending,
} from "../../redux/cart/cartSlice";
import { displayMenu, notDisplayMenu } from "../../redux/menu/menuSlice,";
import {
  adjustListCartByUserID,
  fetchListCartByUserId,
} from "../../services.js/api";
import { useDebounce } from "../../utils/hooks/useDebounce";
import HeaderExport from "./HeaderExport";
import "./header.scss";
function Header(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.account.user);
  const listCart = useSelector((state) => state.cart.listCart);
  const listCartFirst = useSelector((state) => state.cart.listCartFirst);
  const isDisplayMenu = useSelector((state) => state.menu.isDisplayMenu);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const location = useLocation();
  const [offset, setOffset] = useState(0);
  const [isScroll, setIsScroll] = useState(false);
  const debounceOffset = useDebounce(offset, 10);
  const debounceListCart = useDebounce(listCart, 300);
  const debounceLocation = useDebounce(location, 100);

  //When scrolling below 400px, the small panel appears, hiding the large panel, and vice versa.
  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
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

  //Save new cart when changed
  useEffect(() => {
    if (isAuthenticated) {
      if (JSON.stringify(listCart) !== JSON.stringify(listCartFirst)) {
        let dataCart = listCart;
        dataCart = dataCart.map((e) => {
          return {
            productId: e.productId._id,
            quantity: e.quantity,
          };
        });

        adjustListCartByUserID({ id: user._id, cart: dataCart });
      }
    }
  }, [debounceListCart]);

  useEffect(() => {
    //Fetch product data every time the URL address changes
    const fetchListCart = async () => {
      //When authenticated, get data from the DB
      dispatch(doFetchListCartPending());
      if (user && user._id) {
        //RENDER LIST CART BY API
        const res = await fetchListCartByUserId(user._id);
        if (res && res.data) {
          dispatch(displayCart(res.data));
        } else {
          //STOP LOADING
          dispatch(doFetchListCartError());
        }
      } else {
        let listCartLS = JSON.parse(localStorage.getItem("listCart"));
        //When NOT authenticated, get data from the Local Storage
        if (!listCartLS) {
          localStorage.setItem("listCart", JSON.stringify([]));
          return;
        } else {
          dispatch(displayCart(listCartLS));
        }
      }
    };

    fetchListCart();
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
        idUnique={"1"}
      />

      <HeaderExport
        isDisplayMenu={isDisplayMenu}
        closeMenu={closeMenu}
        isAuthenticated={isAuthenticated}
        openMenu={openMenu}
        showSmallHeader={isScroll}
        fixedHeader={true}
        idUnique={"2"}
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
