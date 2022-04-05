import { Routes } from '@angular/router';
import { CategoryArticleListComponent } from '../../pages/category-article-list/category-article-list.component';
import { ContentListComponent } from '../../pages/content-list/content-list.component';
import { ContentComponent } from '../../pages/content/content.component';



export const MainLayoutRoutes: Routes = [
    { path: 'category/:name', component: CategoryArticleListComponent },
    { path: 'article/post/:id', component: ContentComponent },
    { path: '', component: ContentListComponent},
];
