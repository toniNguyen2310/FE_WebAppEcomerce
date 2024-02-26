import React from "react";
import {dataCategory } from "../../utils/constant";
import HomeBanner from "../HomeBanner";
import HomeProduct from "../HomeProduct";
import HomeSales from "../HomeSales";
import HomeSearchMore from "../HomeSearchMore";
import HomeTrend from "../HomeTrend/HomeTrend";
import "./homepage.scss";

function HomePage(props) {
  return (
    <div className="homepage">
      <HomeBanner />
      <HomeSales />
      <HomeTrend />
      {dataCategory.slice(1).map((e) => {
        return (
          <HomeProduct
            key={e.value}
            categoryValue={e.value}
            categoryLabel={e.label}
          />
        );
      })}

      <HomeSearchMore />
    </div>
  );
}

export default HomePage;
