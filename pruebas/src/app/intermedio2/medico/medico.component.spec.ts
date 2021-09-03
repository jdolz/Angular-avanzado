import { HttpClientModule } from "@angular/common/http";
import { TestBed, ComponentFixture } from "@angular/core/testing";
import { MedicoComponent } from "./medico.component";
import { MedicoService } from "./medico.service";

// Pruebas de Integracion

describe('Medico Component', () => {

    let component: MedicoComponent;
    let fixture: ComponentFixture<MedicoComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MedicoComponent],
            providers: [MedicoService],
            imports: [HttpClientModule]
        });

        fixture = TestBed.createComponent(MedicoComponent);
        component = fixture.componentInstance;
    });

    it('should create a component', () => {
        expect(component).toBeTruthy();
    });

    it('should return the name of the doctor', () => {
        const name = 'Juan';
        const resp = component.saludarMedico(name);

        expect(resp).toContain(name);
    });
});