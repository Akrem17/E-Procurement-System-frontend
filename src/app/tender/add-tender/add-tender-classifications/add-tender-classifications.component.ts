import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-tender-classifications',
  templateUrl: './add-tender-classifications.component.html',
  styleUrls: ['./add-tender-classifications.component.css']
})
export class AddTenderClassificationsComponent {

   myForm: FormGroup;
  @Input()
  basicInfo!: FormGroup;
  addressPage:boolean=false;
  constructor(private fb:FormBuilder) {
 
    this.myForm = this.fb.group({
      classification: this.fb.array([]) ,
    });
  
  }
 
  get classification() : FormArray {
    return this.myForm.get("classification") as FormArray
  }
 
  newSkill(): FormGroup {
    return this.fb.group({
      name: '',
      description: '',
      amount: '',

    })
  }
 
  addSkills() {
    this.classification.push(this.newSkill());
  }
 
  removeSkill(i:number) {
    this.classification.removeAt(i);
  }
 
  onSubmit() {
    console.log(this.myForm.value);
    this.basicInfo?.addControl('classification', new FormGroup(this.myForm.controls)); 

      this.addressPage=true;
        //scroll to the top of page
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    

  }
 
}
