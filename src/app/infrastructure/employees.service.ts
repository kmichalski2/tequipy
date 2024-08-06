import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


export interface Equipment {
  id: string;
  name: string;
}

export interface Employee {
  id: string;
  name: string;
  department: string;
  status: string;
  email: string;
  equipments: Equipment[];
}

export interface EmployeeOffboardData {
  receiver: string;
  email: string;
  phonenumber: string;
  address: string;
  city: string;
  postalcode: string;
  country: string;
  notes: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private readonly url = `${environment.apiUrl}/employees`;

  constructor(private client: HttpClient) {}

  getAll(): Observable<Employee[]> {
    return this.client.get<Employee[]>(this.url);
  }

  get(id: string): Observable<Employee> {
    return this.client.get<Employee>(`${this.url}/${id}`);
  }

  offboard(id: string, data: EmployeeOffboardData): Observable<any> {
    return this.client.put(`${this.url}/${id}/offboard`, data);
  }
}
