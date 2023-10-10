import React, { useEffect, useState } from "react";
import { Checkbox } from "antd";
import { dataBrand, dataCategory } from "../AdminControl/ManagerProducts";
import { useNavigate } from "react-router-dom";
function CategoryFilter(props) {
  const {
    listBrand,
    categoryValue,
    categoryName,
    fetchProductFilter,
    setBrandValue,
    setBrandLabel,
    brandValue,
    setCurrentPage,
    handleRefreshFilter,
  } = props;
  const [isSelected, setIsSelected] = useState();
  const [checkCategory, setCheckCategory] = useState(false);
  const navigate = useNavigate();

  //Onchange Brand
  const onChangeBrand = (e) => {
    console.log(`checked `, e);
    if (e.target.checked) {
      console.log("chon");
      navigate(`?brand=${e.target.value}`);
      // !isSelected && setIsSelected(e.target.value);
      return;
    }
    if (e.target.checked === false) {
      console.log("ko chon");
      navigate(``);
      setBrandValue("");
      // fetchProductFilter();
      // setIsSelected(null);
      return;
    }
  };

  //onclick category
  const changeCategory = (categoryName) => {
    handleRefreshFilter();
    navigate(`/category/${categoryName}`);
  };

  useEffect(() => {
    // console.log("categoryValue>>> ", categoryValue, categoryName);
  }, [categoryValue]);

  return (
    <div className="category-filter">
      <div className="category-filter-box">
        <h3>DANH MỤC SẢN PHẨM</h3>
        {/* <div className="filter checkbox">
          {dataCategory.map((e) => {
            return (
              <Checkbox
                checked={categoryValue === e.value ? true : false}
                // defaultChecked={categoryValue === e.value ? true : false}
                disabled={isSelected ? isSelected !== e.value : false}
                value={e.value}
                onChange={onChangeCategory}
                key={e.value}
              >
                {e.label}
              </Checkbox>
            );
          })}
        </div> */}
        <div className="filter checkbox">
          <div
            className={`box-category ${
              categoryName === "LÓT CHUỘT" ? "active" : null
            }`}
            onClick={() => {
              changeCategory("lot-chuot");
              // navigate("/category/lot-chuot");
            }}
          >
            <span>LÓT CHUỘT</span>
          </div>
          <div
            className={`box-category ${
              categoryName === "CHUỘT GAMING" ? "active" : null
            }`}
            onClick={() => {
              changeCategory("chuot-gaming");
              // navigate("/category/chuot-gaming");
            }}
          >
            <span>CHUỘT GAMING</span>
          </div>
          <div
            className={`box-category ${
              categoryName === "BÀN PHÍM GAMING" ? "active" : null
            }`}
            onClick={() => {
              navigate("/category/ban-phim-gaming");
            }}
          >
            <span>BÀN PHÍM GAMING</span>
          </div>
          <div
            className={`box-category ${
              categoryName === "TAI NGHE" ? "active" : null
            }`}
            onClick={() => {
              navigate("/category/tai-nghe");
            }}
          >
            <span>TAI NGHE</span>
          </div>
          <div
            className={`box-category ${
              categoryName === "TAY CẦM GAMING" ? "active" : null
            }`}
            onClick={() => {
              navigate("/category/tay-cam-gaming");
            }}
          >
            <span>TAY CẦM GAMING</span>
          </div>
          <div
            className={`box-category ${
              categoryName === "LOA" ? "active" : null
            }`}
            onClick={() => {
              navigate("/category/loa");
            }}
          >
            <span>LOA</span>
          </div>
          <div
            className={`box-category ${
              categoryName === "MÔ HÌNH" ? "active" : null
            }`}
            onClick={() => {
              navigate("/category/mo-hinh");
            }}
          >
            <span>MÔ HÌNH</span>
          </div>
          <div
            className={`box-category ${
              categoryName === "PHỤ KIỆN" ? "active" : null
            }`}
            onClick={() => {
              navigate("/category/phu-kien");
            }}
          >
            <span>PHỤ KIỆN</span>
          </div>
          <div
            className={`box-category ${
              categoryName === "GHẾ GAMING" ? "active" : null
            }`}
            onClick={() => {
              navigate("/category/ghe-gaming");
            }}
          >
            <span>GHẾ GAMING</span>
          </div>
          <div
            className={`box-category ${
              categoryName === "BÀN GAMING" ? "active" : null
            }`}
            onClick={() => {
              navigate("/category/ban-gaming");
            }}
          >
            <span>BÀN GAMING</span>
          </div>
        </div>
      </div>
      <div className="category-filter-box">
        <h3>HÃNG SẢN XUẤT</h3>
        <div className="filter checkbox">
          {listBrand?.map((e) => {
            return (
              <Checkbox
                checked={e.value == brandValue ? true : false}
                value={e.value}
                onChange={onChangeBrand}
                key={e.label}
                // disabled={isSelected ? isSelected !== e.value : false}
              >
                {e.label}
              </Checkbox>
            );
          })}
        </div>
      </div>
      <div className="category-filter-box">
        <h3>KHOẢNG GIÁ</h3>
        <div className="filter checkbox">
          <Checkbox>Dưới 100 ngàn</Checkbox>
          <Checkbox>100 ngàn - 200 ngàn</Checkbox>
          <Checkbox>200 ngàn - 500 ngàn</Checkbox>
        </div>
      </div>
    </div>
  );
}

export default CategoryFilter;
