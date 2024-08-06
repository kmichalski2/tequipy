import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { EmployeesTableComponent } from '../employees-table/employees-table.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    AsyncPipe,
    EmployeesTableComponent
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
