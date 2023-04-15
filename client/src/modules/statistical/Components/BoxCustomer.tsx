import React from 'react';
import { Link } from 'react-router-dom';
import { useGetStatisticalCustomerQuery } from '../../../api/statisticalApi';
import { RootState, useAppSelector } from '../../../redux/store';
import Skeleton from 'react-loading-skeleton';

const BoxCustomer = () => {
  const buildingId = useAppSelector((state: RootState) => state.buildingId.buildingId);
  const { data, isFetching } = useGetStatisticalCustomerQuery({ buildingId });
  const renderContent = () => {
    if (isFetching) return <Skeleton height="50px" />;
    return (
      <div className="flex">
        <div className="number">{data?.data.totalCustomer}</div>
        <ul className="list-statistical">
          <li>
            <div className="item">
              <div className="text">Số người mới thuê trong tháng</div>
              <div className="number-item">
                <p>{data?.data.totalCustomerOfMonth}</p>
                <Link to="/user-manager">Chi tiết</Link>
              </div>
            </div>
          </li>
          <li>
            <div className="item">
              <div className="text">Số người đang thuê</div>
              <div className="number-item">
                <p>{data?.data.totalCustomerActive}</p>
                <Link to="/user-manager">Chi tiết</Link>
              </div>
            </div>
          </li>
          <li>
            <div className="item">
              <div className="text">Số người đã hủy</div>
              <div className="number-item">
                <p>{data?.data.totalCustomerNonActive}</p>
                <Link to="/user-manager-non-active">Chi tiết</Link>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  };
  return renderContent();
};

export default BoxCustomer;
