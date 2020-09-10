import { Component, OnInit } from '@angular/core';

import { faTachometerAlt, faClipboardList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  //Required Icons
  faTachometerAlt = faTachometerAlt;
  faClipboardList = faClipboardList;

  constructor() { }

  ngOnInit(): void {
  }

}
