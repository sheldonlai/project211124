import {model, Schema, Document} from "mongoose";
import {User} from "./User";
import {RequestStateEnum} from "../enums/RecruitmentRequestEnum";

export interface RecruitmentRecordEntity{
    recruitmentId: string;
    status: RequestStateEnum;
}

export class RecruitmentRecords{
    _id: any;
    userId: string;
    records: RecruitmentRecordEntity[];
    constructor(userId: string){
        this.userId = userId;
        this.records = [];
    }
}

export interface IRecruitmentRecords extends RecruitmentRecords, Document {}

const schema = new Schema({
    userId: {type: String, required: true, default: ""},
    records: [{
        recruitmentId: {type: String, required: true, default: ""},
        status: {type: Object.keys(RequestStateEnum), default: RequestStateEnum.PENDING}
    }]
});

export const RecruitmentRecordsModel = model<IRecruitmentRecords>('recruitmentRecord', schema);

