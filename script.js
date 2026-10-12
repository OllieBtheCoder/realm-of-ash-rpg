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
    magic: 0,
    level: 1,
    xp: 0,
    xpToNextLevel: 100
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
        ability: "Power Strike",
        description: "Strong and heavily armored warriors who excel in close combat."
    },
    Ranger: {
        health: 100,
        attack: 15,
        defense: 9,
        speed: 16,
        magic: 8,
        ability: "Precise Shot",
        description: "Swift hunters who specialize in ranged attacks and precision."
    },
    Mage: {
        health: 80,
        attack: 8,
        defense: 6,
        speed: 12,
        magic: 25,
        ability: "Arcane Bolt",
        description: "Powerful spellcasters who sacrifice physical strength for magical power."
    },
    Rogue: {
        health: 95,
        attack: 17,
        defense: 8,
        speed: 20,
        magic: 7,
        ability: "Shadow Strike",
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
        defense: 5,
        xp: 20,
        loot: ["Rusty Sword", "Leather Armor"]
    },
    {
        name: "Wolf",
        health: 40,
        attack: 12,
        defense: 3,
        xp: 25,
        loot: ["Hunter's Bow", "Leather Armor"]
    },
    {
        name: "Orc",
        health: 80,
        attack: 15,
        defense: 10,
        xp: 40,
        loot: ["Rusty Sword", "Hunter's Bow", "Iron Blade", "Iron Chestplate"]
    },
    {
        name: "Troll",
        health: 120,
        attack: 20,
        defense: 15,
        xp: 60,
        loot: [
            "Iron Blade",
            "Iron Chestplate",
            "Guardian's Plate",
            "Stormbringer",
            "Dragonscale Armor",
            "Void Reaver",
            "Armor of the Fallen King"
        ]
    }
];

let currentEnemy = null;
let battleActive = false;
let abilityCooldown = 0;

// =========================
// INVENTORY AND EQUIPMENT
// =========================

let inventory = [];

let equipped = {
    weapon: null,
    armor: null
};

const lootTable = [
    {
        name: "Rusty Sword",
        type: "weapon",
        attackBonus: 3,
        defenseBonus: 0,
        rarity: "Common"
    },
    {
        name: "Hunter's Bow",
        type: "weapon",
        attackBonus: 4,
        defenseBonus: 0,
        rarity: "Uncommon"
    },
    {
        name: "Apprentice's Staff",
        type: "weapon",
        attackBonus: 2,
        defenseBonus: 0,
        rarity: "Common"
    },
    {
        name: "Iron Blade",
        type: "weapon",
        attackBonus: 6,
        defenseBonus: 0,
        rarity: "Rare"
    },
    {
        name: "Leather Armor",
        type: "armor",
        attackBonus: 0,
        defenseBonus: 2,
        rarity: "Common"
    },
    {
        name: "Iron Chestplate",
        type: "armor",
        attackBonus: 0,
        defenseBonus: 4,
        rarity: "Uncommon"
    },
    {
        name: "Guardian's Plate",
        type: "armor",
        attackBonus: 0,
        defenseBonus: 6,
        rarity: "Rare"
    },

    {
        name: "Stormbringer",
        type: "weapon",
        attackBonus: 9,
        defenseBonus: 0,
        rarity: "Epic"
    },
    {
        name: "Void Reaver",
        type: "weapon",
        attackBonus: 14,
        defenseBonus: 0,
        rarity: "Legendary"
    },
    {
        name: "Dragonscale Armor",
        type: "armor",
        attackBonus: 0,
        defenseBonus: 9,
        rarity: "Epic"
    },
    {
        name: "Armor of the Fallen King",
        type: "armor",
        attackBonus: 0,
        defenseBonus: 14,
        rarity: "Legendary"
    }
];

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

    if (race.health > 0) bonuses.push(`+${race.health} Health`);
    if (race.attack > 0) bonuses.push(`+${race.attack} Attack`);
    if (race.defense > 0) bonuses.push(`+${race.defense} Defense`);
    if (race.speed > 0) bonuses.push(`+${race.speed} Speed`);
    if (race.magic > 0) bonuses.push(`+${race.magic} Magic`);

    raceInfo.innerHTML = `
        <strong>${selectedRace}</strong>
        <p>${race.description}</p>
        <span class="race-bonus">
            Racial Bonuses: ${bonuses.join(" • ")}
        </span>
    `;

    updateClassPreview();
}

