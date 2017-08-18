export const findIndex = function(array, predicate) {
    // 1. Let O be ? ToObject(this value).
    if (array == null) {
        throw new TypeError('"array" is null or not defined');
    }

    let o = Object(array);

    // 2. Let len be ? ToLength(? Get(O, "length")).
    let len = o.length >>> 0;

    // 3. If IsCallable(predicate) is false, throw a TypeError exception.
    if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
    }

    // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
    let thisArg = arguments[1];

    // 5. Let k be 0.
    let k = 0;

    // 6. Repeat, while k < len
    while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return k.
        let kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
            return k;
        }
        // e. Increase k by 1.
        k++;
    }

    // 7. Return -1.
    return -1;
}