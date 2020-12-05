import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-world-top5',
  templateUrl: './world-top5.component.html',
  styleUrls: ['./world-top5.component.css']
})
export class WorldTop5Component implements OnInit {

  countries;
  option;
  countriesSelect = [];
  title;

  constructor(private location: Location) { }

  ngOnInit(): void {
    let routeState = this.location.getState()
    this.countries = routeState['paises']
    this.option = routeState['opcao']
    console.log(this.countries, this.option)
    setTimeout(() => {
      if(this.option == 'casos'){
        this.findCountriesByCases()
        this.title = "Número de casos"
      } else if(this.option == 'obitos') {
        this.findCountriesByDeaths()
        this.title = "Número de óbitos"
      } else if(this.option == 'casos24hr') {
        this.findCountriesByCases24Hour()
        this.title = "Mais casos nas últimas 24 horas"
      } else {
        this.findCountriesByDeathRatio()
        this.title = "Maior taxa de mortalidade"
      }
    }, 2000);
  }

  findCountriesByCases(){
    // Fill countriesSelect array
    for(const key in this.countries) {
      this.countriesSelect.push(this.countries[key])
    }

    // Sort by number of cases
    this.countriesSelect.sort(function(a, b){return b['casos'] - a['casos']});
    this.countriesSelect = this.countriesSelect.slice(0,10)
  }

  findCountriesByDeaths(){
    // Fill countriesSelect array
    for(const key in this.countries) {
      this.countriesSelect.push(this.countries[key])
    }

    // Sort by number of deaths
    this.countriesSelect.sort(function(a, b){return b['mortes'] - a['mortes']});
    this.countriesSelect = this.countriesSelect.slice(0,10)
  }

  findCountriesByCases24Hour(){
    // Fill countriesSelect array
    for(const key in this.countries) {
      this.countriesSelect.push(this.countries[key])
    }

    // Sort by number of cases in 24 hours
    this.countriesSelect.sort(function(a, b){return b['casos_dif'] - a['casos_dif']});
    this.countriesSelect = this.countriesSelect.slice(0,10)
  }

  findCountriesByDeathRatio(){
    // Fill countriesSelect array
    for(const key in this.countries) {
      this.countriesSelect.push(this.countries[key])
    }

    // Sort by number of death ratio
    this.countriesSelect.sort(function(a, b){return b['taxa_morte'] - a['taxa_morte']});
    this.countriesSelect = this.countriesSelect.slice(0,10)
  }

  numberWithCommas(number) {
    return number.toLocaleString('pt')
  }

}
