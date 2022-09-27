export type DateFormat = string | number | Date;

export interface IPatientName {
  id?: string;
  name: string;
}

export interface IDuration {
  hours: number;
  minutes: number;
}
  
export interface IAppointment {
  id?: string;
  startDate: DateFormat;
  endDate: DateFormat;
  clinicianName: string;
  patient: IPatientName;
  status: string,
}

export interface IAppointmentComputed extends IAppointment {
  duration: IDuration;
}