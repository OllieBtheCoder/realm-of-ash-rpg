let player = {
    name: "",
    race: "",
    class: "",
    health: 0,
    maxHealth: 0,
    currentHealth: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    magic: 0
};


// =========================
// CLASS DATA
// =========================

const classes = {

    Warrior: {
        health: 120,
        attack: 18,
        defense: 15,
        speed: 8,
        magic: 5,
        description: "Strong and heavily armored warriors who excel in close combat."
    },

    Ranger: {
        health: 100,
        attack: 15,
        defense: 9,
        speed: 16,
        magic: 8,
        description: "Swift hunters who specialize in ranged attacks and precision."
    },

    Mage: {
        health: 80,
        attack: 8,
        defense: 6,
        speed: 12,
        magic: 25,
        description: "Powerful spellcasters who sacrifice physical strength for magical power."
    },

    Rogue: {
        health: 95,
        attack: 17,
        defense: 8,
        speed: 20,
        magic: 7,
        description: "Fast and deadly fighters who rely on speed and critical strikes."
    }

};


// =========================
// RACE DATA
// =========================

const races = {

    Human: {
        health: 0,
        attack: 2,
        defense: 2,
        speed: 0,
        magic: 0,
        description: "Adaptable and balanced, Humans are capable in almost every situation."
    },

    Elf: {
        health: 0,
        attack: 0,
        defense: 0,
        speed: 5,
        magic: 3,
        description: "Swift and naturally magical, Elves excel at speed and spellcasting."
    },

    Dwarf: {
        health: 15,
        attack: 0,
        defense: 4,
        speed: 0,
        magic: 0,
        description: "Tough and resilient, Dwarves are difficult to bring down."
    },

    Orc: {
        health: 5,
        attack: 6,
        defense: 0,
        speed: 0,
        magic: 0,
        description: "Powerful warriors who rely on strength and raw physical power."
    }

};


// =========================
// ENEMY DATA
// =========================

const enemies = [

    {
        name: "Goblin",
        health: 50,
        attack: 10,
        defense: 5
    },

    {
        name: "Wolf",
        health: 40,
        attack: 12,
        defense: 3
    },

    {
        name: "Orc",
        health: 80,
        attack: 15,
        defense: 10
    },

    {
        name: "Troll",
        health: 120,
        attack: 20,
        defense: 15
    }

];


// Current enemy during battle

let currentEnemy = null;
let battleActive = false;


// =========================
// SCREEN MANAGEMENT
// =========================

function showScreen(screenId) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(screenId).classList.add("active");
}


// =========================
// CHARACTER CREATION
// =========================

function showCharacterCreation() {

    showScreen("character-screen");

    updateRacePreview();
    updateClassPreview();
}


function updateRacePreview() {

    const raceSelect = document.getElementById("character-race");
    const raceInfo = document.getElementById("race-info");

    const selectedRace = raceSelect.value;

    const race = races[selectedRace];

    if (!race) {
        raceInfo.innerHTML = "Choose a race to see its advantages.";
        return;
    }

    let bonuses = [];

    if (race.health > 0) {
        bonuses.push(`+${race.health} Health`);
    }

    if (race.attack > 0) {
        bonuses.push(`+${race.attack} Attack`);
    }

    if (race.defense > 0) {
        bonuses.push(`+${race.defense} Defense`);
    }

    if (race.speed > 0) {
        bonuses.push(`+${race.speed} Speed`);
    }

    if (race.magic > 0) {
        bonuses.push(`+${race.magic} Magic`);
    }

    raceInfo.innerHTML = `
        <strong>${selectedRace}</strong>

        <p>
            ${race.description}
        </p>

        <span class="race-bonus">
            Racial Bonuses: ${bonuses.join(" • ")}
        </span>
    `;

    updateClassPreview();
}


function updateClassPreview() {

    const classSelect = document.getElementById("character-class");
    const raceSelect = document.getElementById("character-race");

    const classInfo = document.getElementById("class-info");

    const previewHealth = document.getElementById("preview-health");
    const previewAttack = document.getElementById("preview-attack");
    const previewDefense = document.getElementById("preview-defense");
    const previewSpeed = document.getElementById("preview-speed");
    const previewMagic = document.getElementById("preview-magic");

    const selectedClass = classSelect.value;
    const selectedRace = raceSelect.value;

    const classData = classes[selectedClass];
    const raceData = races[selectedRace];

    if (!classData) {
        return;
    }

    classInfo.innerHTML = `
        <h3>${selectedClass}</h3>

        <p>
            ${classData.description}
        </p>
    `;

    let health = classData.health;
    let attack = classData.attack;
    let defense = classData.defense;
    let speed = classData.speed;
    let magic = classData.magic;

    if (raceData) {

        health += raceData.health;
        attack += raceData.attack;
        defense += raceData.defense;
        speed += raceData.speed;
        magic += raceData.magic;

    }

    previewHealth.textContent = health;
    previewAttack.textContent = attack;
    previewDefense.textContent = defense;
    previewSpeed.textContent = speed;
    previewMagic.textContent = magic;
}


// =========================
// CREATE CHARACTER
// =========================

