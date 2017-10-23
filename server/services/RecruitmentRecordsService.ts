import {BaseService} from "./BaseService";
import {IRecruitmentRecordsRepository} from "../repositories/RecruitmentRecordsRepository";
export interface IRecruitmentRecordsService{

}

export class RecruitmentRecordsService extends BaseService implements IRecruitmentRecordsService{
    constructor(
        private recruitmentRecordsService: IRecruitmentRecordsRepository
    ){
        super();
    }
}