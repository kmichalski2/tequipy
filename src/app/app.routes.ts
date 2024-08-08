import { Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { EmployeeDetailsPageComponent } from './pages/employee-details-page/employee-details-page.component';

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
