import { Component, OnInit } from '@angular/core';
import { MovieDetail, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

    peliculas: MovieDetail[] = [];
    generos: Genre[] = [];

    favoritoPorGenero: any[] = [];

  constructor(private dataLocal: DataLocalService,
              private movieService: MoviesService) {}

  async ngOnInit() {}

  /**
   * Ciclo de vida de los componentes
   * ionViewWillEnter: Se ejecuta antes de que se muestre en pantalla la pagina
   */
  async ionViewWillEnter() {
    this.loadFavoritos(event);
  }

  peliculasPorGenero(generos: Genre[], peliculas: MovieDetail[]) {

    // Obtener las peliculas en base al genero y agruparlas en base a este
    this.favoritoPorGenero = [];
    generos.forEach(genero => {
        this.favoritoPorGenero.push({
            genero: genero.name,
            peliculas: peliculas.filter(peli => {
                            return peli.genres.find(genre => genre.id === genero.id);
                        })
        });
    });

    console.log(this.favoritoPorGenero);
  }

  async loadFavoritos(event) {
      console.log(event);
    this.peliculas = await this.dataLocal.loadFavorites();
    this.generos = await this.movieService.cargarGeneros();

    // console.log(this.peliculas);
    this.peliculasPorGenero(this.generos, this.peliculas);
  }

}
