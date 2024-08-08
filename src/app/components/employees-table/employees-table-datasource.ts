import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { merge, Observable, of as observableOf } from 'rxjs';

export interface EmployeesTableItem {
  id: string;
  name: string;
  department: string;
  status: string;
  email: string;
  equipment: string;
}

export class EmployeesTableDataSource extends DataSource<EmployeesTableItem> {

  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(public data: EmployeesTableItem[]) {
    super();
  }

  connect(): Observable<EmployeesTableItem[]> {
    console.log('connect');
    if (this.paginator && this.sort) {
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  disconnect(): void {}

  private getPagedData(data: EmployeesTableItem[]): EmployeesTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  private getSortedData(data: EmployeesTableItem[]): EmployeesTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'email': return compare(a.email, b.email, isAsc);
        case 'department': return compare(a.department, b.department, isAsc);
        case 'equipment': return compare(a.equipment, b.equipment, isAsc);
        case 'status': return compare(a.status, b.status, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
