import React, { useEffect, useState } from "react";
import { Carousel, Skeleton } from "antd";
import "./homeproduct.scss";
import { BsArrowRightShort } from "react-icons/bs";
import {
  getListBrandByCategory,
  getProductByCategorySlice,
} from "../../services.js/api";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { convertSlug } from "../Homepage";
import { dataBrand } from "../AdminControl/ManagerProducts";
import CardProduct from "../CardProduct/CardProduct";
import SkeletonProduct from "../Skeleton/SkeletonProduct";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
}

function HomeProduct(props) {
  const { categoryValue, categoryLabel } = props;
  const [listBrand, setListBrand] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const responsiveCarousel = [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false,
        dots: false,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
        dots: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ];

  //handle rederect product
  const handleRederectDetailProduct = (product) => {
    // console.log("product>> ", product);
    const slug = convertSlug(product.name);
    // console.log("slug>> ", slug);
    navigate(`/product/${slug}?id=${product._id}`);
  };

  //create list brand
  const renderListBrandHomePage = async (category) => {
    const resBrand = await getListBrandByCategory(category);
    if (resBrand && resBrand.data) {
      if (
        dataBrand.filter((e) => {
          return (
            resBrand.data.brand
              .filter((item, index) => {
                return resBrand.data.brand.indexOf(item) === index;
              })
              .indexOf(e.value) > -1
          );
        }).length > 4
      ) {
        setListBrand(
          dataBrand
            .filter((e) => {
              return (
                resBrand.data.brand
                  .filter((item, index) => {
                    return resBrand.data.brand.indexOf(item) === index;
                  })
                  .indexOf(e.value) > -1
              );
            })
            .slice(0, 4)
        );
      } else {
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
      }
    }
  };

  const handleGetProductSlice = async () => {
    let brands = [];
    const res = await getProductByCategorySlice(categoryValue);
    setIsLoading(true);
    await renderListBrandHomePage(categoryValue);

    if (res && res.data) {
      setIsLoading(false);
      setListProduct(res.data);
    }
  };

  useEffect(() => {
    handleGetProductSlice();
  }, []);
  return (
    <div className="home-category-product">
      <div className="box-title-group">
        <h2 className="title">{categoryLabel}</h2>
        <div className="box-title-group-search">
          {listBrand?.map((e) => {
            return (
              <a
                onClick={() =>
                  navigate(`/category/${categoryValue}?brand=${e.value}`)
                }
                key={e.value}
              >
                <h3>{e.label}</h3>
              </a>
            );
          })}
          <NavLink to={`/category/${categoryValue}`} className="btn-view-more">
            <h3>
              XEM THÊM <BsArrowRightShort />
            </h3>
          </NavLink>
        </div>
      </div>
      <div className="box-product-group">
        {isLoading ? (
          <SkeletonProduct />
        ) : (
          <Carousel
            arrows
            prevArrow={<SamplePrevArrow />}
            nextArrow={<SampleNextArrow />}
            swipeToSlide
            draggable
            autoplay
            autoplaySpeed={2500}
            slidesPerRow={1}
            slidesToShow={5}
            dots={false}
            infinite={false}
            responsive={responsiveCarousel}
          >
            {listProduct?.map((e) => {
              return (
                <CardProduct
                  key={e._id}
                  handleRederectDetailProduct={handleRederectDetailProduct}
                  product={e}
                />
              );
            })}
          </Carousel>
        )}
      </div>
    </div>
  );
}

export default HomeProduct;
