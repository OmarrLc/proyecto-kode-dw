import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  proyectos =[
    {
      nombreProyecto:'Proyecto 1'
    },
    {
      nombreProyecto:'Proyecto 2'
    },
    {
      nombreProyecto: 'Proyecto 3'
    },
    {
      nombreProyecto: 'Proyecto 4'
    }
  ]
  snippets =[
    {
      nombreSnippet:'Snippet 1'
    },
    {
      nombreSnippet:'Snippet 2'
    },
    {
      nombreSnippet: 'Snippet 3'
    },
    {
      nombreSnippet: 'Snippet 4'
    }
  ]
  

  constructor(private modalService:NgbModal) { }


  ngOnInit(): void {

  }
  abrirModalProyecto(modal,tipo){
    this.modalService.open(modal,
      {
        size:'xs',
        centered:false});
    console.log(tipo);
  }

 

  guardarProyecto(){
    console.log('Nuevo Proyecto');
  }
  guardarSnippet(){
    console.log('Nuevo Snippet');
  }
}
