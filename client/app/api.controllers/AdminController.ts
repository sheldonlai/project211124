import {ApiController} from "./ApiController";
import {APIUrls} from "../../../server/urls";
import {AxiosPromise} from "axios";
import {DashboardSettingsDto} from "../../../server/dtos/admin/DashboardSettingsDto";

class AdminControllerClass extends ApiController{
    getDashboardSettings () : AxiosPromise{
        return this.get(APIUrls.GetDashboardSettings);
    }

    setDashboardSettings (settings: DashboardSettingsDto) : AxiosPromise{
        return this.post(APIUrls.GetDashboardSettings, settings);
    }
}

export const AdminController = new AdminControllerClass();

