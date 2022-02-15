import { AbstractControl, ValidationErrors } from '@angular/forms';

const TermSheetValidators = {
    greaterThanZero: (control: AbstractControl): ValidationErrors | null => {
        return Number(control.value) <= 0 ? { greaterThanZero: { message: 'Value should be greater than zero' } } : null;
    }
};

export { TermSheetValidators };
