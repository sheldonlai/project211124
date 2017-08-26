export const convertDateToString = function(date: string | Date){
    if (typeof date === "string" ){
        let newDate = new Date(date);
        console.log(newDate.toLocaleString())
        return newDate.toLocaleDateString();
    } else if (date.toLocaleDateString) {
        return date.toLocaleDateString();
    } else {
        throw new Error("date must be of type string or Date")
    }
};

export const convertDateTimeToString = function(date: string | Date){
    if (typeof date === "string" ){
        let newDate = new Date(date);
        return newDate.toLocaleString();
    } else if (date.toLocaleString) {
        return date.toLocaleString();
    } else {
        throw new Error("date must be of type string or Date")
    }
};