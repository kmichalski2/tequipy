import { Injectable } from '@angular/core';
import { EmployeesService } from '../infrastructure/employees.service';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Employee, OffbaordData, Status } from '../domain/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesState {
  private readonly employeess = new BehaviorSubject<Employee[] | null>(null);

  constructor(private employeesService: EmployeesService) { }

  fetchAll(): Observable<Employee[]> {
    const employees = this.employeess.getValue();
    if (!!employees && employees.length > 0) {
      return of(employees);
    }

    return this.employeesService.getAll().pipe(tap(employees => this.employeess.next(employees)));
  }

  fetch(id: string): Observable<Employee | null | never> {
    return this.employeesService.get(id);
  }

  offboard(id: string, data: OffbaordData): Observable<boolean> {
    return this.employeesService.offboard(id, data).pipe(tap(() => this.changeStatus(id, 'OFFBOARDED')));
  }

  private changeStatus(id: string, status: Status): void {
    const employees = this.employeess.getValue();
    if (!employees) {
      return;
    }
    const index = employees.findIndex(e => e.id === id);
    if (index === -1) {
      return;
    }
    employees[index] = { ...employees[index], status };
    this.employeess.next(employees);
  }
}
