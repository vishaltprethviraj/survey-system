import { Department } from '../department/department.model';
import { Designation } from '../designation/designation.model';

export class Employee {    
    public username: string;
    public email: string;
    public name: string;
    public phoneNumber: string;  
    public department: Department[];
    public designation: Designation[];  

    constructor(username:string,email:string,name:string,phoneNumber:string,department:Department[],designation:Designation[]) {        
        this.username = username;
        this.email = email;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.department = department;
        this.designation = designation;
    }

}
