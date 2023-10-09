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
          {listData?.map((product) => {
            return (
              <CardProduct
                key={product?.id || product?._id}
                product={product}
                handleRederectDetailProduct={handleRederectDetailProduct}
              />
            );
          })}

          {/* <div className="item-cover">
            <div className="item">
              <div className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </div>

              <div className="item-infor">
                <div className="item-infor-name">
                  PAD x
                </div>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <div className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <div className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </div>

              <div className="item-infor">
                <div className="item-infor-name">
                  PAD
                </div>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <div className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <div className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </div>

              <div className="item-infor">
                <div className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </div>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <div className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <div className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </div>

              <div className="item-infor">
                <div className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </div>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <div className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <div className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </div>

              <div className="item-infor">
                <div className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </div>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <div className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <div className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </div>

              <div className="item-infor">
                <div className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </div>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <div className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <div className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </div>

              <div className="item-infor">
                <div className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </div>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <div className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <div className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </div>

              <div className="item-infor">
                <div className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </div>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <div className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <div className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </div>

              <div className="item-infor">
                <div className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </div>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <div className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <div className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </div>

              <div className="item-infor">
                <div className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </div>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <div className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <div className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </div>

              <div className="item-infor">
                <div className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </div>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <div className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <div className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </div>

              <div className="item-infor">
                <div className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </div>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <div className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <div className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </div>

              <div className="item-infor">
                <div className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </div>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <div className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <div className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </div>

              <div className="item-infor">
                <div className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </div>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <div className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-cover">
            <div className="item">
              <div className="item-img">
                <img
                  src="https://lacdau.com/media/product/250-745-592b78f027525d0a9ba8cdd4ef56efbc.jpg"
                  alt=""
                />
              </div>

              <div className="item-infor">
                <div className="item-infor-name">
                  PAD 33 CÁ HEO WITH LOVE
                </div>
                <div className="item-infor-container">
                  <div className="item-infor-container-price">
                    <p className="main-price">
                      60.000<u>đ</u>
                    </p>
                  </div>
                  <div className="item-infor-container-cart">
                    <AiOutlineShoppingCart />
                  </div>
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
