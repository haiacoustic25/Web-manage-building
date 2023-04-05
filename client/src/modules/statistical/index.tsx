import React from 'react';
import LayoutWrapper from '../../components/layoutWrapper';
import SelectAddress from '../../components/selectAddress';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export const StatisticalComponent = () => {
  const buildingId = useSelector((state: RootState) => state.buildingId.buildingId);
  console.log({ buildingId });
  return (
    <LayoutWrapper>
      <SelectAddress />
    </LayoutWrapper>
  );
};
