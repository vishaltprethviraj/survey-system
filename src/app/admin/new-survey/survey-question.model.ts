import { Question } from '../question/question.model';
import { Survey } from '../survey-list/survey.model';

export class SurveyQuestion {
    public _id: string;
    public surveyid: Survey;
    public questionid: Question;

    constructor(_id:string,survey:Survey,question:Question) {
        this._id = _id;
        this.surveyid = survey;
        this.questionid =question;
    }
}