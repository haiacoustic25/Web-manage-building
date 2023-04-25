import { Button, Form, Input, Modal } from 'antd';
import React, { useEffect } from 'react';
import { useUpdateReportMutation } from '../../../api/reportApi';
import { toast } from 'react-toastify';
type Props = {
  report: any;
  isModalOpen: boolean;
  handleCancel: () => void;
};
const EditReport = ({ report, isModalOpen, handleCancel }: Props) => {
  const [form] = Form.useForm();
  const [handleUpdate, resultUpdate] = useUpdateReportMutation();
  const onFinish = (value: any) => {
    handleCancel();

    handleUpdate({
      id: report.id,
      domesticWaterNumber: Number(value.domesticWaterNumber),
      electricNumber: Number(value.electricNumber),
    });
  };
  useEffect(() => {
    if (report) form.setFieldsValue(report);
  }, [report]);
  useEffect(() => {
    if (resultUpdate.isSuccess) {
      toast.success('Sửa thành công!');
    }
    if (resultUpdate.isError) {
      toast.success('Sửa Thất bại!');
    }
  }, [resultUpdate]);
  return (
    <Modal title="Sửa hóa đơn" open={isModalOpen} onCancel={handleCancel} footer={null}>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        //   initialValues="vertical"
        //   onValuesChange={onFormLayoutChange}
        // style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Số nước"
          name="domesticWaterNumber"
          style={{ marginBottom: '10px' }}
          rules={[{ required: true, message: 'Không được để trống' }]}
        >
          <Input type="number" placeholder="Nhập số phòng" />
        </Form.Item>
        <Form.Item
          label="Số điện"
          name="electricNumber"
          style={{ marginBottom: '10px' }}
          rules={[{ required: true, message: 'Không được để trống' }]}
        >
          <Input type="number" placeholder="Nhập số tầng" />
        </Form.Item>

        <Form.Item style={{ justifyContent: 'end', display: 'flex' }}>
          <Button style={{ marginRight: '10px' }} onClick={handleCancel}>
            Hủy
          </Button>
          <Button type="primary" htmlType="submit">
            Đồng ý
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditReport;
