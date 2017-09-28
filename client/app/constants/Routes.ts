

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

    //profile
    static my_profile = "/my-profile";
    static profile = "/profile/:username";

    // rating
    static people = "/people";
    static create_teammate_record = "/people/create-record";
    static rating = "/people-view/:id";

    // recruitment
    static recruitment = "/recruitment";
    static create_recruitment = "/recruitment/create-recruitment";

    // admin
    static admin = '/admin';
    static admin_dashboard = '/admin/dashboard';
    static admin_teammate = '/admin/teammate';
}