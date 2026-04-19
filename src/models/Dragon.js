import { Enemy } from './Enemy.js';

export class Dragon extends Enemy {
    constructor(level) {
        const health = 80 + level * 10;
        super(`Great Dragon Lvl.${level}`, level, health, 'fuego');
        this.flightTurns = 0;
    }

    attack(target) {
        if (Math.random() < 0.3 && this.flightTurns === 0) {
            this.flightTurns = 2;
            return { damage: 0, logMessage: `${this.name} alza el vuelo. ¡Esquivará ataques en los próximos turnos!` };
        }

        const damage = Math.floor(this.level * 2 + 5);
        target.takeDamage(damage);
        
        return { damage, logMessage: `${this.name} exhala una llamarada quemando a ${target.name} por ${damage} de daño de fuego.` };
    }

    takeDamage(amount) {
        if (this.flightTurns > 0) {
            amount = Math.floor(amount * 0.5);
        }
        super.takeDamage(amount);
    }
}
