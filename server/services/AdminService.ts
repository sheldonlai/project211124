import {BaseService} from "./BaseService";
import {IDashboardViewRepository} from "../repositories/DashboardViewRepository";
import {DashboardContent} from "../models/DashboardView";
import {User} from "../models/User";
import {UserTypeEnum} from "../enums/UserTypeEnum";
import {AppError} from "../errors/AppError";

export interface IAdminService {
    setDashboardView(jsonArray: DashboardContent[], user: User): Promise<void>

    getDashboardView(user: User): Promise<DashboardContent[]>;
}

export class AdminService extends BaseService implements IAdminService {

    constructor(private dashboardViewRepository: IDashboardViewRepository) {
        super();
    }

    setDashboardView(jsonArray: DashboardContent[], user: User): Promise<void> {
        return this.dashboardViewRepository.findOne({}).then((json) => {
            json.featured = jsonArray;
            return this.dashboardViewRepository.update(json);
        }).then(() => {
            return;
        });
    }

    getDashboardView(user: User): Promise<DashboardContent[]> {
        return this.dashboardViewRepository.findOne({}).then((json) => {
            return json.featured;
        })
    }

}

