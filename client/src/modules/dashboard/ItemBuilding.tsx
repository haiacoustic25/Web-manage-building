import { AppstoreOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { displayAddress } from '../../utils';
import { useAppDispatch } from '../../redux/store';
import { setBuildingId } from '../../redux/reducer/buildingReducer';
import { Navigate, useNavigate } from 'react-router-dom';
type Props = {
  item: any;
  _handleEditBuilding: (item: any) => void;
  showConfirm: (item: any) => void;
};

const ItemBuilding = ({ item, showConfirm, _handleEditBuilding }: Props) => {
  const [isOpenListAction, setIsOpenAction] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const renderStatus = (status: number) => {
    if (status === 1) return <div className="dashboard__item--infor-status red">Đã đầy</div>;
    return <div className="dashboard__item--infor-status">Đang còn phòng</div>;
  };
  const _handleSelectBuilding = () => {
    dispatch(setBuildingId(item.id));
    navigate('/statistical');
  };
  return (
    <div className="dashboard__item">
      <div className="dashboard__item--avt" onClick={_handleSelectBuilding}>
        <img src="https://mingid.mediacdn.vn/king/image/user.png?w=60" alt="" />
      </div>
      <div className="dashboard__item--infor">
        <div className="dashboard__item--infor-address" onClick={_handleSelectBuilding}>
          {displayAddress(item)}
        </div>
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          {renderStatus(item.status)}
          <div>-</div>
          <div className="dashboard__item--infor-amountRoom">Số phòng: {item.amountRooms}</div>
        </div>
      </div>
      <div className="dashboard__item--action" onClick={() => setIsOpenAction(!isOpenListAction)}>
        <AppstoreOutlined />
      </div>
      {isOpenListAction && (
        <div className="dashboard__item--listAction">
          <div
            className="dashboard__item--itemAction"
            onClick={() => {
              _handleEditBuilding(item);
              setIsOpenAction(false);
            }}
          >
            <EditOutlined style={{ fontSize: '12px' }} />
            <span>Sửa</span>
          </div>
          <div
            className="dashboard__item--itemAction"
            onClick={() => {
              showConfirm(item);
              setIsOpenAction(false);
            }}
          >
            <DeleteOutlined style={{ color: 'red', fontSize: '12px' }} />
            <span>Xóa</span>
          </div>
        </div>
      )}
      {isOpenListAction && <div className="dashboard__modal"></div>}
    </div>
  );
};

export default ItemBuilding;
