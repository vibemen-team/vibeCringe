import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogin: boolean = false;
  token: string = '';
  userId: string = '';

  setToken(newToken: string): void {
    this.isLogin = true;
    this.token = newToken;
  }
  constructor() {}
}
