import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Auth } from '../endpoints';
import { RESPONSE } from '../Shared/Models/RESPONSE';
import { AuthService } from '../Shared/Services/auth.service';

@Component({
  selector: 'app-validate-auth',
  templateUrl: './validate-auth.component.html',
  styleUrls: ['./validate-auth.component.css']
})
export class ValidateAUTHComponent implements OnInit {

  constructor(private _authServiceprivate:AuthService, private _router: Router, private route :ActivatedRoute) { }

  ngOnInit(): void {
    let userId=this.route.snapshot.paramMap.get("id");
    let token=this.route.snapshot.paramMap.get("token");

    this._authServiceprivate.validateEmail(userId,token).subscribe(res=>{
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };

      if(response.status){
        Swal.fire(
          response.message,
          '',
          'success'
        ).then(res=>{
          this._router.navigate([Auth.login]);

        })
      }else{
        Swal.fire(
          response.message,
          '',
          'error'
        )
      }   
    })


  }

}
