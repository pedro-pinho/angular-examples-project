import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, DoCheck, SimpleChanges, AfterContentChecked, AfterViewInit, AfterViewChecked, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-test-changes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-changes.component.html',
  styleUrl: './test-changes.component.css'
})
export class TestChangesComponent implements OnChanges, DoCheck, AfterContentChecked, AfterViewInit, AfterViewChecked, OnInit, OnDestroy {
  @Input() inputValue: string = ''; // Used for passing the value from the parent component to the child component
  @Input() user: any = {};
  previousValue: string | undefined;
  currentValue: string | undefined;
  private previousUserName: string | undefined;

  //! Never use ngOnChanges and ngDoCheck together
  //! They are not intended to be implemented together inside the same component
  //! It causes unwanted behavior & increases code complexity
  //! This is just for demonstration purposes

  ngOnChanges(changes: SimpleChanges): void {
    // Since user is an object, when changing one property, it will not trigger ngOnChanges
    // If we change the entire object, it will trigger ngOnChanges
    console.log('TestChangesComponent changes detected', changes);
    if (changes['inputValue']) {
      this.previousValue = changes['inputValue'].previousValue;
      this.currentValue = changes['inputValue'].currentValue;
    }
  }

  ngDoCheck(): void {
    // This is called every time Angular checks for changes
    // This is called after ngOnChanges
    // This is called after ngOnInit
    // This is called after ngAfterContentChecked
    // This is called after ngAfterViewChecked
    if (this.user.name !== this.previousUserName) {
      console.log('User name changed from', this.previousUserName, 'to', this.user.name);
      this.previousUserName = this.user.name;
    }
  }

  ngAfterContentChecked(): void {
    console.log('TestChangesComponent ngAfterContentChecked called');
  }

  ngAfterViewInit(): void {
    // The difference between ngAfterViewInit and ngOnInit is that ngAfterViewInit is called after the view has been initialized
    // Here it's guaranteed that the DOM elements are initialized and fully rendered
    console.log('TestChangesComponent ngAfterViewInit called');
  }

  ngAfterViewChecked(): void {
    // This is called after ngAfterViewInit
    // This is called after ngAfterContentChecked
    console.log('TestChangesComponent ngAfterViewChecked called');
  }

  ngOnInit(): void {
    console.log('TestChangesComponent initialized');
  }

  ngOnDestroy(): void {
    console.log('TestChangesComponent destroyed');
  }
}
