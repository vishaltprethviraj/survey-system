export class Department {    
    public _id: number;
    public name: string;

    constructor(departmentId:number,departmentName:string) {        
        this._id = departmentId;
        this.name = departmentName;
    }
}