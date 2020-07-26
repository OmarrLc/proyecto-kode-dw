import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages/pages.component';
import { DashBoardComponent } from './pages/dash-board/dash-board.component';
import { LoginComponent } from './login/login.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { HomeComponent } from './pages/home/home.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { LandingComponent } from './landing/landing.component';
import { RegistroComponent } from './registro/registro.component';


const routes: Routes = [
  {
    path: 'index',
    component: LandingComponent
  },
  {
    path:'',
    component: PagesComponent,
    children:[
      {
        path:'dashboard', component: DashBoardComponent
      },
      {
        path:'home', component: HomeComponent
      },
      {
        path:'progress', component: ProgressComponent
      },
      {
        path:'',redirectTo:'/',pathMatch:'full'
      }
    ]
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'registro',
    component: RegistroComponent
  },
  {
    path:'**',
    component: NoPageFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 
export class AppRoutingModule { }
