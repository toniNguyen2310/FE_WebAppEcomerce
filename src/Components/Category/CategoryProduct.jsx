/* eslint-disable react/prop-types */
import { Pagination } from "antd";
import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {dataBrand,dataPrice } from "../../utils/constant";
import CardProduct from "../CardProduct/CardProduct";
import { convertSlug } from "../../utils/constant";

import CardProductSkl from "../CardProduct/CardProductSkl";
import SkeletonText from "../Skeleton/SkeletonText";

function CategoryProduct(props) {
  const {
    filterRes,
    setCheckSort,
    setFilterRes,
    checkSort,
    listData,
    currentPage,
    pageSize,
    total,
    handleOnchangeProductsFilter,
    filterValue,
    params,
    setParams,
    categoryLabel,
    isLoading,
  } = props;

  const navigate = useNavigate();
  const [listFake, setListFake] = useState([...Array(16).keys()]);

  //Handle redirect detail product
  const handleRedirectDetailProduct = (product) => {
    const slug = convertSlug(product.name);
    navigate(`/product/${slug}?id=${product._id}`);
  };

  //Handle sort product by price
  const handleSortProduct = (option) => {
    setCheckSort(option);
    if (option === "") {
      setParams({ ...params, sort: "" });
    } else {
      setParams({ ...params, sort: `sort=${option}` });
    }
  };

  return (
    <>
      <div className="category-product">
        <div className="category-product-title">
          <div className="category-product-title-left">
            <h2>
              {isLoading ? (
                <SkeletonText width={"200px"} height={"25px"} />
              ) : (
                <> {categoryLabel}</>
              )}
              &nbsp;
            </h2>

            <p style={{ fontWeight: "normal", fontSize: "14px" }}>
              {isLoading ? (
                <SkeletonText width={"90px"} height={"16px"} />
              ) : (
                <>
                  (<b>{total}</b> sản phẩm)
                </>
              )}
            </p>
          </div>
          <div
            className="category-product-title-right"
            onClick={() => setFilterRes(true)}
          >
            Bộ lọc&nbsp; <FiFilter style={{ fontWeight: "600" }} />
          </div>
        </div>
        <div className="category-product-container">
          <div className="category-product-container-filter">
            <div className="infor-filter">
              {filterValue.brand ? (
                <p className="infor-filter-title">
                  Nhà cung cấp:&nbsp;
                  <b className="title-red">
                    {isLoading ? (
                      <SkeletonText width={"45px"} height={"11px"} />
                    ) : (
                      <>
                        {
                          dataBrand.filter((e) => {
                            if (e.value === filterValue?.brand) {
                              return e.label;
                            }
                          })[0].label
                        }
                      </>
                    )}
                  </b>
                </p>
              ) : null}
              &nbsp;
              {filterValue.price ? (
                <p className="infor-filter-title">
                  Khoảng giá:&nbsp;
                  <b className="title-red">
                    {isLoading ? (
                      <SkeletonText width={"90px"} height={"11px"} />
                    ) : (
                      <>
                        {
                          dataPrice.filter((e) => {
                            if (e.value === filterValue?.price) {
                              return e.label;
                            }
                          })[0].label
                        }
                      </>
                    )}
                  </b>
                </p>
              ) : null}
              <p className="infor-filter-title hide">a</p>
            </div>
            <div className="infor-filter">
              <a
                className={`filter-sort ${
                  checkSort === "" ? "active-sort" : null
                }`}
                onClick={() => handleSortProduct("")}
              >
                Mới nhất
              </a>
              <a
                className={`filter-sort ${
                  checkSort === "increase" ? "active-sort" : null
                }`}
                onClick={() => handleSortProduct("increase")}
              >
                Giá tăng dần
              </a>
              <a
                className={`filter-sort ${
                  checkSort === "decrease" ? "active-sort" : null
                }`}
                onClick={() => handleSortProduct("decrease")}
              >
                Giá giảm dần
              </a>
            </div>
          </div>
          {isLoading ? (
            <>
              <div className="category-product-container-list">
                {listFake.length > 0 &&
                  listFake?.map((e) => {
                    return <CardProductSkl key={e} />;
                  })}
              </div>
            </>
          ) : (
            <>
              <div className="category-product-container-list">
                {listData.length > 0 ? (
                  listData.map((product) => {
                    return (
                      <CardProduct
                        key={product?.id || product?._id}
                        product={product}
                        handleRedirectDetailProduct={
                          handleRedirectDetailProduct
                        }
                      />
                    );
                  })
                ) : (
                  <div>Không tìm thấy sản phẩm </div>
                )}
              </div>
              <div className="pagination" style={{ clear: "both" }}>
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  onChange={handleOnchangeProductsFilter}
                  total={total}
                  showSizeChanger={false}
                  hideOnSinglePage={true}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CategoryProduct;
