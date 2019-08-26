import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { MovieDetail } from '../../interfaces/interfaces';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

    @Input() id;
    pelicula: MovieDetail = {};
    ocultar = 150;

  constructor(private movieService: MoviesService) { }

  ngOnInit() {
    console.log('ocultar', this.ocultar);
    this.movieService.getPeliculaDetalle(this.id)
        .subscribe(resp => {
            console.log('Pelicula Detalle', resp);
            this.pelicula = resp;
        });

    this.movieService.getActoresPelicula(this.id)
        .subscribe(resp => {
            console.log('Pelicula Actores', resp);
        });
  }

}
