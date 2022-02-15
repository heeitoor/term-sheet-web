import { DecimalPipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DealService } from 'src/app/services/deal.service';
import { TermSheetValidators } from 'src/app/shared/custom-validators';
import { validateAllFields } from 'src/app/shared/validation-helpers';

@Component({
  selector: 'app-deal-form',
  templateUrl: './deal-form.component.html',
  styleUrls: ['./deal-form.component.scss']
})
export class DealFormComponent implements OnInit {
  dealForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    purchasePrice: new FormControl(undefined, [Validators.required, TermSheetValidators.greaterThanZero]),
    netOperatingIncome: new FormControl(undefined, [Validators.required, TermSheetValidators.greaterThanZero]),
    capRate: new FormControl(),
  });

  get nameFormControl(): AbstractControl { return this.dealForm.get('name'); }

  get addressFormControl(): AbstractControl { return this.dealForm.get('address'); }

  get purchasePriceFormControl(): AbstractControl { return this.dealForm.get('purchasePrice'); }

  get netOperatingIncomeFormControl(): AbstractControl { return this.dealForm.get('netOperatingIncome'); }

  get capRateFormControl(): AbstractControl { return this.dealForm.get('capRate'); }

  get purchasePriceFormControlValue(): number { return this.purchasePriceFormControl.value; }

  get netOperatingIncomeFormControlValue(): number { return this.netOperatingIncomeFormControl.value; }

  constructor(
    private readonly dealService: DealService,
    private readonly decimalPipe: DecimalPipe,
    private readonly dialogRef: MatDialogRef<DealFormComponent>,
    private readonly snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void { }

  add(): void {
    validateAllFields(this.dealForm);

    if (this.dealForm.valid) {
      // here I would call something like this.dealService.save(this.dealForm.value) in order to call an api
      // but since we aren't interested on saving anything I will just return the object to the caller (list component)
      const {
        name,
        address,
        purchasePrice,
        netOperatingIncome
      } = this.dealForm.getRawValue();
      this.dialogRef.close({ name, address, purchasePrice, netOperatingIncome });
    }
    else {

      this.snackBar.open('Please, fix the validation errors', 'Close');
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  updateCapRate(): void {
    if (this.netOperatingIncomeFormControlValue > 0 && this.purchasePriceFormControlValue > 0) {
      const capRate = this.netOperatingIncomeFormControlValue / this.purchasePriceFormControlValue * 100;
      const capRateFormatted = `${this.decimalPipe.transform(capRate, '1.0-2')}%`;
      this.capRateFormControl.setValue(capRateFormatted);
    }
  }
}
