import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CodeEditorModule } from '@ngstack/code-editor';
import { AceEditorModule } from 'ng2-ace-editor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { DashBoardComponent } from './pages/dash-board/dash-board.component';
import { HomeComponent } from './pages/home/home.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { HeaderComponent } from './shared/header/header.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { BreadCrumbsComponent } from './shared/bread-crumbs/bread-crumbs.component';
import { PagesComponent } from './pages/pages.component';
import { LandingComponent } from './landing/landing.component';
import { RegistroComponent } from './registro/registro.component';
import { PlanesComponent } from './registro/planes.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { CssComponent } from './pages/home/css.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ServiceModule } from './services/service.module';
import { PipesModule } from './pipes/pipes.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NoPageFoundComponent,
    DashBoardComponent,
    HomeComponent,
    ProgressComponent,
    HeaderComponent,
    SideBarComponent,
    BreadCrumbsComponent,
    PagesComponent,
    LandingComponent,
    RegistroComponent,
    PlanesComponent,
    CssComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CodemirrorModule,
    FormsModule,
    CodeEditorModule.forRoot(),
    AceEditorModule,
    NgbModule,
    ServiceModule,
    ReactiveFormsModule,
    PipesModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
