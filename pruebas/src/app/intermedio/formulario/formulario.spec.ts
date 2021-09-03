import { FormBuilder } from "@angular/forms";
import { FormularioRegister } from "./formulario";

describe('Formularios', () => {

    let fr: FormularioRegister;

    beforeEach(() => {
        fr = new FormularioRegister(new FormBuilder());
    });

    it('should contain 2 specific fields', () => {
        expect(fr.form.contains('email')).toBeTrue();
        expect(fr.form.contains('password')).toBeTrue();
    });

    it('email should be required', () => {
        const control = fr.form.get('email');
        control.setValue('');

        expect(control.valid).toBeFalse();
    });

    it('email should be a valid email address', () => {
        const control = fr.form.get('email');
        control.setValue('qwerty@gmail.com');

        expect(control.valid).toBeTrue();
    });
});