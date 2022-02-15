import { FormGroup } from '@angular/forms';

const validateAllFields = (form: FormGroup) => {
    Object.keys(form.controls).forEach(field => {
        const control = form.get(field);
        control.markAsTouched({ onlySelf: true });
    });
};

export { validateAllFields };
