import { Component } from '@angular/core';
import { EmployeesTableComponent } from '../../components/employees-table/employees-table.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    EmployeesTableComponent
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {
  constructor() {
  }
}
