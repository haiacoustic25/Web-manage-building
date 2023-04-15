import { ArcElement, Chart as ChartJS, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Skeleton from 'react-loading-skeleton';
import { useGetStatisticalGenderQuery } from '../../../api/statisticalApi';
import { RootState, useAppSelector } from '../../../redux/store';
import { percent } from '../../../utils';

ChartJS.register(ArcElement, Tooltip);

const BoxGender = () => {
  const buildingId = useAppSelector((state: RootState) => state.buildingId.buildingId);
  const { data, isFetching } = useGetStatisticalGenderQuery({ buildingId });
  const dataChart = {
    labels: ['Nam', 'Nữ'],
    datasets: [
      {
        label: 'Tỷ lệ',
        data: [data?.data.male, data?.data.female],
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
            <span>{percent(data?.data.male, data?.data.total)}%</span>
            <span>Nam giới</span>
          </div>
        </div>
        <div className="box-right">
          <div className="box-right__item">
            <div className="dot" style={{ backgroundColor: '#66D8FD' }}></div>
            <p className="label">Nam giới</p>

            <div>{data?.data.male}</div>
            <div className="dot-grey"></div>
            <div className="grey">{percent(data?.data.male, data?.data.total)}%</div>
          </div>
          <div className="box-right__item">
            <div className="dot" style={{ backgroundColor: '#207B8B' }}></div>
            <p className="label">Nữ giới</p>

            <div>{data?.data.female}</div>
            <div className="dot-grey"></div>
            <div className="grey">{percent(data?.data.female, data?.data.total)}%</div>
          </div>
        </div>
      </div>
    );
  };
  return renderContent();
};

export default BoxGender;
