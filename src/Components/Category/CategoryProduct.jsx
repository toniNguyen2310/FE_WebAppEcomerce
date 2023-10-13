/* eslint-disable react/prop-types */
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import CardProduct from "../CardProduct/CardProduct";
import { convertSlug } from "../Homepage";
import { useState } from "react";

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
  } = props;

  const navigate = useNavigate();

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
    console.log("option>>> ", option);
    if (option === "") {
      console.log("vo1");
      setParams({ ...params, sort: "" });
    } else {
      console.log("vo2");
      setParams({ ...params, sort: `sort=${option}` });
    }
  };

  return (
    <div className="category-product">
      <div className="category-product-title">
        <h2> {filterValue.category} &nbsp; </h2> <p>({total} sản phẩm)</p>{" "}
        &nbsp;
      </div>
      <div className="category-product-container">
        {/* <div>alo</div> */}
        <div className="category-product-container-filter">
          <div className="infor-filter">
            <p>
              Hãng sản xuất(test):
              <span style={{ color: "red" }}>{filterValue?.brand}</span>
            </p>
            &nbsp;
            <p>
              Khoảng giá(test):
              <span style={{ color: "red" }}>{filterValue?.price}</span>
            </p>
          </div>
          <div>
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
        <div className="category-product-container-list">
          {listData.length > 0 ? (
            listData.map((product) => {
              return (
                <CardProduct
                  key={product?.id || product?._id}
                  product={product}
                  handleRederectDetailProduct={handleRederectDetailProduct}
                />
              );
            })
          ) : (
            <div>Không tìm thấy kết quả. Vui lòng thử lại!</div>
          )}
        </div>
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
    </div>
  );
}

export default CategoryProduct;
