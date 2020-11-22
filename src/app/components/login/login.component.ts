import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  public onLoginSubmit(): void {
    const credentials = {
      username: this.username,
      password: this.password
    };
    this.authService.loginUser(credentials)
      .subscribe(res => {
        if (res.success) {
          alert('You are now Logged In');
          this.authService.storeUserData(res.token, res.user);
          this.router.navigate(['/profile']);
          this.authService.isLogged = true;
        } else {
          alert(res.msg);
        }
      });
  }
}
