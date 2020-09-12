import { Department } from '../department/department.model';
import { Designation } from '../designation/designation.model';

export class Employee {    
    public _id:string;
    public username: string;
    public password:string;
    public name: string;
    public email: string;    
    public mobilephone: string;      
    public departmentid: Department;
    public designationid: Designation;          
    // public roleid: { _id:string; rolename:string};
    // roleid:{_id:string; rolename:string}

    constructor(userId:string,username:string,password:string,name:string,email:string,phoneNumber:string,department:Department,designation:Designation) {        
        this._id = userId;
        this.username = username;
        this.password = password;
        this.name = name;
        this.email = email;        
        this.mobilephone = phoneNumber;
        this.departmentid = department;
        this.designationid = designation;
        // this.roleid = roleid;
    }

}