function updateClassPreview() {
    const selectedClass = document.getElementById("character-class").value;
    const selectedRace = document.getElementById("character-race").value;

    const classData = classes[selectedClass];
    const raceData = races[selectedRace];

    if (!classData) return;

    document.getElementById("class-info").innerHTML = `
        <h3>${selectedClass}</h3>
        <p>${classData.description}</p>
        <p>✨ Ability: <strong>${classData.ability}</strong></p>
    `;

    document.getElementById("preview-health").textContent =
        classData.health + raceData.health;

    document.getElementById("preview-attack").textContent =
        classData.attack + raceData.attack;

    document.getElementById("preview-defense").textContent =
        classData.defense + raceData.defense;

    document.getElementById("preview-speed").textContent =
        classData.speed + raceData.speed;

    document.getElementById("preview-magic").textContent =
        classData.magic + raceData.magic;
}

function createCharacter() {
    const name = document.getElementById("character-name").value.trim();
    const race = document.getElementById("character-race").value;
    const selectedClass = document.getElementById("character-class").value;

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

    player.level = 1;
    player.xp = 0;
    player.xpToNextLevel = 100;

    inventory = [];

    equipped = {
        weapon: null,
        armor: null
    };

    document.getElementById("welcome-message").textContent =
        `Welcome, ${player.name}. Your adventure begins.`;

    showScreen("game-screen");
}

// =========================
// CHARACTER DETAILS
// =========================

function showCharacter() {
    showScreen("character-details-screen");

    document.getElementById("character-details-name").textContent =
        player.name;

    document.getElementById("character-details-race").textContent =
        `Race: ${player.race}`;

    document.getElementById("character-details-class").textContent =
        `Class: ${player.class}`;

    document.getElementById("character-details-level").textContent =
        player.level;

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

    updateXPBar();
}

// =========================
// EXPLORATION
// =========================

function startExploration() {
    if (!player.name) {
        alert("Create a character first!");
        return;
    }

    const randomIndex = Math.floor(Math.random() * enemies.length);

    currentEnemy = { ...enemies[randomIndex] };
    currentEnemy.currentHealth = currentEnemy.health;

    player.currentHealth = player.maxHealth;

    abilityCooldown = 0;
    battleActive = true;

    updateBattleScreen();
    updateAbilityButton();

    document.getElementById("battle-log-text").innerHTML = "";

    addBattleLog(
        `A ${currentEnemy.name} appears! Prepare for battle!`
    );

    showScreen("battle-screen");
}

// =========================
// NORMAL ATTACK
// =========================

function playerAttack() {
    if (!battleActive) return;

    const damage = Math.max(
        1,
        player.attack - currentEnemy.defense
    );

    currentEnemy.currentHealth -= damage;

    if (currentEnemy.currentHealth < 0) {
        currentEnemy.currentHealth = 0;
    }

    addBattleLog(
        `${player.name} attacks the ${currentEnemy.name} for ${damage} damage!`
    );

    updateBattleScreen();

    if (checkEnemyDefeated()) return;

    reduceAbilityCooldown();
    enemyAttack();
}

// =========================
// CLASS ABILITY
// =========================

