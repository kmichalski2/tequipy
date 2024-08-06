import { Routes } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EmployeeDetailsPageComponent } from './employee-details-page/employee-details-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/employees',
    pathMatch: 'full'
  },
  {
    path: 'employees',
    component: DashboardPageComponent
  },
  {
    path: 'employees/:id',
    component: EmployeeDetailsPageComponent
  }
];
