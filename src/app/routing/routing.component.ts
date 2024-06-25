import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-routing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './routing.component.html',
  styleUrl: './routing.component.css'
})
export class RoutingComponent {
  employees = [
    {
      id: 1, name: 'John Doe'
    },
    {
      id: 2, name: 'Jane Doe'
    },
    {
      id: 3, name: 'Jim Doe'
    },
    {
      id: 4, name: 'Jill Doe'
    }
  ];
  id: string = '';
  name: string = '';


  constructor(private route: ActivatedRoute) {
    //const params = this.route.snapshot.params; //This gets the route parameters
    const paramsObservable = this.route.queryParams; //This gets an observable for query parameters
    paramsObservable.subscribe(params => {
      this.id = params['id'];
      this.name = params['name'];
      console.log(params);
    });
  }
}
