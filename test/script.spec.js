var test = require('../js/script.js');

describe('getN', function () {

    it('should return n', function () {
        expect(test.getN('toast')).toEqual('toast');
        expect(test.getN(4)).toEqual(4);
    });
});
