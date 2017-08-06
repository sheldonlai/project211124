import {Document, model, Schema} from "mongoose";
import {BaseModel} from "./Base/BaseModel";
import {User} from "./User";
import {FileAccessType} from "../enums/FileAccessType";

export class FileUploadRecord extends BaseModel {
    uploadedBy: User;
    accessType: FileAccessType;
    fileURL: string;
    fileName: string;
    originalName: string;
    mimeType: string;
    size: number; // in bytes
    uploadedAt: Date;

    constructor(
        uploadedBy: User,
        accessType: FileAccessType,
        fileURL: string,
        fileName: string,
        originalName: string,
        mimeType: string,
        size: number,
        uploadedAt: Date
    ){
        super();
        this.uploadedBy = uploadedBy;
        this.accessType = accessType;
        this.fileURL = fileURL;
        this.fileName = fileName;
        this.originalName = originalName;
        this.mimeType = mimeType;
        this.size = size;
        this.uploadedAt = uploadedAt;
    }
}

export interface IFileUploadRecord extends FileUploadRecord, Document{}

const fileUploadRecordSchema = new Schema({
    uploadedBy:      {type: Schema.Types.ObjectId, ref: 'user', required: true, index: true},
    accessType:      {type: String, enum: Object.keys(FileAccessType), required: true},
    fileURL:         {type: String, required: true, unique: true, index: true},
    fileName:        {type: String, required: true, unique: true},
    originalName:    {type: String, required: true},
    mimeType:        {type: String, required: true},
    size:            {type: Number, required: true},
    uploadedAt:      {type: Date, default: Date.now}
});

export const FileUploadRecordModel = model<IFileUploadRecord>('fileUploadRecord', fileUploadRecordSchema);



