import { Component, OnInit } from '@angular/core';
import { SideBarService } from 'src/app/services/service.index';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor( public _sidebar: SideBarService ) { }

  ngOnInit(): void {

  }
 
}