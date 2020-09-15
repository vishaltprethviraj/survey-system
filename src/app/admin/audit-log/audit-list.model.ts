import { Employee } from '../employee-details/employee.model';

export class AuditList {
    public _id:string;
    public userid:Employee;
    public timestamp:string;
    public action:string;
    public page:string;
    constructor(_id:string,userid:Employee,timestamp:string,action:string,page:string){
        this._id = _id;
        this.userid =userid;
        this.timestamp = timestamp;
        this.action = action;
        this.page = page;
    }

}