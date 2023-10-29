/* eslint-disable react/prop-types */
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import CardProduct from "../CardProduct/CardProduct";
import { convertSlug } from "../Homepage";
import { useEffect, useState } from "react";
import {
  dataBrand,
  dataCategory,
  dataPrice,
} from "../AdminControl/ManagerProducts";
import SkeletonFilter from "../Skeleton/SkeletonFilter";
import CardProductSkl from "../CardProduct/CardProductSkl";
import SkeletonText from "../Skeleton/SkeletonText";

function CategoryProduct(props) {
  const {
    setCheckSort,
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
  //HANDLE PRODUCT DETAIL
  const handleRederectDetailProduct = (product) => {
    // console.log("product>> ", product);
    const slug = convertSlug(product.name);
    // console.log("slug>> ", slug);
    navigate(`/product/${slug}?id=${product._id}`);
  };

  //HANDLE SORT PRODUCT
  const handleSortProduct = (option) => {
    setCheckSort(option);
    // console.log("option>>> ", option);
    if (option === "") {
      // console.log("vo1");
      setParams({ ...params, sort: "" });
    } else {
      // console.log("vo2");
      setParams({ ...params, sort: `sort=${option}` });
    }
  };

  return (
    <>
      <div className="category-product">
        <div className="category-product-title">
          <h2>
            {isLoading ? (
              <SkeletonText width={"200px"} height={"25px"} />
            ) : (
              <> {categoryLabel}</>
            )}
            &nbsp;
          </h2>
          &nbsp;
          <p style={{ fontWeight: "normal", fontSize: "14px" }}>
            {isLoading ? (
              <SkeletonText width={"90px"} height={"16px"} />
            ) : (
              <>({total} sản phẩm)</>
            )}
          </p>
          &nbsp;
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
                {listFake.length > 0 ? (
                  listFake.map((e) => {
                    return <CardProductSkl key={e} />;
                  })
                ) : (
                  <div>Không tìm thấy kết quả. Vui lòng thử lại!</div>
                )}
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
                        handleRederectDetailProduct={
                          handleRederectDetailProduct
                        }
                      />
                      // <CardProductSkl />
                    );
                  })
                ) : (
                  <div>Không tìm thấy kết quả. Vui lòng thử lại!</div>
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
