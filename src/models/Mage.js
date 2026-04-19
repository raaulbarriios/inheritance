import { Hero } from './Hero.js';

export class Mage extends Hero {
    constructor(name, level) {
        super(name, level, 80 + level * 5, 'Mana', 100);
    }

    useAbility(target) {
        const manaCost = 30;
        if (this.resourceValue >= manaCost) {
            this.resourceValue -= manaCost;
            const damage = this.level * 8 + 30;
            target.takeDamage(damage);
            return { 
                damage, 
                logMessage: `${this.name} lanza Bola de Fuego (Mago)🔥 a ${target.name} causando ${damage} de daño. (Mana: -${manaCost})`, 
                isAbility: true 
            };
        } else {
            return { 
                damage: 0, 
                logMessage: `${this.name} intentó usar magia pero no tiene suficiente mana.`, 
                isAbility: false 
            };
        }
    }
}
