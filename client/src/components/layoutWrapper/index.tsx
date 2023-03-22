import React from "react";
import Sidebar from "../sidebar";
import "../../assets/styles/layoutWrapper.scss";
import Header from "../header";

type Props = {
  children: React.ReactNode;
};

const LayoutWrapper = ({ children }: Props) => {
  return (
    <div className="layout-wrapper">
      <Header />
      <div className="layout-wrapper__container">
        <Sidebar />
        <div className="layout-wrapper__content">{children}</div>
      </div>
    </div>
  );
};

export default LayoutWrapper;
