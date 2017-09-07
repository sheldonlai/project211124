import {Question} from "../Question";
import {createRawDraftContentState} from "../../utils/TestUtils";

test('model method', () => {
    let content = createRawDraftContentState();
    let question = Question.fromObject({
       title: 'test123',
        content: content,
        tags: []
    });
    console.log(question);
    expect(question.title).toBe("test123");
    expect(question.content).toEqual(content);
    expect(question.tags).toEqual([]);
});