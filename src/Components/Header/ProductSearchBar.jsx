import React, { useEffect, useState } from "react";
import "./ProductCart.scss";
import { useNavigate } from "react-router-dom";
import { convertSlug } from "../Homepage";
function ProductSearchBar(props) {
  const {
    listProductSearch,
    isFocused,
    setSearchProduct,
    displaySearch,
    className,
  } = props;
  const navigate = useNavigate();
  const [listData, setListData] = useState([]);

  //handle rederect product
  const handleRederectDetailProductSearch = (product) => {
    console.log("product>> ", product);
    // return;
    const slug = convertSlug(product.name);
    // console.log("slug>> ", slug);
    navigate(`/product/${slug}?id=${product._id}`);
  };

  useEffect(() => {
    if (listProductSearch.length === 0) {
      setListData([]);
      return;
    } else {
      setListData(listProductSearch);
    }
  }, [listProductSearch]);
  return (
    <div
      className={`listProductBar ${
        displaySearch ? null : "none"
      } ${className} `}
    >
      {listData.map((e) => {
        return (
          <div
            key={e._id}
            className="content-checkout"
            onClick={() => handleRederectDetailProductSearch(e)}
          >
            <div className="image-product-checkout">
              <img loading="lazy" src={e.images[0]} />
            </div>
            <div className="content-product-checkout">
              <div className="header-product-checkout">
                <p className="header-product-checkout-name">{e.name}</p>
                <p className="header-product-checkout-price">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(e.priceAfter)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductSearchBar;
