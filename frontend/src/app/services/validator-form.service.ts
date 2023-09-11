import { Injectable } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  AbstractControl,
  FormGroupDirective,
  ValidatorFn,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorFormService implements ErrorStateMatcher {
  constructor() {}

  // Validate if have whitespace will error
  NoWhitespaceValidator = (): ValidatorFn => {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let controlVal = control.value;

      if (typeof controlVal === 'number') {
        controlVal = `${controlVal}`;
      }

      let isWhitespace = (controlVal || '').trim().length === 0;
      let isValid = !isWhitespace;
      return isValid
        ? null
        : { whitespace: 'value must be not on white space' };
    };
  };

  // Error when invalid control is dirty, touched, or submitted.
  isErrorState = (
    control: AbstractControl,
    form: FormGroupDirective,
  ): boolean => {
    const isSubmit = form && form.submitted;
    return (
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmit)
    );
  };
}
