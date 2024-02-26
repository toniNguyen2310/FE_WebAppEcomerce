import { Carousel } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { NavLink, json, useNavigate } from "react-router-dom";
import { getProductByCategorySlice } from "../../services.js/api";
import CardProduct from "../CardProduct/CardProduct";
import CardProductSkl from "../CardProduct/CardProductSkl";
import {
  banGaming,
  banPhimGaming,
  chuotGaming,
  dataProductSearchMore,
  gheGaming,
  loaIcon,
  lotChuot,
  moHinh,
  phuKien,
  taiNghe,
  tayCamGaming,
} from "../../utils/constant";
import { convertSlug } from "../../utils/constant";
import SkeletonText from "../Skeleton/SkeletonText";
import "./homeproduct.scss";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
}

function HomeProduct(props) {
  const navigate = useNavigate();
  const { categoryValue, categoryLabel } = props;
  const [listBrand, setListBrand] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [listProductFake, setListFake] = useState([...Array(10).keys()]);
  const [listBrandFake, setListBrandFake] = useState([...Array(4).keys()]);


  const responsiveCarousel = [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
        infinite: false,
        dots: false,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: false,
        dots: false,
        arrows: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        arrows: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
      },
    },
  ];

  //Handle redirect detail product
  const handleRedirectDetailProduct = (product) => {
    const slug = convertSlug(product.name);
    navigate(`/product/${slug}?id=${product._id}`);
  };

  //Render list brand
  const renderListBrandHomePage =  (category) => {
    {dataProductSearchMore && dataProductSearchMore.forEach((e)=>{
      if(e.value === category){
        return setListBrand(e.brand.slice(0, 4))
      }

    })}
  };
  
  const handleGetProductSlice = async () => {
    if (localStorage.getItem(categoryValue)) {
      setIsLoading(false);
      renderListBrandHomePage(categoryValue);
      setListProduct(JSON.parse(localStorage.getItem(categoryValue)));
      return;
    }
    const res = await getProductByCategorySlice(categoryValue);
    setIsLoading(true);
    renderListBrandHomePage(categoryValue);
    if (res && res.data) {
      setIsLoading(false);
      setListProduct(res.data);
      localStorage.setItem(`${categoryValue}`, JSON.stringify(res.data));
    }
  };

  useEffect(() => {
    handleGetProductSlice();
  }, []);

  return (
    <div className="home-category-product">
      <div className="box-title-group">
        <h2 className="title">
          {isLoading ? (
            <>
              <SkeletonText width={"150px"} height={"30px"} />
            </>
          ) : (
            <>{categoryLabel}</>
          )}
        </h2>
        <div className="box-title-group-search">
          {isLoading
            ? listBrandFake?.map((e) => {
                return (
                  <a key={e}>
                    <h3>
                      <SkeletonText width={"60px"} height={"20px"} />
                    </h3>
                  </a>
                );
              })
            : listBrand.map((e) => {
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
        <Carousel
          arrows
          prevArrow={<SamplePrevArrow />}
          nextArrow={<SampleNextArrow />}
          swipeToSlide
          draggable
          autoplay
          autoplaySpeed={3000}
          slidesToScroll={2}
          slidesToShow={5}
          dots={false}
          infinite={true}
          responsive={responsiveCarousel}
        >
          {isLoading
            ? listProductFake.map((e) => {
                return <CardProductSkl key={e} />;
              })
            : listProduct.map((e) => {
                return (
                  <CardProduct
                    key={e._id}
                    handleRedirectDetailProduct={handleRedirectDetailProduct}
                    product={e}
                  />
                );
              })}
        </Carousel>
      </div>
    </div>
  );
}

export default HomeProduct;
