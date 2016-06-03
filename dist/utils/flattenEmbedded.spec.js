import { flattenEmbedded } from '../utils';
describe('flattenEmbedded', () => {
    it('flattens embedded data', () => {
        let value = 'some value';
        let data = {
            _embedded: {
                p: value
            }
        };
        let flattened = flattenEmbedded(data);
        expect(flattened.p).toBe(value);
    });
});
