import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header-brazil',
  templateUrl: './header-brazil.component.html',
  styleUrls: ['./header-brazil.component.css']
})
export class HeaderBrazilComponent implements OnInit {

  currentUrl: boolean;
  constructor(private location: Location) { }

  ngOnInit(): void {
    this.currentUrl = document.location.href.endsWith('brazil')
  }

  return() {
    this.location.back();
  }

}
