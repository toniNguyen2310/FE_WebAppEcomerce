import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Pagination } from "antd";
import { convertSlug } from "../Homepage";
import { useNavigate } from "react-router-dom";

function CategoryProduct(props) {
  const navigate = useNavigate();
  const {
    categoryName,
    listData,
    total,
    pageSize,
    currentPage,
    handleOnchangeProductsFilter,
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
        <h2> {categoryName} &nbsp; </h2> <p>({total} sản phẩm)</p>
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
          {listData?.map((e, index) => {
            return (
              <div className="item-cover" key={e._id}>
                <div className="item">
                  <a href="" className="item-img">
                    <img src={e.images[0]} alt="" />
                  </a>
                  {e.discount === "0" ? (
                    <div className="item-infor">
                      <p
                        className="item-infor-name"
                        onClick={() => handleRederectDetailProduct(e)}
                      >
                        {e.name}
                      </p>
                      <div className="item-infor-container">
                        <div className="item-infor-container-price">
                          <p className="main-price">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(e.priceAfter)}
                          </p>
                          <p className="old-price" style={{ color: "#ffffff" }}>
                            &nbsp;
                          </p>
                        </div>
                        <a href="" className="item-infor-container-cart">
                          <AiOutlineShoppingCart />
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="item-infor">
                      <p
                        onClick={() => handleRederectDetailProduct(e)}
                        className="item-infor-name"
                      >
                        {e.name}
                      </p>
                      <div className="item-infor-container">
                        <div className="item-infor-container-price">
                          <p className="old-price">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(e.price)}
                          </p>
                          <p className="main-price">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(e.priceAfter)}
                          </p>
                        </div>
                        <a href="" className="item-infor-container-cart">
                          <AiOutlineShoppingCart />
                        </a>
                      </div>
                      <div className="item-discount">{e.discount}%</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* <div className="item-cover">
            <div className="item">
              <a href="" className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </a>

              <div className="item-infor">
                <a href="" className="item-infor-name">
                  PAD x
                </a>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <a href="" className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <a href="" className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </a>

              <div className="item-infor">
                <a href="" className="item-infor-name">
                  PAD
                </a>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <a href="" className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <a href="" className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </a>

              <div className="item-infor">
                <a href="" className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </a>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <a href="" className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <a href="" className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </a>

              <div className="item-infor">
                <a href="" className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </a>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <a href="" className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <a href="" className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </a>

              <div className="item-infor">
                <a href="" className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </a>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <a href="" className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <a href="" className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </a>

              <div className="item-infor">
                <a href="" className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </a>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <a href="" className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <a href="" className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </a>

              <div className="item-infor">
                <a href="" className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </a>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <a href="" className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <a href="" className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </a>

              <div className="item-infor">
                <a href="" className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </a>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <a href="" className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <a href="" className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </a>

              <div className="item-infor">
                <a href="" className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </a>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <a href="" className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <a href="" className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </a>

              <div className="item-infor">
                <a href="" className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </a>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <a href="" className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <a href="" className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </a>

              <div className="item-infor">
                <a href="" className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </a>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <a href="" className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <a href="" className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </a>

              <div className="item-infor">
                <a href="" className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </a>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <a href="" className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <a href="" className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </a>

              <div className="item-infor">
                <a href="" className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </a>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <a href="" className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <a href="" className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </a>

              <div className="item-infor">
                <a href="" className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </a>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <a href="" className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <a href="" className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </a>

              <div className="item-infor">
                <a href="" className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </a>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <a href="" className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </a>
                </div>
              </div>
            </div>
          </div> */}
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
