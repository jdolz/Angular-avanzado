import { Jugador } from "./clases";

describe('Pruebas de clase', () => {

    let jugador: Jugador;

    beforeEach(() =>{
        jugador = new Jugador();
    })

    it('should return 80 hp if damage is 20', () => {

       const resp = jugador.recibeDaño(20);

        expect(resp).toBe(80);
    });

    it('should return 50 hp if damage is 50', () => {

        const resp = jugador.recibeDaño(50);
 
         expect(resp).toBe(50);
     });

     it('should return 0 hp if damage is equal or greater than 100', () => {
        const resp = jugador.recibeDaño(100);

        expect(resp).toBe(0);
     });
});