import { Question } from '../question/question.model';
import { Survey } from '../survey-list/survey.model';
import { Employee } from '../employee-details/employee.model';

export class SurveyResponse {
    public _id: string;
    public surveyid: Survey;
    public questionid: Question;
    public userid: Employee;
    public response: string

    constructor(_id:string,survey:Survey,question:Question,userid:Employee,response:string) {
        this._id = _id;
        this.surveyid = survey;
        this.questionid = question;
        this.userid = userid;
        this.response = response;
    }
}