import { Component, OnInit } from '@angular/core';

import { faClipboardList,faUser,faBook,faCaretRight,faCaretLeft,faPowerOff } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html'
})
export class TopbarComponent implements OnInit {
    
  // Required Icons
  faClipboardList = faClipboardList;  
  faUser = faUser;
  faBook = faBook;
  faCaretRight = faCaretRight;
  faCaretLeft = faCaretLeft;
  faPowerOff = faPowerOff;
  
  isOpen = false;
  
  onDropdownMenuClick(){
    this.isOpen = !this.isOpen;
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
