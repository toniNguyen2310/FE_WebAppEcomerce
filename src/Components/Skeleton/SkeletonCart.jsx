import React from "react";
import ContentLoader from "react-content-loader";

function SkeletonCart(props) {
  const { height, width } = props;
  return (
    <ContentLoader height={height} width={width}>
      <rect x="10" y="10" rx="2" ry="2" width={width} height={height} />
    </ContentLoader>
  );
}

export default SkeletonCart;
