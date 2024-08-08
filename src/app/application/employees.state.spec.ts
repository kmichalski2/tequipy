import { TestBed } from '@angular/core/testing';
import { EmployeesService } from '../infrastructure/employees.service';
import { EmployeesState } from './employees.state';
import { of } from 'rxjs';

describe('EmployeesState', () => {
  let state: EmployeesState;
  let employeesService: jasmine.SpyObj<EmployeesService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('EmployeesService', ['getAll']);

    TestBed.configureTestingModule({
      providers: [
        EmployeesState,
        { provide: EmployeesService, useValue: spy }
      ]
    });

    state = TestBed.inject(EmployeesState);
    employeesService = TestBed.inject(EmployeesService) as jasmine.SpyObj<EmployeesService>;
    employeesService.getAll.and.returnValue(of([]));

  });

  it('should be created', () => {
    expect(state).toBeTruthy();
  });
});
