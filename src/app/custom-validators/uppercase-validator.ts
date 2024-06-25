import { AbstractControl, ValidationErrors } from "@angular/forms";

export function convertToUpperCase(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value as string;
  if (value !== value.toUpperCase()) {
    control.setValue(value.toUpperCase());
  }
  return null;
}
