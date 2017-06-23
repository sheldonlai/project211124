import {LogInfoStatus} from "../enums/LogInfoStatus";
/**
 * Created by SHELDON on 6/23/2017.
 */

export class AppLogger {
    static log(message : string, type : LogInfoStatus){
        // maybe output to file later
        let prefix = '';
        console.log(type+ ": " + message)
    }

    static info(message){
        AppLogger.log(message, LogInfoStatus.INFO)
    }
    static warn(message){
        AppLogger.log(message, LogInfoStatus.WARNING)
    }
    static error(message){
        AppLogger.log(message, LogInfoStatus.ERROR)
    }
}