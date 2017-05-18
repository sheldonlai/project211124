import {injectable} from "inversify";
export interface IQuestionAnswerRepository {
    getQuestionAndAnswersById(questionId: string) : Promise<any>;
    createQuestion(title: string, content: string, tags: any[], isPublished: boolean): Promise<any>;
    addComment(content : string, lastEditedUtc: Date) : Promise<any>;
}

@injectable()
export class QuestionAnswerRepository implements IQuestionAnswerRepository{
    getQuestionAndAnswersById(questionId: string): Promise<any> {
        return undefined;
    }

    createQuestion(title: string, content: string, tags: any[], isPublished: boolean): Promise<any> {
        return undefined;
    }

    addComment(content: string, lastEditedUtc: Date): Promise<any> {
        return undefined;
    }

}
