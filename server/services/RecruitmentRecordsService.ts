import {BaseService} from "./BaseService";
import {IRecruitmentRecordsRepository} from "../repositories/RecruitmentRecordsRepository";
import {RecruitmentRecordEntityDto, RecruitmentRecordsDto} from "../dtos/recruitment/RecruitmentRecordsDto";
import {IRecruitmentService} from "./RecruitmentService";
import {RecruitmentRecordEntity, RecruitmentRecords} from "../models/RecruitmentRecords";
import {UserDto} from "../dtos/auth/UserDto";
import {IRecruitmentRepository} from "../repositories/RecruitmentRepository";
import {RecruitmentDto, RecruitmentRequestDto} from "../dtos/recruitment/RecruitmentDto";
import {IUserRepository} from "../repositories/UserRepository";
import {AppError} from "../errors/AppError";
import {RequestStateEnum} from "../enums/RecruitmentRequestEnum";

export interface IRecruitmentRecordsService {
    addRecruitmentRecord(recordEntity: RecruitmentRecordEntityDto, recordsId: string): Promise<RecruitmentRecordsDto>;
    getRecruitmentRecords(user: UserDto): Promise<RecruitmentRecordsDto>;
    updateRecruitmentRecord(recruitmentId: string, member: UserDto, accepted: boolean): Promise<RecruitmentRecordsDto>;
}

export class RecruitmentRecordsService extends BaseService implements IRecruitmentRecordsService {
    constructor(
        private recruitmentRecordsRepository: IRecruitmentRecordsRepository,
        private recruitmentRepository: IRecruitmentRepository,
        private userRepository: IUserRepository
    ){
        super();
    }

    addRecruitmentRecord(recordEntity: RecruitmentRecordEntityDto, recordsId: string): Promise<RecruitmentRecordsDto> {
        let record: RecruitmentRecordEntity = {
            recruitmentId: recordEntity.recruitment._id,
            status: recordEntity.status,
        };
        return this.recruitmentRecordsRepository.getById(recordsId).then(recordsFound => {
            this.checkPermissionToAddRecord(recordsFound, record);
            recordsFound.records.push(record);
            return this.recruitmentRecordsRepository.update(recordsFound).then(updatedRecords => {
                return this.recruitmentRecordsRepository.getById(updatedRecords._id).then(recordsFound => {
                    return this.recordsModelToDto(recordsFound).then(convertedRecords => {
                        return convertedRecords;
                    });
                })
            })
        })
    }

    getRecruitmentRecords(user: UserDto): Promise<RecruitmentRecordsDto>{
        return this.recruitmentRecordsRepository.findOne({'userId': user._id}).then(recordsFound => {
            return this.recordsModelToDto(recordsFound);
        }).catch(err => {
            console.log('Entity not found, creating new record...');
            let newRecords: RecruitmentRecords = new RecruitmentRecords(user._id);
            return this.recruitmentRecordsRepository.create(newRecords).then(recordsFound => {
                return this.recruitmentRecordsRepository.getById(recordsFound._id).then(r => {
                    return this.recordsModelToDto(r).then(convertedRecords => {
                        return convertedRecords;
                    });
                });
            });
        })
    }

    updateRecruitmentRecord(recruitmentId: string, member: UserDto, accepted: boolean): Promise<RecruitmentRecordsDto>{
        return this.recruitmentRecordsRepository.findOne({'userId': member._id}).then(recordsFound => {
            recordsFound.records.forEach(record => {
                if(record.recruitmentId == recruitmentId){
                    record.status = accepted? RequestStateEnum.JOINED: RequestStateEnum.DECLINED;
                }
            });
            return this.recruitmentRecordsRepository.update(recordsFound).then(updatedRecords => {
                return this.recruitmentRecordsRepository.getById(updatedRecords._id).then(records => {
                    return this.recordsModelToDto(records).then(convertedRecords => {return convertedRecords});
                });
            });
        });
    }

    private recordEntityModelToDto(model: RecruitmentRecordEntity): Promise<RecruitmentRecordEntityDto> {
        return this.recruitmentRepository.getById(model.recruitmentId).then(recruitmentFound => {
            return {
                recruitment: recruitmentFound,
                status: model.status,
            }
        })
    }

    private async recordsModelToDto(model: RecruitmentRecords): Promise<RecruitmentRecordsDto>{
        let records = model.records.map(record => {
            return this.recordEntityModelToDto(record);
        });
        let user = this.userRepository.getById(model.userId);
        return Promise.all([Promise.all(records), user]).then(result => {
            return{
                _id: model._id,
                records: result[0],
                user: result[1],
            }
        })
    }

    private checkPermissionToModifyRecord(records: RecruitmentRecords, user: UserDto){
        if(records.userId != user._id){
            throw new AppError("You do not have the permission to modify this record!");
        }
        return true;
    }

    private checkPermissionToAddRecord(records: RecruitmentRecords, newRecord: RecruitmentRecordEntity){
        records.records.forEach(record => {
            if(record.recruitmentId == newRecord.recruitmentId){
                throw new AppError("You have already applied to this recruitment!");
            }
        });
        return true;
    }
}

