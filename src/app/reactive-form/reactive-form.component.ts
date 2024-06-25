import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  FormArray,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { convertToUpperCase } from '../custom-validators/uppercase-validator';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.css',
})
export class ReactiveFormComponent {
  usernameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(10),
    Validators.pattern('^[a-zA-Z]+$'),
  ]);
  showValue() {
    console.log('Value: ', this.usernameControl.value);
    console.log('Valid: ', this.usernameControl.valid);
    console.log('Errors: ', this.usernameControl.errors);
  }
  usersForm: FormGroup;
  employeesForm: FormGroup;
  loginForm: FormGroup;
  emailControl: FormControl;
  passwordControl: FormControl;

  constructor(private formBuilder: FormBuilder) {
    // It's a good practice to initialize the form in the constructor
    this.usersForm = new FormGroup({
      users: new FormArray([]),
    });
    // FormBuilder eliminated the need to instantiate individual FormControl & FormGroup instances
    this.employeesForm = this.formBuilder.group({
      employees: this.formBuilder.array([]),
    });
    // Testing validations
    this.emailControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this.passwordControl = new FormControl('', Validators.required);
    this.loginForm = new FormGroup({
      email: this.emailControl,
      password: this.passwordControl,
    });
    //Multi step form example
    this.myForm = this.formBuilder.group({
      userDetails: this.formBuilder.group({
        fname: ['', Validators.required, convertToUpperCase],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      }),
      additionalDetails: this.formBuilder.group({
        mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        address: ['', Validators.required],
        country: ['', Validators.required],
        gender: ['', Validators.required],
      }),
      feedback: this.formBuilder.group({
        comments: [''],
      }),
    });
  }

  get employees(): FormArray {
    return this.employeesForm.get('employees') as FormArray;
  }

  get users(): FormArray {
    return this.usersForm.get('users') as FormArray;
  }

  addUser() {
    const userGroup = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      age: new FormControl('', [Validators.required, Validators.min(18)]),
    });
    this.users.push(userGroup);
  }

  addEmployee() {
    const employeeGroup = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    this.employees.push(employeeGroup);
  }

  removeUser(index: number) {
    this.users.removeAt(index);
  }

  removeEmployee(index: number) {
    this.employees.removeAt(index);
  }

  onSubmitUsers() {
    if (this.usersForm.valid) {
      console.log('Form Submitted!', this.usersForm.value);
    } else {
      // Display the form errors on the console
      console.log('Form has errors', this.usersForm.errors);
    }
  }

  onSubmitEmployees() {
    if (this.employeesForm.valid) {
      console.log('Form Submitted!', this.employeesForm.value);
    } else {
      // Display the form errors on the console
      console.log('Form has errors', this.employeesForm.errors);
    }
  }

  onSubmitLogin() {
    if (this.loginForm.valid) {
      console.log('Form Submitted!', this.loginForm.value);
    } else {
      // Display the form errors on the console
      console.log('Form has errors', this.loginForm.errors);
    }
  }

  //Multi-step form example
  myForm: FormGroup;
  step: any = 1;
  isSubmitted: boolean = false;

  get userDetails() {
    return this.myForm.get('userDetails') as FormGroup;
  }

  get additionalDetails() {
    return this.myForm.get('additionalDetails') as FormGroup;
  }

  btnPrevious() {
    this.step -= 1;
  }

  btnNext() {
    const userDetailsGroup = this.myForm.get('userDetails') as FormGroup;
    const additionalDetailsGroup = this.myForm.get(
      'additionalDetails'
    ) as FormGroup;

    if (userDetailsGroup.invalid && this.step === 1) {
      return;
    }
    if (additionalDetailsGroup.invalid && this.step == 2) {
      return;
    }
    if (this.step < 3) {
      this.step += 1;
    }
  }

  formSubmit() {
    if (this.myForm.valid) {
      this.isSubmitted = true;
    }
    console.log(this.myForm.value);
  }

}
