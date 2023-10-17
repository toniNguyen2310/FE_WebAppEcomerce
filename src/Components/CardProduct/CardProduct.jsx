/* eslint-disable react/prop-types */
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./CardProduct.scss";
import { useDispatch, useSelector } from "react-redux";
import { displayCart, addToCartService } from "../../redux/cart/cartSlice";

function CardProduct(props) {
  const { handleRederectDetailProduct, product } = props;
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const user = useSelector((state) => state.account.user);

  const handleAddToCart = async (product) => {
    if (isAuthenticated) {
      //TRƯỜNG HỢP ĐÃ ĐĂNG NHẬP
      const data = { idUser: user._id, product: product };
      console.log(">>", data);
      dispatch(addToCartService(product));
    } else {
      //TRƯỜNG HỢP KO ĐĂNG NHẬP
      dispatch(addToCartService(product));
      return;
      let array = JSON.parse(localStorage.getItem("listCart"));
      let itemIndex = JSON.parse(localStorage.getItem("listCart")).findIndex(
        (e) => {
          return e.productId._id.toString() === product._id;
        }
      );
      console.log("index>> ", itemIndex);
      if (itemIndex > -1) {
        array[itemIndex].quantity++;
        localStorage.setItem("listCart", JSON.stringify(array));
        dispatch(addToCartService(product));
      } else {
        array.push({
          productId: product,
          quantity: 1,
        });
        localStorage.setItem("listCart", JSON.stringify(array));
        dispatch(displayCart(array));
      }
      return;
      if (!localStorage.getItem("listCart")) {
        //LOCAL STORAGE RỖNG
        localStorage.setItem(
          "listCart",
          JSON.stringify([
            {
              productId: product,
              quantity: 1,
            },
          ])
        );
        dispatch(
          displayCart([
            {
              productId: product,
              quantity: 1,
            },
          ])
        );
      } else {
        //ĐÃ CÓ LOCAL STORAGE LIST CART
        let array = JSON.parse(localStorage.getItem("listCart"));
        console.log("CO");
      }
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
              // onClick={() => handleRederectDetailProduct(product)}
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
