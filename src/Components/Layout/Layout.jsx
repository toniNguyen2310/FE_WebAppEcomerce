import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useScrollToTop } from "../../utils/hooks/useScrollToTop";
import Header from "../Header";
import Footer from "../Footer";
import { ToastContainer } from "react-toastify";
import MenuResponsive from "../Menu/MenuResponsive";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";

//LAYOUT MAIN
export const Layout = () => {
    const navigate = useNavigate();
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };
  
    useEffect(() => {
      window.onscroll = function () {};
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [scrollPosition]);
    return (
      <div className="layout">
        <div
          className={`scroll-to-top  ${scrollPosition > 400 ? "show" : "hidden"}`}
        >
          <BsFillArrowUpCircleFill
            className="to-top"
            onClick={()=>useScrollToTop()}
          />
        </div>
        <div className="scroll-to-top" style={{ bottom: "40px" }}>
          <TbTruckDelivery
            className="search-order"
            onClick={() => navigate("/search-order")}
          />
        </div>
  
        <Header />
        <Outlet />
        <Footer />
        <ToastContainer
          position="top-center"
          hideProgressBar={false}
          theme="light"
        />
        <MenuResponsive />
      </div>
    );
  };

