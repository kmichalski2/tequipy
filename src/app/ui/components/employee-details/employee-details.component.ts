import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDivider } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { OffboardDialogComponent, OffboardDialogData } from '../offboard-dialog/offboard-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { Employee } from '../../../domain/employee';
import { EmployeesState } from '../../../application/employees.state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressBar } from '@angular/material/progress-bar';
import { AppPages } from '../../../app.routes';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    AsyncPipe,
    NgIf,
    MatDivider,
    MatListModule,
    MatProgressBar
  ]
})
export class EmployeeDetailsComponent {
  constructor(private employeesState: EmployeesState, private router: Router, private route: ActivatedRoute, private snackbar: MatSnackBar, private dialog: MatDialog) {
  }

  employee$: Observable<Employee | null> = this.fetchEmployee();

  fetchEmployee(): Observable<Employee | null> {
    return this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => {
        if (!id || id === 'null' || id === 'undefined') {
          return throwError(() => new Error('Employee ID has not been provided'));
        }
        return this.employeesState.fetch(id);
      }),
      catchError((err: Error) => {
        this.snackbar.open(err.message, 'Close', {duration: 5000});
        return fromPromise(this.router.navigate([AppPages.Employees])).pipe(map(() => null));
      })
    );
  }

  onOffboardClick(employee: Employee) {
    const dialogRef = this.dialog.open<OffboardDialogComponent, OffboardDialogData>(OffboardDialogComponent, {
      data: {
        employeeId: employee.id,
        email: employee.email
      },
      width: '500px'
    });

    dialogRef.afterClosed().pipe(
      takeUntilDestroyed()
    ).subscribe((result: boolean) => {
      if (result) {
        this.router.navigate([AppPages.Employees]);
      }
    });
  }
}
