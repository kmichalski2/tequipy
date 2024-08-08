import { Injectable } from '@angular/core';
import { EmployeesService } from '../infrastructure/employees.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Employee, OffbaordData } from '../domain/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesState {
  private readonly employeess = new BehaviorSubject<Employee[] | null>(null);
  readonly employees$ = this.employeess.asObservable();

  constructor(private employeesService: EmployeesService) { }

  fetchAll(): Observable<Employee[]> {
    return this.employeesService.getAll().pipe(tap(employees => this.employeess.next(employees)));
  }

  fetch(id: string): Observable<Employee | null | never> {
    return this.employeesService.get(id);
  }

  offboard(id: string, data: OffbaordData): Observable<void> {
    return this.employeesService.offboard(id, data).pipe(tap(() => this.changeStatus(id, 'OFFBOARDED')));
  }

  private changeStatus(id: string, status: string): void {
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
