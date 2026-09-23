// ==========================================
// PLAYER DATA
// ==========================================

let player = {
    name: "",
    race: "",
    class: "",

    health: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    magic: 0
};


// ==========================================
// CLASS DATA
// ==========================================

const classes = {

    Warrior: {
        health: 120,
        attack: 18,
        defense: 15,
        speed: 8,
        magic: 5,

        description:
            "Strong and heavily armored warriors who excel in close combat."
    },

    Ranger: {
        health: 100,
        attack: 15,
        defense: 9,
        speed: 16,
        magic: 8,

        description:
            "Swift hunters who specialize in ranged attacks and precision."
    },

    Mage: {
        health: 80,
        attack: 8,
        defense: 6,
        speed: 12,
        magic: 25,

        description:
            "Powerful spellcasters who sacrifice physical strength for magical power."
    },

    Rogue: {
        health: 95,
        attack: 17,
        defense: 8,
        speed: 20,
        magic: 7,

        description:
            "Fast and deadly fighters who rely on speed and critical strikes."
    }

};


// ==========================================
// SCREEN MANAGEMENT
// ==========================================

function showScreen(screenId) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    document
        .getElementById(screenId)
        .classList.add("active");
}


// ==========================================
// TITLE SCREEN
// ==========================================

function showCharacterCreation() {

    showScreen("character-screen");

    updateClassPreview();
}


function showAbout() {

    showScreen("about-screen");
}


function returnToTitle() {

    showScreen("title-screen");
}


// ==========================================
// CLASS PREVIEW
// ==========================================

function updateClassPreview() {

    const selectedClass =
        document.getElementById("character-class").value;

    const classData =
        classes[selectedClass];


    // Update description

    document
        .querySelector("#class-info h3")
        .textContent = selectedClass;


    document
        .querySelector("#class-info p")
        .textContent = classData.description;


    // Update stats

    document
        .getElementById("preview-health")
        .textContent = classData.health;

    document
        .getElementById("preview-attack")
        .textContent = classData.attack;

    document
        .getElementById("preview-defense")
        .textContent = classData.defense;

    document
        .getElementById("preview-speed")
        .textContent = classData.speed;

    document
        .getElementById("preview-magic")
        .textContent = classData.magic;
}


// ==========================================
// CREATE CHARACTER
// ==========================================

function createCharacter() {

    const name =
        document
            .getElementById("character-name")
            .value
            .trim();

    const race =
        document
            .getElementById("character-race")
            .value;

    const selectedClass =
        document
            .getElementById("character-class")
            .value;


    // Make sure a name was entered

    if (name === "") {

        alert("Please enter a character name.");

        return;
    }


    // Get class information

    const classData =
        classes[selectedClass];


    // Save player information

    player.name = name;
    player.race = race;
    player.class = selectedClass;

    player.health = classData.health;
    player.attack = classData.attack;
    player.defense = classData.defense;
    player.speed = classData.speed;
    player.magic = classData.magic;


    // Update welcome message

    document
        .getElementById("welcome-message")
        .textContent =
        `Welcome, ${player.name} the ${player.race} ${player.class}. Your adventure begins.`;


    // Enter game

    showScreen("game-screen");
}


// ==========================================
// CHARACTER DETAILS
// ==========================================

function showCharacter() {

    document
        .getElementById("character-details-name")
        .textContent = player.name;


    document
        .getElementById("character-details-race")
        .textContent =
        `Race: ${player.race}`;


    document
        .getElementById("character-details-class")
        .textContent =
        `Class: ${player.class}`;


    document
        .getElementById("character-details-health")
        .textContent =
        player.health;


    document
        .getElementById("character-details-attack")
        .textContent =
        player.attack;


    document
        .getElementById("character-details-defense")
        .textContent =
        player.defense;


    document
        .getElementById("character-details-speed")
        .textContent =
        player.speed;


    document
        .getElementById("character-details-magic")
        .textContent =
        player.magic;


    showScreen("character-details-screen");
}


// ==========================================
// RETURN TO GAME
// ==========================================

function returnToGame() {

    showScreen("game-screen");
}


// ==========================================
// TEMPORARY FEATURES
// ==========================================

function showComingSoon(feature) {

    alert(`${feature} system coming soon!`);
}


// ==========================================
// CLASS SELECTION LISTENER
// ==========================================

document
    .getElementById("character-class")
    .addEventListener(
        "change",
        updateClassPreview
    );