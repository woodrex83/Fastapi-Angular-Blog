import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/_services/api.service';
import { AuthService } from 'src/app/shared/_services/auth.service';

@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.component.html',
  styleUrls: ['./categorys.component.scss']
})
export class CategorysComponent implements OnInit {
  public form!: FormGroup
  public catList: any[] = []
  public displayedColumns: string[] = ['name']
  
  constructor(
    private fb: FormBuilder,
    private _api: ApiService,
    private _auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
    this.getCategoryRequest()
  }

  addCategoryRequest() {
    let fv = this.form.value
    this._api.postTypeRequest('backend/category', fv).subscribe((res: any) => {
      if(res.access_token){
        this._auth.setDataInLocalStorage('token', res.access_token)
      }
      this.getCategoryRequest()
    }, err => {
      console.log(err)
    });
  }

  getCategoryRequest() {
    this._api.getTypeRequest('backend/categoryList').subscribe((res: any) => {
      this.catList = res;
      if(res.access_token){
        this._auth.setDataInLocalStorage('token', res.access_token)
      }
    }, err => {
      console.log(err)
    })
  }

  // 需要後端加上delete接口
  // removeCategory(categoryName: any) {
  //   this.categorys = this.categorys.filter(category => category !== categoryName)
  // }
}
