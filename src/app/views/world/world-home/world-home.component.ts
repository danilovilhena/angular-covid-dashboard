import { INT_TYPE } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-world-home',
  templateUrl: './world-home.component.html',
  styleUrls: ['./world-home.component.css']
})


export class WorldHomeComponent implements OnInit {

  loading = true;
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
    if(!localStorage.getItem('world') && !localStorage.getItem('world_overview')){
      this.fetchCountries()
      this.fetchCities()
    } else{
      this.countries = JSON.parse(localStorage.getItem('world'))
      this.overview = JSON.parse(localStorage.getItem('world_overview'))
      this.loading = false
    }
  }

  numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  fetchCountries() {

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
        this.overview.casos = dados.summary.total_cases
        this.overview.recuperados = dados.summary.recovered
        this.overview.mortes = dados.summary.deaths

        const countriesStack = textString.data.regions
        // tslint:disable-next-line: forin
        for (const key in countriesStack) {
          this.countries[key] = {}
          this.countries[key].nome = countriesStack[key].name
          this.countries[key].iso =  countriesStack[key].iso3166a2.toLowerCase()
          this.countries[key].casos =  countriesStack[key].total_cases
          this.countries[key].recuperados =  countriesStack[key].recovered
          this.countries[key].mortes =  countriesStack[key].deaths
          this.countries[key].cidades = []
        }

      }).catch(err => {
        console.error(err);
      });
  }

  fetchCities() {

    fetch("https://covid-19-statistics.p.rapidapi.com/reports", {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "9ea2163615msh3a59772d5d90134p143474jsnc9529b587fc8",
        "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com"
      }
    })
      .then(response => response.json())
      .then(textString => {
        const dados: Array<any> = textString.data
        dados.forEach(row => {
          if (row.region.province !== ''){
            let key = row.region.name.toLowerCase().replace(' ', '_')

            switch (key) {
              case 'us':
                key = 'usa'
                break
              case "united_kingdom":
                key = 'uk'
                break
              default:
                break
            }

            let object = {
              'nome': row.region.province,
              'casos': +row.confirmed,
              'recuperados': +row.recovered,
              'mortes': +row.deaths,
              'ativos': +row.active,
              'casos_dif': +row.confirmed_diff,
              'recuperados_dif': +row.recovered_diff,
              'ativos_dif': +row.active_diff,
              'mortes_dif': +row.deaths_diff
            }

            try {
              this.countries[key].cidades.push(object)
            } catch (error) {
              console.log(error)
            }

          }
        });

      })
      .catch(err => {
        console.error(err)
      })
      .then(() => {
        this.stopLoading()
      });
  }

  stopLoading(){
    setTimeout(() => {
      localStorage.setItem('world', JSON.stringify(this.countries))
      localStorage.setItem('world_overview', JSON.stringify(this.overview))
      this.loading = false;
    }, 3000);
  }

}