function useAbility() {
    if (!battleActive) return;

    if (abilityCooldown > 0) {
        addBattleLog(
            `Your ability is on cooldown for ${abilityCooldown} more turn(s).`
        );
        return;
    }

    let damage = 0;
    const abilityName = classes[player.class].ability;

    if (player.class === "Warrior") {
        damage = Math.max(
            1,
            player.attack * 2 - currentEnemy.defense
        );
    } else if (player.class === "Ranger") {
        damage = Math.max(
            1,
            player.attack + player.speed - currentEnemy.defense
        );
    } else if (player.class === "Mage") {
        damage = Math.max(
            1,
            player.magic * 2 - currentEnemy.defense
        );
    } else if (player.class === "Rogue") {
        damage = Math.max(
            1,
            player.attack + player.speed - currentEnemy.defense
        );

        if (Math.random() < 0.35) {
            damage *= 2;
            addBattleLog("Shadow Strike lands a critical hit!");
        }
    }

    currentEnemy.currentHealth -= damage;

    if (currentEnemy.currentHealth < 0) {
        currentEnemy.currentHealth = 0;
    }

    addBattleLog(
        `${player.name} uses ${abilityName} for ${damage} damage!`
    );

    abilityCooldown = 2;

    updateBattleScreen();
    updateAbilityButton();

    if (checkEnemyDefeated()) return;

    enemyAttack();
}

// =========================
// ENEMY DEFEATED
// =========================

function checkEnemyDefeated() {
    if (currentEnemy.currentHealth <= 0) {
        battleActive = false;

        addBattleLog(
            `The ${currentEnemy.name} has been defeated!`
        );

        setTimeout(() => {
            awardXP(currentEnemy.xp);
            awardLoot();
            showScreen("game-screen");
        }, 300);

        return true;
    }

    return false;
}

// =========================
// XP SYSTEM
// =========================

function awardXP(amount) {
    player.xp += amount;

    alert(
        `Victory!\n\nYou defeated the ${currentEnemy.name} and earned ${amount} XP!`
    );

    checkLevelUp();
}

function updateXPBar() {
    const xpPercentage =
        (player.xp / player.xpToNextLevel) * 100;

    document.getElementById("character-xp-bar").style.width =
        `${xpPercentage}%`;

    document.getElementById("character-xp-text").textContent =
        `${player.xp} / ${player.xpToNextLevel} XP`;
}

function checkLevelUp() {
    while (player.xp >= player.xpToNextLevel) {
        player.xp -= player.xpToNextLevel;
        player.level++;

        player.xpToNextLevel =
            Math.floor(player.xpToNextLevel * 1.25);

        player.maxHealth += 10;
        player.currentHealth += 10;

        player.attack += 2;
        player.defense += 2;
        player.speed += 1;
        player.magic += 2;

        alert(
            `LEVEL UP!\n\n` +
            `${player.name} reached Level ${player.level}!\n\n` +
            `+10 Health\n` +
            `+2 Attack\n` +
            `+2 Defense\n` +
            `+1 Speed\n` +
            `+2 Magic`
        );
    }
}

// =========================
// ENEMY ATTACK
// =========================

function enemyAttack() {
    if (!battleActive) return;

    const damage = Math.max(
        1,
        currentEnemy.attack - player.defense
    );

    player.currentHealth -= damage;

    if (player.currentHealth < 0) {
        player.currentHealth = 0;
    }

    addBattleLog(
        `The ${currentEnemy.name} attacks ${player.name} for ${damage} damage!`
    );

    updateBattleScreen();

    if (player.currentHealth <= 0) {
        battleActive = false;

        addBattleLog(`${player.name} has been defeated.`);

        setTimeout(() => {
            alert("Defeat! Your adventure ends here.");
            returnToTitle();
        }, 300);
    }
}

// =========================
// ABILITY COOLDOWN
// =========================

function reduceAbilityCooldown() {
    if (abilityCooldown > 0) {
        abilityCooldown--;
    }

    updateAbilityButton();
}

function updateAbilityButton() {
    const button = document.getElementById("ability-button");

    if (!button) return;

    const abilityName =
        classes[player.class]?.ability || "Ability";

    if (abilityCooldown > 0) {
        button.textContent =
            `✨ ${abilityName} (${abilityCooldown})`;

        button.disabled = true;
    } else {
        button.textContent = `✨ ${abilityName}`;
        button.disabled = false;
    }
}

// =========================
// BATTLE UI
// =========================

