import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class AuthService {
  private _authToken: string = null;
  private _isAuthorized = new ReplaySubject<boolean>(1);
  isAuthorized$ = this._isAuthorized.asObservable();

  constructor(private _router: Router) { }

  checkLoginOnInitialization() {
    if (window.location.hash) { // indicates post-redirect from spotify
      const paramMap = new HttpParams({
        fromString: window.location.hash
      });

      const storedNonceVal = sessionStorage.getItem('spotify_nonce'),
        redirectNonceVal = paramMap.get('state');

      if (storedNonceVal === redirectNonceVal) { // quick check for XSRF
        this._authToken = paramMap.get('#access_token');
        this._isAuthorized.next(true);
        this._router.navigate(['/']);
      }
    } else if (!this._authToken) {
      this.login();
    }
  }

  login() {
    const nonce = this.generateNonce();
    sessionStorage.setItem('spotify_nonce', nonce);

    window.location.href =
      `https://accounts.spotify.com/authorize?client_id=32ca9e1e60554fb48315c3d85f449e65&redirect_uri=http://localhost:4200&scope=user-read-private%20user-read-email&response_type=token&state=${nonce}`; // tslint:disable-line
  }

  private generateNonce(): string {
    const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~';
    const result = [];
    const randomValues = window.crypto.getRandomValues(new Uint8Array(32)) as Uint8Array;
    randomValues.forEach(c =>
      result.push(charset[c % charset.length]));
    return result.join('');
  }

  get authToken(): string {
    return this._authToken;
  }
}
