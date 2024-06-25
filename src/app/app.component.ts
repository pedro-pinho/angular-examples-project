import { Component, Inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from './authentication/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    { provide: 'STR_MSG', useValue: 'Welcome to Angular' }
  ]
})
export class AppComponent implements OnInit {
  isLogged: boolean = false;
  constructor(@Inject('STR_MSG') public msg: string, private auth: AuthService) {
    console.log(msg);
  }
  ngOnInit() {
    this.isLogged = this.auth.isAuthenticated();
  }
  logout() {
    this.auth.logout();
    this.isLogged = false;
  }
}
