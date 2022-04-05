import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/_services/api.service';
import { AuthService } from 'src/app/shared/_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup
  constructor(
    public fb: FormBuilder,
    private _api: ApiService,
    private _auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      linkedin: [''],
      gitee: [''],
      tiktok: ['']
    });
  }

  register() {
    let fv = this.form.value
    console.log(fv)
    this._api.postTypeRequest('register', fv).subscribe((res: any) => {
      console.log(res)
      if(res.access_token){
        this._auth.setDataInLocalStorage('token', res.access_token)
      }
      this.router.navigate(['backend/login'])
    }, err => {
      console.log(err)
      this.snackBar.open('賬號名稱已被注冊，請重試','我知道了', {
        duration: 5000,
      });
    });
  }
}
