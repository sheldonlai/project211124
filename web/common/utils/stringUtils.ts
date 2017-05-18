/**
 * Created by Phillip on 2017-05-17.
 */

import { randomBytes, createHmac }from "crypto"

export default class StringUtils {
    /**
     * generates random string of characters i.e salt
     * @function
     * @param {number} length - Length of the random string.
     */
    static genRandomString(length: number): string {
        return randomBytes(Math.ceil(length / 2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0, length);
        /** return required number of characters */
    }

    /**
     * hash string 'str' with sha512.
     * @function
     * @param {string} str - The string to be hashed
     * @param {string} salt - Data used to hash 'str'
     */
    static hashString(str: string, salt: string) {
        let hash  = createHmac('sha512', salt);
        /** Hashing algorithm sha512 */
        hash.update(str);
        return hash.digest('hex');
    }
}
