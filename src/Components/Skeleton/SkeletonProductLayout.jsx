import React from "react";
import ContentLoader from "react-content-loader";

function SkeletonProductLayout(props) {
  return (
    <>
      <ContentLoader
        width={600}
        height={500}
        //   viewBox="0 0 450 400"
        backgroundColor="#f0f0f0"
        foregroundColor="#dedede"
        {...props}
      >
        <rect x="10" y="20" rx="0" ry="0" width="600" height="500" />
      </ContentLoader>

      <ContentLoader
        width={600}
        height={500}
        //   viewBox="0 0 450 400"
        backgroundColor="#f0f0f0"
        foregroundColor="#dedede"
        {...props}
      >
        <rect x="10" y="20" rx="0" ry="0" width="600" height="500" />
      </ContentLoader>
    </>
  );
}

export default SkeletonProductLayout;
