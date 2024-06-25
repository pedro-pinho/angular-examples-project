import { AfterViewInit, Component, ElementRef, Host, HostBinding, HostListener, ViewChild } from '@angular/core';
import { DecoratorsChildComponent } from '../decorators-child/decorators-child.component';
import { CommonModule } from '@angular/common';
import { DecoratorsDirectiveDirective } from '../decorators-directive.directive';

@Component({
  selector: 'app-decorators',
  standalone: true,
  imports: [DecoratorsChildComponent, CommonModule, DecoratorsDirectiveDirective],
  templateUrl: './decorators.component.html',
  styleUrl: './decorators.component.css'
})
export class DecoratorsComponent implements AfterViewInit {
  @ViewChild(DecoratorsChildComponent) decoratorsChildComponent: DecoratorsChildComponent | undefined;
  @ViewChild('btnIncr') btnRef?: ElementRef<HTMLButtonElement>;
  @ViewChild('colorInput') colorInput?: ElementRef<HTMLInputElement>;

  @HostBinding('style.backgroundColor') selectedColor!: string;
  @HostListener('input', ['$event.target.value']) onInput(value: string): void {
    console.log('Color selected', value);
    this.selectedColor = value;
  }

  courseSelected: {id: number, name: string} | undefined;
  courses: {id: number, name: string}[] = [
    {id: 1, name: 'Angular'},
    {id: 2, name: 'React'},
    {id: 3, name: 'Vue'},
    {id: 4, name: 'Svelte'},
    {id: 5, name: 'Ember'}
  ];
  deleteCourse(id:any): void {
    console.log('Course deleted with id', id);
    this.courses = this.courses.filter(course => course.id !== id);
  }
  incrementChildCounter(): void {
    // This is not a good practice because usually for this task we use the @Output decorator
    // ViewChild is used usually to access specific element & execute some tasks that involve DOM manipulation
    console.log(this.decoratorsChildComponent);
    this.decoratorsChildComponent?.incrementCounter();
  }
  ngAfterViewInit(): void {
    if (this.btnRef?.nativeElement) {
      this.btnRef.nativeElement.style.backgroundColor = 'red';
      this.btnRef.nativeElement.style.color = 'white';
      this.btnRef.nativeElement.innerHTML = 'Counter++'
    }
  }
}
