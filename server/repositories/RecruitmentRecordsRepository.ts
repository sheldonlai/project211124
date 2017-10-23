import {BaseRepository, IBaseRepository} from "./BaseRepository";
import {IRecruitmentRecords, RecruitmentRecords, RecruitmentRecordsModel} from "../models/RecruitmentRecords";
export interface IRecruitmentRecordsRepository extends IBaseRepository<RecruitmentRecords>{

}

export class RecruitmentRecordsRepository extends BaseRepository<RecruitmentRecords, IRecruitmentRecords> implements IRecruitmentRecordsRepository{
    constructor(){
        super(RecruitmentRecordsModel)
    }
}