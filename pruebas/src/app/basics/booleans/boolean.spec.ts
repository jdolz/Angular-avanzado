import { userLogged } from "./boolean";

describe('Pruebas de Booleans', () => {
    it('should return true', () => {
        const resp = userLogged();

        expect(resp).toBeTrue();
    });
});