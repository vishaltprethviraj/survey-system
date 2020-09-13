import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AdminService } from '../../admin.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Designation } from '../designation.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-designation',
  templateUrl: './edit-designation.component.html',
  styleUrls: ['./edit-designation.component.css']
})
export class EditDesignationComponent implements OnInit {
  
  id: string;
  editMode = false;

  editDesignationForm: FormGroup;

  constructor(private router:Router,private route:ActivatedRoute,private adminService:AdminService,private dataStorageService:DataStorageService,private http:HttpClient) { }

  ngOnInit(): void {
    
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode = params['id'] != null;
          this.initForm();          
        }
      );    
  }

  onSubmit() {
    const designationName = this.editDesignationForm.value['designationName'] ;
    this.http.patch<Designation>('http://74.208.150.171:3501/api/v1/designation/'+ this.id,
          { 
            name: designationName
          }) 
          .subscribe(editedDesignation => {
                     console.log(editedDesignation);  
                     this.adminService.updateDesignation(designationName,editedDesignation._id);                             
              },error=> {
                console.log(error)
           });         
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['/admin/designation']);
  }

  private initForm() {    
        
    this.dataStorageService.getDesignation(this.id).subscribe(
        designation => {
          this.editDesignationForm = new FormGroup({
            'designationName': new FormControl(designation.name) 
          })       
        }
      );      
    
    this.editDesignationForm = new FormGroup({
      'designationName': new FormControl(null) 
    });
  }
}
