import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MessageHistoryService implements OnInit {
  public authService: AuthService;
  constructor(private http: HttpClient, authService: AuthService) {
    this.authService = authService;
  }
  ngOnInit(): void {}
}
