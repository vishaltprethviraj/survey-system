import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AdminService } from '../../admin.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Designation } from '../designation.model';

@Component({
  selector: 'app-edit-designation',
  templateUrl: './edit-designation.component.html',
  styleUrls: ['./edit-designation.component.css']
})
export class EditDesignationComponent implements OnInit {
  
  id: number;
  editMode = false;

  editDesignationForm: FormGroup;

  constructor(private router:Router,private route:ActivatedRoute,private adminService:AdminService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();          
        }
      );    
  }

  onSubmit() {
    const newDesignation = new Designation(this.editDesignationForm.value['designationName']) ;
    if(this.editMode) {
      this.adminService.updateDesignation(this.id,newDesignation);
    }       
    window.scroll(0,0); 
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['/admin/designation']);
  }

  private initForm() {
    let designationName=''
    
    if (this.editMode) {
      const designation = this.adminService.getDesignations(this.id);
      designationName = designation.designationName;
    }
    this.editDesignationForm = new FormGroup({
      'designationName': new FormControl(designationName) 
    });
  }
}
