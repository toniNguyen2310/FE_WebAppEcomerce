/* eslint-disable react/prop-types */
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToCartService } from "../../redux/cart/cartSlice";
import "./CardProduct.scss";
import { useRef } from "react";
import { useFormatNumberToMoney } from "../../utils/hooks/useFormatNumberToMoney";

function CardProduct(props) {
  const { handleRedirectDetailProduct, product, messageSuccess } = props;
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const user = useSelector((state) => state.account.user);

  const handleAddToCart = async (product) => {
    if (isAuthenticated) {
      //TRƯỜNG HỢP ĐÃ ĐĂNG NHẬP
      const data = { idUser: user._id, product: product };
      dispatch(addToCartService(product));
      return;
    } else {
      //TRƯỜNG HỢP KO ĐĂNG NHẬP
      dispatch(addToCartService(product));
      return;
    }
  };

  const pointer = useRef({ x: 0, y: 0 });
  const onMouseDown = (e) => {
    pointer.current = { x: e.clientX, y: e.clientY };
  };
  const onMouseUp = (e, sub) => {
    const { x, y } = pointer.current;
    if (Math.abs(e.clientX - x) < 10 && Math.abs(e.clientY - y) < 10) {
      if (e.target.closest(".item-infor-container-cart")) {
        handleAddToCart(product);
      } else {
        handleRedirectDetailProduct(product);
      }
    }
  };

  return (
    <div
      className="item-cover"
      onMouseDown={onMouseDown}
      onMouseUp={(e) => onMouseUp(e)}
    >
      <div className="item">
        <div
          className="item-img"
          // onClick={() => handleRedirectDetailProduct(product)}
        >
          <img loading="lazy" src={product.images[0]} alt="" />
        </div>
        {product.discount === "0" ? (
          <div className="item-infor">
            <p
              className="item-infor-name"
              // onClick={() => handleRedirectDetailProduct(product)}
            >
              {product.name}
            </p>
            <div className="item-infor-container">
              <div className="item-infor-container-price">
                <p className="main-price">
                  {useFormatNumberToMoney(product.priceAfter)}
                </p>
                <p className="old-price" style={{ color: "#ffffff" }}>
                  &nbsp;
                </p>
              </div>
              <div
                className="item-infor-container-cart"
                // onClick={() => handleAddToCart(product)}
              >
                <AiOutlineShoppingCart />
              </div>
            </div>
          </div>
        ) : (
          <div className="item-infor">
            <p
              // onClick={() => handleRedirectDetailProduct(product)}
              className="item-infor-name"
            >
              {product.name}
            </p>
            <div className="item-infor-container">
              <div className="item-infor-container-price">
                <p className="old-price">
                  {useFormatNumberToMoney(product.price)}

                </p>
                <p className="main-price">
                   {useFormatNumberToMoney(product.priceAfter)}
                </p>
              </div>
              <div
                className="item-infor-container-cart"
                // onClick={() => handleAddToCart(product)}
              >
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
