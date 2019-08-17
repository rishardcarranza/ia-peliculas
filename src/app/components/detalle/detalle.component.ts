import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

    @Input() id;

  constructor(private movieService: MoviesService) { }

  ngOnInit() {
    // console.log('ID', this.id);
    this.movieService.getPeliculaDetalle(this.id)
        .subscribe(resp => {
            console.log('Pelicula Detalle', resp);
        });

    this.movieService.getActoresPelicula(this.id)
        .subscribe(resp => {
            console.log('Pelicula Actores', resp);
        });
  }

}
