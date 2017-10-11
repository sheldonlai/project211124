export const createModelFromObject = function<T> (prototype,obj: any):T  {
    let object: T = new prototype();
    for (let key of Object.keys(obj)) {
        object[key] = obj[key]
    }
    return object;
}