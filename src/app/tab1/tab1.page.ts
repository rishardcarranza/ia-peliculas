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
    slideOpts = {
        slidesPerView: 1.1,
        freeMode: true
    };

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
      this.moviesService.getFeature()
        .subscribe(resp => {
            this.peliculasRecientes = resp.results;
        });
  }
}
