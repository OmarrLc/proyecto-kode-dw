import { Component, OnInit, ViewChild} from '@angular/core';
import 'ace-builds/webpack-resolver';
import "brace/theme/monokai";

// Modos de Ace Editor
import 'brace/mode/cobol';
import 'brace/mode/csharp';
import 'brace/mode/css';
import 'brace/mode/dart';
import 'brace/mode/django';
import 'brace/mode/d';
import 'brace/mode/fortran';
import 'brace/mode/haskell';
import 'brace/mode/html';
import 'brace/mode/java';
import 'brace/mode/javascript';
import 'brace/mode/json';
import 'brace/mode/kotlin';
import 'brace/mode/lisp';
import 'brace/mode/markdown';
import 'brace/mode/mysql';
import 'brace/mode/objectivec';
import 'brace/mode/pascal';
import 'brace/mode/perl';
import 'brace/mode/php';
import 'brace/mode/prolog';
import 'brace/mode/python';
import 'brace/mode/r';
import 'brace/mode/ruby';
import 'brace/mode/rust';
import 'brace/mode/sass';
import 'brace/mode/scss';
import 'brace/mode/sql';
import 'brace/mode/swift';
import 'brace/mode/typescript';
import 'brace/mode/xml';
import 'brace/mode/text';
// 

import { UsuarioService } from 'src/app/services/service.index';
declare function init_plugins();

@Component({
  selector: 'app-home-snippet',
  templateUrl: './home-snippet.component.html',
  styleUrls: ['./home-snippet.component.css']
})
export class HomeSnippetComponent implements OnInit {
  snippetSeleccionado:any;
  options:any;
  contenido:any;
  tipo:any;
  constructor(
    private _usuarioService: UsuarioService

  ) {
    
   }

  ngOnInit(): void {
    init_plugins()
    this.snippetSeleccionado = JSON.parse(localStorage.getItem('snippetSeleccionado'));
    // console.log('proyecto en el lado de los editores',JSON.parse(localStorage.getItem('proyectoSeleccionado')));
    this.cargarEditor();

  }



  cargarEditor(){
    // this.options = {maxLines: 1000, printMargin: false};
    this.contenido = `${this.snippetSeleccionado.contenido}`;
    this.tipo = `${this.snippetSeleccionado.tipo}`;
  }
  onChange(code) {
    // code= this.sanitizer.bypassSecurityTrustHtml(code)
    this.contenido=code
    
    // console.log("HTML", this.textHtml);
  }

  ConfirmBorrar() {
    var mensaje = confirm(`Perdera todos los cambios no guardados`);
    if (mensaje) {
      this.cargarEditor()
    }
    else {
    return null;
    }
  }
  guardarCambios(){
    let id:string= this.snippetSeleccionado._id;
    let snippet:any ={
      'nombreSnippet': this.snippetSeleccionado.nombreSnippet,
      'tipo': this.snippetSeleccionado.tipo,
      'contenido': this.contenido
    }

    this._usuarioService.actualizarSnippet(id, snippet)
        .subscribe (()=> this.snippetSeleccionado = JSON.parse(localStorage.getItem('snippetSeleccionado')))

  }

  descargarSnippet(){
    this._usuarioService.descargarSnippet(this.snippetSeleccionado._id)
      .subscribe (resp=>{
        alert('Snippet Descargado Exitosamente');
      })
  }

}

