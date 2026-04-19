import { Character } from './Character.js';

export class Hero extends Character {
    constructor(name, level, health, resourceType, maxResource) {
        super(name, level, health);
        this.resourceType = resourceType;
        this.resourceValue = maxResource;
        this.maxResource = maxResource;
    }

    attack(target) {
        const damage = this.level * 4 + 10;
        let logMessage = `${this.name} realiza un ataque básico a ${target.name} por ${damage} puntos de daño.`;
        target.takeDamage(damage);
        return { damage, logMessage, isAbility: false };
    }

    useAbility(target) {
        return { damage: 0, logMessage: `${this.name} intentó usar una habilidad desconocida en ${target.name}.`, isAbility: true };
    }

    regenerateResource(amount) {
        this.resourceValue += amount;
        if (this.resourceValue > this.maxResource) {
            this.resourceValue = this.maxResource;
        }
    }
}
