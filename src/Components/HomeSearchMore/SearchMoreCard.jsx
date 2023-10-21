import React from "react";
import { useNavigate } from "react-router-dom";

function SearchMoreCard(props) {
  const navigate = useNavigate(props);
  const { e } = props;
  return (
    <div
      className="home-category-list-item"
      onClick={() => {
        navigate(`/category/${e.value}`);
      }}
    >
      <div className="home-category-list-item-img">
        <a href="">
          <img loading="lazy" src={e.img} alt="" />
        </a>
      </div>
      <div className="home-category-list-item-title">
        <a href="">{e.label}</a>
      </div>
    </div>
  );
}

export default SearchMoreCard;
