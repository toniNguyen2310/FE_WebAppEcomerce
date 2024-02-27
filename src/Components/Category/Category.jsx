import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getListBrandByCategory, getProducts } from "../../services.js/api";
import SkeletonText from "../Skeleton/SkeletonText";
import CategoryFilterResponsive from "./CategoryFilterResponsive";
import CategoryFilter from "./CategoryFilter";
import CategoryProduct from "./CategoryProduct";
import "./category.scss";
import { useDebounce } from "../../utils/hooks/useDebounce";
import useRenderListBrand from "../../utils/hooks/useRenderListBrand";
import { useScrollToTop } from "../../utils/hooks/useScrollToTop";

function Category(props) {
  const navigate = useNavigate();
  const [listData, setListData] = useState([]);
  const [listBrand, setListBrand] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [params, setParams] = useState({ brand: "", price: "", sort: "" });
  //SORT
  const [checkSort, setCheckSort] = useState("");
  //FIRST LOAD
  const [firstLoad, setFirstLoad] = useState(true);
  const [checkBrand, setCheckBrand] = useState("");
  const [checkPrice, setCheckPrice] = useState("");
  //PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [total, setTotal] = useState(0);
  const [categoryLabel, setCategoryLabel] = useState("");
  //RESPONSIVE
  const [filterRes, setFilterRes] = useState(false);
  //FILTER VALUE
  const [filterValue, setFilterValue] = useState({
    category: "",
    brand: "",
    price: "",
    sort: "",
  });

  //Debounce
  let location = useLocation();
  const debounceLocation = useDebounce(location, 50);
  const debounceCurrentPage = useDebounce(currentPage, 50);
  const debounceFilterValue = useDebounce(filterValue, 50);

  //FETCH PRODUCT
  const fetchProduct = async () => {
    if (!filterValue.category) {
      return;
    }
    if (filterValue) {
      setIsLoading(true);
      const query = `current=${currentPage}&pageSize=${pageSize}&category=${filterValue.category}&brand=${filterValue.brand}&priceAfter=${filterValue.sort}&filterPrice=${filterValue.price}`;

      const res = await getProducts(query);

      if (res && res.data) {
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

    if (arrayParams.length === 0) {
      navigate("");
    } else {
      navigate(`?${arrayParams.join("&")}`);
    }
  };


  //scroll to top when change category
  const handleOnchangeProductsFilter = (pagination) => {
    // window.scrollTo(0, 0);
    useScrollToTop()
    if (pagination !== currentPage) {
      setCurrentPage(pagination);
    }
  };

  //Filter product by URL  
  useEffect(() => {
    const categoryLocation = location?.pathname.split("/")[2];

    //Filter product by param
    const brandLocation = new URLSearchParams(location.search).get("brand")
      ? new URLSearchParams(location.search).get("brand")
      : "";

    
    const priceLocation = new URLSearchParams(location.search).get("price")
      ? new URLSearchParams(location.search).get("price")
      : "";

    
    const sortLocation = new URLSearchParams(location.search).get("sort")
      ? new URLSearchParams(location.search).get("sort")
      : "";

    if (
      params.brand.includes(brandLocation) &&
      params.price.includes(priceLocation) &&
      params.sort.includes(sortLocation)
    ) {
      if (categoryLocation != filterValue.category) {
        useRenderListBrand(categoryLocation, setListBrand , setCategoryLabel);
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
      if (firstLoad) {
        brandLocation && setCheckBrand(brandLocation);
        priceLocation && setCheckPrice(priceLocation);
      }
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

      useRenderListBrand(categoryLocation, setListBrand , setCategoryLabel);

      return;
    }
  }, [debounceLocation]);

  
  useEffect(() => {
    fetchProduct();
  }, [debounceCurrentPage]);

  
  useEffect(() => {
    setCurrentPage(1);
    fetchProduct();
  }, [debounceFilterValue]);

  
  useEffect(() => {
    navigateParams();
  }, [params]);

  return (
    <div
      className="page-category"
    >
      <div className="category">
        <nav className="category-header">
          <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            TRANG CHỦ
          </span>
          &nbsp;/&nbsp;
          {isLoading ? (
            <SkeletonText width={"150px"} height={"12px"} />
          ) : (
            <>
              <span>{categoryLabel}</span>
            </>
          )}
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
            firstLoad={firstLoad}
            setFirstLoad={setFirstLoad}
            setCheckBrand={setCheckBrand}
            checkBrand={checkBrand}
            checkPrice={checkPrice}
            setCheckPrice={setCheckPrice}
            setCurrentPage={setCurrentPage}
          />

          <CategoryProduct
            filterRes={filterRes}
            setFilterRes={setFilterRes}
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
        <CategoryFilterResponsive
          setFilterRes={setFilterRes}
          filterRes={filterRes}
          setCheckSort={setCheckSort}
          params={params}
          setParams={setParams}
          filterValue={filterValue}
          listData={listData}
          currentPage={currentPage}
          listBrand={listBrand}
          firstLoad={firstLoad}
          setFirstLoad={setFirstLoad}
          setCheckBrand={setCheckBrand}
          checkBrand={checkBrand}
          checkPrice={checkPrice}
          setCheckPrice={setCheckPrice}
        />
      </div>
    </div>
  );
}

export default Category;
