import React from "react";
import ContentLoader from "react-content-loader";
function SkeletonProduct(props) {
  const rows = 1;
  const columns = 5;
  const coverHeight = 350;
  const coverWidth = 235;
  const padding = 5;
  const speed = 1;

  const coverHeightWithPadding = coverHeight + padding;
  const coverWidthWithPadding = coverWidth + padding;
  const initial = 35;
  const covers = Array(columns * rows).fill(1);
  return (
    <ContentLoader
      speed={speed}
      width={columns * coverWidthWithPadding}
      height={rows * coverHeightWithPadding}
      // primaryColor="#242b34"
      // secondaryColor="#343d4c"
      {...props}
    >
      {covers.map((g, i) => {
        let vy = Math.floor(i / columns) * coverHeightWithPadding + initial;
        let vx =
          (i * coverWidthWithPadding) % (columns * coverWidthWithPadding);

        return (
          <rect
            key={i}
            x={vx}
            y={vy}
            rx="10"
            ry="10"
            width={coverWidth}
            height={coverHeight}
          />
        );
      })}
    </ContentLoader>
  );
}

export default SkeletonProduct;
