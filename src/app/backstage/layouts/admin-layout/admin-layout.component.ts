import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/_services/auth.service';
import { CreatePostComponent } from '../../pages/create-post/create-post.component';


declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: 'list', title: '文章列表',  icon: 'fa fa fa-bars fa-lg ml-2', class: '' },
  { path: 'create', title: '創建文章',  icon:'fa fa-sticky-note fa-lg ml-2', class: '' },
  { path: 'categorys', title: '分類列表',  icon:'fa fa-hashtag fa-lg ml-2', class: '' },
  // { path: 'profile', title: '用戶資料',  icon:'fa fa-user-circle fa-lg ml-2', class: '' },
];

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  public menuItems: any[] = []
  public userName: string = ''
  public pageName: any = ''

  receiveName(name: any) {
    this.pageName = name
  }

  constructor(private router: Router, private _auth: AuthService) { }

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.getUsername();
  }

  getUsername () {
    this.userName = this._auth.getUserDetails()
  }

  logout() {
    this._auth.clearStorage()
    this.router.navigate(['backend/login'])
  }

}
