import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string): any {

    let url = URL_SERVICIOS+'/imagen';

    if(!img){
      return url+'/img-not-found';
    }

    if(img.indexOf('https')>=0){
      return img;
    }
    // console.log (url+'/'+img);
    return url+'/'+img;
  } 

}
