import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { AsyncPipe, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatProgressBar } from '@angular/material/progress-bar';
import { EmployeesState } from '../../../application/employees.state';
import { Employee } from '../../../domain/employee';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { AppPages } from '../../../app.routes';

export interface EmployeesTableItem {
  id: string;
  name: string;
  department: string;
  status: string;
  email: string;
  equipment: string;
}

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrl: './employees-table.component.scss',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatFormField, FormsModule, MatInput, MatLabel, NgIf, AsyncPipe, MatProgressSpinner, MatProgressBar, MatCard, MatCardHeader, MatCardTitle]
})
export class EmployeesTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<EmployeesTableItem>;
  dataSource = new MatTableDataSource<EmployeesTableItem>([]);

  data: EmployeesTableItem[] = [];
  employees$ = of<EmployeesTableItem[] | null>(null);

  constructor(private employeesState: EmployeesState, private router: Router) {
  }

  displayedColumns = ['name', 'email', 'department', 'equipment', 'status'];
  searchPhrase = '';

  ngAfterViewInit(): void {
    this.employees$ = this.fetchEmployees();
  }

  fetchEmployees(): Observable<EmployeesTableItem[]> {
    return this.employeesState.fetchAll().pipe(
      map((employees: Employee[]) => this.mapToEmployeesTableItem(employees)),
      tap((employees: EmployeesTableItem[]) => {
        this.data = employees;
        this.dataSource.data = this.data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      })
    );
  }

  onSearchType($event: KeyboardEvent): void {
    $event.preventDefault();

    this.dataSource.data = this.data.filter(employee => {
      return employee.name.toLowerCase().includes(this.searchPhrase.toLowerCase()) || employee.department.toLowerCase().includes(this.searchPhrase.toLowerCase());
    });
  }

  onRowClick(selectedEmployee: EmployeesTableItem) {
    this.router.navigate([AppPages.Employees, selectedEmployee.id]);
  }

  private mapToEmployeesTableItem(employees: Employee[]): EmployeesTableItem[] {
    return employees.map((employee: Employee) => {
      return {
        id: employee.id,
        name: employee.name,
        department: employee.department,
        status: employee.status,
        email: employee.email,
        equipment: employee.equipments.map(equipment => equipment.name).join(', ')
      };
    });
  }
}
