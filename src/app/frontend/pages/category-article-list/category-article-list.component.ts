import { Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/_services/api.service';

@Component({
  selector: 'app-category-article-list',
  templateUrl: './category-article-list.component.html',
  styleUrls: ['./category-article-list.component.scss']
})
export class CategoryArticleListComponent implements OnInit {
  // public categoryName:string = ''
  public postList: any[] = []
  public paginatorConfig: any
  public page: number = 1;

  constructor(
    private _api: ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
         let categoryName = params['name'];
         this.getArticleList(categoryName);
      });
  }

  getArticleList (categoryName: string) {
    // this.categoryName = this.route.snapshot.paramMap.get('name')!;
    this._api.getTypeRequest('backend/tagList/'+categoryName).subscribe((data: any) => {
      this.postList = data;
    }, err => {
      console.log(err)
    })
  }
}
