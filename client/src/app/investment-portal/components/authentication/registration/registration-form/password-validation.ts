import { FormControl} from '@angular/forms';
/**
 * @description compare two passwords and validate if they match each other
 *
 * @param otherControlName is name of first FormGroup element used to validate with element I'd like to validate
 * @returns boolean or null. boolean true if values are not the same. null if values are the same. (insipired by validators)
 **/

export function passwordValidator (otherControlName: string) {

  let thisControl: FormControl;
  let otherControl: FormControl;

  return function passwordValidate (control: FormControl) {

    if (!control.parent) {
      return null;
    }

    // Initializing the validator.
    if (!thisControl) {
      thisControl = control;
      otherControl = control.parent.get(otherControlName) as FormControl;
      if (!otherControl) {
        throw new Error('passwordValidator(): other control is not found in parent group');
      }
      otherControl.valueChanges.subscribe(() => {
        thisControl.updateValueAndValidity();
      });
    }

    if (!otherControl) {
      return null;
    }

    if (otherControl.value !== thisControl.value) {
      return {
        matchOther: true
      };
    }

    return null;

  };

}
