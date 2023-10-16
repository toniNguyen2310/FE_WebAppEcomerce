import React from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
} from "../../redux/cart/cartSlice";
function ProductCart(props) {
  const { cart } = props;
  const dispatch = useDispatch();

  //INCREASE QUANTITY
  const handleIncrease = (id) => {
    console.log("id product>>> ", id);
    dispatch(increaseQuantity(id));
  };

  //DECREASE QUANTITY
  const handledecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  return (
    <div className="cart-detail">
      <img loading="lazy" src={cart.productId.images[0]} />
      <p className="cart-detail-name">{cart.productId.name}</p>
      {cart.productId.discount !== "0" ? (
        <div className="cart-detail-price">
          <p className="price-after">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(cart.productId.priceAfter)}
          </p>
          <p className="price-defaul">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(cart.productId.price)}
          </p>
        </div>
      ) : (
        <div className="cart-detail-price">
          <p className="price-after">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(cart.productId.priceAfter)}
          </p>
        </div>
      )}

      <div className="cart-detail-count">
        <div
          className="decrease-count count-box"
          onClick={() => handledecrease(cart.productId._id)}
        >
          -
        </div>
        <div className="count count-box">{cart.quantity}</div>
        <div
          className="increase-count count-box"
          onClick={() => handleIncrease(cart.productId._id)}
        >
          +
        </div>
      </div>
      <div className="cart-detail-total">
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(
          parseInt(cart.productId.priceAfter) * parseInt(cart.quantity)
        )}
      </div>
      <p
        className="cart-detail-delete"
        onClick={() => dispatch(deleteProduct(cart.productId._id))}
      >
        <BsFillTrash3Fill />
      </p>
    </div>
  );
}

export default ProductCart;
