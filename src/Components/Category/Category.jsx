/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import CategoryFilter from "./CategoryFilter";
import "./category.scss";
import CategoryProduct from "./CategoryProduct";
import { useLocation, useNavigate } from "react-router-dom";
import { dataBrand, dataCategory } from "../AdminControl/ManagerProducts";
import { getProducts } from "../../services.js/api";
import { useDebounce } from "../../utils/hook";
function Category(props) {
  const navigate = useNavigate();
  const [listData, setListData] = useState([]);
  const [locationSearch, setLocationSearch] = useState("");
  const [params, setParams] = useState({ brand: "", price: "", sort: "" });
  //FILTER SORT
  const [checkSort, setCheckSort] = useState("");
  //PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(16);
  const [total, setTotal] = useState(0);

  //NEW-START
  const [filterValue, setFilterValue] = useState({
    category: "",
    brand: "",
    price: "",
    sort: "",
  });

  //Deboune
  let location = useLocation();
  const debounceLocation = useDebounce(location, 300);
  const debounceCurrentPage = useDebounce(currentPage, 300);
  const debounceFilterValue = useDebounce(filterValue, 200);

  //FETCH PRODUCT
  const fetchProduct = async () => {
    if (!filterValue.category) {
      return;
    }
    if (filterValue) {
      const query = `current=${currentPage}&pageSize=${pageSize}&category=${filterValue.category}&brand=${filterValue.brand}&priceAfter=${filterValue.sort}&filterPrice=${filterValue.price}`;
      console.log("query>> ", query);
      const res = await getProducts(query);
      if (res && res.data) {
        console.log("NEW res>> ", res);
        setListData(res.data.products);
        setTotal(res.data.count);
      }
    }
  };

  const navigateParams = () => {
    let arrayParams = [
      params.brand ? params.brand : null,
      params.price ? params.price : null,
      params.sort ? params.sort : null,
    ];
    arrayParams = arrayParams.filter((e) => e != null);
    // if (!params.brand && !params.price && !params.sort) {
    //   console.log("params rong");
    //   return;
    // }
    if (arrayParams.length === 0) {
      console.log("KO CO PARAMS");
      navigate("");
    } else {
      console.log("PARAMS>>> ", `?${arrayParams.join("&")}`);
      navigate(`?${arrayParams.join("&")}`);
    }
  };

  //NEW-END

  const handleOnchangeProductsFilter = (pagination) => {
    console.log("pagination>>> ", pagination);
    if (pagination !== currentPage) {
      setCurrentPage(pagination);
    }
    // if (pagination && pagination.pageSize != pageSize) {
    //   console.log("onchange2");
    //   setPageSize(pagination.pageSize);
    //   setCurrentPage(1);
    // }
  };

  //LOCATION
  useEffect(() => {
    console.log("location>> ", location.search);
    //CATEGORY
    const categoryLocation = location?.pathname.split("/")[2];

    //BRAND
    const brandLocation = new URLSearchParams(location.search).get("brand")
      ? new URLSearchParams(location.search).get("brand")
      : "";

    //FILTER OPTION PRICE
    const priceLocation = new URLSearchParams(location.search).get("price")
      ? new URLSearchParams(location.search).get("price")
      : "";

    //SORT PRICE
    const sortLocation = new URLSearchParams(location.search).get("sort")
      ? new URLSearchParams(location.search).get("sort")
      : "";

    //HANDLE
    console.log(
      "data location>>> ",
      categoryLocation,
      brandLocation,
      priceLocation,
      sortLocation
    );
    setLocationSearch(location.search);
    if (
      params.brand.includes(brandLocation) &&
      params.price.includes(priceLocation) &&
      params.sort.includes(sortLocation)
    ) {
      setFilterValue({
        category: categoryLocation,
        brand: brandLocation,
        price: priceLocation,
        sort:
          sortLocation === "increase"
            ? "1"
            : sortLocation === "decrease"
            ? "-1"
            : sortLocation,
      });
      console.log("OK");
    } else {
      console.log("NOT OK");
      setFilterValue({
        category: categoryLocation,
        brand: "",
        price: "",
        sort: "",
      });
    }
  }, [debounceLocation]);

  //CURRENT PAGINATION
  useEffect(() => {
    fetchProduct();
  }, [debounceCurrentPage]);

  //VALUE FILTER
  useEffect(() => {
    console.log("filterValue>> ", filterValue);
    setCurrentPage(1);
    fetchProduct();
  }, [debounceFilterValue]);

  //PARAMS
  useEffect(() => {
    console.log("params Effect >>> ", params);
    // if (!params.brand && !params.price && !params.sort) {
    //   console.log("params rong");
    //   return;
    // }
    navigateParams();
  }, [params]);
  return (
    <div className="page-category">
      <div className="category">
        <nav className="category-header">
          TRANG CHỦ / {filterValue.category}
        </nav>
        <div className="category-container">
          <CategoryFilter
            setCheckSort={setCheckSort}
            params={params}
            setParams={setParams}
            locationSearch={locationSearch}
            filterValue={filterValue}
            listData={listData}
            currentPage={currentPage}
          />
          <CategoryProduct
            setCheckSort={setCheckSort}
            checkSort={checkSort}
            params={params}
            setParams={setParams}
            listData={listData}
            currentPage={currentPage}
            pageSize={pageSize}
            total={total}
            handleOnchangeProductsFilter={handleOnchangeProductsFilter}
            filterValue={filterValue}
          />
        </div>
      </div>
    </div>
  );
}

export default Category;
