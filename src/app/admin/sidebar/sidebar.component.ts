import { Component, OnInit } from '@angular/core';

import { faClipboardList,faTachometerAlt } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  // Required Icons
  faClipboardList = faClipboardList;
  faTachometerAlt = faTachometerAlt;  

  constructor() { }

  ngOnInit(): void {
  }

}
