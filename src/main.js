import { Mage } from './models/Mage.js';
import { Warrior } from './models/Warrior.js';
import { Rogue } from './models/Rogue.js';
import { Goblin } from './models/Goblin.js';
import { Dragon } from './models/Dragon.js';

class GameController {
    constructor() {
        this.heroes = [
            new Mage('Merlin', 10),
            new Warrior('Arthur', 10),
            new Rogue('Loki', 10)
        ];
        this.enemies = [
            new Goblin(8),
            new Dragon(10),
            new Goblin(9)
        ];
        
        this.currentTurn = 'hero'; 
        this.selectedHeroIndex = 0;
        this.selectedEnemyIndex = 1; 

        this.initUI();
        this.updateUI();
        this.logMessage("¡El combate comienza! Es el turno de los héroes.");
    }

    logMessage(msg) {
        console.log("Combat Log:", msg);
    }

    initUI() {
        document.getElementById('btn-attack').addEventListener('click', () => this.heroAction('attack'));
        document.getElementById('btn-ability').addEventListener('click', () => this.heroAction('ability'));
        
        const heroSelect = document.getElementById('hero-select');
        this.heroes.forEach((h, i) => {
            const btn = document.createElement('div');
            btn.className = 'char-card';
            btn.innerHTML = `<h3>${h.name}</h3><div class='stats' id='hero-stats-${i}'></div>`;
            btn.onclick = () => this.selectHero(i);
            heroSelect.appendChild(btn);
        });

        const enemySelect = document.getElementById('enemy-select');
        this.enemies.forEach((e, i) => {
            const btn = document.createElement('div');
            btn.className = 'char-card enemy-card';
            btn.innerHTML = `<h3>${e.name}</h3><div class='stats' id='enemy-stats-${i}'></div>`;
            btn.onclick = () => this.selectEnemy(i);
            enemySelect.appendChild(btn);
        });
    }

    selectHero(index) {
        if (!this.heroes[index].isAlive) return;
        this.selectedHeroIndex = index;
        this.updateUI();
    }

    selectEnemy(index) {
        if (!this.enemies[index].isAlive) return;
        this.selectedEnemyIndex = index;
        this.updateUI();
    }

    updateUI() {
        this.heroes.forEach((h, i) => {
            const stats = document.getElementById(`hero-stats-${i}`);
            stats.innerHTML = `
                <div class="bar-container"><div class="hp-bar" style="width: ${(h.health/h.maxHealth)*100}%"></div></div>
                <span>HP: ${Math.floor(h.health)}/${h.maxHealth}</span>
                <div class="bar-container"><div class="resource-bar" style="width: ${(h.resourceValue/h.maxResource)*100}%"></div></div>
                <span>${h.resourceType}: ${h.resourceValue}/${h.maxResource}</span>
            `;
            const card = stats.parentElement;
            if (!h.isAlive) card.classList.add('dead');
            if (i === this.selectedHeroIndex) card.classList.add('selected');
            else card.classList.remove('selected');
        });

        this.enemies.forEach((e, i) => {
            const stats = document.getElementById(`enemy-stats-${i}`);
            stats.innerHTML = `
                <div class="bar-container"><div class="hp-bar" style="width: ${(e.health/e.maxHealth)*100}%"></div></div>
                <span>HP: ${Math.floor(e.health)}/${e.maxHealth}</span>
                <div class="bar-container" style="visibility: hidden"></div>
                <span style="visibility: hidden">Resource</span>
            `;
            const card = stats.parentElement;
            if (!e.isAlive) card.classList.add('dead');
            if (i === this.selectedEnemyIndex) card.classList.add('selected');
            else card.classList.remove('selected');
        });

        const actionPanel = document.querySelector('.actions-panel');
        if (this.currentTurn === 'hero' && this.heroes.some(h => h.isAlive) && this.enemies.some(e=>e.isAlive)) {
            actionPanel.style.display = 'flex';
        } else {
            actionPanel.style.display = 'none';
        }

        this.checkWinCondition();
    }

    heroAction(type) {
        if (this.currentTurn !== 'hero') return;
        const hero = this.heroes[this.selectedHeroIndex];
        const target = this.enemies[this.selectedEnemyIndex];

        if (!hero || !hero.isAlive) {
            this.logMessage("Selecciona un héroe vivo.");
            return;
        }
        if (!target || !target.isAlive) {
            this.logMessage("Selecciona un enemigo vivo.");
            return;
        }

        let result;
        if (type === 'attack') {
            result = hero.attack(target);
        } else if (type === 'ability') {
            result = hero.useAbility(target);
        }

        if (result) {
            this.logMessage(result.logMessage);
            this.animateElement(document.getElementById(`enemy-stats-${this.selectedEnemyIndex}`).parentElement, 'shake');
        }

        this.updateUI();

        this.currentTurn = 'enemy';
        setTimeout(() => this.enemyTurn(), 1500);
    }

    enemyTurn() {
        if (!this.enemies.some(e => e.isAlive)) return;
        
        let actionsTaken = false;
        this.enemies.forEach((enemy, index) => {
            if (enemy.isAlive) {
                const aliveHeroes = this.heroes.filter(h => h.isAlive);
                if (aliveHeroes.length === 0) return;
                
                const target = aliveHeroes[Math.floor(Math.random() * aliveHeroes.length)];
                setTimeout(() => {
                    const result = enemy.attack(target);
                    this.logMessage(result.logMessage);
                    const heroElementText = `hero-stats-${this.heroes.indexOf(target)}`;
                    this.animateElement(document.getElementById(heroElementText).parentElement, 'shake');
                    this.updateUI();
                }, index * 800);
                actionsTaken = true;
            }
        });

        if (actionsTaken) {
            setTimeout(() => {
                this.currentTurn = 'hero';
                this.regenerateHeroesResources();
                this.updateUI();
                this.logMessage("Tú turno. Selecciona tu héroe y la acción.");
            }, this.enemies.length * 800 + 500);
        }
    }

    regenerateHeroesResources() {
        this.heroes.forEach(h => {
            if (h.isAlive) h.regenerateResource(10);
        });
    }

    animateElement(el, animationClass) {
        if (!el) return;
        el.classList.add(animationClass);
        setTimeout(() => el.classList.remove(animationClass), 500);
    }

    checkWinCondition() {
        const heroesAlive = this.heroes.some(h => h.isAlive);
        const enemiesAlive = this.enemies.some(e => e.isAlive);

        if (!heroesAlive) {
            this.logMessage("¡Derrota! Todos los héroes han caído...");
            document.querySelector('.actions-panel').style.display = 'none';
        } else if (!enemiesAlive) {
            this.logMessage("¡VICTORIA! Todos los enemigos fueron purgados.");
            document.querySelector('.actions-panel').style.display = 'none';
        }
    }
}

window.onload = () => {
    new GameController();
};
