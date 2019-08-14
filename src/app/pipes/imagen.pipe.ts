import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const URL = environment.imgPath;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, size: string = 'w500'): any {
    let imgUrl = '';

    if (img) {
        imgUrl = `${URL}/${size}${img}`;
    } else {
        imgUrl = './assets/no-image-banner.jpg';
    }
    // console.log('imgURL', imgUrl);

    return imgUrl;
  }

}
