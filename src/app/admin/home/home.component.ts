import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
  isAuthenticated = true;
  private userSub: Subscription;

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    this.userSub = this.loginService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;        //!!user can also be used           
    });
    console.log(this.isAuthenticated);
  }
  
  
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
