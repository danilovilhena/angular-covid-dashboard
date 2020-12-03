import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-world-countries',
  templateUrl: './world-countries.component.html',
  styleUrls: ['./world-countries.component.css']
})
export class WorldCountriesComponent implements OnInit {

  state;

  constructor(private location: Location) {}

  ngOnInit(): void {
    this.state = this.location.getState()
    this.state = this.state.pais
  }

  numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

}
