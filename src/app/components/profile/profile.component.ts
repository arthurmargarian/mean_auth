import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.authService.getProfile()
      .subscribe(res => {
          this.user = res.user;
        },
        error => {
          console.log(error);
        });
  }

}
