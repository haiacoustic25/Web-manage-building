import { Form, Select } from 'antd';
import { useState } from 'react';
import '../../assets/styles/selectAddress.scss';
import { APIAddress } from '../../constants/APIAdress';

type Props = {
  required?: boolean;
};

const SelectAddress = ({ required = false }: Props) => {
  //   const [address, setAddress] = useState({ city: "", district: "", wards: "" });
  const [city, setCity] = useState(APIAddress);
  const [district, setDistrict] = useState([]);
  const [wards, setWards] = useState([]);

  const renderCity = () => {
    const listCity = city?.map((item: any) => {
      return {
        value: item.Id,
        label: item.Name,
      };
    });

    listCity.unshift({
      value: ' -1',
      label: 'Chọn tất cả',
    });
    return listCity;
  };

  const selectCity = (value: string) => {
    // console.log(value);
    const citySelect: any = city.find((item: any) => item.Id == value);
    setDistrict(citySelect?.Districts);
  };

  const renderDistrict = () => {
    const listDistricts = district?.map((item: any) => {
      return {
        value: item.Id,
        label: item.Name,
      };
    });
    if (listDistricts?.length)
      listDistricts?.unshift({
        value: ' -1',
        label: 'Chọn tất cả',
      });
    return listDistricts;
  };

  const selectDistrict = (value: string) => {
    const districtSelect: any = district.find((item: any) => item.Id == value);
    setWards(districtSelect?.Wards);
  };

  const renderWard = () => {
    const listWard = wards?.map((item: any) => {
      return {
        value: item.Id,
        label: item.Name,
      };
    });
    if (listWard?.length)
      listWard?.unshift({
        value: ' -1',
        label: 'Chọn tất cả',
      });
    return listWard;
  };
  return (
    <>
      <Form.Item
        label="Tỉnh thành"
        name="city"
        rules={[{ required: required, message: 'Không được để trống' }]}
      >
        <Select
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) => (option?.label ?? '').includes(input)}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          onChange={selectCity}
          options={renderCity()}
        />
      </Form.Item>
      <Form.Item
        label="Quận huyện"
        name="district"
        rules={[{ required: required, message: 'Không được để trống' }]}
      >
        <Select
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) => (option?.label ?? '').includes(input)}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          options={renderDistrict()}
          onChange={selectDistrict}
        />
      </Form.Item>
      <Form.Item
        label="Phường xã"
        name="ward"
        rules={[{ required: required, message: 'Không được để trống' }]}
      >
        <Select
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) => (option?.label ?? '').includes(input)}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          options={renderWard()}
        />
      </Form.Item>
    </>
  );
};

export default SelectAddress;
