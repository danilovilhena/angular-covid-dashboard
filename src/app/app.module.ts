import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderBrazilComponent } from './components/header-brazil/header-brazil.component';
import { HeaderWorldComponent } from './components/header-world/header-world.component';
import { BrazilHomeComponent } from './views/brazil/brazil-home/brazil-home.component';
import { WorldHomeComponent } from './views/world/world-home/world-home.component';
import { BrazilStatesComponent } from './views/brazil/brazil-states/brazil-states.component';
import { WorldCountriesComponent } from './views/world/world-countries/world-countries.component';
import { BrazilCityComponent } from './views/brazil/brazil-city/brazil-city.component';
import { WorldCityComponent } from './views/world/world-city/world-city.component';
import { BrazilTop5Component } from './views/brazil/brazil-top5/brazil-top5.component';
import { WorldTop5Component } from './views/world/world-top5/world-top5.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderBrazilComponent,
    HeaderWorldComponent,
    BrazilHomeComponent,
    WorldHomeComponent,
    BrazilStatesComponent,
    WorldCountriesComponent,
    BrazilStatesComponent,
    BrazilCityComponent,
    WorldCityComponent,
    BrazilTop5Component,
    WorldTop5Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
