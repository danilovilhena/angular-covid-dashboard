import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brazil-home',
  templateUrl: './brazil-home.component.html',
  styleUrls: ['./brazil-home.component.css']
})
export class BrazilHomeComponent implements OnInit {

  currentTime;

  constructor() { }

  ngOnInit(): void {
    this.currentTime = new Date().toLocaleString()
  }
}
