import {QuestionDto} from './QuestionDto';
import {AnswerDto} from './AnswerDto';
export interface QuestionPageDto {
    question : QuestionDto;
    answers : AnswerDto[]
}