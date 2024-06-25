import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './template-form.component.html',
  styleUrl: './template-form.component.css'
})
export class TemplateFormComponent {
  // This approach is recommended for small to medium scale forms with lesser controls and simple validations
  formSubmit(myForm: NgForm) {
    if (myForm.valid) {
      const formValues = JSON.stringify(myForm.value);
      console.log(formValues);
    } else {
      alert('Please fill the form');
    }
  }
  resetValues(myForm: NgForm) {
    myForm.resetForm();
  }
  setDefaultValues(myForm: NgForm) {
    myForm.resetForm({
      name: 'John Doe',
      email: 'john@doe.com'
    });
  }
}
