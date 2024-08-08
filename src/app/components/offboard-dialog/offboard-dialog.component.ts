import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { MatError, MatFormField, MatHint } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { OffbaordData } from '../../domain/employee';
import { EmployeesState } from '../../application/employees.state';

export interface OffboardDialogData {
  employeeId: string;
  email: string;
}

@Component({
  selector: 'app-offboard-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormField,
    MatInput,
    MatCardActions,
    MatButton,
    MatError,
    MatHint
  ],
  templateUrl: './offboard-dialog.component.html',
  styleUrl: './offboard-dialog.component.css'
})
export class OffboardDialogComponent {
  constructor(private employeesState: EmployeesState, @Inject(MAT_DIALOG_DATA) private data: OffboardDialogData, private dialogRef: MatDialogRef<OffboardDialogComponent>) {
  }

  readonly form = new FormGroup({
    receiver: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    email: new FormControl<string>(this.data.email, {nonNullable: true, validators: [Validators.required]}),
    phoneNumber: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    address: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    city: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    postalCode: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    country: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    notes: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]})
  });

  onSubmit($event: SubmitEvent): void {
    $event.preventDefault();

    if (this.form.invalid) {
      return;
    }

    const data: OffbaordData = this.form.getRawValue();

    this.employeesState.offboard(this.data.employeeId, data).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
