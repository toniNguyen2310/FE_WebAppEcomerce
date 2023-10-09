/* eslint-disable react/prop-types */
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./CardProduct.scss";

function CardProduct(props) {
  const { handleRederectDetailProduct, product } = props;
  return (
    <div className="item-cover">
      <div className="item">
        <div className="item-img">
          <img loading="lazy" src={product.images[0]} alt="" />
        </div>
        {product.discount === "0" ? (
          <div className="item-infor">
            <p
              className="item-infor-name"
              onClick={() => handleRederectDetailProduct(product)}
            >
              {product.name}
            </p>
            <div className="item-infor-container">
              <div className="item-infor-container-price">
                <p className="main-price">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.priceAfter)}
                </p>
                <p className="old-price" style={{ color: "#ffffff" }}>
                  &nbsp;
                </p>
              </div>
              <div className="item-infor-container-cart">
                <AiOutlineShoppingCart />
              </div>
            </div>
          </div>
        ) : (
          <div className="item-infor">
            <p
              onClick={() => handleRederectDetailProduct(product)}
              className="item-infor-name"
            >
              {product.name}
            </p>
            <div className="item-infor-container">
              <div className="item-infor-container-price">
                <p className="old-price">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.price)}
                </p>
                <p className="main-price">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.priceAfter)}
                </p>
              </div>
              <div className="item-infor-container-cart">
                <AiOutlineShoppingCart />
              </div>
            </div>
            <div className="item-discount">{product.discount}%</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CardProduct;
