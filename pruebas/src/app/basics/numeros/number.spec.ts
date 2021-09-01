import { incrementar } from "./number";

describe('Pruebas de números', () => {
    it('should return 100, if number is greater than 100', () => {

        const resp = incrementar(101);

        expect(resp).toBe(100);
    });

    it('should return number + 1, if number is not greater than 100', () => {
        const resp = incrementar(100);

        expect(resp).toBe(101);
    });
});