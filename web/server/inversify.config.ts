import { Container } from "inversify";
import {IQuestionAnswerRepository, QuestionAnswerRepository} from "./respositories/QuestionAnswerRepository";

var container = new Container();
container.bind<IQuestionAnswerRepository>("IQuestionAnswerRepository").to(QuestionAnswerRepository);

export default container;