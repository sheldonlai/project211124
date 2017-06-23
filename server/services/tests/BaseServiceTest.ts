/**
 * Created by SHELDON on 6/23/2017.
 */
import {BaseService} from "../BaseService";

describe('BaseServiceTest', function () {
    class TestService extends BaseService {
    }
    let testService = new TestService();

    test('should map the dictionary onto the object', function () {
        let obj = {
            a: 1,
            b: 2,
            c: 3,
            d: 4
        };
        let dict = {
            a: 100,
            b: 200,
            c: 300,
            d: 400
        };
        testService.mapKeysOntoObject(obj, dict);
        expect(obj).toEqual(dict);

    })


});


