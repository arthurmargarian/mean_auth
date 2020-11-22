import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name: string;
  username: string;
  password: string;
  email: string;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  public onRegisterSubmit(): void {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
    }
    if (!this.name || !this.username || !this.email || !this.password) {
      console.log('fill all fields')
    } else {
      this.authService.registerUser(user)
        .subscribe((res) => {
          console.log(res);
          this.router.navigate(['/login']);
        });
    }
  }
}
