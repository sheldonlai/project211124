export interface AnswerDto {
    id: string;
    title: string;
    question: any;
    content: string;
    author: any;
    upVotes : number;
    downVotes: number;
    groups: any[];
    lastEditedUtc : Date;
}