import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario.models';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators'; 
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  proyectos;
  snippets;
  proyectoSeleccionado:any='';
  snippetSeleccionado:any='';
  

  constructor( 
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) { 
    this.cargarStorage();
  }

  estaLogueado(){
    return ( this.token.length >2 ) ? true : false;
  }

  cargarStorage(){
    if( localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.token ='';
      this.usuario =null;
    }
  }

  guardarStorage(id:string, token:string, usuario:Usuario){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('proyectoSeleccionado', JSON.stringify(this.proyectoSeleccionado));
    this.usuario=usuario;
    this.token=token;
  }

  logout(){
    this.usuario =null;
    this.token= '';
  
    
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  loginGoogle(token:string){
    let url = URL_SERVICIOS+'/login/google';
    return this.http.post(url,{ token })
      .pipe(
        map((resp:any)=>{
          this.guardarStorage(resp.id,resp.token,resp.usuarioDB);
          return true;
        })
      )


  }

  login (usuario:Usuario, recordar:boolean=false){
    if (recordar){
      localStorage.setItem('email', usuario.email );
    }else{
      localStorage.removeItem('email');
    }
    let url = URL_SERVICIOS+'/login';
    return this.http.post(url,usuario)
      .pipe(
        map((resp:any)=>{
          this.guardarStorage(resp.id,resp.token,resp.usuarioDB);
          return true;
        })
      )
  }

  crearUsuario( usuario:Usuario){
    let url = URL_SERVICIOS + '/usuario';
    return this.http.post( url, usuario )
      .pipe(
        map( (resp:any)=>{
          // swal('Registrado exitosamente', usuario.email, 'success');
          return resp.usuario;
        } ) 
      )
  }

  actualizarUsuario( usuario:Usuario){
    let url=URL_SERVICIOS +'/usuario/'+usuario._id;
    url +='?token='+ this.token;  
    return this.http.put(url, usuario)
      .pipe(
        map((resp:any)=>{
          this.guardarStorage(resp.usuario._id, this.token,resp.usuario);
          // swal('Usuario Actualizado', usuario.nombreUsuario, 'success');
          return true;
        })
      )
  }

  cambiarImagen(archivo: File, id: string){
    this._subirArchivoService.subirArchivo( archivo,id )
        .then((resp: any)=>{
          // console.log(resp)
          this.usuario.img = resp.usuarioActualizado.img;
          this.guardarStorage (id, this.token, this.usuario );
        })
        .catch(resp=>{
          console.log(resp);
        })
  }

  cargarProyectos(id: string){
    let url = URL_SERVICIOS+'/proyecto/'+id
    return this.http.get(url) 
      .pipe(
        map((resp:any)=>{
          this.proyectos = resp.proyectos;
          return resp;
          // return console.log(resp);
        })
      )
  }
  cargarSnippets(id: string){
    let url = URL_SERVICIOS+'/snippet/'+id
    return this.http.get(url) 
      .pipe(
        map((resp:any)=>{
          this.snippets = resp.snippets;
          return this.snippets;
        })
      )
  }

  crearProyecto(proyecto:string){
    let url = URL_SERVICIOS+'/proyecto';
    url +='?token='+this.token
    return this.http.post(url,proyecto)
  }
  
  eliminarProyecto(id:string){
    let url = URL_SERVICIOS+'/proyecto/'+id;
    url +='?token='+this.token;
    return this.http.delete(url);
  }

  proyectoSeleccionadoAMostrar(proyecto:any){
    this.proyectoSeleccionado=proyecto;
    // console.log('Proyecto que puede acceder los editores', this.proyectoSeleccionado);
    localStorage.setItem('proyectoSeleccionado', JSON.stringify(proyecto));
    window.location.href= '/home';
  }

  actualizarProyecto(id:string,proyecto:any){
    let url = URL_SERVICIOS+/proyecto/+id;
    url+='?token='+this.token;
    return this.http.put(url,proyecto)
      .pipe(
        map((resp:any)=>{
          console.log(resp)
          localStorage.setItem('proyectoSeleccionado',JSON.stringify(resp.Proyecto));
        })
      )

  }


}
