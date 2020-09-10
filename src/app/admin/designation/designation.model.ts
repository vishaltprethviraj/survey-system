export class Designation {    
    public _id: string;
    public name: string;

    constructor(_id:string,designationName:string){        
        this._id = _id;
        this.name = designationName;
    }
}