import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header-world',
  templateUrl: './header-world.component.html',
  styleUrls: ['./header-world.component.css']
})
export class HeaderWorldComponent implements OnInit {

  currentUrl: boolean;
  constructor(private location: Location) { }

  ngOnInit(): void {
    this.currentUrl = document.location.href.endsWith('world')
  }

  return() {
    this.location.back();
  }

}
