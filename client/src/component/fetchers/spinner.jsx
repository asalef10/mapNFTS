import React from "react";
import "antd/dist/antd.css";
import { Spin } from "antd";
export default () => (
  <div
    style={{ display: "flex", justifyContent: "center" }}
    className="example"
  >
    <Spin size={"large"} />
  </div>
);
