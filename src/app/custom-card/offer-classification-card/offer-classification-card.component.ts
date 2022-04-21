import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OFFER_CLASSIFICATION } from 'src/app/Shared/Models/OFFER_CLASSIFICATIONS';

@Component({
  selector: 'app-offer-classification-card',
  templateUrl: './offer-classification-card.component.html',
  styleUrls: ['./offer-classification-card.component.css']
})
export class OfferClassificationCardComponent implements OnInit {
  constructor() { }
  isReadMore = true;
  unitPrice:string;
  @Output() data = new EventEmitter<any>();
  totalPrice:number;

  showText(e) {
     this.isReadMore = !this.isReadMore
  }
  ngOnInit(): void {
    console.log(this.readTotalPrice)
  }
  @Input()
  consume:any="";
  @Input()
  title: any="";
  @Input()
  subtitle: any="";
  @Input()
  actions: any="";
  @Input()
  id:any="";

  @Input()
  readTotalPrice="";

  setTotalPrice(){
   this.totalPrice=(parseInt( this.unitPrice)*parseInt(this.subtitle));
   let classification =new OFFER_CLASSIFICATION ()
   console.log(this.id)
   classification.frontId=this.id.toString();
   classification.qte=this.subtitle;
   classification.description=this.actions;
   classification.name=this.title;
   classification.amount=this.totalPrice.toString();
   this.data.next(classification)
  }
}
