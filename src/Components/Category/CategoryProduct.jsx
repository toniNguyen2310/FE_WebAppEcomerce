/* eslint-disable react/prop-types */
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import CardProduct from "../CardProduct/CardProduct";
import { convertSlug } from "../Homepage";

function CategoryProduct(props) {
  const navigate = useNavigate();
  const {
    categoryName,
    listData,
    total,
    pageSize,
    currentPage,
    handleOnchangeProductsFilter,
    brandLabel,
  } = props;

  const handleRederectDetailProduct = (product) => {
    // console.log("product>> ", product);
    const slug = convertSlug(product.name);
    // console.log("slug>> ", slug);
    navigate(`/${slug}?id=${product._id}`);
  };

  return (
    <div className="category-product">
      <div className="category-product-title">
        <h2> {categoryName} &nbsp; </h2> <p>({total} sản phẩm)</p> &nbsp;
        <p style={{ color: "red" }}>{brandLabel}</p>
      </div>
      <div className="category-product-container">
        <div className="category-product-container-filter">
          <a href="" className="filter-sort">
            Hàng mới
          </a>
          <a href="" className="filter-sort">
            Giá tăng dần
          </a>
          <a href="" className="filter-sort">
            Giá giảm dần
          </a>
        </div>
        <div className="category-product-container-list">
          {listData?.map((product) => {
            return (
              <CardProduct
                key={product?.id || product?._id}
                product={product}
                handleRederectDetailProduct={handleRederectDetailProduct}
              />
            );
          })}
        </div>
      </div>
      <div className="pagination" style={{ clear: "both" }}>
        {/* <ReactPaginate nextLabel="next >" previousLabel="< previous" /> */}
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
