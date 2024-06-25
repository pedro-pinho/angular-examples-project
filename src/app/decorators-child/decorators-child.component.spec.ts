import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoratorsChildComponent } from './decorators-child.component';

describe('DecoratorsChildComponent', () => {
  let component: DecoratorsChildComponent;
  let fixture: ComponentFixture<DecoratorsChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecoratorsChildComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DecoratorsChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
