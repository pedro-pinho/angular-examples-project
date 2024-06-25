import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-http',
  standalone: true,
  templateUrl: './http.component.html',
  styleUrl: './http.component.css',
  imports: [CommonModule],
})
export class HttpComponent {
  responseData: any;
  $responseData: Observable<any> | undefined;
  isDataLoaded: boolean = false;

  constructor(private http: HttpClient) {}

  getData() {
    this.http.get('http://localhost:3000/users').subscribe((data) => {
      this.responseData = data;
      this.isDataLoaded = true;
    });
    this.$responseData = this.http.get(
      'https://jsonplaceholder.typicode.com/posts'
    );
  }

  postData() {
    const user = {
      id: "11",
      name: 'John Doe',
      username: 'john.doe',
      email: 'john@doe.com',
      address: {
        street: 'Main Street',
        city: 'Los Angeles',
        zipcode: '90001',
      },
      phone: '1-770-736-8031',
      website: 'john-doe.com',
      company: {
        name: 'John Doe Inc.',
        catchPhrase: 'target end-to-end models',
        bs: 'synergize scalable supply-chains',
      },
    };
    this.http.post('http://localhost:3000/users', user).subscribe((data) => {
      console.log('User created successfully', data);
    });
  }

  putData() {
    const user = {
      "id": "11",
      "name": "John Doe",
      "username": "john.doe",
      "email": "john.doe@gmail.com",
      "address": {
        "street": "Main Street",
        "city": "Los Angeles",
        "zipcode": "90001"
      },
      "phone": "1-770-736-8031",
      "website": "john-doe.com",
      "company": {
        "name": "John Doe Inc.",
        "catchPhrase": "target end-to-end models",
        "bs": "synergize scalable supply-chains"
      }
    };
    this.http
      .put('http://localhost:3000/users/' + user.id, user)
      .subscribe({
        next: (data) => {
          console.log('User updated successfully', data);
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }
  deleteData() {
    this.http
      .delete('http://localhost:3000/users/11')
      .subscribe({
        next: (data) => {
          console.log('User deleted successfully', data);
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }
}
