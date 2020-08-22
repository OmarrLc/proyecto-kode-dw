import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
import { UsuarioService } from 'src/app/services/service.index';
declare function init_plugins();
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario: Usuario;

  imagenSubir: File;

  imagenTemp: string;
  constructor(
    public _usuarioService: UsuarioService
  ) { 
    this.usuario=this._usuarioService.usuario;
  }

  ngOnInit(): void {
    init_plugins();
    // console.log(this.usuario);
  }

  actualizar ( usuario :Usuario){
    
    if(this.usuario.google===true){
      this.usuario.email = this.usuario.email;
    }else{
       this.usuario.email= usuario.email;
    } 
    this.usuario.nombreUsuario=usuario.nombreUsuario;
    this.usuario.plan=usuario.plan;
    console.log('Datos del formulario',this.usuario);
    this._usuarioService.actualizarUsuario(this.usuario)
    
      .subscribe(resp=>{
        console.log(resp);
      })
  }

  seleccionImagen(archivo: File){
    if ( !archivo ){
      this.imagenSubir = null;
      return
    }
    if (archivo.type.indexOf('image')<0){
      alert('Debe seleccionar una imagen');
      this.imagenSubir = null;
      return
    }
    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp=reader.result.toString();
    // console.log(archivo);
  }
  cambiarImagen(){
    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id)
  }

}
