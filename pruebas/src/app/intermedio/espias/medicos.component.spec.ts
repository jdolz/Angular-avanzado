import { EMPTY, from, throwError } from 'rxjs';
import { MedicosComponent } from './medicos.component';
import { MedicosService } from './medicos.service';


describe('MedicosComponent', () => {

    let componente: MedicosComponent;
    const service = new MedicosService(null);

    beforeEach(() => {
        componente = new MedicosComponent(service);
    });


    it('should receive doctors information on init', () => {

        const medicos = ['medico1', 'medico2', 'medico3'];

        spyOn(service, 'getMedicos').and.callFake(() => {
            return from([medicos]);
        });

        componente.ngOnInit();
        expect(componente.medicos.length).toBeGreaterThan(0);
    });

    it('should call the server to add a doctor', () => {

        const espia = spyOn(service, 'agregarMedico').and.callFake(() => {
            return EMPTY;
        });

        componente.agregarMedico();
        expect(espia).toHaveBeenCalled();
    });

    it('should add a doctor to the array of doctors', () => {
        const medico = { id: 1, name: 'Paco' };

        spyOn(service, 'agregarMedico').and.returnValue(from([medico]));
        componente.agregarMedico();

        expect(componente.medicos.indexOf(medico)).toBeGreaterThanOrEqual(0);

    });

    it('should call error in case of not adding a doctor', () => {
        const miError = 'No se puedo agregar el médico';
        spyOn(service, 'agregarMedico').and.returnValue(throwError(miError));

        componente.agregarMedico();
        expect(componente.mensajeError).toBe(miError);
    });


    it('should call the server to delete a doctor', () => {

        spyOn(window, 'confirm').and.returnValue(true);
        const espia = spyOn(service, 'borrarMedico').and.callFake(() => { return EMPTY });

        componente.borrarMedico('1');
        expect(espia).toHaveBeenCalledWith('1');
    });

    it('should not call the server to delete a doctor if user cancels it', () => {

        spyOn(window, 'confirm').and.returnValue(false);
        const espia = spyOn(service, 'borrarMedico').and.callFake(() => { return EMPTY });

        componente.borrarMedico('1');
        expect(espia).not.toHaveBeenCalledWith('1');
    });
});
