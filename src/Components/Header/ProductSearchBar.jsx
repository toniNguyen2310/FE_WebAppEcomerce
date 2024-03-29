import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { convertSlug } from "../../utils/constant";
import "./ProductCart.scss";
import { useFormatNumberToMoney } from "../../utils/hooks/useFormatNumberToMoney";
function ProductSearchBar(props) {
  const {
    listProductSearch,
    displaySearch,
    className,
  } = props;
  const navigate = useNavigate();
  const [listData, setListData] = useState([]);

  //Handle redirect detail product
  const handleRedirectDetailProductSearch = (product) => {
    const slug = convertSlug(product.name);
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
            onClick={() => handleRedirectDetailProductSearch(e)}
          >
            <div className="image-product-checkout">
              <img loading="lazy" src={e.images[0]} />
            </div>
            <div className="content-product-checkout">
              <div className="header-product-checkout">
                <p className="header-product-checkout-name">{e.name}</p>
                <p className="header-product-checkout-price">
                {useFormatNumberToMoney(e.priceAfter)}
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
