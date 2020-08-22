import { Component, OnInit, ViewChild} from '@angular/core';
import 'ace-builds/webpack-resolver';
import "brace/theme/pastel_on_dark";
import "brace/mode/html";
import "brace/mode/css";
import "brace/mode/javascript";
import { DomSanitizer } from '@angular/platform-browser';
import { UsuarioService } from 'src/app/services/service.index';
declare function init_plugins();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  proyectoSeleccionado:any;
  options:any;
  textHtml:any;
  textCss:any;
  textJs:any;
  constructor( 
    private sanitizer:DomSanitizer,
    private _usuarioService: UsuarioService
    ) { }

  ngOnInit(): void {
    init_plugins()
    this.proyectoSeleccionado = JSON.parse(localStorage.getItem('proyectoSeleccionado'));
    // console.log('proyecto en el lado de los editores',JSON.parse(localStorage.getItem('proyectoSeleccionado')));
    this.cargarEditores();
  }
    cargarEditores(){
      this.options = {maxLines: 1000, printMargin: false};
      this.textHtml = `${this.proyectoSeleccionado.index}`;
      this.textCss = `${this.proyectoSeleccionado.style}`;
      this.textJs = `${this.proyectoSeleccionado.main}`;
    }

    ConfirmBorrar() {
      var mensaje = confirm(`Perdera todos los cambios no guardados`);
      if (mensaje) {
        this.cargarEditores()
      }
      else {
      return null;
      }
    }

    onChangeHtml(code) {
      // code= this.sanitizer.bypassSecurityTrustHtml(code)
      this.textHtml=code
      
      // console.log("HTML", this.textHtml);
    }
    onChangeCss(code) {
      this.textCss=code
      
      // code= this.sanitizer.bypassSecurityTrustStyle(code);
      // console.log("CSS", code);
       
    }
    onChangeJs(code) {
      this.textJs=code
      
      // code= this.sanitizer.bypassSecurityTrustScript(code)
      // console.log("JS", code);
    }

    guardarCambios(){
      let id:string= this.proyectoSeleccionado._id;
      let proyecto:any ={
        'nombreProyecto': this.proyectoSeleccionado.nombreProyecto,
        'index': this.textHtml,
        'style': this.textCss,
        'main': this.textJs
      }

      this._usuarioService.actualizarProyecto(id, proyecto)
          .subscribe (()=> this.proyectoSeleccionado = JSON.parse(localStorage.getItem('proyectoSeleccionado')))

    }
}
