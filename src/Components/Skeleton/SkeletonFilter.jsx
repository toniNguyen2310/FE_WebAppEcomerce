import React from "react";
import ContentLoader from "react-content-loader";

function SkeletonFilter(props) {
  const rows = 4;
  const columns = 4;
  const coverHeight = 300;
  const coverWidth = 215;
  const padding = 30;
  const speed = 1;

  const coverHeightWithPadding = coverHeight + padding;
  const coverWidthWithPadding = coverWidth + padding;
  const initial = 100;
  const covers = Array(columns * rows).fill(1);
  return (
    <ContentLoader
      speed={speed}
      width={columns * coverWidthWithPadding}
      height={rows * coverHeightWithPadding}
      primaryColor="#242b34"
      secondaryColor="#343d4c"
      {...props}
    >
      <rect
        x="5"
        y="20"
        rx="20"
        ry="0"
        width={columns * coverWidthWithPadding - padding}
        height="70"
      />

      {covers.map((g, i) => {
        let vy = Math.floor(i / columns) * coverHeightWithPadding + initial;
        let vx =
          (i * coverWidthWithPadding) % (columns * coverWidthWithPadding);
        return (
          <rect
            key={i}
            x={vx}
            y={vy}
            rx="20"
            ry="20"
            width={coverWidth}
            height={coverHeight}
          />
        );
      })}
    </ContentLoader>
  );
}

export default SkeletonFilter;
