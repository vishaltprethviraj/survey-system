import { Option } from './option.model';

export class Question {    
    public question : string; 
    public option: Option[];   

    constructor(question:string,option:Option[]) {        
        this.question = question;
        this.option = option;
    }
}