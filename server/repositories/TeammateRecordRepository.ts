import {BaseRepository, IBaseRepository} from "./BaseRepository";
import {ITeammateRecord, TeammateRating, TeammateRecord, TeammateRecordModel} from "../models/TeammateRecord";
import {isNullOrUndefined} from "util";

export interface ITeammateRecordRepository extends IBaseRepository<TeammateRecord> {
    searchRecord (query): Promise<TeammateRecord[]>;
    addRating(recordId: string, rating: TeammateRating): Promise<TeammateRecord>;
    editRating(recordId: string, rating: TeammateRating): Promise<TeammateRecord>;
}

export class TeammateRecordRepository extends BaseRepository<TeammateRecord, ITeammateRecord> implements ITeammateRecordRepository {

    constructor() {
        super(TeammateRecordModel);
    }

    searchRecord (conditions: any): Promise<TeammateRecord[]>{
        return TeammateRecordModel.find(conditions).lean().exec()
            .then((teammateRecords: TeammateRecord[]) => {
            return Promise.all(teammateRecords.map((record)=>this.applyAdditionalFunction(record)));
        });
    }

    create(record: TeammateRecord): Promise<TeammateRecord> {
        this.changeRatingCreatorToId(record);
        return super.create(record).then((teammate: TeammateRecord) => {
            // make sure the rating users are populated
            return this.getById(teammate._id);
        })
    }

    update(record: TeammateRecord): Promise<TeammateRecord> {
        this.changeRatingCreatorToId(record);
        return TeammateRecordModel.findByIdAndUpdate(record._id, record, {new: true})
            .then((teammate: TeammateRecord) => {
            // make sure the rating users are populated
            return this.getById(teammate._id);
        })
    }

    addRating(recordId: string, rating: TeammateRating): Promise<TeammateRecord> {
        return this.getById(recordId).then((record) => {
            record.ratings.push(rating);
            return this.update(record);
        });
    }

    editRating(recordId: string, rating: TeammateRating): Promise<TeammateRecord> {
        return this.getById(recordId).then((record) => {
            for (let r of record.ratings){
                if (r._id.toString() === rating._id.toString()){
                    r.rating = rating.rating;
                    r.comment = rating.comment;
                    r.updatedAt = new Date(Date.now());
                }
            }
            return this.update(record);
        });
    }

    changeRatingCreatorToId (record: TeammateRecord) {
        for (let r of record.ratings){
            r.createdBy = r.createdBy._id;
        }
    }

    protected applyRestriction(record: TeammateRecord): TeammateRecord {
        if (record.createdBy) {
            delete record.createdBy.local;
        }
        record.ratings = record.ratings.map((rating) => {
            delete rating.createdBy.local;
            return rating;
        });
        return record;
    }
}


