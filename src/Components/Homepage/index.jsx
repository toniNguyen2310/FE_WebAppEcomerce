import React from "react";
import "./homepage.scss";
import HomeSales from "../HomeSales";
import HomeBanner from "../HomeBanner";
import HomeProduct from "../HomeProduct";
import HomeSearchMore from "../HomeSearchMore";
import HomeTrend from "../HomeTrend/HomeTrend";
function HomePage(props) {
  return (
    <div className="homepage">
      <HomeBanner />
      <HomeSales />
      <HomeTrend />
      <HomeProduct />
      <HomeSearchMore />
    </div>
  );
}

export default HomePage;
