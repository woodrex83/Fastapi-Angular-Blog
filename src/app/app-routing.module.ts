import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { PreloadAllModules } from '@angular/router';

import { AdminLayoutComponent } from './backstage/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './backstage/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/_services/auth.guard';
import { MainLayoutComponent } from './frontend/layouts/main-layout/main-layout.component';

const routes: Routes =[
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/frontend/layouts/main-layout/main-layout.module').then(m => m.MainLayoutModule)
      }
    ]
  },
  {
    path: 'backend',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/backstage/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
    ]
  },

  {
    path: 'dashboard',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/backstage/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }
    ]
  },

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      // useHash: true,
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
