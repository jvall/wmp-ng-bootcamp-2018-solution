import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.css']
})
export class SongCardComponent implements OnInit {
  @Input()
  name: string;

  @Input()
  coverImg: string;

  @Input()
  artist: string;

  @Input()
  isFavorited: boolean;

  @Output()
  play = new EventEmitter();

  @Output()
  favorite = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }


  playSong() {
    this.play.emit();
  }

  favoriteSong() {
    this.favorite.emit();
  }
}
