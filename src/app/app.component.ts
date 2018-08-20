import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _authService: AuthService, private _router: Router) {
    this._authService.checkLoginOnInitialization();

    this._authService.isAuthorized$.subscribe(isAuthorized => {
      if (isAuthorized) {
        this._router.navigate(['/search']);
      }
    });
  }
}
