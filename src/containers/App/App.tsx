import React, { useEffect, useState, useCallback } from 'react';
import orderBy from 'lodash/orderBy';;
import { Select, Form } from 'antd';

import { Table } from './components/Table';
import { AddAppointment } from './components/AddAppointment';
import { IAppointmentComputed, IAppointment } from './interfaces';
import { getComputedPatientList, groupList } from '../../utils/listUtils';
import { selectOptions } from './assets';
import rowData from '../../../data.json';
import './style.css';

const { Option } = Select;

const App = () => {
  const [data, setData] = useState([]);
  const [groupBy, setGroupBy] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    const convertedDate: IAppointmentComputed[] = getComputedPatientList(rowData);
    setData(convertedDate);
  }, [])

  const onPatientDelete = useCallback((id: string): void => {
    const newData: IAppointmentComputed[] = data.filter(item => item.id !== id)
    setData(newData);
  }, [data])

  const onChangeGroupBy = useCallback((newValue: string): void => {
    setGroupBy(newValue);
    const groupedData = groupList(data, newValue);
    setData(groupedData);
  }, [data])

  const onAddAppointment = useCallback((appointment: IAppointment): void => {
    const newData = orderBy([...data, appointment], ['startDate']);
    setData(newData);
  }, [data])

  const options = selectOptions.map(d => <Option key={d.value}>{d.text}</Option>);

  return (
    <div className="wrapper">
      <div>
        <Select
          value={groupBy}
          onChange={onChangeGroupBy}
          placeholder="Select 'Group By'"
          allowClear
          style={{width: "200px"}}
        >
          {options}
        </Select>
        <Table data={data} deletePatient={onPatientDelete} />
      </div>
      <div className="add-form">
        <AddAppointment onAddAppointment={onAddAppointment} />
      </div>
    </div>
  );
}

export default App;
