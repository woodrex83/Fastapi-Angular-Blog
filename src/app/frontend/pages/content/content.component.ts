import { Component, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/_services/api.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  public article: any[] = []

  constructor(
    private _api: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
         let articleId = params['id'];
         this.getArticle(articleId);
      });
  }
  
  getArticle(id: number) {
    this._api.getTypeRequest('backend/posts/'+id).subscribe((data: any) => {
      this.article.push(data)
    })
  }
}
