import React, { useEffect, useState } from "react";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCartService } from "../../redux/cart/cartSlice";
import SkeletonText from "../Skeleton/SkeletonText";
import ContentLoader from "react-content-loader";
import { useFormatNumberToMoney } from "../../utils/hooks/useFormatNumberToMoney";
import ConsumerIncentives from "./ConsumerIncentives";

function ProductDetailLayout(props) {
  const { dataProduct, isLoading } = props;
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const [imagesProduct, setImagesProduct] = useState([]);
  const user = useSelector((state) => state.account.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = async (product) => {
      dispatch(addToCartService(product));
  };

  const handleBuyNow = (product) => {
    navigate("/cart");
  };

  useEffect(() => {
    if (dataProduct && dataProduct.images) {
      setImagesProduct([
        {
          original: dataProduct.images[0],
          thumbnail: dataProduct.images[0],
        },
        {
          original: dataProduct.images[1],
          thumbnail: dataProduct.images[1],
        },
        {
          original: dataProduct.images[2],
          thumbnail: dataProduct.images[2],
        },
      ]);
    }
  }, [dataProduct]);

  return (
    <>
      {isLoading ? (
        <div className="detail-product container">
          <div className="detail-product-content">
            <div className="img-detail">
              <ContentLoader
                className="skeleton-img"
                backgroundColor="#f0f0f0"
                foregroundColor="#dedede"
                {...props}
              >
                <rect className="skeleton-img-rect" />
              </ContentLoader>
            </div>
            <div className="content-detail">
              <div className="footer-detail ">
                <h2>
                  <SkeletonText width={"200px"} height={"20px"} />
                </h2>
                <div className="product-description">
                  <p className="product-description-title">Thông số sản phẩm</p>
                  <p className="product-description-feature">
                    <SkeletonText width={"220px"} height={"20px"} />
                  </p>
                  <p className="product-description-feature">
                    <SkeletonText width={"250px"} height={"20px"} />
                  </p>
                </div>
                <div className="price mt-4">
                  <span className="price-title">Giá:</span>
                  <span className="price-product">
                    <span>
                      <SkeletonText width={"150px"} height={"25px"} />
                    </span>
                  </span>
                </div>
                <div className="button-footer">
                  <button className="btn btn-danger add-to-cart">
                    Thêm vào giỏ
                  </button>

                  <button className="btn btn-danger go-to-cart">
                    Đi tới giỏ hàng
                  </button>
                </div>
                <ConsumerIncentives />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="detail-product container">
          <div className="detail-product-content">
            <div className="img-detail">
              <ReactImageGallery className="image" items={imagesProduct} />
            </div>
            <div className="content-detail">
              <div className="footer-detail">
                <h2>{dataProduct?.name} </h2>

                <div className="product-description">
                  <p className="product-description-title">Thông số sản phẩm</p>
                  <p className="product-description-feature">
                    {dataProduct?.description}
                  </p>
                </div>
                <div className="price mt-4">
                  <span className="price-title">Giá:</span>
                  {dataProduct.discount === "0" ? (
                    <span className="price-product">
                      <span>
                      {useFormatNumberToMoney(dataProduct?.priceAfter)}
                      </span>
                    </span>
                  ) : (
                    <span className="price-product">
                      <span>
                        {useFormatNumberToMoney(dataProduct?.priceAfter)}
                      </span>
                      <span className="price-product-sale">
                      {useFormatNumberToMoney(dataProduct?.price)}
                      </span>
                      <span className="price-product-discount">
                        (Tiết kiệm:{dataProduct?.discount}%)
                      </span>
                    </span>
                  )}
                </div>
                <div className="button-footer">
                  <button
                    onClick={() => handleAddToCart(dataProduct)}
                    className="btn btn-danger add-to-cart"
                  >
                    Thêm vào giỏ
                  </button>

                  <button
                    onClick={() => handleBuyNow(dataProduct)}
                    className="btn btn-danger go-to-cart"
                  >
                    Đi tới giỏ hàng
                  </button>
                </div>
                <ConsumerIncentives />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetailLayout;
