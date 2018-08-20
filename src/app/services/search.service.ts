import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Song } from '../models/song';

const SPOTIFY_BASE = 'https://api.spotify.com/v1';

@Injectable()
export class SearchService {


  constructor(private _http: HttpClient) { }


  searchStores(query): Observable<Song[]> {
    return this._http.get(`${SPOTIFY_BASE}/search?q=${query}&type=track`)
      .pipe(
        map((response: any) => {
          return response.tracks.items.map(item => {
            return {
              id: item.id,
              name: item.name,
              artist: item.artists[0].name,
              coverImg: item.album.images[0].url,
              previewUrl: item.preview_url
            };
          });
        })
      );
  }
}
