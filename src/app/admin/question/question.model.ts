// import { Option } from './option.model';

export class Question {    
    public _id: string;
    public description: string; 
    public options: [];   

    constructor(_id:string,description:string,options:[]) {        
        this._id = _id;
        this.description = description;
        this.options = options;
    }
}