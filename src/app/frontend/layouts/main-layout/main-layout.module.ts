import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { MainLayoutComponent } from './main-layout.component';
import { ContentListComponent } from '../../pages/content-list/content-list.component';
import { MainLayoutRoutes } from './main-layout-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategoryArticleListComponent } from '../../pages/category-article-list/category-article-list.component';
import { ContentComponent } from '../../pages/content/content.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MainLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    AngularEditorModule,
    NgbModule,
    MaterialModule
  ],
  declarations: [
    MainLayoutComponent, // 定義自己才可以使用app-selector
    ContentListComponent,
    CategoryArticleListComponent,
    ContentComponent
  ]
})

export class MainLayoutModule {}