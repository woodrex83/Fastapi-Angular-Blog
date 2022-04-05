import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/shared/_services/api.service';
import { AuthService } from 'src/app/shared/_services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public userDetails: any
  public userName: string = ''

  public linkedin: any
  public gitee: any
  public tiktok: any
  public form!: FormGroup

  constructor(
    private fb: FormBuilder,
    private _api: ApiService,
    private _auth: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.userName = this._auth.getUserDetails()
    this.getUserDetail()
  }

  getUserDetail() {
    this._api.getTypeRequest('profile/'+this.userName).subscribe((res: any) => {
      this.userDetails = res;
      console.log(this.userDetails);
      this.linkedin = this.userDetails.linkedin;
      this.gitee = this.userDetails.gitee;
      this.tiktok = this.userDetails.tiktok;
    }
  , err => {
    console.log(err)
    })
  }

  modifyUser() {
    
  }
}
