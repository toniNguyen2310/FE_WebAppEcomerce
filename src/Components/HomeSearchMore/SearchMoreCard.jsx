import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

function SearchMoreCard(props) {
  const { item } = props;
  const navigate = useNavigate();

  //Check drag and click product
  const pointer = useRef({ x: 0, y: 0 });
  const onMouseDown = (e) => {
    pointer.current = { x: e.clientX, y: e.clientY };
  };
  const onMouseUp = (e, item) => {
    const { x, y } = pointer.current;
    if (Math.abs(e.clientX - x) < 10 && Math.abs(e.clientY - y) < 10) {
      navigate(`/category/${item}`);
    }
  };
  return (
    <div
      className="home-category-list-item"
      onMouseDown={onMouseDown}
      onMouseUp={(e) => onMouseUp(e, item.value)}
    >
      <div className="home-category-list-item-img">
        <a href="">
          <img loading="lazy" src={item.img} alt="" />
        </a>
      </div>
      <div className="home-category-list-item-title">
        <a href="">{item.label}</a>
      </div>
    </div>
  );
}

export default SearchMoreCard;
