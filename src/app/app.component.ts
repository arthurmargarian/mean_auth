import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AppSrc';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    this.authService.isLogged = !!user;
  }
}
