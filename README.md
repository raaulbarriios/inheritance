# ⚔️ RPG Arena - Sistema de Combate por Turnos

## 📖 Introducción

El proyecto **RPG Arena** es un juego de combate por turnos para navegador, creado con JavaScript y basado en los principios de la Programación Orientada a Objetos (POO). El núcleo del juego destaca por el uso de la **herencia** y el **polimorfismo**. En este juego, el jugador dirige un equipo de héroes (Mago, Guerrero, Pícaro) para enfrentar a un equipo de enemigos (Goblins, Dragones) en una batalla donde debe gestionar sus recursos para ganar. La interfaz visual cuenta con un diseño moderno y responde a las acciones mostrando desgaste de vida, gastos de maná y animaciones de ataques.

Esta documentación técnica sirve como guía para entender cómo está programado el proyecto. Aquí encontrarás explicados aspectos clave como la organización de los archivos, el diagrama de clases, las reglas que seguimos para escribir el código y cómo trabajamos en el repositorio para añadir mejoras de forma ordenada.

### 🛠️ Tecnologías y Herramientas
* **HTML5 y CSS (Vanilla)**: Usados para la estructura visual y para conseguir el estilo de diseño moderno.
* **JavaScript (ES6+)**: Se encarga de toda la lógica. Se organizó usando módulos, clases y programación orientada a objetos.
* **[Google Fonts API](https://fonts.google.com/specimen/Inter)**: Importa la fuente *Inter* para darle mejor lectura a los textos de la web.

---

## 📂 Estructura de Archivos

Para mantener el código ordenado y fácil de actualizar, usamos una estructura que separa la parte visual (las pantallas) de la lógica (el código duro del juego).

```text
inheritance/
├── index.html          # La pantalla principal que abre el usuario.
├── diagrama.pdf        # El diagrama de clases del proyecto.
├── README.md           # La documentación del juego (este archivo).
└── src/
    ├── index.css       # Los colores, formas y animaciones (estilos).
    ├── main.js         # El archivo central de JavaScript (GameController).
    └── models/         # Carpeta con los archivos de los personajes.
        ├── Character.js# Molde base para cualquier ser vivo en el mapa.
        ├── Hero.js     # Molde base para los héroes, con uso de recursos.
        ├── Enemy.js    # Molde base para los enemigos dirigidos por la máquina.
        ├── Mage.js     # Clase final (Héroe).
        ├── Warrior.js  # Clase final (Héroe).
        ├── Rogue.js    # Clase final (Héroe).
        ├── Goblin.js   # Clase final (Enemigo).
        └── Dragon.js   # Clase final (Enemigo).
```

**Justificación:**
Decidimos aislar cada tipo de personaje en su respectivo archivo `.js`. Gracias a eso, si queremos modificar los puntos de vida de un Mago, sabemos exactamente adónde ir sin alterar a otros. Todo el interior del juego ocurre en `main.js`, sin llenar nuestro archivo `index.html` de mucho código. 

---

## 🏗️ Diagrama de Clases

Para crear a los personajes usamos niveles de herencia en cadena, lo que nos ahorra repetir las mismas líneas de código muchas veces:

1. **Clase Base (`Character`)**
   Es la clase padre de todos. Todos los combatientes en el juego heredan de ella sus valores básicos (su nivel, los puntos de vida que tienen y un método base para recibir daño llamado `takeDamage()`).

2. **Clases Intermedias (`Hero` y `Enemy`)**
   * **`Hero`**: Hereda de Character. Aporta una barra extra para los recursos (como mana o furia), una función básica para atacar físicamente y la base del comportamiento de habilidades lógicas (`useAbility()`).
   * **`Enemy`**: Hereda de Character. Está pensada especialmente para las criaturas contrarias.

3. **Subclases Especializadas**
   * **Héroes (`Mage`, `Warrior`, `Rogue`)**: Heredan de la clase `Hero`. Aquí se usa el polimorfismo real: modifican la forma de lanzar su habilidad (`useAbility`) para que se adapte a sus propias mecánicas (daño con magia, cortes profundos, etc).
   * **Enemigos (`Goblin`, `Dragon`)**: Heredan de la plantilla `Enemy` con parámetros de daño adaptados para cada monstruo.

### La clase conectora `GameController` (Main)
Se ubica dentro del archivo `main.js`. Es como el árbitro de la batalla. Se encarga de:
* Inicializar a los equipos.
* Ver de quién es el turno.
* Modificar las barras de vida de la página web (`updateUI`).
* Validar quién gana o si se termina la partida al final del turno continuo.

*(Si deseas ver este esqueleto de manera visual, revisa el archivo `diagrama.pdf` dentro de la carpeta).*

---

## 📝 Nomenclatura del Código

Seguimos una serie de reglas de nombres y sintaxis bastante claras a lo largo del código para escribir sin confusiones:

* **Clases y Archivos de Modelo**: Usan `CamelCase`, es decir, cada palabra inicia en mayúscula (Ejemplo: `GameController`, `Character.js`, `Warrior`). Los nombres siempre van en inglés.
* **Variables**: En `camelCase` e intentamos que expliquen por sí mismas lo que hacen (Ejemplo: `currentTurn`, `selectedEnemyIndex` en vez de variables genéricas como "x_id").
* **Funciones y Métodos**: También utilizan `camelCase`, pero deben contener un verbo de mandato que explique la instrucción en su interior (Ejemplo: `regenerateResource()`, `logMessage()`).

**Otras directrices integradas:**
Todo el código en el entorno de desarrollo se redacta en **inglés**, pero todo lo que percibe el usuario del jugador (textos o notificaciones de logs en el navegador) está en **español**. Preferimos una interrupción rápida (`return;` temprano) en vez de cadenas con demasiados "if" o "else", limitando líneas en blanco y consiguiendo un script organizado y vertical.

* **Desarrollador y Programación:** Raúl Barrios Fuentes.