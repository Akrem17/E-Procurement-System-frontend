import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-citizen-signup',
  templateUrl: './citizen-signup.component.html',
  styleUrls: ['./citizen-signup.component.css']
})
export class CitizenSignupComponent implements OnInit {

  constructor() { }
  @Input()
  x!: string;
  ngOnInit(): void {
  }

}
