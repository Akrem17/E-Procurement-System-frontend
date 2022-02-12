import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-supplier-signup',
  templateUrl: './supplier-signup.component.html',
  styleUrls: ['./supplier-signup.component.css']
})
export class SupplierSignupComponent implements OnInit {
  @Input()
  x!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
