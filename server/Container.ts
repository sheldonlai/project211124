
import {AnswerRepository} from "./repositories/AnswerRepository";
import {QuestionRepository} from "./repositories/QuestionRepository";
import {UserRepository} from "./repositories/UserRepository";
import {AuthenticationService} from "./services/AuthenticationService";
import {QuestionService} from "./services/QuestionService";

export class RepositoryProvider {
    static AnswerRepository = new AnswerRepository();
    static QuestionRepository = new QuestionRepository();
    static UserRepository = new UserRepository();

}

export class ServiceProvider {

    static AuthenticationService = new AuthenticationService(RepositoryProvider.UserRepository);
    static QuestionService = new QuestionService(RepositoryProvider.QuestionRepository, RepositoryProvider.AnswerRepository);

}