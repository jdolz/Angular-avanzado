import { Jugador2 } from "./eventEmitter";

describe('Jugador 2 emit', () => {
    let jugador: Jugador2;
    beforeEach(() => {
        jugador = new Jugador2();
    });

    it('should emit event when recieve damage', () => {
        let newHp: number;
        jugador.hpChange.subscribe(hp => {
            newHp = hp;
        });
        jugador.recibeDaño(20);
        expect(newHp).toBe(80);
    });
});