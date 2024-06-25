import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortNumbers',
  standalone: true,
  pure: true //By default, all pipes are pure
})
export class SortNumbersPipe implements PipeTransform {
  // Pure vs Impure Pipes: https://v17.angular.io/api/core/Pipe
  // Basically impure pipes change the data even when the input has not changed
  transform(arr: number[], sortOrder: 'asc' | 'desc'): number[] {
    if (sortOrder === 'asc') {
      return arr.sort((a, b) => a - b);
    } else {
      return arr.sort((a, b) => b - a);
    }
  }

}
