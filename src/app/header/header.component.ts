import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../Shared/Services/auth.service';
import { UserService } from '../Shared/Services/UserService/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginStatus$: Observable<boolean>;
  email$: Observable<string>;
  type$: Observable<string>;
  instituteId:string="1";
  userId:string;
  constructor(private datePipe: DatePipe,private _authService: AuthService, private _userService:UserService) { }
  date! :Date;

  ngOnInit(): void {
    this.date=new Date();
    let latest_date =this.datePipe.transform(this.date, 'yyyy-MM-dd');
    console.log(latest_date)
    this.loginStatus$ = this._authService.isUserLoggedIn;
    this.type$ = this._authService.type;
    this.email$ = this._authService.email;
    this.email$.subscribe(res=>{
      this._userService.FilterUserBy(res).subscribe(res=>{
        this.userId= res.data[0].id;
      })
    })
  }

  logout() {
    this._authService.logout();
  }
  
  myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

   dropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  

}



