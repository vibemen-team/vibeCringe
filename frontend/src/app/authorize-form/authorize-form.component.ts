import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-authorize-form',
  templateUrl: './authorize-form.component.html',
  styleUrls: ['./authorize-form.component.css'],
})
export class AuthorizeFormComponent {
  login: string = '';
  password: string = '';
  public authService: AuthService;

  constructor(private http: HttpClient, authService: AuthService) {
    this.authService = authService;
  }
  log() {
    let body = new URLSearchParams();
    body.set('username', this.login);
    body.set('password', this.password);
    body.set('grant_type', 'password');
    body.set('client_id', 'api');
    body.set('client_secret', 'clientsecret');
    body.set('scope', 'BasketApi');

    let options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    };

    let obj: TokenResponse = {};
    this.http
      .post('http://localhost:10000/connect/token', body.toString(), options)
      .subscribe((response) => {
        obj = response as TokenResponse;
        //localStorage.setItem('token', obj.access_token as string);
        console.log('Done');
        this.authService.setToken(obj.access_token as string);
        console.log(this.authService.isLogin);

        this.http
          .get('https://localhost:10001/Test/ClosedRoute', {
            headers: { Authorization: 'Bearer ' + this.authService.token },
            responseType: 'text',
          })
          .subscribe((response) => {
            this.authService.userId = response;
          });
      });
  }
}

type TokenResponse = {
  access_token?: string;
  expires_in?: number;
  scope?: string;
  token_type?: string;
};
