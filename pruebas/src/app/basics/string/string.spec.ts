import { mensaje } from "./string";

// Jasmine
describe('Pruebas de Strings', () => {
    it('should return a string', () => {
        const resp = mensaje('Fernando');

        expect(typeof resp).toBe('string');
    });

    it('should contain the name from the arguments', () => {
        const nombre = 'Fernando';
        const resp = mensaje('Fernando');

        expect(resp).toContain(nombre);
    });
});
