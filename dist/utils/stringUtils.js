"use strict";
/**
 * Created by Phillip on 2017-05-17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = require("crypto");
var StringUtils = (function () {
    function StringUtils() {
    }
    /**
     * generates random string of characters i.e salt
     * @function
     * @param {number} length - Length of the random string.
     */
    StringUtils.genRandomString = function (length) {
        return crypto_1.randomBytes(Math.ceil(length / 2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0, length);
        /** return required number of characters */
    };
    /**
     * hash string 'str' with sha512.
     * @function
     * @param {string} str - The string to be hashed
     * @param {string} salt - Data used to hash 'str'
     */
    StringUtils.hashString = function (str, salt) {
        var hash = crypto_1.createHmac('sha512', salt);
        /** Hashing algorithm sha512 */
        hash.update(str);
        return hash.digest('hex');
    };
    return StringUtils;
}());
exports.default = StringUtils;
//# sourceMappingURL=stringUtils.js.map