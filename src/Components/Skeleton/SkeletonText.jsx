import React from "react";
import ContentLoader from "react-content-loader";

function SkeletonText(props) {
  const { width, height } = props;
  return (
    <ContentLoader
      width={width}
      height={height}
      backgroundColor="#f0f0f0"
      foregroundColor="#dedede"
    >
      <rect width={width} height={height} />
    </ContentLoader>
  );
}

export default SkeletonText;
