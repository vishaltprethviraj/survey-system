export class Department {    
    public _id: string;
    public name: string;    

    constructor(departmentId:string,departmentName:string) {        
        this._id = departmentId;
        this.name = departmentName;
    }
}