import { Employee } from '../employee-details/employee.model';

export class AuditLog {
    public id: number;
    public employee: Employee[];
    public page: string;
    public action: string;
    public timeStamp: string;
     
    constructor(id:number,employee:Employee[],page:string,action:string,timeStamp:string) {
        this.id = id;
        this.employee = employee;
        this.page = page;
        this.action = action;
        this.timeStamp = timeStamp;
    }
}