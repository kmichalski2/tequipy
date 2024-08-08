import { Routes } from '@angular/router';
import { DashboardPageComponent } from './ui/pages/dashboard-page/dashboard-page.component';
import { EmployeeDetailsPageComponent } from './ui/pages/employee-details-page/employee-details-page.component';

export enum AppPages {
  Employees = 'employees',
}

export const routes: Routes = [
  {
    path: '',
    redirectTo: AppPages.Employees,
    pathMatch: 'full'
  },
  {
    path: AppPages.Employees,
    component: DashboardPageComponent
  },
  {
    path: `${AppPages.Employees}/:id`,
    component: EmployeeDetailsPageComponent
  }
];
