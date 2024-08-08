import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
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
    return this.client.get<Employee>(`${this.url}/${id}`).pipe(
      catchError((err:  HttpErrorResponse) => {
          if (err && err.status === 404) {
            return  throwError(() => new Error('Employee not found'));
          }
          return throwError(() => new Error('Something went wrong'));
    }));
  }

  offboard(id: string, data: OffbaordData): Observable<any> {
    return this.client.put(`${this.url}/${id}/offboard`, data);
  }
}
