import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-world-home',
  templateUrl: './world-home.component.html',
  styleUrls: ['./world-home.component.css']
})


export class WorldHomeComponent implements OnInit {

  currentTime;
  countries = {};
  overview = {
    'casos': 0,
    'mortes': 0,
    'recuperados': 0
  };

  constructor() { }

  ngOnInit(): void {
    this.currentTime = new Date().toLocaleString()
    this.fetchData()
  }

  numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  fetchData() {

    fetch("https://coronavirus-map.p.rapidapi.com/v1/summary/latest", {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "9ea2163615msh3a59772d5d90134p143474jsnc9529b587fc8",
        "x-rapidapi-host": "coronavirus-map.p.rapidapi.com"
      }
    })
      .then(response => response.json())
      .then(textString => {
        const dados = textString.data
        this.overview.casos = this.numberWithCommas(dados.summary.total_cases)
        this.overview.recuperados = this.numberWithCommas(dados.summary.recovered)
        this.overview.mortes = this.numberWithCommas(dados.summary.deaths)

        const countriesStack = textString.data.regions
        // tslint:disable-next-line: forin
        for (const key in countriesStack) {
          this.countries[key] = {}
          this.countries[key].nome = countriesStack[key].name
          this.countries[key].casos =  this.numberWithCommas(countriesStack[key].total_cases)
          this.countries[key].recuperados =  this.numberWithCommas(countriesStack[key].recovered)
          this.countries[key].mortes =  this.numberWithCommas(countriesStack[key].deaths)
        }

      }).catch(err => {
        console.error(err);
      });
  }


}
