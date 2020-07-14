const {
    closeToNow,
    closestDate,
    formatTimestamp,
} = require('../modules/time.validation');

describe('time validation', () => {
    describe('close to now', () => {
        test('it returns true if passed the current time', (done) => {
            const date = new Date();
            const timestamp = date.toISOString();
            expect(closeToNow(timestamp)).toBe(true);
            done();
        });
        test('it returns false if passed the current date without time', (done) => {
            const date = new Date();
            const timestamp = date.toDateString();
            expect(closeToNow(timestamp)).toBe(false);
            done();
        });
        test('it returns false if passed a date in the past', (done) => {
            const timestamp = '2020-07-01T16:03:18.021Z'
            expect(closeToNow(timestamp)).toBe(false);
            done();
        });
        test('it returns false if passed a date in the future', (done) => {
            const timestamp = '3020-07-01T16:03:18.021Z'
            expect(closeToNow(timestamp)).toBe(false);
            done();
        });
        test('it returns error if passed invalid timestamp', (done) => {
            const timestamp = 'abc123def456'
            expect(closeToNow(timestamp)).toBe('invalid timestamp');
            done();
        });
    });
    describe('closest date', () => {
        test('it returns the previous day if before noon CST', (done) => {
            const inputTime = '2020-07-01T16:03:18.021Z'
            const expectedOutput = '2020-06-30';
            expect(closestDate(inputTime)).toBe(expectedOutput);
            done();
        });
        test('it returns the current day if exactly noon CST', (done) => {
            const inputTime = '2020-07-01T12:00:00.021-05:00'
            const expectedOutput = '2020-07-01';
            expect(closestDate(inputTime)).toBe(expectedOutput);
            done();
        });
        test('it returns the current day if after noon CST', (done) => {
            const inputTime = '2020-07-01T23:03:18.021Z'
            const expectedOutput = '2020-07-01';
            expect(closestDate(inputTime)).toBe(expectedOutput);
            done();
        });
        test('it returns error if passed invalid timestamp', (done) => {
            const timestamp = 'abc123def456'
            expect(closestDate(timestamp)).toBe('invalid timestamp');
            done();
        });
    });
    describe('format timestamp', () => {
        test('it returns a formatted timestamp', (done) => {
            const inputTime = '2020-07-01T16:03:18.021Z'
            const expectedOutput = 'July 1st, 2020 at 11:03 am';
            expect(formatTimestamp(inputTime, 'US/Central')).toBe(expectedOutput);
            done();
        });
        test('it returns error message for invalid timezone', (done) => {
            const inputTime = '2020-07-01T16:03:18.021Z'
            const expectedOutput = 'invalid timezone';
            expect(formatTimestamp(inputTime, 'ABC')).toBe(expectedOutput);
            done();
        });
        test('it returns error message for invalid timestamp', (done) => {
            const inputTime = 'abc123def456'
            const expectedOutput = 'invalid timestamp';
            expect(formatTimestamp(inputTime, 'US/Central')).toBe(expectedOutput);
            done();
        });
    });
});
