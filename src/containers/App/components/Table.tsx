import React, { useEffect, useCallback, useState } from 'react';

import { Table as LibTable } from 'antd';
import { IAppointmentComputed, IDuration, IPatientName } from '../interfaces'

interface IProps {
  data: IAppointmentComputed[];
  deletePatient: Function;
}

const Table = ({ data, deletePatient }: IProps) => {

  const columns = [
    {
      title: 'Name',
      dataIndex: 'patient',
      key: 'patient',
      render: (patient: IPatientName) => (
        <span>{patient.name}</span>
      ),
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      render: ({ hours, minutes }: IDuration) => {
        const isHighlight = (hours > 1) || (hours === 1 &&  minutes > 1);

        return (
          <div style={{ color: isHighlight ? 'red' : 'black'}}>
            <span>{hours ? `${hours}h` : null} {minutes}m</span>
          </div>
        );
      }
    },
    {
      title: 'Clinical Name',
      dataIndex: 'clinicianName',
      key: 'clinicianName',
    },
    {
      render: (_: any, rec: IAppointmentComputed) => {
        return <button onClick={() => deletePatient(rec.id)}>Delete</button>;
      }
    }
  ];

  return (
    <div style={{ marginBottom: '24px' }}>
      <LibTable
        dataSource={data}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default Table;
export { Table };
