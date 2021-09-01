import { getRobots } from "./arrays";

xdescribe('Pruebas de arrays', () => {
    it('should return a minimum of 3 objects', () => {
        const resp = getRobots();

        expect(resp.length).toBeGreaterThanOrEqual(3);
    });

    xit('should contain Megaman & Ultron', () => {
        const resp = getRobots();
        expect(resp).toContain('Megaman');
        expect(resp).toContain('Ultron');
    });
});