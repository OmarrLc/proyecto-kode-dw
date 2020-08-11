import { Component, OnInit, ViewChild } from '@angular/core';
declare function init_plugins();
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor() {

    
   }

  ngOnInit(): void {
    init_plugins();
 

  }

}
