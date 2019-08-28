import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    textoBuscar = '';
    peliculas: Movie[] = [];
    sugerencias: string[] = ['Spiderman', 'Vengadores', 'El señor de los anillos', 'La vida es bella'];
    loading = false;

  constructor(private movieService: MoviesService,
              private modalCtrl: ModalController) {}

  buscar(event) {
      const valor: string = event.detail.value;
      if (valor !== '') {
        this.loading = true;

        this.movieService.buscarPelicula(valor)
        .subscribe(resp => {
            // console.log(resp);
            // tslint:disable-next-line: no-string-literal
            this.peliculas = resp['results'];
            this.loading = false;
        });
    } else {
        this.loading = false;
        this.peliculas = [];
    }
  }

  async viewDetail(id: string) {
    const modal = await this.modalCtrl.create({
        component: DetalleComponent,
        componentProps: {
            id
        }
    });

    modal.present();
  }

}
