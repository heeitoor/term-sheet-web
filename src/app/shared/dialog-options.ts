import { MatDialogConfig } from '@angular/material/dialog';

const DialogOptions = {
    small: {
        width: '250px',
        disableClose: false
    } as MatDialogConfig<any>,
    normal: {
        width: '450px',
        disableClose: true
    } as MatDialogConfig<any>,
    large: {
        width: '650px',
        disableClose: false
    } as MatDialogConfig<any>
};

export { DialogOptions };
