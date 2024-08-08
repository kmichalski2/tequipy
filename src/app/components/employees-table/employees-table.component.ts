import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { EmployeesTableItem } from './employees-table-datasource';
import { Employee, EmployeesService } from '../../infrastructure/employees.service';
import { map } from 'rxjs/operators';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrl: './employees-table.component.scss',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatFormField, FormsModule, MatInput, MatLabel, NgIf]
})
export class EmployeesTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<EmployeesTableItem>;
  dataSource = new MatTableDataSource<EmployeesTableItem>([]);
  protected data: EmployeesTableItem[] = [];

  constructor(private employeesService: EmployeesService, private router: Router) {
  }

  displayedColumns = ['name', 'email', 'department', 'equipment', 'status'];
  searchPhrase = '';

  ngAfterViewInit(): void {
    this.employeesService.getAll().pipe(
      map((employees: Employee[]) => this.mapToEmployeesTableItem(employees))
    ).subscribe(employees => {
      this.data = employees;
      this.dataSource.data = this.data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    });
  }

  onSearchType($event: KeyboardEvent): void {
    $event.preventDefault();

    this.dataSource.data = this.data.filter(employee => {
      return employee.name.toLowerCase().includes(this.searchPhrase.toLowerCase());
    });
  }

  onRowClicked(selectedEmployee: EmployeesTableItem) {
    this.router.navigate(['/employees', selectedEmployee.id]);
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
