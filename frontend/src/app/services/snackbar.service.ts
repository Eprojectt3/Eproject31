import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) { }

  public openSnackBar = (
    message: string,
    snackType?: any,
    duration?: number,
  ) => {
    const _snackType: any = snackType !== undefined ? snackType : 'Success';

    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: duration || 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      data: { message: message, snackType: _snackType },
    });
  };
}
