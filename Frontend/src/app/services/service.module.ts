import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedService, SideBarService } from './service.index'


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    SharedService,
    SideBarService
  ]
})
export class ServiceModule { }
