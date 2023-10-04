import React, { useEffect, useState } from "react";
import "./homepage.scss";
import HomeSales from "../HomeSales";
import HomeBanner from "../HomeBanner";
import HomeProduct from "../HomeProduct";
import HomeSearchMore from "../HomeSearchMore";
import HomeTrend from "../HomeTrend/HomeTrend";
import MenuCategory from "../Menu";
import { getProductByCategorySlice } from "../../services.js/api";
import { dataCategory } from "../AdminControl/ManagerProducts";
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
