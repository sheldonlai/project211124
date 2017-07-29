import {LocalProfile, User} from "../../../models/User";
import {UserTypeEnum} from "../../../enums/UserTypeEnum";
/**
 * Created by Phillip on 2017-05-28.
 */

export class FakeModels {

    constructor() {}

    localUser(testName?: string, num?: number): User {
        let localProfile: LocalProfile = new LocalProfile("hashedPassword", "bestSalt");
        let random = num? num: (Math.random() * 10000) + 1000;
        return new User("sampleUser" + testName + random + "@askalot.corp", testName + random, UserTypeEnum.NORMAL, localProfile);
    }

}
