import {
  DeleteOutlined,
  PlusCircleOutlined,
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Form, Modal, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import renderComponentWithConfig from '../../HOC/component-with-config';
import { useGetAllBuildingQuery, useRemoveBuildingMutation } from '../../api/buildingApi';
import Header from '../../components/header';
import SearchWrapper from '../../components/searchWrapper';
import SelectAddress from '../../components/selectAddress';
import { BuildingType } from '../../types/BuildingType';
import ItemBuilding from './ItemBuilding';
import ModalBuilding from './modal/ModalBuilding';
type Props = {
  user: any;
};
const Mainsection = ({ user }: Props) => {
  const [form] = Form.useForm();
  const [filter, setFilter] = useState({
    userId: user?.id,
    city: '',
    district: '',
    ward: '',
    pageIndex: 1,
    pageSize: 10,
  });
  const { data, isFetching } = useGetAllBuildingQuery(filter, {
    skip: !filter,
    refetchOnMountOrArgChange: true,
    // pollingInterval: 1000,
  });

  const [handleRemove, resultRemove] = useRemoveBuildingMutation();
  const [buildingSelect, setBuildingSelect] = useState<BuildingType | null>(null);
  const { isSuccess, isError, isLoading } = resultRemove;
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const { confirm } = Modal;
  const _handleSearch = (values: any) => {
    for (const key in values) {
      if (!values[key]) values[key] = '';
    }
    const valuesFilter = { ...values };
    if (valuesFilter.city == -1) valuesFilter.city = '';
    if (valuesFilter.district == -1) valuesFilter.district = '';
    if (valuesFilter.ward == -1) valuesFilter.ward = '';

    setFilter({ ...filter, pageIndex: 1, ...valuesFilter });
  };
  const _handleRemove = async (id: string) => {
    await handleRemove({ buildingId: id });
  };
  const showModal = () => {
    setIsModalOpenAdd(true);
  };
  const handleCancel = () => {
    setBuildingSelect(null);
    setIsModalOpenAdd(false);
  };
  const _handleEditBuilding = (item: any) => {
    showModal();
    _handleSelectBuilding(item);
  };

  const _handleSelectBuilding = (building: BuildingType) => {
    setBuildingSelect(building);
  };
  const showConfirm = (item: any) => {
    confirm({
      title: 'Xóa',
      icon: <DeleteOutlined style={{ color: 'red' }} />,
      content: 'Bạn có muốn xóa không?',
      okText: 'Đồng ý',
      // confirmLoading:isLoading,
      cancelText: 'Hủy',
      onOk() {
        _handleRemove(item.id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const _refetchSearch = () => {
    setFilter({ userId: user?.id, city: '', district: '', ward: '', pageIndex: 1, pageSize: 10 });
  };

  useEffect(() => {
    if (isSuccess) toast.success('Xóa thành công');
    if (isError) toast.error('Xóa thành công');
  }, [isSuccess, isError]);

  return (
    <>
      <Header hasToDashboard={false} />
      <div className="dashboard">
        <div className="container">
          <SearchWrapper>
            <div className="building-search">
              <Form layout="vertical" form={form} onFinish={_handleSearch}>
                <SelectAddress mode="filter" />

                <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                  Tìm kiếm
                </Button>
                <span style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={_refetchSearch}>
                  <Tooltip title="Tải lại">
                    <ReloadOutlined style={{ color: '#d9d9d9' }} />
                  </Tooltip>
                </span>
              </Form>
            </div>
          </SearchWrapper>

          <div className="dashboard__list">
            {data?.data.map((item: any) => (
              <ItemBuilding
                item={item}
                _handleEditBuilding={_handleEditBuilding}
                showConfirm={showConfirm}
              />
            ))}
          </div>
        </div>
      </div>
      <Tooltip title="Thêm Tòa nhà" placement="left">
        <div className="button-add" onClick={showModal}>
          <PlusCircleOutlined style={{ color: '#1677ff' }} />
        </div>
      </Tooltip>
      <ModalBuilding
        userId={user?.id}
        isModalOpen={isModalOpenAdd}
        handleCancel={handleCancel}
        building={buildingSelect}
      />
    </>
  );
};

export default renderComponentWithConfig(Mainsection);
