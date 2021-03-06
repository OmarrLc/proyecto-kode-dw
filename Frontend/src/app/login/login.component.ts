import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.models';
declare const gapi:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  recuerdame: boolean=false;
  email:string;
  auth2: any;
  error=this._usuarioService.errorLogin;
  constructor(
    public router:Router,
    public _usuarioService: UsuarioService
    ) { }

  ngOnInit(): void {
    this.googleInit();
    this.email=localStorage.getItem('email') || '';
    if ( this.email.length>1){
      this.recuerdame=true;
    }
  }
  googleInit() {

    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '319984682702-bqv53r7l801ifu0qlijqb3jbo60d3b5n.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle') );

    });

  }

  attachSignin( element ) {

    this.auth2.attachClickHandler( element, {}, (googleUser) => {

      // let profile = googleUser.getBasicProfile();
      // let token = googleUser.getAuthResponse().id_token;

      // this._usuarioService.loginGoogle( token )
      //         .subscribe( () => window.location.href = '#/dashboard'  );
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      // console.log('token',token);
      this._usuarioService.loginGoogle( token )
          .subscribe( ()=> window.location.href='/dash');
    });
 
  }

 
  ingresar(form: NgForm){
    if(form.invalid){
      return;
    }
    let usuario = new Usuario(null, form.value.email,form.value.password)
    this._usuarioService.login(usuario, form.value.recuerdame)
        .subscribe( ()=> window.location.href='/dash');
  }

}
