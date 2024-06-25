import { Component } from '@angular/core';
import { CubeService } from '../services/cube.service';
import { PowerService } from '../services/power.service';

@Component({
  selector: 'app-service-example',
  standalone: true,
  imports: [],
  templateUrl: './service-example.component.html',
  styleUrl: './service-example.component.css',
  providers: [CubeService, PowerService]
})
export class ServiceExampleComponent {
  constructor(public cubeService: CubeService) {}

  calculateCube(): number {
    return this.cubeService.calculateCube(5);
  }
}
