import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Shared/Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
logged:boolean | undefined
  constructor(private _authService:AuthService) { 
    this.logged=_authService.loggedIn();

  }

  ngOnInit(): void {
  }

  logout(){
    this._authService.logout();
  }
}
