import {LocalProfile, User} from "../../../models/User";
import {UserTypeEnum} from "../../../enums/UserTypeEnum";
/**
 * Created by Phillip on 2017-05-28.
 */

export class FakeModels {

    constructor() {}

    localUser(): User {
        let localProfile: LocalProfile = new LocalProfile("hashedPassword", "bestSalt");
        let random = Math.random() * 10000 / 3000;
        return new User("sampleUser" + random + "@askalot.corp", "Chuck Norris", UserTypeEnum.NORMAL, localProfile);
    }

}
