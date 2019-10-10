import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {MapComponent} from './map/map.component';
import {IssComponent} from './iss/iss.component';
import {LeafletComponent} from './leaflet/leaflet.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    IssComponent,
    LeafletComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
