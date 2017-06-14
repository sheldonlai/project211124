import {LocalProfile, User} from "../../../../server/models/User";
import {UserTypeEnum} from "../../../../server/enums/UserTypeEnum";
/**
 * Created by Phillip on 2017-05-28.
 */

export class FakeModels {

    constructor() {}

    localUser(): User {
        let localProfile: LocalProfile = new LocalProfile("hashedPassword", "bestSalt");
        return new User("sampleUser@askalot.corp", "Chuck Norris", UserTypeEnum.NORMAL, localProfile);
    }

}
