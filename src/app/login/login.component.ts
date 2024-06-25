import { Component } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private auth: AuthService) {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  isLogin(): void {
    const checkLogin = this.auth.login(this.email, this.password);
    if (checkLogin) {
      this.router.navigate(['/home']);
    } else {
      alert('Please enter email and password');
    }
  }
}
