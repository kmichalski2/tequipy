import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { EmployeesTableComponent } from './employees-table.component';
import { EmployeesState } from '../../../application/employees.state';

describe('EmployeesTableComponent', () => {
  let component: EmployeesTableComponent;
  let fixture: ComponentFixture<EmployeesTableComponent>;
  let employeesState: jasmine.SpyObj<EmployeesState>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {
    const employeesStateSpy = jasmine.createSpyObj('EmployeesState', ['fetchAll']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [EmployeesTableComponent],
      providers: [
        { provide: EmployeesState, useValue: employeesStateSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    employeesState = TestBed.inject(EmployeesState) as jasmine.SpyObj<EmployeesState>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesTableComponent);
    component = fixture.componentInstance;
    employeesState.fetchAll.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch employees on init', () => {
    expect(employeesState.fetchAll).toHaveBeenCalled();
  });

  it('should navigate to employee details on row click', () => {
    const employee = { id: '1', name: 'Test Employee', department: 'Test Department', status: 'ACTIVE', email: 'test@employee.com', equipment: 'Laptop' };
    component.onRowClick(employee);
    expect(router.navigate).toHaveBeenCalledWith(['employees', '1']);
  });
});
