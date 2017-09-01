/* grab the things we need */
import {model, Schema, Document} from "mongoose";
import {User} from "./User";
import {BaseModel} from "./Base/BaseModel";

export interface DashboardContent{
    documentId: any[];
    type: "question" | "story";
    wide? : boolean;
}

export class DashboardSettings extends BaseModel{
    featured : DashboardContent[]
}

export interface IDashboardSettings extends DashboardSettings, Document {}

/* A schema for email verification */
const DashboardViewSchema = new Schema({
    featured:      []
});


export const DashboardViewModel = model<IDashboardSettings>('dashboardView', DashboardViewSchema);