function updateBattleScreen() {
    document.getElementById("battle-player-name").textContent =
        player.name;

    document.getElementById("battle-player-class").textContent =
        `${player.class} - Level ${player.level}`;

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
    const battleLog = document.getElementById("battle-log-text");

    battleLog.innerHTML += `<p>${message}</p>`;
    battleLog.scrollTop = battleLog.scrollHeight;
}

// =========================
// FLEE
// =========================

function fleeBattle() {
    if (!battleActive) return;

    battleActive = false;

    addBattleLog(
        `${player.name} fled from the ${currentEnemy.name}.`
    );

    showScreen("game-screen");
}

// =========================
// INVENTORY SCREEN
// =========================

function showInventory() {
    renderInventory();
    showScreen("inventory-screen");
}

// =========================
// LOOT DROPS
// =========================


function awardLoot() {
    // Keep the existing 70% drop chance.
    if (Math.random() >= 0.70) {
        alert("No loot this time. Keep exploring!");
        return;
    }

    // Get only the items this enemy can drop.
    const possibleLoot = lootTable.filter(item =>
        currentEnemy.loot.includes(item.name)
    );

    // Safety check in case an enemy has no valid loot.
    if (possibleLoot.length === 0) {
        alert("This enemy has no loot available.");
        return;
    }

    // Randomly select an item from this enemy's loot pool.
    const randomIndex = Math.floor(
        Math.random() * possibleLoot.length
    );

    const item = {
        ...possibleLoot[randomIndex],
        id: `${Date.now()}-${Math.floor(Math.random() * 100000)}`
    };

    // Add the item to the player's inventory.
    inventory.push(item);

    alert(
        `Loot found! You received: ${item.name} (${item.rarity}).`
    );
}

// =========================
// DISPLAY INVENTORY
// =========================

function renderInventory() {
    const equippedContainer =
        document.getElementById("equipped-items");

    const inventoryContainer =
        document.getElementById("inventory-items");

    if (!equippedContainer || !inventoryContainer) return;

    equippedContainer.innerHTML = `
        <p><strong>Weapon:</strong> ${
            equipped.weapon
                ? `${equipped.weapon.name} (+${equipped.weapon.attackBonus} Attack)`
                : "None equipped"
        }</p>

        <p><strong>Armor:</strong> ${
            equipped.armor
                ? `${equipped.armor.name} (+${equipped.armor.defenseBonus} Defense)`
                : "None equipped"
        }</p>
    `;

    if (inventory.length === 0) {
        inventoryContainer.innerHTML =
            "<p>Your inventory is empty. Defeat enemies to find loot!</p>";

        return;
    }

    inventoryContainer.innerHTML = inventory.map((item, index) => {
        const bonusText = item.type === "weapon"
            ? `+${item.attackBonus} Attack`
            : `+${item.defenseBonus} Defense`;

        return `
            <div class="inventory-item">
                <div>
                    <strong>${item.name}</strong>
                    <p>${item.rarity} ${item.type} · ${bonusText}</p>
                </div>

                <button onclick="equipItem(${index})">
                    Equip
                </button>
            </div>
        `;
    }).join("");
}

// =========================
// EQUIP ITEMS
// =========================

function equipItem(index) {
    const item = inventory[index];

    if (!item) return;

    const slot = item.type;
    const previousItem = equipped[slot];

    // Remove the previous item's bonuses.
    if (previousItem) {
        player.attack -= previousItem.attackBonus;
        player.defense -= previousItem.defenseBonus;

        inventory.push(previousItem);
    }

    // Apply the new item's bonuses.
    player.attack += item.attackBonus;
    player.defense += item.defenseBonus;

    equipped[slot] = item;

    inventory.splice(index, 1);

    renderInventory();

    alert(
        `${item.name} equipped! Your stats have been updated.`
    );
}

// =========================
// UNEQUIP ITEMS
// =========================

function unequipItem(slot) {
    const item = equipped[slot];

    if (!item) return;

    player.attack -= item.attackBonus;
    player.defense -= item.defenseBonus;

    inventory.push(item);
    equipped[slot] = null;

    renderInventory();
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