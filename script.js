let player = {
    name: "",
    race: "",
    class: ""
};


function showScreen(screenId) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(screenId).classList.add("active");
}


function showCharacterCreation() {
    showScreen("character-screen");
}


function showAbout() {
    showScreen("about-screen");
}


function returnToTitle() {
    showScreen("title-screen");
}


function createCharacter() {

    const name = document.getElementById("character-name").value.trim();
    const race = document.getElementById("character-race").value;
    const characterClass = document.getElementById("character-class").value;

    if (name === "") {
        alert("Please enter a character name.");
        return;
    }

    player.name = name;
    player.race = race;
    player.class = characterClass;

    document.getElementById("welcome-message").textContent =
        `Welcome, ${player.name} the ${player.race} ${player.class}. Your adventure begins.`;

    showScreen("game-screen");
}


function showComingSoon(feature) {
    alert(`${feature} system coming soon!`);
}