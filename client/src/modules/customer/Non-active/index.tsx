import React from 'react';
import Mainsection from './Mainsection';
import '../../../assets/styles/customer.scss';
import LayoutWrapper from '../../../components/layoutWrapper';

export const UseNonActiveComponent = () => {
  return (
    <LayoutWrapper>
      <Mainsection />
    </LayoutWrapper>
  );
};
