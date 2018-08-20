import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialRollupModule } from './material-rollup.module';
import { AuthService } from './services/auth.service';
import { SearchService } from './services/search.service';
import { TokenInterceptor } from './services/token.interceptor';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { SongCardComponent } from './song-card/song-card.component';

const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'search', component: SearchComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialRollupModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  declarations: [AppComponent, SearchComponent, SongCardComponent],
  bootstrap: [AppComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }, AuthService, SearchService]
})
export class AppModule {
  constructor() { }
}
