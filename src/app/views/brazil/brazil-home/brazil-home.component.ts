import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brazil-home',
  templateUrl: './brazil-home.component.html',
  styleUrls: ['./brazil-home.component.css']
})
export class BrazilHomeComponent implements OnInit {

  // Site pra pegar a bandeira de cada estado:
  // https://devarthurribeiro.github.io/covid19-brazil-api/static/flags/{UF}.png
  
  currentTime;
  states = {};
  overview = {};

  constructor() { }

  ngOnInit(): void {
    this.currentTime = new Date().toLocaleString()
    this.initStates()
    this.fetchData()
  }

  numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  initStates(){
    let siglas = ["AC","AL","AM","AP","BA","CE","DF","ES","GO","MA","MG","MS","MT","PA","PB","PE","PI","PR","RJ","RN","RO","RR","RS","SC","SE","SP","TO"]
    let nomes = ["Acre","Alagoas","Amazonas","Amapá","Bahia","Ceará","Distrito Federal","Espírito Santo","Goiás","Maranhão","Minas Gerais","Mato Grosso do Sul","Mato Grosso","Pará","Paraíba","Pernambuco","Piauí","Paraná","Rio de Janeiro","Rio Grande do Norte","Rondônia","Roraima","Rio Grande do Sul","Santa Catarina","Sergipe","São Paulo","Tocantins"]

    for (let i = 0; i < siglas.length; i++){
      this.states[siglas[i]] = {}
      this.states[siglas[i]].nome = nomes[i]
      this.states[siglas[i]].cidades = []
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
        this.overview['casos'] = this.numberWithCommas(brazil[2])
        this.overview['mortes'] = this.numberWithCommas(brazil[5])
        this.overview['recuperados'] = this.numberWithCommas(brazil[11])
        rows.shift()

        // States
        rows.forEach(row => {
          let current = row.split(",")
          let state = current[1]
          this.states[state]['casos'] = this.numberWithCommas(current[2])
          this.states[state]['mortes'] = this.numberWithCommas(current[5])
          this.states[state]['recuperados'] = this.numberWithCommas(current[11])
          this.states[state]['recuperados'] = this.numberWithCommas(current[11])
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
            'casos': this.numberWithCommas(current[7]),
            'mortes': this.numberWithCommas(current[6])
          }
          this.states[state].cidades.push(object)
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
            this.states[state].cidades.forEach(cidade => {
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
            this.states[state].cidades.forEach(cidade => {
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
      });
  }

}
