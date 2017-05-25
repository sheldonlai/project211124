import {ApiController} from '../api.controllers/ApiController';
/**
 * Created by SHELDON on 5/22/2017.
 */
export class ApplicationService{

    public static _instance: ApplicationService;
    private apiController : ApiController;

    public static getInstance(){
        return ApplicationService._instance;
    }

    private  constructor(){
        if(ApplicationService._instance){
            throw new Error("Error: Instantiation failed: Use AuthService.getInstance() instead of new.");
        }
        ApplicationService._instance = this;
        this.apiController = ApiController.getInstance();
    }

    public isLoggedIn(): boolean{
        let test  = document.cookie;
        return (test != "" && test != null);
    }

    public logOut(): void {
        document.cookie = "token" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        this.apiController.removeHeaderToken();
    }



}