import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Designation } from '../designation.model';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-add-designation',
  templateUrl: './add-designation.component.html',
  styleUrls: ['./add-designation.component.css']
})
export class AddDesignationComponent implements OnInit {

  constructor(private router:Router,private adminService:AdminService) { }

  addDesignationForm: FormGroup;

  ngOnInit(): void {
    this.addDesignationForm = new FormGroup({
      'designationName': new FormControl(null)
    });
  }

  onSubmit() {
    const newDesgination = new Designation(this.addDesignationForm.value['designationName']);    
    this.adminService.addDesignation(newDesgination); 
    this.onCancel(); 
  }

  onCancel() {
    this.router.navigate(['/admin/designation']);
  }

}
