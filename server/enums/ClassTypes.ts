/**
 * Created by SHELDON on 5/18/2017.
 */
let TYPES = {

    /* Repositories */
    IUserRepo: Symbol("IUserRepository"),
    IQuestionRepo: Symbol("IQuestionRepository"),
    IAnswerRepo: Symbol("IAnswerRepository"),

    /* Services */
    IQAService: Symbol("IQuestionAnswerService"),
    IAuthService: Symbol("IAuthenticationService")

};

export default TYPES;