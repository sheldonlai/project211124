export interface ForumDto{
    FieldName: string,
    ActualFieldName?: string,
    UpdateHandler: (key: string, element: any) => void,
    value: any,
}