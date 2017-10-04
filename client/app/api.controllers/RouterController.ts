import createBrowserHistory from 'history/createBrowserHistory';
/**
 * RouterController is used to control the routing in React Router v4
 * Please read the documentation of history in React Router for more information
 */

export class RouterController {
    static history = createBrowserHistory();

    static redirect(url : string) {
        RouterController.history.push(url);
    }
}
