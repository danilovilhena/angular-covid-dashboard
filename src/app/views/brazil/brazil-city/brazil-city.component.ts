import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-brazil-city',
  templateUrl: './brazil-city.component.html',
  styleUrls: ['./brazil-city.component.css']
})
export class BrazilCityComponent implements OnInit {

  city;

  constructor(private location: Location) { }

  ngOnInit(): void {
    this.city = this.location.getState()
    this.city = this.city.cidade.value
  }
}
