import { Routes } from '@angular/router';
import { ArticleListComponent } from '../../pages/article-list/article-list.component';
import { CategorysComponent } from '../../pages/categorys/categorys.component';
import { CreatePostComponent } from '../../pages/create-post/create-post.component';
import { ModifyPostComponent } from '../../pages/modify-post/modify-post.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'list',      component: ArticleListComponent },
    { path: 'categorys',   component: CategorysComponent },
    // { path: 'profile',         component: UserProfileComponent },
    { path: 'create',          component: CreatePostComponent },
    { path: 'modify',          component: ModifyPostComponent }
];
