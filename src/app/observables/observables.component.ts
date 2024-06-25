import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-observables',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './observables.component.html',
  styleUrl: './observables.component.css',
})
export class ObservablesComponent {
  //It's common to use the $ sign to indicate that a variable is an observable
  $observable = new Observable<number>((observer) => {
    let count = 0;

    const interval = setInterval(() => {
      observer.next(count++);
    }, 500);

    return () => {
      console.log('Interval Cleared');
      clearInterval(interval);
    };
  });
  $observableTime = new Observable<any>((observer) => {
    setInterval(() => {
      const date = new Date();
      const estTime = date.toLocaleString('en-US', {
        timeZone: 'America/New_York',
        dateStyle: 'full',
        timeStyle: 'full',
      });
      observer.next(estTime);
    }, 1000);
  }); //When using observables as pipes with the async pipe, there's no need to subscribe or unsubscribe
  $observableArray = new Observable<number[]>((observer) => {
    setTimeout(() => {
      observer.next([1, 2, 3, 4, 5]);
      observer.complete();
    }, 1000);
  });
  //To subscribe to a promise with an async pipe:
  $promise: Promise<string>;

  $jsonData: Observable<any> | undefined;

  constructor() {
    const obs = this.$observable.subscribe((value) => {
      console.log('Data ', value);
    });

    setTimeout(() => {
      console.log('Unsubscribing');
      obs.unsubscribe(); //Calling complete() method calls unsubscribe() method internally
    }, 5000);

    this.$promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve('Promise Resolved');
      }, 2000);
    });

    this.fetchData();
  }

  fetchData() {
    this.$jsonData = new Observable<any>((observer) => {
      fetch('https://dummyjson.com/products/categories')
        .then((response) => response.json())
        .then((data) => {
          console.log('Data from dummy json ', data);
          observer.next(data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
