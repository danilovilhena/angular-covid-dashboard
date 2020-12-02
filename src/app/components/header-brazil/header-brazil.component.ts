import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-brazil',
  templateUrl: './header-brazil.component.html',
  styleUrls: ['./header-brazil.component.css']
})
export class HeaderBrazilComponent implements OnInit {

  currentUrl: boolean;
  constructor() { }

  ngOnInit(): void {
    this.currentUrl = document.location.href.endsWith('brazil')
  }

}
