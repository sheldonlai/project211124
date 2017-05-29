import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';


class QuestionStoreClass extends EventEmitter {
    questions: any[];

    fetchQuestions() {
        return this.questions;
    }

    loadQuestions(data){
        this.questions = data;
    }

    emitChange() {
        this.emit('change');
    }

    addChangeListener(callback) {
        this.on('change', callback);
    }

    removeChangeListener(callback) {
        this.removeListener('change', callback);
    }

}

const Question = new QuestionStoreClass();

AppDispatcher.register(function(payload){
    let action = payload.action;
    let text;

    switch (action.actionType) {
        case 'GetQuestions':
            Question.loadQuestions(action.data);
            break;
        default:
            return true;
    }

    Question.emitChange();

    return true;
})


export default Question;
