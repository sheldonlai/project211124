

import {ApiController} from "./ApiController";
import {APIUrls} from "../../../server/urls";
import {AxiosPromise} from "axios";

class DashboardAPIControllerClass extends ApiController {
    fetchDashboardData(): AxiosPromise {
        return this.get(APIUrls.FetchDashboard);
    }
}

export const DashboardAPIController = new DashboardAPIControllerClass();