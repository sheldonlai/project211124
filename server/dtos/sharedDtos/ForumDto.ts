export interface ForumDto{
    FieldName: string,
    ActualFieldName?: string,
    updateHandler: (key: string, element: any) => void,
    value: any,
}