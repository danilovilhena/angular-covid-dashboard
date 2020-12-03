import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brazil-home',
  templateUrl: './brazil-home.component.html',
  styleUrls: ['./brazil-home.component.css']
})
export class BrazilHomeComponent implements OnInit {

  loading = true;
  currentTime;
  states = [];
  overview = {
    'casos': 0,
    'mortes': 0,
    'recuperados': 0
  };

  constructor() { }

  ngOnInit(): void {
    this.currentTime = new Date().toLocaleDateString()
    this.initStates()
    if(!localStorage.getItem('brazil') && !localStorage.getItem('brazil_overview')){
      this.fetchData()
    } else{
      this.states = JSON.parse(localStorage.getItem('brazil'))
      this.overview = JSON.parse(localStorage.getItem('brazil_overview'))
      this.loading = false
    }
  }

  numberWithCommas(number) {
    return number.toLocaleString('pt')
  }

  initStates(){
    let siglas = ["AC","AL","AM","AP","BA","CE","DF","ES","GO","MA","MG","MS","MT","PA","PB","PE","PI","PR","RJ","RN","RO","RR","RS","SC","SE","SP","TO"]
    let nomes = ["Acre","Alagoas","Amazonas","Amapá","Bahia","Ceará","Distrito Federal","Espírito Santo","Goiás","Maranhão","Minas Gerais","Mato Grosso do Sul","Mato Grosso","Pará","Paraíba","Pernambuco","Piauí","Paraná","Rio de Janeiro","Rio Grande do Norte","Rondônia","Roraima","Rio Grande do Sul","Santa Catarina","Sergipe","São Paulo","Tocantins"]

    for (let i = 0; i < siglas.length; i++){
      this.states[i] = {}
      this.states[i].nome = nomes[i]
      this.states[i].sigla = siglas[i]
      this.states[i].cidades = []
    }
  }

  fetchData() {
    // Fetching Brazil and States
    fetch('https://raw.githubusercontent.com/wcota/covid19br/master/cases-brazil-total.csv')
      .then(response => response.text()) 
      .then(textString => {
        let rows = textString.split('\n')
        rows.shift()
        rows.pop()

        // Overview
        let brazil = rows[0].split(',')
        this.overview['casos'] = +brazil[2]
        this.overview['mortes'] = +brazil[5]
        this.overview['recuperados'] = +brazil[11]
        rows.shift()

        // States
        rows.forEach(row => {
          let current = row.split(",")
          let state = current[1]
          this.states.find(obj => {return obj.sigla === state})['casos'] = +current[2]
          this.states.find(obj => {return obj.sigla === state})['mortes'] = +current[5]
          this.states.find(obj => {return obj.sigla === state})['recuperados'] = +current[11]
        });
      });

    // Fetching Cities
    fetch('https://raw.githubusercontent.com/wcota/covid19br/master/cases-brazil-cities.csv')
      .then(response => response.text()) 
      .then(textString => {
        let rows = textString.split('\n')
        rows.shift()
        rows.pop()

        rows.forEach(row => {
          let current = row.split(",")
          let state = current[1]
          let object = {
            'nome': current[2].split("/")[0],
            'ibgeID': current[3],
            'casos': +current[7],
            'mortes': +current[6]
          }
          this.states.find(obj => {return obj.sigla === state}).cidades.push(object)
        });
      });

    //Fetching Cities (Semanas)
    fetch('https://raw.githubusercontent.com/wcota/covid19br/master/cases-brazil-cities-time.csv')
      .then(response => response.text()) 
      .then(textString => {
        let rows = textString.split('\n')
        rows.shift()
        rows.pop()

        rows.forEach(row => {
          let current = row.split(",")
          let state = current[3]
          try {
            this.states.find(obj => {return obj.sigla === state}).cidades.forEach(cidade => {
              if(cidade.ibgeID == current[5]){
                if(cidade.primeiraSemana){
                  cidade.ultimaSemana = +current[0]
                } else {
                  cidade.primeiraSemana = +current[0]
                }
                cidade.totalSemanas = cidade.ultimaSemana - cidade.primeiraSemana
              }
            })
          } catch (error) { }
        });

      });

    // Fetching Cities (Ocupação de leitos)
    fetch('https://raw.githubusercontent.com/marcuswac/covid-br-data/master/esus-notifica/ocupacao_leitos_esus.csv')
      .then(response => response.text()) 
      .then(textString => {
        let rows = textString.split('\n')
        rows.shift()
        rows.pop()

        rows.forEach(row => {
          let current = row.split(",")
          let state = current[1].toUpperCase().slice(1,-1);
          try {
            this.states.find(obj => {return obj.sigla === state}).cidades.forEach(cidade => {
              if(cidade.nome.toLowerCase() == current[2].toLowerCase().slice(1,-1)){
                cidade.ocupHospCli ? cidade.ocupHospCli += +current[5] : cidade.ocupHospCli = +current[5]
                cidade.ocupHospUti ? cidade.ocupHospUti += +current[6] : cidade.ocupHospUti = +current[6]
                cidade.ocupSRAGCli ? cidade.ocupSRAGCli += +current[7] : cidade.ocupSRAGCli = +current[7]
                cidade.ocupSRAGUti ? cidade.ocupSRAGUti += +current[8] : cidade.ocupSRAGUti = +current[8]
                cidade.ofertaHospCli ? cidade.ofertaHospCli += +current[15] : cidade.ofertaHospCli = +current[15]
                cidade.ofertaHospUti ? cidade.ofertaHospUti += +current[16] : cidade.ofertaHospUti = +current[16]
                cidade.ofertaSRAGCli ? cidade.ofertaSRAGCli += +current[17] : cidade.ofertaSRAGCli = +current[17]
                cidade.ofertaSRAGUti ? cidade.ofertaSRAGUti += +current[18] : cidade.ofertaSRAGUti = +current[18]
              }
            })
          } catch (error) {}
        });
        this.formatData()
      })
      .then(() => {
        this.stopLoading()
      });
  }

  formatData() {
    // Valores gastos com a pandemia fictícios
    let valores = []
    for(let i = 0; i < this.states.length; i++){
      valores.push(Math.floor(Math.random() * (2875535406.32 - 203825793.24 + 1) + 203825793.24))
    }
    valores.sort(function(a, b){return b - a});

    // Format states
    this.states.sort(function(a, b){return b['casos'] - a['casos']});
    // Format cities
    for(let i = 0; i < this.states.length; i++){
      this.states[i].cidades.sort(function(a, b){return b['casos'] - a['casos']});
      this.states[i].dinheiro = valores[i]
      for(let j = 0; j < this.states[i].cidades.length; j++){
        this.states[i].cidades[j].recuperados = parseInt((this.states[i].cidades[j].casos * 0.89).toString())
        this.states[i].cidades[j].dinheiro = Math.floor(this.states[i].dinheiro * (this.states[i].cidades[j].casos / this.states[i].casos))
      }
    }
  }

  stopLoading(){
    setTimeout(() => {
      localStorage.setItem('brazil', JSON.stringify(this.states))
      localStorage.setItem('brazil_overview', JSON.stringify(this.overview))
      this.loading = false;
    }, 3000);
  }
}
