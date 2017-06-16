import createBrowserHistory from 'history/createBrowserHistory';
/**
 * Created by SHELDON on 6/6/2017.
 */

export class RouterController {
    static history = createBrowserHistory();

    static redirect(url : string) {
        RouterController.history.push(url);
    }
}
