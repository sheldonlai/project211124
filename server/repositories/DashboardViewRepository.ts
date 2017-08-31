
import {BaseRepository, IBaseRepository} from "./BaseRepository";
import {getUniqueArray} from "../utils/ArrayUtils";
import {DashboardView, DashboardViewModel, IDashboardView} from "../models/DashboardView";

export interface IDashboardViewRepository extends IBaseRepository<DashboardView> {
}

export class DashboardViewRepository extends BaseRepository<DashboardView, IDashboardView>
    implements IDashboardViewRepository {

    constructor() {
        super(DashboardViewModel)
    }
}