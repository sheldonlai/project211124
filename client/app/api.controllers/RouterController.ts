import createBrowserHistory from 'history/createBrowserHistory';
/**
 * Created by SHELDON on 6/6/2017.
 */

class RouterControllerClass {
    constructor(public history: any){}

    redirect(url : string) {
        this.history.push(url);
    }
}

const history = createBrowserHistory();

export const RouterController = new RouterControllerClass(history);