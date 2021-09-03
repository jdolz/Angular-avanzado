import { TestBed, ComponentFixture } from '@angular/core/testing';
import { IncrementadorComponent } from './incrementador.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';


describe('Incremendator Component', () => {

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

    it('should create incrementador component', () => {

        expect(component).toBeTruthy();
    });

    it('should show the caption', () => {

        component.leyenda = 'Progreso de carga';

        fixture.detectChanges(); //disparar la detección de cambios

        const elem: HTMLElement = fixture.debugElement.query(By.css('h3')).nativeElement;

        expect(elem.innerHTML).toContain('Progreso de carga');

    });

    it('should show the progress value inside the input', () => {
        component.cambiarValor(5);
        fixture.detectChanges();

        fixture.whenStable().then(() => {

            const input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

            
            expect(input.value).toBe('55');
        });
        
    });

    it('should increment or decrement 5 on click', () => {

        const buttons = fixture.debugElement.queryAll(By.css('.btn-primary'));
        buttons[0].triggerEventHandler('click', null);
        expect(component.progreso).toBe(45);

        buttons[1].triggerEventHandler('click', null);
        expect(component.progreso).toBe(50);
    });

    it('should show progress on title', () => {
        // component.progreso = 30;
        const buttons = fixture.debugElement.queryAll(By.css('.btn-primary'));
        buttons[0].triggerEventHandler('click', null);

        fixture.detectChanges();
        
        const elem: HTMLElement = fixture.debugElement.query(By.css('h3')).nativeElement;

        expect(elem.innerHTML).toContain('45');
    });

});