function createCharacter() {

    const nameInput = document.getElementById("character-name");
    const raceSelect = document.getElementById("character-race");
    const classSelect = document.getElementById("character-class");

    const name = nameInput.value.trim();
    const race = raceSelect.value;
    const selectedClass = classSelect.value;

    if (!name) {
        alert("Please enter a character name.");
        return;
    }

    const classData = classes[selectedClass];
    const raceData = races[race];

    player.name = name;
    player.race = race;
    player.class = selectedClass;

    player.health = classData.health + raceData.health;
    player.maxHealth = player.health;
    player.currentHealth = player.health;

    player.attack = classData.attack + raceData.attack;
    player.defense = classData.defense + raceData.defense;
    player.speed = classData.speed + raceData.speed;
    player.magic = classData.magic + raceData.magic;

    document.getElementById("welcome-message").textContent =
        `Welcome, ${player.name}. Your adventure begins.`;

    showScreen("game-screen");
}


// =========================
// CHARACTER DETAILS
// =========================

function showCharacter() {

    document.getElementById("character-details-name").textContent =
        player.name;

    document.getElementById("character-details-race").textContent =
        `Race: ${player.race}`;

    document.getElementById("character-details-class").textContent =
        `Class: ${player.class}`;

    document.getElementById("character-details-health").textContent =
        `${player.currentHealth} / ${player.maxHealth}`;

    document.getElementById("character-details-attack").textContent =
        player.attack;

    document.getElementById("character-details-defense").textContent =
        player.defense;

    document.getElementById("character-details-speed").textContent =
        player.speed;

    document.getElementById("character-details-magic").textContent =
        player.magic;

    showScreen("character-details-screen");
}


// =========================
// EXPLORATION
// =========================

function startExploration() {

    if (!player.name) {
        alert("Create a character first!");
        return;
    }

    // Pick a random enemy

    const randomIndex =
        Math.floor(Math.random() * enemies.length);

    currentEnemy = {
        ...enemies[randomIndex]
    };

    // Reset enemy health

    currentEnemy.currentHealth = currentEnemy.health;

    // Reset player health before battle

    player.currentHealth = player.maxHealth;

    battleActive = true;

    updateBattleScreen();

    addBattleLog(
        `A ${currentEnemy.name} appears! Prepare for battle!`
    );

    showScreen("battle-screen");
}


// =========================
// BATTLE
// =========================

function playerAttack() {

    if (!battleActive) {
        return;
    }

    // Calculate damage

    const damage =
        Math.max(1, player.attack - currentEnemy.defense);

    currentEnemy.currentHealth -= damage;

    if (currentEnemy.currentHealth < 0) {
        currentEnemy.currentHealth = 0;
    }

    addBattleLog(
        `${player.name} attacks the ${currentEnemy.name} for ${damage} damage!`
    );

    updateBattleScreen();


    // Check if enemy died

    if (currentEnemy.currentHealth <= 0) {

        battleActive = false;

        addBattleLog(
            `The ${currentEnemy.name} has been defeated!`
        );

        setTimeout(() => {

            alert(`Victory! You defeated the ${currentEnemy.name}!`);

            showScreen("game-screen");

        }, 300);

        return;
    }


    // Enemy gets to attack

    enemyAttack();
}


function enemyAttack() {

    if (!battleActive) {
        return;
    }

    const damage =
        Math.max(1, currentEnemy.attack - player.defense);

    player.currentHealth -= damage;

    if (player.currentHealth < 0) {
        player.currentHealth = 0;
    }

    addBattleLog(
        `The ${currentEnemy.name} attacks ${player.name} for ${damage} damage!`
    );

    updateBattleScreen();


    // Check if player died

    if (player.currentHealth <= 0) {

        battleActive = false;

        addBattleLog(
            `${player.name} has been defeated.`
        );

        setTimeout(() => {

            alert("Defeat! Your adventure ends here.");

            returnToTitle();

        }, 300);
    }
}


// =========================
// BATTLE UI
// =========================

function updateBattleScreen() {

    document.getElementById("battle-player-name").textContent =
        player.name;

    document.getElementById("battle-enemy-name").textContent =
        currentEnemy.name;

    document.getElementById("battle-player-health").textContent =
        `${player.currentHealth} / ${player.maxHealth}`;

    document.getElementById("battle-enemy-health").textContent =
        `${currentEnemy.currentHealth} / ${currentEnemy.health}`;


    const playerHealthPercent =
        (player.currentHealth / player.maxHealth) * 100;

    const enemyHealthPercent =
        (currentEnemy.currentHealth / currentEnemy.health) * 100;


    document.getElementById("player-health-bar").style.width =
        `${playerHealthPercent}%`;

    document.getElementById("enemy-health-bar").style.width =
        `${enemyHealthPercent}%`;
}


// =========================
// BATTLE LOG
// =========================

function addBattleLog(message) {

    const battleLog =
        document.getElementById("battle-log-text");

    battleLog.innerHTML += `<p>${message}</p>`;

    battleLog.scrollTop = battleLog.scrollHeight;
}


// =========================
// FLEE
// =========================

function fleeBattle() {

    if (!battleActive) {
        return;
    }

    battleActive = false;

    addBattleLog(
        `${player.name} fled from the ${currentEnemy.name}.`
    );

    showScreen("game-screen");
}


// =========================
// NAVIGATION
// =========================

function returnToGame() {

    showScreen("game-screen");
}


function returnToTitle() {

    battleActive = false;

    showScreen("title-screen");
}


function showAbout() {

    showScreen("about-screen");
}


function showComingSoon(feature) {

    alert(`${feature} is coming soon!`);
}


// =========================
// EVENT LISTENERS
// =========================

document
    .getElementById("character-race")
    .addEventListener("change", function () {

        updateRacePreview();
        updateClassPreview();

    });


document
    .getElementById("character-class")
    .addEventListener("change", function () {

        updateClassPreview();

    });