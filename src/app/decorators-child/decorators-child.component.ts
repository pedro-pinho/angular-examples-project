import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, ContentChild, ElementRef, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-decorators-child',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './decorators-child.component.html',
  styleUrl: './decorators-child.component.css'
})
export class DecoratorsChildComponent implements AfterContentInit {
  @Input() courses: {id: number, name: string}[] = [];
  @Output() itemDeleted = new EventEmitter<number>();
  @ContentChild('showPara') paraRef?: ElementRef<HTMLParagraphElement>;

  deleteCourse(id: number): void {
    this.itemDeleted.emit(id);
  }

  count: number = 0;
  incrementCounter(): void {
    this.count++;
  }

  ngAfterContentInit(): void {
    //ContentChild is used within the component to get the reference of the project content elements & manipulate it
    const content = this.paraRef?.nativeElement;
    if (content) {
      content.style.backgroundColor = 'lightblue';
      content.style.color = 'white';
      content.style.fontWeight = 'bold';
    }
  }
}
