import {FrontEndQuestionModels} from "../QuestionModels";
import QuestionPage = FrontEndQuestionModels.QuestionPage;
import Question = FrontEndQuestionModels.Question;
import Answer = FrontEndQuestionModels.Answer;
import cloneQuestionPage = FrontEndQuestionModels.cloneQuestionPage;

test('testing changing cloned object should not change the original', ()=> {
    let obj = new QuestionPage();
    obj.question = new Question();
    obj.answers.push(new Answer("someid", undefined));

    let clone = cloneQuestionPage(obj);

    expect(typeof obj === typeof clone);
    expect(obj).toEqual(clone);

    expect(obj.answers).toEqual(clone.answers);

    clone.answers.push(new Answer("someid2", undefined));

    expect(clone.answers.length).toBe(2);
    expect(obj.answers.length).toBe(1);
});