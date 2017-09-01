import {DashboardContent} from "../../models/DashboardView";

export interface DashboardSettingsDto{
    _id: string;
    featured : DashboardContent[];
}