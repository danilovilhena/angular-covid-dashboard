import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brazil-states',
  templateUrl: './brazil-states.component.html',
  styleUrls: ['./brazil-states.component.css']
})
export class BrazilStatesComponent implements OnInit {

  state;
  cities;

  constructor(private location: Location) {}

  ngOnInit(): void {
    this.state = this.location.getState()
    this.state = this.state.estado
    this.cities = this.state.cidades
  }

  numberWithCommas(number) {
    return number.toLocaleString('pt')
  }

}
