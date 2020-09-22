import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Designation } from '../designation.model';
import { AdminService } from '../../admin.service';
import { DataStorageService } from '../../../shared/data-storage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-add-designation',
  templateUrl: './add-designation.component.html',
  styleUrls: ['./add-designation.component.css']
})
export class AddDesignationComponent implements OnInit {

  constructor(private router:Router,private adminService:AdminService,private dataStorageService:DataStorageService,private http:HttpClient) { }

  addDesignationForm: FormGroup;

  ngOnInit(): void {
    this.addDesignationForm = new FormGroup({
      'designationName': new FormControl(null)
    });
  }

  onSubmit() {
    const designationName = this.addDesignationForm.value['designationName'];    
    this.http.post<Designation>(environment.designation, 
                                 {
                                  name:designationName
                                 }).subscribe(newDesignation => {
                                   this.adminService.addDesignation(newDesignation);
                                 });        
    this.onCancel(); 
  }

  onCancel() {
    this.router.navigate(['/admin/designation']);
  }

}
