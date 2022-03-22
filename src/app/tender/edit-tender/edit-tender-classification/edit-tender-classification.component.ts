import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TENDER_CLASSIFICATION } from 'src/app/Shared/Models/TENDER_CLASSIFICATION';
export interface DialogData {
  classification: TENDER_CLASSIFICATION;
 
}
@Component({
  selector: 'app-edit-tender-classification',
  templateUrl: './edit-tender-classification.component.html',
  styleUrls: ['./edit-tender-classification.component.css']
})
export class EditTenderClassificationComponent implements OnInit {
  classificationInfoForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditTenderClassificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
  ) {}
  ngOnInit(): void {
    console.log(this.data.classification)
    this.classificationInfoForm = this.fb.group({
      name: [this.data.classification.name, [Validators.required]],
      description: [this.data.classification.description, [Validators.required]],
      id: [this.data.classification.id, [Validators.required]],
      amount: [this.data.classification.amount, [Validators.required]],
      tenderId: [this.data.classification.tenderId, [Validators.required]],


    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
