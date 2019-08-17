import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieResult, MovieDetail, Credits } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

    private popularesPage = 0;

  constructor(private http: HttpClient) { }


  private ejecutarQuery<T>(query: string) {
    query = URL + query;
    query += `&api_key=${apiKey}&language=es&include_image_language=es`;
    // console.log(query);
    return this.http.get<T>(query);
  }

  getFeature() {
    const hoy = new Date();
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    const mes = hoy.getMonth() + 1;

    let mesStr;
    mesStr = (mes < 10) ? ('0' + mes) : mes;

    const inicio = `${hoy.getFullYear()}-${mesStr}-01`;
    const final = `${hoy.getFullYear()}-${mesStr}-${ultimoDia}`;

      // tslint:disable-next-line: max-line-length
    return this.ejecutarQuery<MovieResult>(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${final}`);
  }

  getPopulars() {
      this.popularesPage++;
      const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;

      return this.ejecutarQuery<MovieResult>(query);
  }

  getPeliculaDetalle(movieId: string) {
    return this.ejecutarQuery<MovieDetail>(`/movie/${movieId}?etc=1`);
  }

  getActoresPelicula(movieId: string) {
    return this.ejecutarQuery<Credits>(`/movie/${movieId}/credits?etc=1`);
  }
}
