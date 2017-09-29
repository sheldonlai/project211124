import {RecruitmentDto} from "../dtos/recruitment/RecruitmentDto";
import {Recruitment} from "../models/Recruitment";
import {DraftJsHelper} from "./DraftJsHelper";


export class RecruitmentConverter{
    static dtoToModel = function(dto: RecruitmentDto){
        let model = new Recruitment(dto.title, DraftJsHelper.convertEditorStateToRaw(dto.content),
            dto.recruitStatus, dto.createdBy, dto.university, dto.courseDifficulty);
        model._id = dto._id;
        model.createdAt = dto.createdAt;
        model.createdBy = dto.createdBy;
        model.comments = dto.comments;
        model.groupMates = dto.groupMates;
        model.views = dto.views;
        return model;
    };

    static modelToDto = function(model: Recruitment){
        let dto: RecruitmentDto = {
            _id: model._id,
            title: model.title,
            content: DraftJsHelper.convertRawToEditorState(model.content),
            comments: model.comments,
            recruitStatus: model.recruitStatus,
            university: model.university,
            courseDifficulty: model.courseDifficulty,
            createdBy: model.createdBy,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
            groupMates: model.groupMates,
            views: model.views,
        };
        return dto;
    }
}