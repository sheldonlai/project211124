import {FileAccessType} from "../../enums/FileAccessType";
import {UserDto} from "../auth/UserDto";

export interface FileUploadRecordDto {
    _id: string;
    uploadedBy: UserDto;
    accessType: FileAccessType;
    fileURL: string;
    fileName: string;
    originalName: string;
    mimeType: string;
    size: number; // in bytes
    uploadedAt: Date;
}