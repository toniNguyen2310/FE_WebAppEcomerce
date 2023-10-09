/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayMenu, notDisplayMenu } from "../../redux/menu/menuSlice,";
import HeaderExport from "./HeaderExport";
import "./header.scss";
import { useDebounce } from "../../utils/hook";
function Header(props) {
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);
  const [isScroll, setIsScroll] = useState(false);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  // const [isDisplayMenu, setIsDisplayMenu] = useState(false);
  const isDisplayMenu = useSelector((state) => state.menu.isDisplayMenu);

  const debounceOffset = useDebounce(offset, 10);
  //cía nào mà setState nhiều quá mà cần bắt sự kiện ở useEffect thì dùng useDebounce để giảm lag

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
