import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { MovieDetail, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';
import { Tab3Page } from '../../tab3/tab3.page';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

    @Input() id;
    pelicula: MovieDetail = {};
    actores: Cast[] = [];
    ocultar = 150;
    iconStar = 'star-outline';

    slideOptsActores = {
        slidesPerView: 3.3,
        freeMode: true,
        spaceBetween: -5
    };

  constructor(private movieService: MoviesService,
              private modalCtrl: ModalController,
              private dataLocal: DataLocalService) { }

  ngOnInit() {
    // console.log('ocultar', this.ocultar);

    this.dataLocal.existMovie(this.id)
        .then(exist => this.iconStar = (exist) ? 'star' : 'star-outline');

    this.movieService.getPeliculaDetalle(this.id)
        .subscribe(resp => {
            // console.log('Pelicula Detalle', resp);
            this.pelicula = resp;
        });

    this.movieService.getActoresPelicula(this.id)
        .subscribe(resp => {
            // console.log('Pelicula Actores', resp);
            this.actores = resp.cast;
        });
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  favorito() {
      const existe = this.dataLocal.saveFavoriteMovie(this.pelicula);

      this.iconStar = (existe) ? 'star' : 'star-outline';
  }

}
