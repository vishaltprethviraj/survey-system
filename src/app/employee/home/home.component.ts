import { Component, OnInit } from '@angular/core';

import { faClock,faCheck} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //required icons
  faClock = faClock;
  faCheck = faCheck;
  constructor() { }

  ngOnInit(): void {
  }

}
