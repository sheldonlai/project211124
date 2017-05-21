
export class EntityNotFoundError extends Error {
    constructor(msg: string){
        super(msg);
        this.name = "EntityNotFoundError";
    }
}