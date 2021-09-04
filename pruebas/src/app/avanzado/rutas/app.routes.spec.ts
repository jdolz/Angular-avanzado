import { MedicoComponent } from "src/app/intermedio2/medico/medico.component";
import { RUTAS } from "./app.routes";

describe('Rutas principales', () => {

    it('should exist /route/:id', () => {

        expect(RUTAS).toContain(
            { path: 'medico/:id', component: MedicoComponent }
        );
    });
});