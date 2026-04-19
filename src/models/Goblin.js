import { Enemy } from './Enemy.js';

export class Goblin extends Enemy {
    constructor(level) {
        const health = 20 + level * 5;
        super(`Goblin Lvl.${level}`, level, health, 'físico');
        this.isEnraged = false;
    }

    attack(target) {
        if (this.health < this.maxHealth / 3 && !this.isEnraged) {
            this.isEnraged = true;
        }

        const multiplier = this.isEnraged ? 1.5 : 1;
        const damage = Math.floor((this.level * 1.5 + 2) * multiplier);
        target.takeDamage(damage);
        
        let logMessage = this.isEnraged 
            ? `Goblin Enrabietado rasga brutalmente a ${target.name} por ${damage} de daño!`
            : `${this.name} ataca a ${target.name} por ${damage} de daño.`;

        return { damage, logMessage };
    }
}
