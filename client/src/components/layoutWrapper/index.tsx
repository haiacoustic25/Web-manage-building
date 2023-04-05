import React from 'react';
import { HomeOutlined } from '@ant-design/icons';
import Sidebar from '../sidebar';
import '../../assets/styles/layoutWrapper.scss';
import Header from '../header';
import { Link } from 'react-router-dom';
import { url } from '../../routes/listRouter';

type Props = {
  children: React.ReactNode;
  headers?: [] | null;
};

const LayoutWrapper = ({ children, headers = null }: Props) => {
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
