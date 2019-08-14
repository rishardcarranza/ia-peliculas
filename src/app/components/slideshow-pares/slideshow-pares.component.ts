import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../interfaces/interfaces';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

    @Input() peliculas: Movie[] = [];
    @Output() cargarMas = new EventEmitter();

    slideOpts = {
        slidesPerView: 3.3,
        freeMode: true,
        spaceBetween: -10
    };

  constructor() { }

  ngOnInit() {}

  onClick() {
    this.cargarMas.emit();
  }

}
