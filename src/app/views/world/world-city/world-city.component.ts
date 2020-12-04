import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-world-city',
  templateUrl: './world-city.component.html',
  styleUrls: ['./world-city.component.css']
})
export class WorldCityComponent implements OnInit {

  city;

  constructor(private location: Location) {}

  ngOnInit(): void {
    this.city = this.location.getState()
    this.city = this.city.cidade
  }

  numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

}
