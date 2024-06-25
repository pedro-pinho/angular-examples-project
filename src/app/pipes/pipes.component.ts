import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppendTextPipe } from '../append-text.pipe';
import { SortNumbersPipe } from '../sort-numbers.pipe';

@Component({
  selector: 'app-pipes',
  standalone: true,
  imports: [CommonModule, FormsModule, AppendTextPipe, SortNumbersPipe],
  templateUrl: './pipes.component.html',
  styleUrl: './pipes.component.css',
})
export class PipesComponent implements OnInit {
  title = 'Example of Pipes in Angular 17';
  startDate: Date = new Date(2021, 1, 1);
  showData: boolean = false;
  employees = [
    {
      name: 'John Doe',
      state: 'California',
      salary: 10000,
      dob: new Date(1980, 1, 1),
      nameOfDependents: ['Jane Doe', 'Jim Doe', 'Jill Doe', 'Jack Doe'],
    },
    {
      name: 'Jane Doe',
      state: 'New York',
      salary: 20000,
      dob: new Date(1975, 1, 1),
      nameOfDependents: ['John Doe', 'Jim Doe', 'Jill Doe', 'Jack Doe'],
    },
    {
      name: 'Jim Doe',
      state: 'Texas',
      salary: 30000,
      dob: new Date(1970, 1, 1),
      nameOfDependents: ['Jane Doe', 'John Doe', 'Jill Doe', 'Jack Doe'],
    },
    {
      name: 'Jill Doe',
      state: 'Florida',
      salary: 40000,
      dob: new Date(1965, 1, 1),
      nameOfDependents: ['Jane Doe', 'Jim Doe', 'John Doe', 'Jack Doe'],
    }
  ];
  pgSize: number = 4;
  startIndex: number = 0;
  endIndex: number = this.pgSize;
  previousPage() {
    this.startIndex -= this.pgSize;
    this.endIndex -= this.pgSize;
  }
  nextPage() {
    this.startIndex += this.pgSize;
    this.endIndex += this.pgSize;
  }
  products: { name: string, imageUrl: string, code: number }[] = [
    { name: 'Product 1', imageUrl: 'assets/images/product1.png', code: 99.99756 },
    { name: 'Product 2', imageUrl: 'assets/images/product1.png', code: 101.23 },
    { name: 'Product 3', imageUrl: 'assets/images/product1.png', code: 2.99 },
    { name: 'Product 4', imageUrl: 'assets/images/product1.png', code: 1000.00 },
    { name: 'Product 5', imageUrl: 'assets/images/product1.png', code: 100.00 },
    { name: 'Product 6', imageUrl: 'assets/images/product1.png', code: 0.99 },
    { name: 'Product 7', imageUrl: 'assets/images/product1.png', code: 0.00 },
    { name: 'Product 8', imageUrl: 'assets/images/product1.png', code: 185440.01 }
  ];
  weightInPounds: number = 0;
  weightInKilograms: number = 0;
  convertWeight() {
    this.weightInKilograms = this.weightInPounds * 0.453592;
  }
  students = [
    { name: 'John Doe', age: 21, gender: 'male', major: 'Computer Science' },
    { name: 'Jane Doe', age: 22, gender: 'female', major: 'Mathematics' },
    { name: 'Jim Doe', age: 19, gender: 'male', major: 'Physics' },
    { name: 'Jill Doe', age: 23, gender: 'male', major: 'Chemistry' }
  ];
  showJson: boolean = false;
  toggleJson() {
    this.showJson = !this.showJson;
  }
  numberArray = [3,5,1,7,9,2,11,13,44,15,17,19,55,21,23,25];
  ngOnInit() {
    setTimeout(() => {
      this.showData = true;
    }, 5000);
  }
}
