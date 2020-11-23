import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  public host = environment.host;

  public isLogged: boolean;

  constructor(private http: HttpClient) {
  }

  public registerUser(user): Observable<any> {
    const url = this.host + '/users/register';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.post(url, user, {headers});
  }

  public loginUser(credentials): Observable<any> {

    const url = this.host + '/users/login';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.post(url, credentials, {headers});
  }

  public getProfile(): Observable<any> {
    const url = this.host + '/users/profile';
    this.loadToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json', Authorization: this.authToken});

    return this.http.get(url, {headers});
  }

  public loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }


  public storeUserData(token: string, user: any): void {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  public logOut(): void {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    this.isLogged = false;
  }
}
