/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import CategoryFilter from "./CategoryFilter";
import "./category.scss";
import CategoryProduct from "./CategoryProduct";
import { useLocation, useNavigate } from "react-router-dom";
import { dataBrand, dataCategory } from "../AdminControl/ManagerProducts";
import { getListBrandByCategory, getProducts } from "../../services.js/api";
import { useDebounce } from "../../utils/hook";

function Category(props) {
  const navigate = useNavigate();
  const [listData, setListData] = useState([]);
  const [listBrand, setListBrand] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [params, setParams] = useState({ brand: "", price: "", sort: "" });
  //FILTER SORT
  const [checkSort, setCheckSort] = useState("");
  //PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(16);
  const [total, setTotal] = useState(0);
  const [categoryLabel, setCategoryLabel] = useState("");

  //FILTET VALUE
  const [filterValue, setFilterValue] = useState({
    category: "",
    brand: "",
    price: "",
    sort: "",
  });

  //Deboune
  let location = useLocation();
  const debounceLocation = useDebounce(location, 100);
  const debounceCurrentPage = useDebounce(currentPage, 300);
  const debounceFilterValue = useDebounce(filterValue, 300);

  //FETCH PRODUCT
  const fetchProduct = async () => {
    if (!filterValue.category) {
      return;
    }
    if (filterValue) {
      setIsLoading(true);
      const query = `current=${currentPage}&pageSize=${pageSize}&category=${filterValue.category}&brand=${filterValue.brand}&priceAfter=${filterValue.sort}&filterPrice=${filterValue.price}`;
      // console.log("query>> ", query);
      // console.log("TESST DAYYYYY", filterValue.category, params);
      //FETCT PRODUCT
      const res = await getProducts(query);

      if (res && res.data) {
        console.log("NEW res>> ", res);
        setListData(res.data.products);
        setTotal(res.data.count);
        setIsLoading(false);
      } else {
        setIsLoading(false);
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
      // console.log("KO CO PARAMS");
      navigate("");
    } else {
      // console.log("PARAMS>>> ", `?${arrayParams.join("&")}`);
      navigate(`?${arrayParams.join("&")}`);
    }
  };

  //HANDLE LISTBRAND
  const renderListBrand = async (category) => {
    if (currentPage === 1) {
      const resBrand = await getListBrandByCategory(category);
      // console.log("resBrand>> ", resBrand.data);
      if (resBrand && resBrand.data) {
        // console.log("TAO BRAND");
        setCategoryLabel(resBrand.data.name);
        setListBrand(
          dataBrand.filter((e) => {
            return (
              resBrand.data.brand
                .filter((item, index) => {
                  return resBrand.data.brand.indexOf(item) === index;
                })
                .indexOf(e.value) > -1
            );
          })
        );
        return;
      }
    }
  };

  //NEW-END

  const handleOnchangeProductsFilter = (pagination) => {
    // console.log("pagination>>> ", pagination);
    window.scrollTo(0, 0);
    if (pagination !== currentPage) {
      setCurrentPage(pagination);
    }
  };

  //LOCATION
  useEffect(() => {
    // console.log("LOCATION>> ", location);
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

    if (
      params.brand.includes(brandLocation) &&
      params.price.includes(priceLocation) &&
      params.sort.includes(sortLocation)
    ) {
      if (categoryLocation != filterValue.category) {
        renderListBrand(categoryLocation);
      }
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
    } else {
      setParams({
        ...params,
        brand: brandLocation ? `brand=${brandLocation}` : "",
        price: priceLocation ? `price=${priceLocation}` : "",
      });
      setFilterValue({
        category: categoryLocation,
        brand: brandLocation ? brandLocation : "",
        price: priceLocation ? priceLocation : "",
        sort: "",
      });
      renderListBrand(categoryLocation);
      return;
    }
  }, [debounceLocation]);

  //CURRENT PAGINATION
  useEffect(() => {
    fetchProduct();
  }, [debounceCurrentPage]);

  //VALUE FILTER
  useEffect(() => {
    // console.log("filterValue>> ", filterValue);
    setCurrentPage(1);
    fetchProduct();
  }, [debounceFilterValue]);

  //PARAMS
  useEffect(() => {
    // console.log("params Effect >>> ", params);
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
          <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            TRANG CHỦ
          </span>
          &nbsp;/&nbsp; {categoryLabel}
        </nav>
        <div className="category-container">
          <CategoryFilter
            setCheckSort={setCheckSort}
            params={params}
            setParams={setParams}
            filterValue={filterValue}
            listData={listData}
            currentPage={currentPage}
            listBrand={listBrand}
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
            categoryLabel={categoryLabel}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default Category;
