import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  forma : FormGroup;

  constructor( 
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }
  sonIguales (campo1:string, campo2:string ){
    return (group:FormGroup)=>{
      let pass1= group.controls[campo1].value;
      let pass2= group.controls[campo2].value;
      if (pass1===pass2){
        return null
      }
      return {
        sonIguales:true
      };
    }
  }

  ngOnInit(): void {

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required)
    }, { validators: this.sonIguales('password', 'password2') } );
  }

  registro(){
    if(this.forma.invalid){
      return
    }
    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.password 
    );
    this._usuarioService.crearUsuario(usuario)
      .subscribe( resp=>this.router.navigate(['/login']))
  }
}
