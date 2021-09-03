import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { IncrementadorComponent } from "./incrementador.component";

describe('Incrementador Component Unit', () => {

    let component: IncrementadorComponent;
    let fixture: ComponentFixture<IncrementadorComponent>;


    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [IncrementadorComponent],
            imports: [FormsModule]
        });

        fixture = TestBed.createComponent(IncrementadorComponent);
        component = fixture.componentInstance;
    });

    it('should not pass 100 when increment', () => {
        component.progreso = 100;
        component.cambiarValor(5);
        
        expect(component.progreso).toBeLessThanOrEqual(100);
    });
});