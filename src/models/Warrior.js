import { Hero } from './Hero.js';

export class Warrior extends Hero {
    constructor(name, level) {
        super(name, level, 120 + level * 15, 'Stamina', 100);
    }

    useAbility(target) {
        const staminaCost = 40;
        if (this.resourceValue >= staminaCost) {
            this.resourceValue -= staminaCost;
            const damage = this.level * 10 + 20;
            target.takeDamage(damage);
            return { 
                damage, 
                logMessage: `${this.name} realiza un Golpe Rompedor (Guerrero)⚔️ a ${target.name} por ${damage} de daño. (Stamina: -${staminaCost})`, 
                isAbility: true 
            };
        } else {
            return { 
                damage: 0, 
                logMessage: `${this.name} está demasiado agotado para usar su habilidad.`, 
                isAbility: false 
            };
        }
    }
}
