const _elderRay = require('../build/d3fc-technical-indicator').elderRay;
const readCsv = require('./readcsv.js');

describe('elderRay', () => {
    it('should match the expected output', done => {
        Promise.all([
            readCsv('./test/data/input.csv'),
            readCsv('./test/data/elderRay.csv')
        ])
        .then(result => {
            const input = result[0];
            const expectedOutput = result[1];

            const elderRay = _elderRay()
                .value(d => d.Close)
                .highValue(d => d.High)
                .lowValue(d => d.Low);
            const output = elderRay(input);

            expect(output.map(d => d.bullPower))
                .toBeEqualWithTolerance(expectedOutput.map(d => d.BULL));
            expect(output.map(d => d.bearPower))
                .toBeEqualWithTolerance(expectedOutput.map(d => d.BEAR));
        })
        .then(done, done.fail);
    });
});