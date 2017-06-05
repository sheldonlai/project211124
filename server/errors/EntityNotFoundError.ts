
// May be a good idea to include RCI/Error Code.
export class EntityNotFoundError extends Error {
    constructor(msg: string){
        super(msg);
        this.name = "EntityNotFoundError";
    }
}