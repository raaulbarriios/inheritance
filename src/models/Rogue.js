import { Hero } from './Hero.js';

export class Rogue extends Hero {
    constructor(name, level) {
        super(name, level, 90 + level * 10, 'Stamina', 100);
    }

    useAbility(target) {
        const staminaCost = 25;
        if (this.resourceValue >= staminaCost) {
            this.resourceValue -= staminaCost;
            const isCrit = Math.random() > 0.5;
            const multiplier = isCrit ? 2.5 : 1;
            const damage = Math.floor((this.level * 6 + 15) * multiplier);
            target.takeDamage(damage);
            
            const critText = isCrit ? '¡GOLPE CRÍTICO! ' : '';
            return { 
                damage, 
                logMessage: `${critText}${this.name} usa Apuñalada (Pícaro)🗡️ en ${target.name} causando ${damage} de daño. (Stamina: -${staminaCost})`, 
                isAbility: true 
            };
        } else {
            return { 
                damage: 0, 
                logMessage: `${this.name} necesita recuperar aliento para usar su habilidad.`, 
                isAbility: false 
            };
        }
    }
}
