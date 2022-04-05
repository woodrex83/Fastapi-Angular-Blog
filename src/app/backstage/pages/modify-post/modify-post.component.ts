import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ApiService } from 'src/app/shared/_services/api.service';
import { AuthService } from 'src/app/shared/_services/auth.service';

@Component({
  selector: 'app-modify-post',
  templateUrl: './modify-post.component.html',
  styleUrls: ['./modify-post.component.scss']
})
export class ModifyPostComponent implements OnInit {
  public article: any
  public contentId: any = ''
  public contentTitle: any = ''
  public contentCat: any = ''
  public content: any = ''
  public CategorySelected: string = ''
  public categories: any
  public form!: FormGroup

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
    this.getCategoryRequest()
    this.article = this._auth.getCurrentPost();
    this.form = this.fb.group({
      title: ['', Validators.required],
      cat: ['', Validators.required],
      content: ['', Validators.required],
      id: ['', Validators.required]
    });
    console.log(this.CategorySelected)
  }

  getCategoryRequest() {
    this._api.getTypeRequest('backend/categoryList').subscribe((res: any) => {
      this.categories = res;
      this.contentId = this.article[0];
      this.contentCat = this.article[1] - 1;
      this.CategorySelected = this.categories[this.contentCat].name;
      this.contentTitle = this.article[2];
      this.content = this.article[3];

      if(res.access_token){
        this._auth.setDataInLocalStorage('token', res.access_token)
      }
    }, err => {
      console.log(err)
    })
  }

  modifyPost() {
    let fv = this.form.value;
    // console.log(fv)
    this._api.putTypeRequest('backend/posts/'+this.contentId, fv).subscribe((res: any) => {
      // console.log(res)
      if(res.access_token){
        this._auth.setDataInLocalStorage('token', res.access_token)
        this.router.navigate(['dashboard/list'])
      }
      this.snackBar.open('修改成功！','OK', {
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
}
