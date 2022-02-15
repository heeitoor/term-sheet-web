import { Component, OnInit } from '@angular/core';
import { DealService } from 'src/app/services/deal.service';
import { Deal } from 'src/app/models/deal';
import { TableData } from 'src/app/shared/table-data';
import { MatDialog } from '@angular/material/dialog';
import { DealFormComponent } from '../deal-form/deal-form.component';
import { DialogOptions } from 'src/app/shared/dialog-options';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin, noop, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-deal-list',
  templateUrl: './deal-list.component.html',
  styleUrls: ['./deal-list.component.scss']
})
export class DealListComponent implements OnInit {
  tableData: TableData<Deal[]> = {
    displayedColumns: ['name', 'purchasePrice', 'address', 'netOperatingIncome', 'capRate']
  };

  constructor(
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly dealService: DealService
  ) { }

  ngOnInit(): void {
    this.tableData.source$ = this.dealService.getDeals();
  }

  newDeal(): void {
    this.dialog.open(DealFormComponent, DialogOptions.normal)
      .afterClosed()
      .pipe(
        filter(deal => deal),
        tap(deal => {
          this.snackBar.open('Deal added successfully', 'Close');
          this.tableData.source$ = forkJoin(this.tableData.source$, of([this.dealService.parseDealObject(deal)]))
            .pipe(
              map(([currentDeals, addedDeal]) => [...currentDeals, ...addedDeal])
            );
        })
      ).subscribe(noop);
  }
}
