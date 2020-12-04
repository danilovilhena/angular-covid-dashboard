import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { BrazilHomeComponent } from './views/brazil/brazil-home/brazil-home.component';
import { WorldHomeComponent } from './views/world/world-home/world-home.component';
import { BrazilStatesComponent } from './views/brazil/brazil-states/brazil-states.component';
import { WorldCountriesComponent } from './views/world/world-countries/world-countries.component';
import { BrazilCityComponent } from './views/brazil/brazil-city/brazil-city.component';
import { WorldCityComponent } from './views/world/world-city/world-city.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "brazil", component: BrazilHomeComponent },
  { path: "world", component: WorldHomeComponent },
  { path: "brazil/state", component: BrazilStatesComponent },
  { path: "world/country", component: WorldCountriesComponent },
  { path: "brazil/state/city", component: BrazilCityComponent },
  { path: "world/country/city", component: WorldCityComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
