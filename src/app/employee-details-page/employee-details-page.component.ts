import { Component } from '@angular/core';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { RouterLink } from '@angular/router';
import { MatAnchor } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-employee-details-page',
  standalone: true,
  imports: [
    EmployeeDetailsComponent,
    RouterLink,
    MatAnchor,
    MatIcon
  ],
  templateUrl: './employee-details-page.component.html',
  styleUrl: './employee-details-page.component.css'
})
export class EmployeeDetailsPageComponent {

}
