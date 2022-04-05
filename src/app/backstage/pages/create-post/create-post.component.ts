import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor/lib/config';
import { ApiService } from 'src/app/shared/_services/api.service';
import { AuthService } from 'src/app/shared/_services/auth.service';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  public htmlContent: string = ''
  public form!:FormGroup
  public CategorySelected: string = ''
  public categories: any[] = []

  public config: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    minHeight: '30rem',
    maxHeight: '30rem',
    width: '95%',
    minWidth: '100px',
    translate: 'no',
    sanitize: true,
    toolbarPosition: 'top',
    defaultFontName: 'Calibri',
    defaultFontSize: '3',
    defaultParagraphSeparator: 'p',
    toolbarHiddenButtons: [
      ['insertImage',
      'insertVideo']
    ]
  };
  
  constructor(
    private fb: FormBuilder,
    private _api: ApiService,
    private _auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      cat: ['', Validators.required],
      content: ['', Validators.required]
    });
    this.getCategoryRequest()
  }

  addpost() {
    this.form.controls['cat'].setValue(this.CategorySelected)
    let fv = this.form.value;

    this._api.postTypeRequest('backend/posts', fv).subscribe((res: any) => {
      if(res.access_token){
        this._auth.setDataInLocalStorage('token', res.access_token)
      }

      this.snackBar.open('文章創建成功！','OK', {
        duration: 5000,
      });
      this.router.navigate(['dashboard/list'])
    }, err => {
      console.log(err)
      this.snackBar.open('標題與現有文章重複','我知道了', {
        duration: 5000,
      });
    });
  }

  getCategoryRequest() {
    this._api.getTypeRequest('backend/categoryList').subscribe((res: any) => {
      this.categories = res;
      if(res.access_token){
        this._auth.setDataInLocalStorage('token', res.access_token)
      }
      if(res.length == 0) {
        this.snackBar.open('創建文章前需要先建立分類！','我知道了', {
          duration: 5000,
        });
        this.router.navigate(['dashboard/categorys'])
      }
    }, err => {
      console.log(err)
    })
  }


}
