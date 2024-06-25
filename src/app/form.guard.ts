import { CanDeactivateFn } from '@angular/router';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';

export const formGuard: CanDeactivateFn<ReactiveFormComponent> = (component) => {
  if (component.employeesForm.dirty || component.loginForm.dirty || component.myForm.dirty) {
    return confirm('Are you sure you want to leave this page?');
  }
  return true;
};
