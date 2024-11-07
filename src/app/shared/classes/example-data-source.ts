import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../interfaces/item';

export class ExampleDataSource extends DataSource<Item> {
  /** Stream of data that is provided to the table. */
  data = new BehaviorSubject<Item[]>([]);
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  constructor(data: Item[]) {
    super();
    this.data = new BehaviorSubject<Item[]>(data);
  }
  connect(): Observable<Item[]> {
    return this.data;
  }
  disconnect() {}
}
