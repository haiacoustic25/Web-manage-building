import { Col, Form, Row, Select } from 'antd';
import Column from 'antd/es/table/Column';
import { useEffect, useState } from 'react';
import '../../assets/styles/selectAddress.scss';
import { APIAddress } from '../../constants/APIAdress';

type Props = {
  required?: boolean;
  mode?: string;
  cityProps?: string | null;
  districtProps?: string | null;
  wardProps?: string | null;
};

const SelectAddress = ({ required = false, mode, cityProps, districtProps, wardProps }: Props) => {
  //   const [address, setAddress] = useState({ city: "", district: "", wards: "" });
  const [city, setCity] = useState(APIAddress);
  const [district, setDistrict] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    if (cityProps || districtProps || wardProps) {
      const citySelect: any = city.find((item: any) => item.Id == cityProps);
      setDistrict(citySelect?.Districts);
      const districtSelect: any = citySelect?.Districts.find(
        (item: any) => item.Id == districtProps
      );
      setWards(districtSelect?.Wards);
    }
  }, [cityProps, districtProps, wardProps]);

  const renderCity = () => {
    const listCity = city?.map((item: any) => {
      return {
        value: item.Id,
        label: item.Name,
      };
    });

    listCity.unshift({
      value: '-1',
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
    // if (listDistricts?.length)
    listDistricts?.unshift({
      value: '-1',
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
    // if (listWard?.length)
    listWard?.unshift({
      value: '-1',
      label: 'Chọn tất cả',
    });
    return listWard;
  };
  const renderContent = () => {
    if (mode == 'filter') {
      return (
        <Row style={{ gap: '10px' }}>
          <Col span={7}>
            <Form.Item
              initialValue="-1"
              label="Tỉnh thành"
              name="city"
              rules={[{ required: required, message: 'Không được để trống' }]}
            >
              <Select
                defaultValue="Chọn tất cả"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                onChange={selectCity}
                options={renderCity()}
              />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              initialValue="-1"
              label="Quận huyện"
              name="district"
              rules={[{ required: required, message: 'Không được để trống' }]}
            >
              <Select
                // defaultValue="Chọn tất cả"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={renderDistrict()}
                onChange={selectDistrict}
              />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              initialValue="-1"
              label="Phường xã"
              name="ward"
              rules={[{ required: required, message: 'Không được để trống' }]}
            >
              <Select
                defaultValue="Chọn tất cả"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={renderWard()}
              />
            </Form.Item>
          </Col>
        </Row>
      );
    }
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
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
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
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
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
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={renderWard()}
          />
        </Form.Item>
      </>
    );
  };
  return renderContent();
};

export default SelectAddress;
