import {UserDto} from "../../../server/dtos/auth/UserDto";
import {ApiController} from "./ApiController";
import {AxiosPromise} from "axios";
import {APIUrls} from "../../../server/urls";

export class UserApiController extends ApiController{
    public static _instance : UserApiController = new UserApiController();

    public static getInstance():UserApiController {
        return UserApiController._instance;
    }

    private constructor(){
        if (UserApiController._instance) {
            throw new Error("Error: Instantiation failed: Use AuthService.getInstance() instead of new.");
        }
        super();
        UserApiController._instance = this;
    }

    public updateUser(user: UserDto): AxiosPromise{
        return this.put(APIUrls.updateProfile, user);
    }


}