import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CITIZEN } from 'src/app/Shared/Models/CITIZEN';
import { RESPONSE } from 'src/app/Shared/Models/RESPONSE';
import { CitizenService } from 'src/app/Shared/Services/CitizenService/citizen.service';

@Component({
  selector: 'app-consult-citizen',
  templateUrl: './consult-citizen.component.html',
  styleUrls: ['./consult-citizen.component.css']
})
export class ConsultCitizenComponent implements OnInit {
  id: string;
  citizen!:CITIZEN;
  constructor(private citizenService: CitizenService, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get("id");
    this.citizenService.getCitizenById(this.id).subscribe(res=>{
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };

      this.citizen=response.data;
      this.citizen.cin

    })
    console.log(this.id)
    

  }

}
