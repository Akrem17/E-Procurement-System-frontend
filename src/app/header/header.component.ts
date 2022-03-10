import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../Shared/Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginStatus$: Observable<boolean>;
  email$: Observable<string>;
  type$: Observable<string>;

  constructor(private _authService: AuthService) { }


  ngOnInit(): void {
    this.loginStatus$ = this._authService.isUserLoggedIn;
    this.type$ = this._authService.type;
    this.email$ = this._authService.email;
  }

  logout() {
    this._authService.logout();
  }
}
