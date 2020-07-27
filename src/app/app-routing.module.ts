import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages/pages.component';
import { DashBoardComponent } from './pages/dash-board/dash-board.component';
import { LoginComponent } from './login/login.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { PlanesComponent } from './registro/planes.component';
import { LandingComponent } from './landing/landing.component';
import { RegistroComponent } from './registro/registro.component';


const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path:'dashboard',
    component: PagesComponent,
    children:[
      {
        path:'', component: DashBoardComponent
      },
      {
        path: '', redirectTo: '/' ,pathMatch:'full'
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
    path:'planes',
    component: PlanesComponent
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
