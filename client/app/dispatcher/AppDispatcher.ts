import {Dispatcher} from 'flux';

class AppDispatcherClass extends Dispatcher<any>{

    handleViewAction(action){
        this.dispatch({
            source: 'VIEW_ACTION',
            action : action
        });
    }
}

const AppDispatcher = new AppDispatcherClass();

export default AppDispatcher;
