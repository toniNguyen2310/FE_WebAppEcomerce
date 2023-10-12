import React, { useEffect, useState } from "react";
import { Checkbox } from "antd";
import { dataBrand, dataCategory } from "../AdminControl/ManagerProducts";
import { useNavigate } from "react-router-dom";
function CategoryFilter(props) {
  const {
    filterValue,
    listData,
    currentPage,
    locationSearch,
    setCheckSort,
    setParams,
    params,
  } = props;
  const [listBrand, setListBrand] = useState([]);
  const [checkBrand, setCheckBrand] = useState("");
  const [checkFilterPrice, setCheckFilterPrice] = useState("");
  const navigate = useNavigate();

  //Filter Category
  const onchangeCategory = (category) => {
    setCheckBrand("");
    setCheckSort("");
    setCheckFilterPrice("");
    setParams({ brand: "", price: "", sort: "" });
    navigate(`/category/${category}`);
  };

  //Filter Brand
  const onChangeBrand = (e) => {
    let paramsBrand = `brand=${e.target.value}`;
    console.log(`checked `, e);
    if (e.target.checked) {
      setParams({ ...params, brand: paramsBrand });
      console.log("chon");
      setCheckBrand(e.target.value);
      // navigate(`?${paramsBrand}`);
      return;
    }
    if (e.target.checked === false) {
      console.log("ko chon");
      setCheckBrand("");
      setParams({ ...params, brand: "" });
      // navigate(``);
      return;
    }
  };

  //List brand
  const renderListBrand = () => {
    if (
      currentPage === 1 &&
      !filterValue.brand &&
      !filterValue.price &&
      !filterValue.sort
    ) {
      console.log("TAO BRAND");
      let brands = [];
      listData?.map((e) => {
        brands.push(e.brand);
      });
      setListBrand(
        dataBrand.filter((e) => {
          return (
            brands
              ?.filter((item, index) => {
                return brands.indexOf(item) === index;
              })
              .indexOf(e.value) > -1
          );
        })
      );
      return;
    }
  };

  //Filter Option Price
  const onchangeFilterPrice = (e) => {
    console.log("change price>>> ", e);
    let paramsPrice = `price=${e.target.value}`;
    if (e.target.checked) {
      setCheckFilterPrice(e.target.value);
      setParams({ ...params, price: paramsPrice });
      // locationSearch?.includes("?")
      //   ? console.log("co ?")
      //   : console.log("ko co ?");
      // locationSearch?.includes("?")
      //   ? navigate(`${locationSearch}&price=${e.target.value}`)
      //   : navigate(`?price=${e.target.value}`);
    } else {
      setCheckFilterPrice("");
      setParams({ ...params, price: "" });
    }
  };

  useEffect(() => {
    renderListBrand();
  }, [listData]);

  return (
    <div className="category-filter">
      <div className="category-filter-box">
        <h3>DANH MỤC SẢN PHẨM</h3>
        <div className="filter checkbox">
          {dataCategory?.slice(1).map((e) => {
            return (
              <div
                className={`box-category ${
                  filterValue?.category === e.value ? "active" : null
                }`}
                onClick={() => onchangeCategory(e.value)}
              >
                <span>{e.label}</span>
              </div>
            );
          })}

          {/* <div
            className={`box-category ${
              filterValue?.category === "lot-chuot" ? "active" : null
            }`}
            onClick={() => {
              navigate("/category/lot-chuot");
            }}
          >
            <span>LÓT CHUỘT</span>
          </div>
          <div
            className={`box-category ${
              filterValue?.category === "chuot-gaming" ? "active" : null
            }`}
            onClick={() => {
              navigate("/category/chuot-gaming");
            }}
          >
            <span>CHUỘT GAMING</span>
          </div>
          <div
            className={`box-category ${
              filterValue?.category === "ban-phim-gaming" ? "active" : null
            }`}
            onClick={() => {
              navigate("/category/ban-phim-gaming");
            }}
          >
            <span>BÀN PHÍM GAMING</span>
          </div>
          <div
            className={`box-category ${
              filterValue?.category === "tai-nghe" ? "active" : null
            }`}
            onClick={() => {
              navigate("/category/tai-nghe");
            }}
          >
            <span>TAI NGHE</span>
          </div>
          <div
            className={`box-category ${
              filterValue?.category === "tay-cam-gaming" ? "active" : null
            }`}
            onClick={() => {
              navigate("/category/tay-cam-gaming");
            }}
          >
            <span>TAY CẦM GAMING</span>
          </div>
          <div
            className={`box-category ${
              filterValue?.category === "loa" ? "active" : null
            }`}
            onClick={() => {
              navigate("/category/loa");
            }}
          >
            <span>LOA</span>
          </div>
          <div
            className={`box-category ${
              filterValue?.category === "mo-hinh" ? "active" : null
            }`}
            onClick={() => {
              navigate("/category/mo-hinh");
            }}
          >
            <span>MÔ HÌNH</span>
          </div>
          <div
            className={`box-category ${
              filterValue?.category === "phu-kien" ? "active" : null
            }`}
            onClick={() => {
              navigate("/category/phu-kien");
            }}
          >
            <span>PHỤ KIỆN</span>
          </div>
          <div
            className={`box-category ${
              filterValue?.category === "ghe-gaming" ? "active" : null
            }`}
            onClick={() => {
              navigate("/category/ghe-gaming");
            }}
          >
            <span>GHẾ GAMING</span>
          </div>
          <div
            className={`box-category ${
              filterValue?.category === "ban-gaming" ? "active" : null
            }`}
            onClick={() => {
              navigate("/category/ban-gaming");
            }}
          >
            <span>BÀN GAMING</span>
          </div> */}
        </div>
      </div>
      <div className="category-filter-box">
        <h3>HÃNG SẢN XUẤT</h3>
        <div className="filter checkbox">
          {listBrand?.map((e) => {
            return (
              <Checkbox
                checked={e.value === checkBrand ? true : false}
                value={e.value}
                onChange={onChangeBrand}
                key={e.label}
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
          <Checkbox
            checked={checkFilterPrice === "op01" ? true : false}
            value={"op01"}
            onChange={onchangeFilterPrice}
          >
            Dưới 100 ngàn
          </Checkbox>
          <Checkbox
            value={"op12"}
            checked={checkFilterPrice === "op12" ? true : false}
            onChange={onchangeFilterPrice}
          >
            100 ngàn - 200 ngàn
          </Checkbox>
          <Checkbox
            value={"op25"}
            checked={checkFilterPrice === "op25" ? true : false}
            onChange={onchangeFilterPrice}
          >
            200 ngàn - 500 ngàn
          </Checkbox>
          <Checkbox
            value={"op50"}
            checked={checkFilterPrice === "op50" ? true : false}
            onChange={onchangeFilterPrice}
          >
            Trên 500 ngàn
          </Checkbox>
        </div>
      </div>
    </div>
  );
}

export default CategoryFilter;
