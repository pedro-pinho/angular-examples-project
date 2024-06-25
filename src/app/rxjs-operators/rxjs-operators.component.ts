import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  of,
  from,
  interval,
  timer,
  EMPTY,
  map,
  filter,
  Observable,
  fromEvent,
  mergeMap,
  concatMap,
  switchMap,
  take,
} from 'rxjs';

@Component({
  selector: 'app-rxjs-operators',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rxjs-operators.component.html',
  styleUrl: './rxjs-operators.component.css',
})
export class RxjsOperatorsComponent implements OnInit {
  message: string = '';
  isLoading: boolean = true;
  $cursorPosition?: Observable<{ x: number; y: number }>;
  $outerObservable = from([1, 2, 3, 4, 5]);
  $innerObservable = (value: number) => of(value * 10);

  users = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' },
  ];
  courses = [
    { courseId: 1, title: 'JavaScript - Marathon Interview Questions Series' },
    {
      courseId: 2,
      title: 'Mastering React With Interview Questions,eStore Project',
    },
    {
      courseId: 1,
      title: 'Mastering TypeScript with Marathon Interview Questions',
    },
    {
      courseId: 3,
      title: 'Mastering CSS with Sass & Bootstrap + Interview Questions',
    },
    {
      courseId: 3,
      title: 'Practical Database Guide with RDBMS(MySQL) & NoSQL(MongoDB)',
    },
  ];

  $srcObservable = of(1, 2, 3, 4, 5);
  $destObservable = of('A', 'B', 'C', 'D', 'E');

  $srcObservableSwitch = of(1, 2, 3, 4, 5);

  constructor() {
    // The of() operator convert the arguments to an Observable sequence.
    // Each argument becomes a next notification.
    const observable = of(
      { name: 'John', age: 30 },
      { name: 'Doe', age: 25 },
      [1, 2, 3, 4, 5],
      function msg() {
        return 'Hello World!';
      }
    );
    observable.subscribe((value) => console.log(value));
  }
  ngOnInit() {
    // The from() operator convert an array, promise, or iterable to an Observable.
    // The difference between from and of is that from() is used for converting existing data sources like array, promises, objects into observables & emits their values sequentially
    // When emitting the values from the array using the from() operator, it emits the values one-by-one.
    // whereas of() creates an observable that emits a fixed set of values provided as arguments.
    // When emitting the values from the array using the of() operator, it emits the whole array at once.
    const myMap = new Map();
    myMap.set('name', 'John');
    myMap.set('age', 30);
    const $promiseObservable = from(
      new Promise((resolve) => resolve('Hello World!'))
    );
    const $mapObservable = from(myMap);
    $promiseObservable.subscribe((value) =>
      console.log('Promise Value', value)
    );
    $mapObservable.subscribe((value) => console.log('Map Value: ', value));

    // The interval() operator creates an Observable that emits a sequence of numbers in a specified interval of time.
    // The first number is emitted after the specified interval of time.
    // This is useful for Scheduling events, Generating events, Task Scheduler/Reminders, Updating a state, managing animations, etc
    const $intervalObservable = interval(1000);
    const intervalSubscribe = $intervalObservable.subscribe((value) =>
      console.log('Interval Value: ', value)
    );
    setTimeout(() => {
      intervalSubscribe.unsubscribe();
    }, 5000);

    // The timer() operator creates an Observable that emits a value after an initial delay. Unlike interval, it emits only one value by default.
    const $timerObservable = timer(3000);
    // To emit multiple values, you can pass the second argument to the timer() operator.
    // The second argument specifies the interval between the emissions.
    // The first value is emitted after the initial delay and then after each specified interval.
    // const $timerObservable = timer(3000, 1000);
    const timerSubscribe = $timerObservable.subscribe((value) =>
      console.log('Timer Value: ', value)
    );
    setTimeout(() => {
      timerSubscribe.unsubscribe();
    }, 5000);

    // Assignment - Implementing a loading spinner with timer operator
    const $loadingSpinner = timer(3000);
    const loadingSpinnerSubscribe = $loadingSpinner.subscribe(() => {
      this.isLoading = false;
      this.message = 'Loading Completed!';
    });
    setTimeout(() => {
      loadingSpinnerSubscribe.unsubscribe();
    }, 4500);

    // The EMPTY constant creates an Observable that emits no items to the Observer and immediately emits a complete notification.
    EMPTY.subscribe({
      next: () => console.log('EMPTY Next'), //This will never be shown
      complete: () => console.log('EMPTY Complete'),
    });

    // Example of pipeable operators
    // Pipe is very handy when it comes to dealing with complex operations on observables.
    const $pipeableObservable = of(1, 2, 3, 4, 5);
    const $newObservable = $pipeableObservable.pipe(
      // The map() operator applies a given project function to each value emitted by the source Observable and emits the resulting values as an Observable.
      map((value) => value * 10),
      // The filter() operator emits only those values from the source Observable that pass a predicate
      filter((value) => value > 20)
    );
    const newObservableSub = $newObservable.subscribe((value) =>
      console.log('Pipeable Value: ', value)
    );
    setTimeout(() => {
      newObservableSub.unsubscribe();
    }, 2000);

    // Example of grabbing the cursor position using fromEvent
    // The fromEvent operator creates an Observable that emits the event objects - whenever the DOM events are fired.
    this.$cursorPosition = fromEvent<MouseEvent>(window, 'mousemove').pipe(
      map((event) => {
        return {
          x: event.clientX,
          y: event.clientY,
        };
      })
    );

    // Example of flatMap operator
    // The flatMap operator maps each value to an Observable, then flattens all of these inner Observables using mergeMap.
    // This is useful when you have multiple inner observables that you want to combine into a single observable.
    // The difference between map and mergeMap is that mergeMap returns an observable for each value emitted by the source observable.
    const $flattenObservable = this.$outerObservable.pipe(
      mergeMap((value) => this.$innerObservable(value))
    );
    const flattenObservableSub = $flattenObservable.subscribe((value) =>
      console.log('Flatten Value: ', value)
    );
    setTimeout(() => {
      flattenObservableSub.unsubscribe();
    }, 2000);

    //Assignment - Display the courses that the user bought
    const combinedSubscribe = from(this.users)
      .pipe(
        mergeMap((user) => {
          const courseData = this.courses.filter(
            (course) => course.courseId === user.id
          );
          return of({ ...user, courses: courseData });
        })
      )
      .subscribe((value) => console.log('User Courses: ', value));
    setTimeout(() => {
      combinedSubscribe.unsubscribe();
    }, 2000);

    // Example of concatMap operator
    // The concatMap operator waits for the source Observable to complete before moving on to the next one.
    // The difference between concatMap and mergeMap is that concatMap subscribes to each inner Observable in a sequential order, waiting for the previous one to complete before subscribing to the next.
    // Whereas the mergeMap subscribes to all of the inner Observables in a parallel manner.
    const concatSubscribe = this.$srcObservable
      .pipe(
        concatMap((value) => {
          console.log('concatMap Source value: ', value);
          return this.$destObservable;
        })
      )
      .subscribe((value) => console.log('concatMap Reading: ', value));
    setTimeout(() => {
      console.log('Unsubscribing to concatMap observable...');
      concatSubscribe.unsubscribe();
    }, 5000);

    //Example of switchMap operator
    // It works similar to concatMap, but it unsubscribe the previous inner observable subscription when a new value is emitted from the source observable.
    // This means that if the source Observable triggers an emission of values while the inner observable is still functioning, then the last inner Observable gets cancelled before completing the task.
    this.$srcObservableSwitch.pipe(
      switchMap((value) => {
        console.log('switchMap Source value: ', value);
        console.log('switchMap Starting new Observable');
        return interval(1000).pipe(take(3));
      })
    ).subscribe((value) => console.log('switchMap Reading Interval Value: ', value));
  }
}
