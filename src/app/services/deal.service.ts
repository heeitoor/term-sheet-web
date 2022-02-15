import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Deal } from '../models/deal';
import { ServiceBase } from '../shared/service-base';

@Injectable({ providedIn: 'root' })
export class DealService extends ServiceBase {

  constructor(protected readonly httpClient: HttpClient) {
    super(httpClient);
  }

  getDeals(): Observable<Deal[]> {
    // I know it wasn't required any calls but it felt empty - it is just returning some fake data
    return this.get<Deal>('/620b9d29025da3002a300f44').pipe(
      map(deals => (deals.map(deal => this.parseDealObject(deal))))
    );
  }

  parseDealObject(deal: any): Deal {
    // I'm doing this because of the computed property, simple cast wouldn't work
    return plainToClass(Deal, deal);
  }
}
