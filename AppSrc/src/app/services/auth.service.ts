import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) {
  }

  registerUser(user) {
    const url = 'http://localhost:3000/users/register';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.post(url, user, {headers: headers});
  }
}
