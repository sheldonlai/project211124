import {BaseRepository, IBaseRepository} from "./BaseRepository";
import {FileUploadRecord, FileUploadRecordModel, IFileUploadRecord} from "../models/FileUploadRecord";

export interface IFileUploadRecordRepository extends IBaseRepository<FileUploadRecord> {
}

export class FileUploadRecordRepository
    extends BaseRepository<FileUploadRecord, IFileUploadRecord>
    implements IFileUploadRecordRepository {

    constructor() {
        super(FileUploadRecordModel);
    }

}