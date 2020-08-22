import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from 'src/app/models/usuario.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  usuario: Usuario;
  constructor(
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.usuario= this._usuarioService.usuario;
  }
  
}
