import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import "./detailProduct.scss";
import { useLocation } from "react-router-dom";
import { getProductById } from "../../services.js/api";
import { dataCategory } from "../AdminControl/ManagerProducts";
function DetailProduct(props) {
  const [dataProduct, setDataProduct] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  console.log("params>>> ", location);
  const id = params?.get("id");

  const fetchDataPRoduct = async (id) => {
    const res = await getProductById(id);
    if (res && res.data) {
      setDataProduct(res.data);
    }
  };

  const settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    draggable: true,
    infinite: true,
  };

  useEffect(() => {
    fetchDataPRoduct(id);
  }, [id]);

  useEffect(() => {
    console.log(dataProduct?.category);
    const found = dataCategory.find((e) => e.value === dataProduct?.category);
    setCategoryName(found?.label);
    // console.log("found.label>>> ", found.label);
  }, [dataProduct]);

  return (
    <div className="page-cover">
      <div className="product">
        <nav className="product-header">
          TRANG CHỦ / {categoryName} / {dataProduct.name}
        </nav>
        <div className="product-detail">
          <div className="product-detail-img">
            <Carousel {...settings}>
              {dataProduct?.images?.map((e) => {
                return (
                  <div key={e} className="carousel-image">
                    <a href="">
                      <img src={e} alt="" />
                    </a>
                  </div>
                );
              })}
              {/* <div className="carousel-image">
                <a href="">
                  <img src={images[0]} alt="" />
                </a>
              </div> */}
              {/* <div className="carousel-image">
                <a href="">
                  <img src={images[1]} alt="" />
                </a>
              </div>
              <div className="carousel-image">
                <a href="">
                  <img src={images[2]} alt="" />
                </a>
              </div> */}
            </Carousel>
          </div>
          <div className="product-detail-info">
            <div className="product-detail-info-text">
              <p className="product-name">{dataProduct.name}</p>
              <div className="product-description">
                <p className="product-description-title">Thông số sản phẩm</p>
                <p className="product-description-feature">
                  {dataProduct.description}
                </p>
              </div>
            </div>
            <div className="product-detail-info-price">
              {/* Sản phẩm có discount */}
              {dataProduct?.discount === "0" ? (
                <div className="price">
                  <div className="price-detail ">
                    <p className="price-detail-title title-discount">
                      Giá khuyến mại
                    </p>
                    <p className="price-detail-number price-discount">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(dataProduct?.priceAfter)}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="price">
                  <div className="price-detail">
                    <p className="price-detail-title ">Giá bán</p>
                    <p className="price-detail-number price-intial">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(dataProduct?.price)}
                    </p>
                  </div>
                  <div className="price-detail">
                    <p className="price-detail-title title-discount">
                      Giá khuyến mại
                    </p>
                    <p className="price-detail-number price-discount">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(dataProduct?.priceAfter)}
                      &nbsp;
                      <small>(Tiết kiệm: {dataProduct?.discount}%)</small>
                    </p>
                  </div>
                </div>
              )}

              {/* Sản phẩm không có discount */}
            </div>
            <div className="btn-buy">
              <a href="">Mua ngay</a>
              <a href="">Thêm vào giỏ</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
