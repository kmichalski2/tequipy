export interface Equipment {
  id: string;
  name: string;
}

export type Status = 'ACTIVE' | 'OFFBOARDED';

export interface Employee {
  id: string;
  name: string;
  department: string;
  status: Status;
  email: string;
  equipments: Equipment[];
}

export interface OffbaordData {
  receiver: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  notes: string;
}
