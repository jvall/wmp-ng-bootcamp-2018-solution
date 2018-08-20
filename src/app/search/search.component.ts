import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { Song } from '../models/song';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  private _searchStream$ = new Subject<string>();
  searchResults: Song[];
  favorites: Song[] = [];
  songToPlay: string = null;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this._searchStream$.pipe(
      filter(input => input !== ''),
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(input => this.searchService.searchStores(input))
    ).subscribe(results => {
      this.searchResults = results;
    });
  }

  ngOnDestroy() {
    this._searchStream$.complete();
  }

  private onSearchInput(ev) {
    this._searchStream$.next(ev.target.value);
  }

  playSong(url) {
    this.songToPlay = url;
  }

  favoriteSong(id) {
    this.favorites.push(this.searchResults.find(favorite => favorite.id === id));
  }

  isInFavoritesList(id) {
    return this.favorites.find(favorite => favorite.id === id) !== undefined;
  }
}
