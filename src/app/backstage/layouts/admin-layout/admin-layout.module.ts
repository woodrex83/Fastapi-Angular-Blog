import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminLayoutRoutes } from './admin-layout-routing.module';

import { ArticleListComponent } from '../../pages/article-list/article-list.component';
import { CategorysComponent } from '../../pages/categorys/categorys.component';
import { CreatePostComponent } from '../../pages/create-post/create-post.component';
import { ModifyPostComponent } from '../../pages/modify-post/modify-post.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { AdminLayoutComponent } from './admin-layout.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularEditorModule,
    NgbModule,
    MaterialModule
  ],
  declarations: [
    AdminLayoutComponent, // 定義自己才可以使用app-selector
    ArticleListComponent,
    CategorysComponent,
    CreatePostComponent,
    ModifyPostComponent,
    UserProfileComponent
  ]
})

export class AdminLayoutModule {}