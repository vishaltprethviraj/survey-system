import { Component, OnInit } from '@angular/core';

import { faClipboardList,faUser,faBook,faCaretRight,faCaretLeft,faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { LoginService } from 'src/app/login/login.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

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
    
  constructor(private loginService:LoginService,private router:Router) { }
  username:string;

  ngOnInit(): void {    
    const userData = JSON.parse(localStorage.getItem('userData'));
    this.username = userData.username;     
  }
  
  onLogout() {
    this.loginService.logout();    
  }

}
