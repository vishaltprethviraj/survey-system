import { Component, OnInit } from '@angular/core';

import { faClipboardList, faPowerOff } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

   // Required Icons   
   
   faPowerOff = faPowerOff;
   faClipboardList = faClipboardList;  
  constructor() { }

  ngOnInit(): void {
  }

}
