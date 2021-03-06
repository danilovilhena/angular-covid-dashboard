import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brazil-top5',
  templateUrl: './brazil-top5.component.html',
  styleUrls: ['./brazil-top5.component.css']
})
export class BrazilTop5Component implements OnInit {

  states;
  option;
  cities = [];
  title;

  constructor(private location: Location) { }

  ngOnInit(): void {
    let routeState = this.location.getState()
    this.states = routeState['estados']
    this.option = routeState['opcao']
    console.log(this.states, this.option)
    setTimeout(() => {
      if(this.option == 'gastosMax'){
        this.findCitiesByMoneySpentMax()
        this.title = "Gastaram mais com a pandemia"
      } else if(this.option == 'gastosMin') {
        this.findCitiesByMoneySpentMin()
        this.title = "Gastaram menos com a pandemia"
      } else if(this.option == 'obitos') {
        this.findCitiesByDeaths()
        this.title = "Número de óbitos"
      } else {
        this.findCitiesByCases()
        this.title = "Número de casos"
      }
    }, 2000);
  }

  findCitiesByMoneySpentMax(){
    // Fill cities array
    for(let i = 0; i < this.states.length; i++){
      for(let j = 0; j < this.states[i].cidades.length; j++){
        this.states[i].cidades[j].estado = this.states[i].sigla
        this.cities.push(this.states[i].cidades[j])
      }
    }
    // Sort by money spent
    this.cities.sort(function(a, b){return b['dinheiro'] - a['dinheiro']});
    this.cities = this.cities.slice(0,10)
  }

  findCitiesByMoneySpentMin(){
    // Fill cities array
    for(let i = 0; i < this.states.length; i++){
      for(let j = 0; j < this.states[i].cidades.length; j++){
        this.states[i].cidades[j].estado = this.states[i].sigla
        if(this.states[i].cidades[j].casos > 20 && this.states[i].cidades[j].mortes > 5 && this.states[i].cidades[j].recuperados > 20){
          this.cities.push(this.states[i].cidades[j])
        }
      }
    }

    // Sort by money spent
    this.cities.sort(function(a, b){return a['dinheiro'] - b['dinheiro']});
    this.cities = this.cities.slice(0,10)
  }
  
  findCitiesByCases(){
    // Fill cities array
    for(let i = 0; i < this.states.length; i++){
      for(let j = 0; j < this.states[i].cidades.length; j++){
        this.states[i].cidades[j].estado = this.states[i].sigla
        this.cities.push(this.states[i].cidades[j])
      }
    }

    // Sort by number of cases
    this.cities.sort(function(a, b){return b['casos'] - a['casos']});
    this.cities = this.cities.slice(0,10)
  }

  findCitiesByDeaths(){
    // Fill cities array
    for(let i = 0; i < this.states.length; i++){
      for(let j = 0; j < this.states[i].cidades.length; j++){
        this.states[i].cidades[j].estado = this.states[i].sigla
        this.cities.push(this.states[i].cidades[j])
      }
    }
    // Sort by number of cases
    this.cities.sort(function(a, b){return b['mortes'] - a['mortes']});
    this.cities = this.cities.slice(0,10)
  }

  numberWithCommas(number) {
    return number.toLocaleString('pt')
  }
}
