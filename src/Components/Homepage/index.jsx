import React from "react";
import "./homepage.scss";
import HomeSales from "../HomeSales";
import HomeBanner from "../HomeBanner";
import HomeProduct from "../HomeProduct";
import HomeSearchMore from "../HomeSearchMore";
function HomePage(props) {
  return (
    <div className="homepage">
      <HomeBanner />
      <HomeSales />
      <HomeProduct />
      <HomeSearchMore />
    </div>
  );
}

export default HomePage;
