import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {
  menu:any=[
    {
      titulo: 'Area Personal',
      icono: 'far fa-user-circle',
      submenu:[
        {titulo: 'Proyectos', url: '/dash'},
        {titulo: 'Snippets', url: '/dash'},
      ]
    }
  ]
  constructor()  { }
}
