/**
 * Created by SHELDON on 7/1/2017.
 */
import {ContentState, convertToRaw, EditorState} from "draft-js";
import {LocalProfile, User} from "../models/User";
import {UserTypeEnum} from "../enums/UserTypeEnum";

export const createRawDraftContentState = (str?: string) => {
    if (str) {
        return convertToRaw(EditorState.createWithContent(ContentState.createFromText(str))
            .getCurrentContent());
    }
    return convertToRaw(EditorState.createEmpty().getCurrentContent());
};

export const localUser = (testName?: string, num?: number): User => {
    let localProfile: LocalProfile = new LocalProfile("hashedPassword", "bestSalt");
    let random = num ? num : Math.random() * 10000;
    return new User("sampleUser" + testName + random + "@askalot.corp", testName + random, UserTypeEnum.NORMAL, localProfile);
};
