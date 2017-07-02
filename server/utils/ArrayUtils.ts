export const getUniqueArray = (array) => {
    let set = new Set(array);
    array = Array.from(set);
    return array;
}
