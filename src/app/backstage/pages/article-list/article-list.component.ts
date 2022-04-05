import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/_services/api.service';
import { AuthService } from 'src/app/shared/_services/auth.service';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  public postList = new MatTableDataSource<any>();
  public totalCount:number = 0;

  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private router: Router,
    private matPaginatorIntl: MatPaginatorIntl,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getPostList()
    // 設定顯示分頁器文字
    this.matPaginatorIntl.getRangeLabel = (page : number, pageSize: number, length: number):string => {
      if (length === 0 || pageSize === 0) {
        return `第 0 筆、共 ${length} 筆`;
      }

      length = Math.max(length, 0);
      const initNum = page * pageSize;
      const endNum = initNum < length ? Math.min(initNum + pageSize, length) : initNum + pageSize;
      return `第 ${initNum + 1} - ${endNum} 筆、共 ${length} 筆`;
      }
    // 設定其他顯示資訊文字
    this.matPaginatorIntl.itemsPerPageLabel = '每頁筆數：';
    this.matPaginatorIntl.nextPageLabel = '下一頁';
    this.matPaginatorIntl.previousPageLabel = '上一頁';
  }

  getPostList () {
    this._api.getTypeRequest('backend/articleList').subscribe((data: any) => {
      this.postList = new MatTableDataSource<any>(data);
      this.postList.paginator = this.paginator;
      this.totalCount = data.length;
      // console.log(this.postList)
      if(data.access_token){
        this._auth.setDataInLocalStorage('token', data.access_token)
      }
    }, err => {
      console.log(err)
    })
  }

  inPost (postid: string) {
    this._api.getTypeRequest('backend/posts/'+postid).subscribe((res: any) => {
      let content = [];
      content.push(res.id,res.cid,res.title,res.content)
      this._auth.setDataInLocalStorage('content', JSON.stringify(content))
      this.router.navigate(['/dashboard/modify'])
    }, err => {
      console.log(err)
    })
  }

  delPost (postid: string) {
    this._api.deleteTypeRequest('backend/posts/'+postid).subscribe((res: any) => {
    if(res.access_token){
      this._auth.setDataInLocalStorage('token', res.access_token)
    }
    this.getPostList()
    this.snackBar.open('已刪除文章','我知道了', {
      duration: 2000,
    });
    }, err => {
      console.log(err)
    })
  }
}
