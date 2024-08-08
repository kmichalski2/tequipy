import { Component } from '@angular/core';
import { EmployeeDetailsComponent } from '../../components/employee-details/employee-details.component';
import { RouterLink } from '@angular/router';
import { MatAnchor } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [
    EmployeeDetailsComponent,
    RouterLink,
    MatAnchor,
    MatIcon
  ],
  templateUrl: './employee-details-page.component.html',
  styleUrl: './employee-details-page.component.scss'
})
export class EmployeeDetailsPageComponent {}
