import { EventEmitter } from "@angular/core";

export class Jugador2 {
    hp: number;
    hpChange = new EventEmitter<number>();

    constructor() {
        this.hp = 100;
    }

    recibeDaño(daño: number) {
        if (daño >= this.hp) {
            this.hp = 0;
        } else {
            this.hp = this.hp - daño;
        }

        this.hpChange.emit(this.hp);
    }
}