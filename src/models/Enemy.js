import { Character } from './Character.js';

export class Enemy extends Character {
    constructor(name, level, health, damageType) {
        super(name, level, health);
        this.damageType = damageType;
    }

    attack(target) {
        const damage = Math.floor(this.level * 1.5); 
        let logMessage = `${this.name} ataca a ${target.name} causando ${damage} de daño ${this.damageType}.`;
        target.takeDamage(damage);
        return { damage, logMessage };
    }
}
