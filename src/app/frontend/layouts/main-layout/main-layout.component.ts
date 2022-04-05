import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/_services/api.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  public catList: any[] = []

  constructor(
    private _api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCategory()
  }

  getCategory () {
    this._api.getTypeRequest('backend/categoryList').subscribe((res: any) => {
      this.catList = res;
    }, err => {
    console.log(err)
    })
  }
}
