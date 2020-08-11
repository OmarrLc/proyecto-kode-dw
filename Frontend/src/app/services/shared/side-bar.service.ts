import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {
  menu:any=[
    {
      titulo: 'Proyectos',
      icono: 'far fa-folder',
      url: '/dash',
      submenu:[
        {titulo: 'Proyecto 1', url: '/dash1'}
      ]
    },
    {
      titulo: 'Snippets',
      icono: 'far fa-file-code',
      url:'/dash',
      submenu:[
        {titulo: 'Snippet 1', url: '/dash1'}
      ]
    }
  ]
  constructor()  { }
}
