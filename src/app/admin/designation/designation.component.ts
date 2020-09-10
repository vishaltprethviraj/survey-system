import { Component, OnInit } from '@angular/core';
import { faPencilAlt,faTrash } from '@fortawesome/free-solid-svg-icons';

import { Designation } from './designation.model';
import { AdminService } from '../admin.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {

  //required Icons
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;

  id:number;
  designations: Designation[];

  constructor(private adminService: AdminService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.adminService.designationChanged
      .subscribe(
        (designation: Designation[]) => {
          this.designations = designation;
        }
      );       

    this.designations = this.adminService.getDesignation();
  }

  onAddDesignation() {
    this.router.navigate(['add'],{ relativeTo: this.route });
    var scrollingElement = (document.scrollingElement || document.body);
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
  }

  onDeleteDesignation(i) {
    this.adminService.deleteDesignation(i); 
    console.log(i);
     
  }

  scrollDown(){
    var scrollingElement = (document.scrollingElement || document.body);
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
  }

}
