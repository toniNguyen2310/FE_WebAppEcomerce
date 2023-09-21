import React from "react";
import "./homepage.scss";

import HomeSales from "../HomeSales";
import HomeBanner from "../HomeBanner";
import HomeTrending from "../HomeTrending";
import HomeProduct from "../HomeProduct";
import HomeSearchMore from "../HomeSearchMore";
function HomePage(props) {
  return (
    <div className="homepage">
      <HomeBanner />
      <HomeSales />
      <HomeTrending />
      <HomeProduct />
      <HomeSearchMore />
    </div>
  );
}

export default HomePage;
