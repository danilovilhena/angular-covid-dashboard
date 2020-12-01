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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderBrazilComponent,
    HeaderWorldComponent,
    BrazilHomeComponent,
    WorldHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
