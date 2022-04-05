import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './shared/_services/interceptor.service';
import { MaterialModule } from './shared/material/material.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AdminLayoutModule } from './backstage/layouts/admin-layout/admin-layout.module';
import { AuthLayoutModule } from './backstage/layouts/auth-layout/auth-layout.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategoryArticleListComponent } from './frontend/pages/category-article-list/category-article-list.component';
import { ContentComponent } from './frontend/pages/content/content.component';


@NgModule({
  declarations: [
    AppComponent,
    // ContentComponent,
    // CategoryArticleListComponent,
    // MainLayoutComponent,
    // ArticleListComponent,
    // ContentListComponent,
  ],
  imports: [
    BrowserModule,
    AdminLayoutModule,
    AuthLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MaterialModule,
    HttpClientModule,
    AngularEditorModule,
    NgxPaginationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
