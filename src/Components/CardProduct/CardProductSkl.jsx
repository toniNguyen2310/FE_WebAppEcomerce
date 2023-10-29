import { AiOutlineShoppingCart } from "react-icons/ai";
import "./CardProduct.scss";

import SkeletonText from "../Skeleton/SkeletonText";

function CardProductSkl(props) {
  return (
    <div className="item-cover">
      <div className="item">
        <div className="item-img" style={{ paddingBottom: 0 }}>
          {/* <img
            loading="lazy"
            src="https://lacdau.com/media/product/250-608-365bebe017fe978757221742d19d706f.jpg"
            alt=""
          /> */}
          <SkeletonText width={"170px"} height={"170px"} />
        </div>
        <div className="item-infor">
          <p
            className="item-infor-name"
            // onClick={() => handleRederectDetailProduct(product)}
          >
            <SkeletonText width={"170px"} height={"10px"} />
            <SkeletonText width={"170px"} height={"10px"} />
          </p>
          <div className="item-infor-container">
            <div className="item-infor-container-price">
              <p className="old-price" style={{ color: "#ffffff" }}>
                &nbsp;
              </p>
              <p className="main-price">
                {" "}
                <SkeletonText width={"90px"} height={"16px"} />
              </p>
            </div>
            <div
              className="item-infor-container-cart"
              //   onClick={() => handleAddToCart(product)}
            >
              <AiOutlineShoppingCart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardProductSkl;
