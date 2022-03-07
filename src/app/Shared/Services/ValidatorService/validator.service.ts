import { Injectable } from '@angular/core';
import { AbstractControl, Validator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService implements Validator {
//phone number validator 

  validate(control: AbstractControl) : {[key: string]: any} | null {
    if (control.value && control.value.length != 10) {
      return { 'phoneNumberInvalid': true };
    }
    return null;
  }
  ValidatePasswordConfirm(control: AbstractControl): {[key: string]: any} | null  {

    if (control.value && control.parent?.get("password")?.value !=control.value ) {
      return { 'ValidatePassword': true };
    }
    return null;
  }

  ValidatePassword(control: AbstractControl): {[key: string]: any} | null  {

    if (control.value && control.value.length<8 ) {
      return { 'ValidatePassword': true };
    }
    return null;
  }
  ValidatePhone(control: AbstractControl): { [key: string]: any } | null {

    if (control.value && control.value.length < 8) {
      return { 'ValidatePassword': true };
    }
    return null;
  }
  ValidateLength(control: AbstractControl): { [key: string]: any } | null {

    if (control.value && control.value.toString().length != 10) {

      return { 'ValidateLength': true };
    }
    return null;
  }
  
  constructor() { }
}
