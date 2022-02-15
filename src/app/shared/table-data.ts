import { Observable } from 'rxjs';

export interface TableData<T> {
    displayedColumns: string[];
    source$?: Observable<T>;
}
