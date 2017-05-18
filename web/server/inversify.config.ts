import { Container } from "inversify";
import "reflect-metadata"

import {IQuestionAnswerRepository, QuestionAnswerRepository} from "./respositories/QuestionAnswerRepository";
let container = new Container();
container.bind<IQuestionAnswerRepository>("IQuestionAnswerRepository").to(QuestionAnswerRepository);

export default container;