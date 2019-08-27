import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    textoBuscar = '';
    sugerencias: string[] = ['Spiderman', 'Vengadores', 'El señor de los anillos', 'La vida es bella'];

  constructor(private movieService: MoviesService) {}


  buscar(event) {
      const valor = event.detail.value;
      this.movieService.buscarPelicula(valor)
        .subscribe(resp => {
            console.log(resp);
        });
  }

}
