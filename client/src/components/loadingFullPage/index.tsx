import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "../../assets/styles/loadingFullPage.scss";
const LoadingFullPage = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return (
    <div className="loadingFullPage">
      <div className="loadingFullPage__flex">
        <Spin indicator={antIcon} />
        <span>Đang tải dữ liệu ... </span>
      </div>
    </div>
  );
};

export default LoadingFullPage;
