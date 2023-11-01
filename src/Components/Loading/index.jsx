import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);
function Loading(props) {
  return (
    <Spin
      indicator={antIcon}
      tip="Loading"
      style={{ minHeight: "100vh", fontSize: 500 + "px" + "!important" }}
    >
      <div className="content" />
    </Spin>
  );
}

export default Loading;
