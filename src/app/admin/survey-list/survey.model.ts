import { DatePipe } from '@angular/common';
import { Question } from '../question/question.model';

export class Survey { 
    public _id:string   
    public name: string;
    public description: string;
    public thank_you_message: string;
    public start_date: Date;
    public end_date: Date;      
    
    
    constructor(_id:string,name:string,description:string,
                thankYouMessage:string,startDate:Date,endDate:Date
            ) {                
                this._id = _id;
                this.name = name;
                this.description = description;
                this.thank_you_message = thankYouMessage;
                this.start_date = startDate;
                this.end_date = endDate                
             }
}