import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/_services/api.service';
import { AuthService } from 'src/app/shared/_services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form! : FormGroup
  constructor(
    public fb: FormBuilder,
    private _api: ApiService,
    private _auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    let fv = this.form.value
    // console.log(fv)
    this._api.postTypeRequest('auth/login', fv).subscribe((res: any) => {
      if(res.access_token){
        this._auth.setDataInLocalStorage('token', res.access_token)
        this._auth.setDataInLocalStorage('username', JSON.stringify(this.form.value.username))
        this.router.navigate(['dashboard/list'])
        // console.log(res)
      }
    }, err => {
      this.snackBar.open('賬號名稱或密碼不正確，請重試','我知道了', {
        duration: 5000,
      });
      // console.log(err)
    });
  }
}
