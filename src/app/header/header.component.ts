import { DatePipe } from '@angular/common';
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
  userId: string;
  date!: string;

  constructor(private _authService: AuthService, private _userService: UserService) { }

  ngOnInit(): void {
    let date = new Date();
    this.date = this.formatDate(date)

    this.loginStatus$ = this._authService.isUserLoggedIn;
    this.type$ = this._authService.type;
    this.email$ = this._authService.email;
    this.email$.subscribe(res => {
      this._userService.FilterUserBy(res).subscribe(res => {
        this.userId = res.data[0].id;
      })
    })
  }

  logout() {
    this._authService.logout();
  }

  toggle() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav padding20") {
      x.className += " responsive padding20";
    } else {
      x.className = "topnav padding20";
    }
  }

  dropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  formatDate(dateObj: Date) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


    return this.dateOrdinal(dateObj.getDate()) + ', ' + days[dateObj.getDay()] + ' ' + months[dateObj.getMonth()] + ', ' + dateObj.getFullYear();
  }
  dateOrdinal(dom) {
    if (dom == 31 || dom == 21 || dom == 1) return dom + "st";
    else if (dom == 22 || dom == 2) return dom + "nd";
    else if (dom == 23 || dom == 3) return dom + "rd";
    else return dom + "th";
  };

}



