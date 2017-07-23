import {BaseRepository, IBaseRepository} from "./BaseRepository";
import {ITeammateRecord, TeammateRecord, TeammateRecordModel} from "../models/TeammateRecord";

export interface ITeammateRecordRepository extends IBaseRepository<TeammateRecord> {
    searchRecord (query): Promise<TeammateRecord[]>;
}

export class TeammateRecordRepository extends BaseRepository<TeammateRecord, ITeammateRecord> implements ITeammateRecordRepository {

    constructor() {
        super(TeammateRecordModel);
    }

    searchRecord (query): Promise<TeammateRecord[]>{
        TeammateRecordModel.find({}).exec().then(() => {

        });
        return undefined;
    }


}


