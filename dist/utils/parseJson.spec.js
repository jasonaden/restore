import { parseJson } from './parseJson';
describe('parseJson', () => {
    it('allows a custom reviver', () => {
        let reviver = (key, value) => {
            if (key === '') {
                return value;
            }
            return value * 2;
        };
        let data = '{ "p": 5 }';
        let parsed = parseJson(undefined, reviver, data, undefined);
        expect(parsed.p).toBe(10);
    });
    it('parses JSON', () => {
        let data = '{ "foo": "bar" }';
        let parsed = parseJson(undefined, undefined, data, undefined);
        expect(parsed).toEqual({
            foo: 'bar'
        });
    });
    it('creates date objects', () => {
        let comparisonDate = new Date('1963-11-22T00:00:00.000Z');
        let data = '{ "date": "1963-11-22T00:00:00.000Z" }';
        let parsed = parseJson(undefined, undefined, data, undefined);
        expect(parsed.date.getTime()).toBe(comparisonDate.getTime());
    });
});
