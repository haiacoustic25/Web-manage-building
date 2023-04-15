import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { RootState, useAppSelector } from '../../../redux/store';
import { useGetStatisticalReportQuery } from '../../../api/statisticalApi';
import { percent } from '../../../utils';
import Skeleton from 'react-loading-skeleton';

ChartJS.register(ArcElement, Tooltip);

const BoxPayment = () => {
  const buildingId = useAppSelector((state: RootState) => state.buildingId.buildingId);
  const { data, isFetching } = useGetStatisticalReportQuery({ buildingId });
  const dataChart = {
    labels: ['Đã thanh toán', 'Chưa thanh toán'],
    datasets: [
      {
        label: 'Tỷ lệ',
        data: [data?.data.paid, data?.data.unpaid],
        backgroundColor: ['#66D8FD', '#207B8B'],
        borderColor: ['#66D8FD', '#207B8B'],
        borderWidth: 1,
      },
    ],
  };
  var options: any = {
    cutout: 50,
  };
  const renderContent = () => {
    if (isFetching) return <Skeleton height="170px" />;
    return (
      <div className="box-flex">
        <div className="box-left">
          <Doughnut data={dataChart} options={options} />
          <div className="box-left__number">
            <span>{percent(data?.data.paid, data?.data.total)}%</span>
            <span>Thanh toán</span>
          </div>
        </div>
        <div className="box-right">
          <div className="box-right__item">
            <div className="dot" style={{ backgroundColor: '#66D8FD' }}></div>
            <p className="label">Đã thanh toán</p>

            <div>{data?.data.paid}</div>
            <div className="dot-grey"></div>
            <div className="grey">{percent(data?.data.paid, data?.data.total)}%</div>
          </div>
          <div className="box-right__item">
            <div className="dot" style={{ backgroundColor: '#207B8B' }}></div>
            <p className="label">Chưa thanh toán</p>

            <div>{data?.data.unpaid}</div>
            <div className="dot-grey"></div>
            <div className="grey">{percent(data?.data.unpaid, data?.data.total)}%</div>
          </div>
        </div>
      </div>
    );
  };
  return renderContent();
};

export default BoxPayment;
