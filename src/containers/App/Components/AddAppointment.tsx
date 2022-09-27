import React from 'react';
import { Select, Form, Button, Input, DatePicker } from 'antd';
import { getComputedPatientList } from '../../../utils/listUtils';

import { IAppointment, IAppointmentComputed, IDuration, DateFormat } from '../interfaces';

interface IProps {
  onAddAppointment: Function;
}

const layout = {
  labelCol: { span: 4, offset: 1 },
  wrapperCol: { span: 4 },
};

const tailLayout = {
  wrapperCol: { offset: 5, span: 2 },
};

const { Option } = Select;

const AddAppointment = ({ onAddAppointment }: IProps) => {
  const [form] = Form.useForm();

  const onFinish = (value: IAppointment) => {
    const formatData: IAppointment[] = getComputedPatientList([value]);
    onAddAppointment(...formatData)
  };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item name="startDate" label="Start Date">
        <DatePicker showTime format="YYYY-MM-DD HH:mm" />
      </Form.Item>
      <Form.Item name="endDate" label="End Date">
        <DatePicker showTime format="YYYY-MM-DD HH:mm" />
      </Form.Item>
      <Form.Item name="clinicianName" label="Clinician Name">
        <Input />
      </Form.Item>
      <Form.Item name={['patient', 'name']} label="Name">
        <Input />
      </Form.Item>
      <Form.Item name="status" label="Status">
        <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddAppointment;
export { AddAppointment };
