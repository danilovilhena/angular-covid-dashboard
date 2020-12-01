import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { BrazilHomeComponent } from './views/brazil/brazil-home/brazil-home.component';
import { WorldHomeComponent } from './views/world/world-home/world-home.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "brazil", component: BrazilHomeComponent },
  { path: "world", component: WorldHomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
