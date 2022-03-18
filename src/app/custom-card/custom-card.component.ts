import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-card',
  templateUrl: './custom-card.component.html',
  styleUrls: ['./custom-card.component.css']
})
export class CustomCardComponent implements OnInit {

  constructor() { }
  isReadMore = true;

  showText(e) {
     this.isReadMore = !this.isReadMore
  }
  ngOnInit(): void {
  }
  @Input()
  title: any="";
  @Input()
  subtitle: any="";
  @Input()
  actions: any="";


}
