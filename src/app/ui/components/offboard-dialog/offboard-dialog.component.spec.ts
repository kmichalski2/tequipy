import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { OffboardDialogComponent } from './offboard-dialog.component';
import { EmployeesState } from '../../../application/employees.state';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('OffboardDialogComponent', () => {
  let component: OffboardDialogComponent;
  let fixture: ComponentFixture<OffboardDialogComponent>;
  let employeesState: jasmine.SpyObj<EmployeesState>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<OffboardDialogComponent>>;

  beforeEach(waitForAsync(() => {
    const employeesStateSpy = jasmine.createSpyObj('EmployeesState', ['offboard']);
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, ReactiveFormsModule, OffboardDialogComponent],
      providers: [
        { provide: EmployeesState, useValue: employeesStateSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { employeeId: '1', email: 'test@employee.com' } }
      ]
    }).compileComponents();

    employeesState = TestBed.inject(EmployeesState) as jasmine.SpyObj<EmployeesState>;
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<OffboardDialogComponent>>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffboardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with provided data', () => {
    expect(component.form.value.email).toBe('test@employee.com');
  });

  it('should call offboard and close dialog on valid form submission', () => {
    component.form.setValue({
      receiver: 'Receiver Name',
      email: 'test@employee.com',
      phoneNumber: '1234567890',
      address: '123 Test St',
      city: 'Test City',
      postalCode: '12345',
      country: 'Test Country',
      notes: 'Test Notes'
    });

    employeesState.offboard.and.returnValue(of(true));
    component.onSubmit(new Event('submit') as SubmitEvent);

    expect(employeesState.offboard).toHaveBeenCalledWith('1', component.form.getRawValue());
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should not call offboard on invalid form submission', () => {
    component.form.setValue({
      receiver: '',
      email: 'test@employee.com',
      phoneNumber: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
      notes: ''
    });

    component.onSubmit(new Event('submit') as SubmitEvent);

    expect(employeesState.offboard).not.toHaveBeenCalled();
    expect(dialogRef.close).not.toHaveBeenCalled();
  });
});
