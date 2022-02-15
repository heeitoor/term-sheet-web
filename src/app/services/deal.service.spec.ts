import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { DealService } from './deal.service';

describe('DealService', () => {
  let service: DealService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(DealService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
