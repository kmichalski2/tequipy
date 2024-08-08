import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Employee, OffbaordData } from '../domain/employee';

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
    return this.client.post(`${environment.apiUrl}/offboard`, data);
  }
}
