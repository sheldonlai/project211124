
import {BaseRepository, IBaseRepository} from "./BaseRepository";
import {getUniqueArray} from "../utils/ArrayUtils";
import {DashboardSettings, DashboardViewModel, IDashboardSettings} from "../models/DashboardView";

export interface IDashboardViewRepository extends IBaseRepository<DashboardSettings> {
}

export class DashboardViewRepository extends BaseRepository<DashboardSettings, IDashboardSettings>
    implements IDashboardViewRepository {

    constructor() {
        super(DashboardViewModel)
    }
}