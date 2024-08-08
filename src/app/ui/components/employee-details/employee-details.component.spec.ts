import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { EmployeeDetailsComponent } from './employee-details.component';
import { EmployeesState } from '../../../application/employees.state';
import { Employee } from '../../../domain/employee';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatProgressBar } from '@angular/material/progress-bar';

const testData: Employee = {
  id: '1',
  name: 'Test Employee',
  email: 'test@employee.com',
  department: 'Test Department',
  status: 'ACTIVE',
  equipments: [{id: '1', name: 'Laptop'}, {id: '2', name: 'Phone'}]
};

describe('EmployeeDetailsComponent', () => {
  let component: EmployeeDetailsComponent;
  let fixture: ComponentFixture<EmployeeDetailsComponent>;
  let employeesState: jasmine.SpyObj<EmployeesState>;
  let router: jasmine.SpyObj<Router>;
  let route: jasmine.SpyObj<ActivatedRoute>;
  let snackbar: jasmine.SpyObj<MatSnackBar>;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(waitForAsync(() => {
    const employeesStateSpy = jasmine.createSpyObj('EmployeesState', ['fetch']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const routeSpy = {paramMap: of({get: () => '1'})} as any;
    const snackbarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        AsyncPipe,
        NgIf,
        MatDivider,
        MatListModule,
        MatProgressBar],
      declarations: [EmployeeDetailsComponent],
      providers: [
        {provide: EmployeesState, useValue: employeesStateSpy},
        {provide: Router, useValue: routerSpy},
        {provide: ActivatedRoute, useValue: routeSpy},
        {provide: MatSnackBar, useValue: snackbarSpy},
        {provide: MatDialog, useValue: dialogSpy}
      ]
    }).compileComponents();

    employeesState = TestBed.inject(EmployeesState) as jasmine.SpyObj<EmployeesState>;
    employeesState.fetch.and.returnValue(of(testData));
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    route = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
    snackbar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
