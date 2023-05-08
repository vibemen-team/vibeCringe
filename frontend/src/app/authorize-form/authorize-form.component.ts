import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-authorize-form',
  templateUrl: './authorize-form.component.html',
  styleUrls: ['./authorize-form.component.css'],
})
export class AuthorizeFormComponent {
  constructor(private http: HttpClient) {}

  login: string = '';
  password: string = '';
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
        // console.dir(response);
        // console.dir(obj);
        localStorage.setItem('token', obj.access_token as string);
        console.log('Done');
        // const headers = { Authorization: 'Bearer ' + obj.access_token };
        // fetch('https://localhost:7068/Test/ClosedRoute', { headers }).then(
        //   (resp) => console.log(resp)
        // );
      });
  }
}

type TokenResponse = {
  access_token?: string;
  expires_in?: number;
  scope?: string;
  token_type?: string;
};
