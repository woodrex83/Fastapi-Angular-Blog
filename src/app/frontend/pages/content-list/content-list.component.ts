import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule, PaginationService} from 'ngx-pagination';
import { ApiService } from 'src/app/shared/_services/api.service';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent implements OnInit {
  public postList: any[] = []
  public categoryList: any[] = []
  public paginatorConfig: any
  public page: number = 1;

  constructor(
    private _api: ApiService,
    ) { }
  

  ngOnInit(): void {
    this.getPostList()
  }

  getPostList () {
    this._api.getTypeRequest('backend/contentList').subscribe((data: any) => {
      this.postList = data;
    }, err => {
      console.log(err)
    })
  }
  
}
