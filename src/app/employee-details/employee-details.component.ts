import { Component, OnInit } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { Employee, EmployeesService } from '../infrastructure/employees.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, filter, Observable, of, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDivider } from '@angular/material/divider';
import { MatList, MatListItem } from '@angular/material/list';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    AsyncPipe,
    NgIf,
    MatDivider,
    MatList,
    MatListItem
  ]
})
export class EmployeeDetailsComponent implements OnInit {
  constructor(private employeesService: EmployeesService, private route: ActivatedRoute, private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {

  }

  employee$: Observable<Employee | null> =  this.fetchEmployee();


  fetchEmployee(): Observable<Employee | null> {
    return this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter(id => !!id),
      switchMap(id => this.employeesService.get(id as string)),
      catchError(() => {
        this.snackbar.open('Employee not found', 'Close');
        return of(null);
      })
    );
  }
}
