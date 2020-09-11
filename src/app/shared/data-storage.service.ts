import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AdminService } from '../admin/admin.service';
import { Department } from '../admin/department/department.model';
import { Designation } from '../admin/designation/designation.model';

@Injectable({ providedIn:'root' })

export class DataStorageService {
    constructor(private http: HttpClient,private adminService:AdminService) { }
    
    //Departments Section
    departmentList() {        
        return this.http.get<Department[]>('http://74.208.150.171:3501/api/v1/department');        
    }        

    getDepartment(id:string) {            
        return this.http.get<Department>('http://74.208.150.171:3501/api/v1/department/'+id);        
    }
  
    //Designation Section

    designationList() {        
        return this.http.get<Department[]>('http://74.208.150.171:3501/api/v1/designation'); 
    }
    getDesignation(id:string) {
        return this.http.get<Designation>('http://74.208.150.171:3501/api/v1/designation/'+id);
    }

}