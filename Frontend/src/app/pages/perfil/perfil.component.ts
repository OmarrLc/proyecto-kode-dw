import { Component, OnInit } from '@angular/core';
declare function init_plugins();
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    init_plugins()
  }

}
