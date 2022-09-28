import dayjs from 'dayjs';
import orderBy from 'lodash/orderBy';

import {
  IAppointment,
  IAppointmentComputed,
  IDuration,
  DateFormat
} from '../containers/App/interfaces';


export const getDuration = (startDate: DateFormat, endDate: DateFormat): IDuration => {
  const duration: number = dayjs(endDate).diff(startDate) / (1000 * 60); //in minutes 
  const hours: number = Math.trunc(duration / 60);
  const minutes: number = Math.trunc(duration % 60);

  return { hours, minutes };
}

export const getComputedPatientList = (list: IAppointment[]): IAppointmentComputed[] => {
  const newList = list.map((item: IAppointment): IAppointmentComputed => {
    const { hours, minutes } = getDuration(item.startDate, item.endDate)

    return {
      ...item,
      startDate: dayjs(item.startDate).format('DD/MM/YYYY HH:MM'),
      endDate: dayjs(item.endDate).format('DD/MM/YYYY HH:MM'),
      duration: { hours, minutes }
    };
  })

  return orderBy(newList, ['startDate'])
}

export const groupList = (list: IAppointmentComputed[], group: string): IAppointmentComputed[] => {
  const objectList: any = {};

  if (!group) {
    return orderBy(list, ['startDate'])
  }

  list.forEach((item: IAppointmentComputed) => {
    const key = (group === 'client') ? item.patient.name : item.clinicianName;

    if (objectList[key]) {
      objectList[key].push(item);
    } else {
      objectList[key] = [item];
    }
  })

  const newArray: IAppointmentComputed[] = Object.values(objectList);
  return newArray.flat();
};
