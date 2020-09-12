import { Component, OnInit } from '@angular/core';
import { faPencilAlt,faTrash } from '@fortawesome/free-solid-svg-icons';

import { Designation } from './designation.model';
import { AdminService } from '../admin.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {

  //required Icons
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;

  id:string;
  designations: Designation[];

  constructor(private adminService: AdminService,private router:Router,private route:ActivatedRoute,private dataStorageService:DataStorageService,private modalService:NgbModal,private http:HttpClient) { }

  ngOnInit(): void {
        
    this.adminService.designationChanged
      .subscribe(
        (designation: Designation[]) => {
          this.designations = designation;
        }
      );               
  }

  onAddDesignation() {
    this.router.navigate(['add'],{ relativeTo: this.route });
    this.scrollDown();
  }

  openModal(targetModal, designation) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
   this.id = designation._id; 
   console.log(this.id);   
   }

   onDeleteDesignation() {
    console.log(this.id);    
    this.http.delete('http://74.208.150.171:3501/api/v1/designation/'+ this.id)
    .subscribe(res => {
          this.adminService.deleteDesignation(this.id);    
    },
    error => {
    console.log(error);
  }); 
  this.modalService.dismissAll();       
   }

  scrollDown(){
    var scrollingElement = (document.scrollingElement || document.body);
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
  }

}
