import { AfterContentInit, Component, OnInit } from '@angular/core';
import { TestChangesComponent } from '../test-changes/test-changes.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lifecycle-hooks',
  standalone: true,
  imports: [TestChangesComponent, CommonModule],
  templateUrl: './lifecycle-hooks.component.html',
  styleUrl: './lifecycle-hooks.component.css'
})
export class LifecycleHooksComponent implements OnInit, AfterContentInit {
  // Phases of the lifecycle hooks follows the following order: ngOnChanges, ngOnInit, ngDoCheck, ngAfterContentInit, ngAfterContentChecked, ngAfterViewInit, ngAfterViewChecked, ngOnDestroy
  // But when there's no template-bound inputs, ngOnChanges is skipped
  inputValue: string = 'Initial Value';
  constructor() {
    // This is called before ngOnInit
    // It's not a good practice to define any initialization of interface processes here
    // That is because the component has not yet been fully created
    // Only the component class has been initialized
    console.log('LifecycleHooksComponent constructor called');
  }
  ngOnInit(): void {
    // We should make API calls here
    console.log('LifecycleHooksComponent initialized');
  }
  updateValue(): void {
    this.inputValue = 'Updated Value';
  }
  // Detecting Custom Changes with ngDoCheck hook
  user = {
    name: 'John Doe',
  };
  changeUserName(): void {
    this.user.name = 'Jane Doe';
  }
  // Understanding ngAfterContentInit
  dataFromParent = ''
  ngAfterContentInit(): void {
    console.log('LifecycleHooksComponent ngAfterContentInit called');
  }
  sendDataToChild(): void {
    let random = Math.random().toString(36).substring(7);
    this.dataFromParent = "Random string " + random;
  }
  displayComponent: boolean = true;
  toggleComponent(): void {
    this.displayComponent = !this.displayComponent;
  }
}
