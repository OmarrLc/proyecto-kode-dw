import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages/pages.component';
import { DashBoardComponent } from './pages/dash-board/dash-board.component';
import { LoginComponent } from './login/login.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { PlanesComponent } from './registro/planes.component';
import { LandingComponent } from './landing/landing.component';
import { RegistroComponent } from './registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CssComponent } from './pages/home/css.component';


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
        path:'dash', component:  DashBoardComponent , data:{titulo: 'Dashboard'}
      },
      {
        path: 'home', component: HomeComponent, data:{titulo: 'Proyecto X'}
      },
      {
        path: 'perfil', component: PerfilComponent, data:{titulo: 'Perfil'}
      },
      {
        path: 'render', component: CssComponent, data:{titulo: 'Snippets'}
      },
      {
        path: '', redirectTo: '/index' ,pathMatch:'full'
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
