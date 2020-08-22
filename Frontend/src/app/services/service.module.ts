import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedService, SideBarService, UsuarioService, LoginGuardGuard,  SubirArchivoService } from './service.index'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    SharedService,
    SideBarService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService
  ]
})
export class ServiceModule { }
