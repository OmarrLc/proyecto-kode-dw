import { Component, OnInit } from '@angular/core';
import { SideBarService, UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/usuario.models';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  usuario: Usuario;
  proyectos;
  snippets;
  constructor( 
    public _sidebar: SideBarService,
    public _usuarioService: UsuarioService
    ) { }

  ngOnInit(): void {
    this.usuario=this._usuarioService.usuario;
    this.cargarProyectos();
    this.cargarSnippets();
  }

  cargarProyectos(){
   
    this._usuarioService.cargarProyectos(this.usuario._id)
        .subscribe(resp=>{
          this.proyectos= resp.proyectos;
          // console.log('Proyetos de usuario', this.proyectos);
        });
  }

  cargarSnippets(){
    this._usuarioService.cargarSnippets(this.usuario._id)
    .subscribe(resp=>{
      this.snippets= resp;
      // console.log('Snippet de usuario', this.snippets);
    });
  }

  mostrarProyecto(id:string){
    console.log('Proyecto a mostrar', id);
  }
  mostrarSnippet(id:string){
    console.log('Snippet a mostrar', id);
  }
 
}