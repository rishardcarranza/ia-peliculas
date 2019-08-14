import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { MovieResult, Movie } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

    peliculasRecientes: Movie[] = [];
    populares: Movie[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.moviesService.getFeature()
        .subscribe(resp => {
            this.peliculasRecientes = resp.results;
    });

    this.getPopulares();
  }

  cargarMas() {
    this.getPopulares();
  }

  getPopulares() {
    this.moviesService.getPopulars()
        .subscribe(resp => {
            // console.log('Populares', resp);
            const arrayTemp = [...this.populares, ...resp.results];
            this.populares = arrayTemp;
        });
  }
}
