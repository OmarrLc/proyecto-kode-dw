import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from '../../models/usuario.models';

declare function init_plugins();
@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  proyectos;
  snippets;
  usuario:Usuario;
  nombreProyecto:string;
  nombreSnippet:string;
  tipoSnippet:string;
  conteo:number;
  constructor(
    private modalService:NgbModal,
    private _usuarioService: UsuarioService
    ) { }


  ngOnInit(): void {
    init_plugins();
    this.usuario = this._usuarioService.usuario;
    this.cargarProyectos();
    this.cargarSnippets();
  }

  // Funciones de Proyectos
  verificarPlan(modal){
    var plan= this.usuario.plan;
    var conteo = this.conteo
    // console.log(plan);
    // console.log('conteo desdwa',conteo);
    
      if(plan==='NOOB'){
        if( conteo<1){
          this.abrirModalProyecto(modal,'proyecto')
          return
        }
      }
      if(plan==='JUNIOR'){
        if( conteo<10){
          this.abrirModalProyecto(modal,'proyecto')
          return
        }
      }
      if(plan==='SENIOR'){
        console.log('esta en senior');
        this.abrirModalProyecto(modal,'proyecto')
        return
      }
    else{
      return alert('Ha llegado a su limite, cambie a un plan superior');
    }
  }

  abrirModalProyecto(modal,tipo){
    this.modalService.open(modal,
      {
        size:'xs',
        centered:false
      });
    // console.log(tipo);
  }

  cargarProyectos(){
   
    this._usuarioService.cargarProyectos(this.usuario._id)
        .subscribe(resp=>{
          this.proyectos= resp.proyectos;
          this.conteo= resp.totalProyectos;
          // console.log('Proyetos de usuario', this.proyectos);
        });
  }
  
  mostrarProyecto(proyecto){
    this._usuarioService.proyectoSeleccionadoAMostrar(proyecto);
    // console.log('Proyecto a mostrar', proyecto);
  }

  crearProyecto(form){
    var proyecto:any = {
      'nombreProyecto': form.nombreProyecto,
      'index': '',
      'style': '',
      'main': ''
    }
    this._usuarioService.crearProyecto(proyecto)
      .subscribe(resp=>{
        console.log(resp);
        this.cargarProyectos();
      })
      this.modalService.dismissAll();
  }

  ConfirmProyecto(id:string,nombre:string) {
    var mensaje = confirm(`¿Realmente deseas eliminar ${nombre}?`);
    if (mensaje) {
      this.eliminarProyecto(id)
    }
    else {
    return null;
    }
  }

  eliminarProyecto(id:string){
    // console.log(id);
    this._usuarioService.eliminarProyecto(id)
        .subscribe(resp=>{
          this.cargarProyectos();
          console.log(resp);
          alert('Proyecto eliminado');
        })
  }

  // Funciones de Snippet
  mostrarSnippet(snippet){
    this._usuarioService.snippetSeleccionadoAMostrar(snippet);
    // console.log('Snippet a mostrar', id);
  }

  cargarSnippets(){
    this._usuarioService.cargarSnippets(this.usuario._id)
    .subscribe(resp=>{
      this.snippets= resp;
      // console.log('Snippet de usuario', this.snippets);
    });
  }

  crearSnippet(form){
    var snippet:any = {
      'nombreSnippet': form.nombreSnippet,
      'tipo': form.tipoSnippet,
      'contenido': ''
    }
    this._usuarioService.crearSnippet(snippet)
      .subscribe(resp=>{
        // console.log(resp);
        this.cargarSnippets();
      })
    this.modalService.dismissAll();
  }
 
  ConfirmSnippet(id:string,nombre:string) {
    var mensaje = confirm(`¿Realmente deseas eliminar ${nombre}?`);
    if (mensaje) {
      this.eliminarSnippet(id)
    }
    else {
    return null;
    }
  }

  eliminarSnippet(id:string){
    this._usuarioService.eliminarSnippet(id)
        .subscribe(resp=>{
          this.cargarSnippets();
          // console.log(resp);
          alert('Snippet eliminado');
        })
  }

}
