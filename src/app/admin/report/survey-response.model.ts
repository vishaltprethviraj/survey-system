import { Question } from '../question/question.model';
import { Survey } from '../survey-list/survey.model';

export class SurveyResponse {
    public _id: string;
    public surveyid: Survey;
    public questionid: Question;
    public userid: string;

    constructor(_id:string,survey:Survey,question:Question,userid:string) {
        this._id = _id;
        this.surveyid = survey;
        this.questionid = question;
        this.userid = userid;
    }
}