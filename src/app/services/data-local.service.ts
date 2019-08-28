import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MovieDetail } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

    peliculas: MovieDetail[] = [];

  constructor(private storage: Storage,
              private toastCtrl: ToastController) {

        this.loadFavorites();
    }

  saveFavoriteMovie(pelicula: MovieDetail) {
    let existe = false;
    let message = '';

    for (const peli of this.peliculas) {
        if (peli.id === pelicula.id) {
            existe = true;
            break;
        }
    }

    if (existe) {
        // Remove the movie if exists
        this.peliculas = this.peliculas.filter(peli => peli.id !== pelicula.id);
        message = 'Borrado de Favoritos';
    } else {
        this.peliculas.push(pelicula);
        message = 'Agregado a Favoritos';
    }

    this.storage.set('peliculas', this.peliculas);

    this.presentToast(message);

    return !existe;
  }

  async loadFavorites() {
    const peliculas = await this.storage.get('peliculas');
    this.peliculas = peliculas || [];

    return this.peliculas;
  }

  async existMovie(id) {
    id = Number(id);

    await this.loadFavorites();
    const existe = this.peliculas.find(peli => peli.id === id);

    return (existe) ? true : false;
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500
    });
    toast.present();
  }
}
