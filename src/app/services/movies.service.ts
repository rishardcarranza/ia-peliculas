import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieResult } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }


  private ejecutarQuery<T>(query: string) {
    query = URL + query;
    query += `&api_key=${apiKey}&language=es&include_image_language=es`;

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
}