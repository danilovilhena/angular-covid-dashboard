import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-world',
  templateUrl: './header-world.component.html',
  styleUrls: ['./header-world.component.css']
})
export class HeaderWorldComponent implements OnInit {

  currentUrl: boolean;
  constructor() { }

  ngOnInit(): void {
    this.currentUrl = document.location.href.endsWith('world')
  }

}
