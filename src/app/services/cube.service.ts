import { Injectable } from '@angular/core';
import { PowerService } from './power.service';

@Injectable() // This is for providing this service to other components. Each component that uses this service will get a new instance of this service.
// For injecting the same service for all components, we can use the providedIn property of the @Injectable() decorator, with the value 'root'.
export class CubeService {
  // When an object of CubeService is instantiated, Angular will inject an object of PowerService into it.
  constructor(public powerService: PowerService) {}

  calculateCube(base: number): number {
    return this.powerService.calculatePower(base, 3);
  }
}
