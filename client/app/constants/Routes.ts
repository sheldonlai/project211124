

export class Routes {
    static home = '/';
    static login = '/login';
    static registration = '/registration';

    // question
    static question = '/question';
    static createQuestion = Routes.question + '/create';
    static question_by_id = Routes.question + '/:id/:name';


    // story
    static story = '/story';
    static createStory = Routes.story + '/create';
    static story_by_id = Routes.story + '/:id/:name';


    static my_profile = "/my-profile";

    // rating
    static rate_my_teammate = "/rating-my-teammate";
    static create_teammate_record = "/create-teammate-record";
    static rating = "/rating/:id";

}