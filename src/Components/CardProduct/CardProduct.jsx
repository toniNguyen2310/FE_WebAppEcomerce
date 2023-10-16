/* eslint-disable react/prop-types */
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./CardProduct.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartByUseAPI, handleAddToCartAPI } from "../../services.js/api";
import { displayCart } from "../../redux/cart/cartSlice";

function CardProduct(props) {
  const { handleRederectDetailProduct, product } = props;
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const user = useSelector((state) => state.account.user);

  const handleAddToCart = async (product) => {
    if (isAuthenticated) {
      const data = { idUser: user._id, idProduct: product._id };
      console.log(">>", data);
      const res = await handleAddToCartAPI(data);
      if (res && res.data) {
        console.log("data>> ", res);
        // localStorage.setItem("listCart", JSON.stringify(res.data.listCart));
        const resnew = await fetchCartByUseAPI(user._id);
        if (resnew) {
          localStorage.setItem(
            "listCart",
            JSON.stringify(resnew.data.listCart)
          );
          dispatch(displayCart(resnew.data.listCart));
        }
        return;
      }
      return;
    } else {
      console.log("chua dang nhap roi", product);
    }
  };

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
                <p className="old-price" style={{ color: "#ffffff" }}>
                  &nbsp;
                </p>
                <p className="main-price">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.priceAfter)}
                </p>
              </div>
              <div
                className="item-infor-container-cart"
                onClick={() => handleAddToCart(product)}
              >
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
              <div
                className="item-infor-container-cart"
                onClick={() => handleAddToCart(product)}
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
