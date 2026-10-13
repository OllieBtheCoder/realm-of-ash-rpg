
function showNotification(message, title = "Realm of Ash") {
    const overlay = document.getElementById(
        "notification-overlay"
    );

    document.getElementById(
        "notification-title"
    ).textContent = title;

    document.getElementById(
        "notification-message"
    ).textContent = message;

    overlay.classList.remove("hidden");

    document.getElementById(
        "notification-close"
    ).focus();
}

function closeNotification() {
    document.getElementById(
        "notification-overlay"
    ).classList.add("hidden");
}

document.getElementById("notification-close").addEventListener(
    "click",
    closeNotification
);

document.getElementById("notification-overlay").addEventListener(
    "click",
    function (event) {
        if (event.target.id === "notification-overlay") {
            closeNotification();
        }
    }

    
);

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


const bosses = [
    {
        name: "The Fallen King",
        health: 250,
        attack: 28,
        defense: 18,
        xp: 150,
        isBoss: true,
        loot: [
            "Iron Blade",
            "Guardian's Plate",
            "Void Reaver",
            "Armor of the Fallen King"
        ]
    },
    {
        name: "The Ashen Dragon",
        health: 350,
        attack: 35,
        defense: 22,
        xp: 250,
        isBoss: true,
        loot: [
            "Stormbringer",
            "Dragonscale Armor",
            "Void Reaver",
            "Armor of the Fallen King"
        ]
    }
];


let defeatedBosses = [];


 // =========================
 // QUEST SYSTEM
 // =========================

const questDefinitions = [
    {
        id: "first-hunt",
        title: "The First Hunt",
        description: "Defeat 3 enemies to prove yourself.",
        type: "enemy-count",
        target: 3,
        rewardXP: 50,
        rewardItem: "Hunter's Bow"
    },
    {
        id: "fallen-king",
        title: "The Fallen King's End",
        description: "Defeat The Fallen King.",
        type: "boss",
        target: "The Fallen King",
        rewardXP: 100,
        rewardItem: "Guardian's Plate"
    },
    {
        id: "dragonfall",
        title: "Dragonfall",
        description: "Defeat The Ashen Dragon.",
        type: "boss",
        target: "The Ashen Dragon",
        rewardXP: 200,
        rewardItem: "Stormbringer"
    }
];



const shopItems = [
    {
        id: "shop-health-potion",
        name: "Health Potion",
        description: "Restores 50 health when used.",
        price: 30,
        type: "consumable",
        effect: "heal",
        value: 50
    },
    {
        id: "shop-greater-potion",
        name: "Greater Health Potion",
        description: "Restores 100 health when used.",
        price: 55,
        type: "consumable",
        effect: "heal",
        value: 100
    },
    {
        id: "shop-iron-sword",
        name: "Iron Sword",
        description: "A sturdy sword for close combat.",
        price: 100,
        type: "weapon",
        attack: 10,
        defense: 0,
        health: 0
    },
    {
        id: "shop-guardian-armor",
        name: "Guardian Armor",
        description: "Heavy armor that improves your defenses.",
        price: 120,
        type: "armor",
        attack: 0,
        defense: 8,
        health: 20
    },
    {
        id: "shop-travel-boots",
        name: "Traveler's Boots",
        description: "Light boots that help you travel safely.",
        price: 75,
        type: "boots",
        attack: 2,
        defense: 3,
        health: 0
    }
];

// Each new adventure starts with fresh quest progress.
function createQuestProgress() {
    const progress = {};

    questDefinitions.forEach(quest => {
        progress[quest.id] = {
            progress: 0,
            completed: false
        };
    });

    return progress;
}

let questProgress = createQuestProgress();

let playerGold = 150;


function completeQuest(quest) {
    const progress = questProgress[quest.id];

    // Prevent the same quest from rewarding you twice.
    if (!progress || progress.completed) {
        return;
    }

    progress.completed = true;

    // Award the quest XP.
    player.xp += quest.rewardXP;

    showNotification(
        `Quest completed: ${quest.title}!\nYou earned ${quest.rewardXP} XP!`,
        "📜 Quest Complete!"
    );

    // Check whether the player earned a level.
    checkLevelUp();

    // Find the quest's reward item.
    const rewardTemplate = lootTable.find(
        item => item.name === quest.rewardItem
    );

    if (rewardTemplate) {
        const rewardItem = {
            ...rewardTemplate,
            id: `item-${Date.now()}-${Math.floor(Math.random() * 100000)}`
        };

        inventory.push(rewardItem);

        showNotification(
            `You received ${quest.rewardItem}!`,
            "🎁 Quest Reward!"
        );

        renderInventory();
    }

    // Save the completed quest and its rewards.
    autoSaveGame();
}


function recordEnemyDefeat(defeatedEnemy) {
    questDefinitions.forEach(quest => {
        const progress = questProgress[quest.id];

        // Skip quests that have already been completed.
        if (!progress || progress.completed) {
            return;
        }

        // Count defeated enemies for The First Hunt.
        if (quest.id === "first-hunt") {
            progress.progress++;

            if (progress.progress >= quest.target) {
                completeQuest(quest);
            }
        }

        // Complete boss quests when their target is defeated.
        if (
            quest.type === "boss" &&
            defeatedEnemy.name === quest.target
        ) {
            completeQuest(quest);
        }
    });

    updateActiveQuestTracker();
}

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
        showNotification(
            "Please enter a name for your hero before beginning.",
            "⚠️ Name Required"
        );
        return;
    }

    const classData = classes[selectedClass];
    const raceData = races[race];

    if (!classData || !raceData) {
        showNotification(
            "Please choose a valid race and class.",
            "⚠️ Invalid Character"
        );
        return;
    }

    // Give this adventure its own unique ID.
    currentAdventureId = `adventure-${Date.now()}-${Math.floor(Math.random() * 100000)}`;

    player = {
        name: name,
        race: race,
        class: selectedClass,

        health: classData.health + raceData.health,
        maxHealth: classData.health + raceData.health,
        currentHealth: classData.health + raceData.health,

        attack: classData.attack + raceData.attack,
        defense: classData.defense + raceData.defense,
        speed: classData.speed + raceData.speed,
        magic: classData.magic + raceData.magic,

        playerGold: 150,
        level: 1,
        xp: 0,
        xpToNextLevel: 100
    };

    inventory = [];

    equipped = {
        weapon: null,
        armor: null
    };

    defeatedBosses = [];

    questProgress = createQuestProgress();

    updateActiveQuestTracker();

    document.getElementById("welcome-message").textContent =
        `Welcome, ${player.name}. Your adventure begins.`;

    showScreen("game-screen");

    // Create the first save for this adventure.
    autoSaveGame();

    updateTitleMenu();
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



function startBossBattle() {
    if (!player.name) {
        alert("Create a character first!");
        return;
    }

    // The Fallen King is the first boss.
    // The Ashen Dragon unlocks after the King is defeated.
    let availableBosses = [];

    if (!defeatedBosses.includes("The Fallen King")) {
        availableBosses.push(
            bosses.find(boss => boss.name === "The Fallen King")
        );
    } else if (!defeatedBosses.includes("The Ashen Dragon")) {
        availableBosses.push(
            bosses.find(boss => boss.name === "The Ashen Dragon")
        );
    } else {
        showNotification(
    "You have defeated every boss! You are a legend!",
    "👑 Legendary Champion"
);
        return;
    }

    // Select an available boss.
    const selectedBoss = availableBosses[
        Math.floor(Math.random() * availableBosses.length)
    ];

    currentEnemy = {
        ...selectedBoss,
        currentHealth: selectedBoss.health
    };

    player.currentHealth = player.maxHealth;

    abilityCooldown = 0;
    battleActive = true;

    updateBattleScreen();
    updateAbilityButton();

    document.getElementById("battle-log-text").innerHTML = "";

    addBattleLog("━━━━━━━━━━━━━━━━━━━━");
    addBattleLog("⚠️ A BOSS APPROACHES ⚠️");
    addBattleLog(`${currentEnemy.name.toUpperCase()}`);
    addBattleLog("Prepare yourself for a legendary battle!");
    addBattleLog("━━━━━━━━━━━━━━━━━━━━");

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

        const defeatedEnemy = currentEnemy;
        const xpEarned = defeatedEnemy.xp;

        addBattleLog(
            `The ${defeatedEnemy.name} has been defeated!`
        );

        // Record boss victories.
        if (defeatedEnemy.isBoss === true) {
            if (!defeatedBosses.includes(defeatedEnemy.name)) {
                defeatedBosses.push(defeatedEnemy.name);
            }

            if (defeatedEnemy.name === "The Fallen King") {
                addBattleLog(
                    "🐉 The Ashen Dragon has been unlocked!"
                );
                showNotification(
    "The Fallen King is defeated!",
    "🏆 Legendary Victory!"
);
            }
        }

        setTimeout(() => {
            awardXP(xpEarned);
            const loot = awardLoot();
            recordEnemyDefeat(defeatedEnemy);

            // Save this adventure's updated XP, loot, and boss progress.
            autoSaveGame();

            // Set up the victory screen.
            document.getElementById("victory-title").textContent =
                defeatedEnemy.isBoss ? "🏆 BOSS DEFEATED!" : "⚔️ Victory!";

            document.getElementById("victory-enemy-name").textContent =
                defeatedEnemy.name;

            document.getElementById("victory-message").textContent =
                defeatedEnemy.name === "The Ashen Dragon"
                    ? "You have conquered Realm of Ash!"
                    : defeatedEnemy.name === "The Fallen King"
                        ? "The kingdom is one step closer to freedom!"
                        : `${defeatedEnemy.name} can no longer threaten you!`;

            document.getElementById("victory-xp").textContent =
                xpEarned;

            document.getElementById("victory-loot").textContent =
                loot
                    ? `🎁 Loot Received: ${loot.name} (${loot.rarity})`
                    : "No loot received this time.";

            showScreen("victory-screen");
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

    showNotification(
        `Victory!\n\nYou defeated the ${currentEnemy.name} and earned ${amount} XP!`,
        "🏆 Victory!"
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

        showNotification(
            `LEVEL UP!\n\n` +
            `${player.name} reached Level ${player.level}!\n\n` +
            `+10 Health\n` +
            `+2 Attack\n` +
            `+2 Defense\n` +
            `+1 Speed\n` +
            `+2 Magic`,
            "⭐ Level Up!"
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
            
showNotification(
    "Defeat! Your adventure ends here.",
    "💀 You Have Fallen"
);
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
        
        
    const enemyHealthBar = document.getElementById("enemy-health-bar");

    if (enemyHealthBar) {
        enemyHealthBar.classList.toggle(
            "boss-health-bar",
            currentEnemy.isBoss === true
        );
    }
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
    const isBoss = currentEnemy.isBoss === true;

    // Normal enemies have a 70% drop chance.
    // Bosses always drop an item.
    if (!isBoss && Math.random() >= 0.70) {
        addBattleLog("No loot this time. Keep exploring!");
        return null;
    }

    // Only choose from this enemy's loot pool.
    const possibleLoot = lootTable.filter(item =>
        currentEnemy.loot.includes(item.name)
    );

    if (possibleLoot.length === 0) {
        addBattleLog("This enemy has no loot available.");
        return null;
    }

    const randomIndex = Math.floor(
        Math.random() * possibleLoot.length
    );

    const item = {
        ...possibleLoot[randomIndex],
        id: `${Date.now()}-${Math.floor(Math.random() * 100000)}`
    };

    inventory.push(item);

    addBattleLog(
        `🎁 Loot found: ${item.name} (${item.rarity})!`
    );

    return item;
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
        const rarity = item.rarity || "Common";

        let bonusText;

        if (item.type === "weapon") {
            bonusText = `+${item.attackBonus ?? item.attack ?? 0} Attack`;
        } else if (item.type === "consumable") {
            bonusText = `Restores ${item.value ?? 0} Health`;
        } else {
            bonusText =
                `+${item.defenseBonus ?? item.defense ?? 0} Defense`;
        }

        const canEquip =
            item.type === "weapon" || item.type === "armor";

        return `
            <div class="inventory-item rarity-${rarity.toLowerCase()}">
                <div>
                    <strong class="item-name">${item.name}</strong>
                    <p>${rarity} ${item.type} · ${bonusText}</p>
                </div>

                ${
                    canEquip
                        ? `<button onclick="equipItem(${index})">Equip</button>`
                        : ""
                }
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
    autoSaveGame();

    showNotification(
        `${item.name} equipped! Your stats have been updated.`,
        "⚔️ Equipment Updated"
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
    autoSaveGame();
}



 // =========================
 // MULTIPLE ADVENTURE SAVES
 // =========================

const SAVE_SLOTS_KEY = "realmOfAshAdventures";

// Get all saved adventures.

function getSavedAdventures() {
    try {
        const saved = localStorage.getItem(SAVE_SLOTS_KEY);

        if (saved) {
            const adventures = JSON.parse(saved);
            return Array.isArray(adventures) ? adventures : [];
        }

        // Migrate the old single save into the new system.
        const oldSave = localStorage.getItem("realmOfAshSave");

        if (oldSave) {
            const oldData = JSON.parse(oldSave);

            if (oldData.player && oldData.player.name) {
                const migratedAdventure = {
                    ...oldData,
                    id: `adventure-${Date.now()}`,
                    name: oldData.player.name,
                    savedAt: oldData.savedAt || new Date().toISOString()
                };

                localStorage.setItem(
                    SAVE_SLOTS_KEY,
                    JSON.stringify([migratedAdventure])
                );

                // Keep the old save as a backup.
                return [migratedAdventure];
            }
        }

        return [];
    } catch (error) {
        console.error("Could not read saved adventures:", error);
        return [];
    }
}

// Save the complete list of adventures.
function storeSavedAdventures(adventures) {
    try {
        localStorage.setItem(
            SAVE_SLOTS_KEY,
            JSON.stringify(adventures)
        );

        return true;
    } catch (error) {
        console.error("Could not save adventures:", error);

        showNotification(
            "Your adventure could not be saved. Check available browser storage.",
            "⚠️ Save Failed"
        );

        return false;
    }
}

// The ID of the adventure currently being played.
let currentAdventureId = null;

// Save the current character into their own slot.
function autoSaveGame() {
    if (!player.name || battleActive || !currentAdventureId) {
        return false;
    }

    const adventures = getSavedAdventures();

    const adventureData = {
        id: currentAdventureId,
        name: player.name,
        player: player,
        inventory: inventory,
        equipped: equipped,
        defeatedBosses: defeatedBosses,
        questProgress: questProgress,
        savedAt: new Date().toISOString()
    };

    const existingIndex = adventures.findIndex(
        adventure => adventure.id === currentAdventureId
    );

    if (existingIndex >= 0) {
        adventures[existingIndex] = adventureData;
    } else {
        adventures.push(adventureData);
    }

    return storeSavedAdventures(adventures);
}

// Manually save the current adventure.
function saveGame() {
    if (!player.name || !currentAdventureId) {
        showNotification(
            "Start an adventure before saving!",
            "⚠️ No Adventure"
        );
        return;
    }

    if (battleActive) {
        showNotification(
            "Finish your battle before saving.",
            "⚔️ Battle in Progress"
        );
        return;
    }

    if (autoSaveGame()) {
        showNotification(
            `${player.name}'s adventure has been saved separately.`,
            "💾 Adventure Saved"
        );
    }
}

// Display the adventure selection menu.
function showAdventureMenu() {
    const adventures = getSavedAdventures();

    const menu = document.getElementById("adventure-list");

    if (!menu) {
        showNotification(
            "The adventure selection screen has not been added to index.html yet.",
            "⚠️ Menu Not Ready"
        );
        return;
    }

    if (adventures.length === 0) {
        menu.innerHTML = `
            <p>No saved adventures yet.</p>
            <button onclick="beginNewAdventure()">
                ✨ Create Your First Adventure
            </button>
        `;
    } else {
        menu.innerHTML = adventures.map(adventure => {
            const savedPlayer = adventure.player || {};
            const savedDate = adventure.savedAt
                ? new Date(adventure.savedAt).toLocaleString()
                : "Unknown";

            return `
                <div class="adventure-slot">
                    <h3>${escapeHTML(adventure.name || "Unnamed Hero")}</h3>
                    <p>${escapeHTML(savedPlayer.race || "Unknown Race")}
                        ${escapeHTML(savedPlayer.class || "Unknown Class")}</p>
                    <p>Level ${Number(savedPlayer.level) || 1}</p>
                    <p>Last saved: ${escapeHTML(savedDate)}</p>

                    <button onclick="loadGame('${adventure.id}')">
                        📜 Load Adventure
                    </button>

                    <button onclick="deleteAdventure('${adventure.id}')">
                        🗑️ Delete
                    </button>
                </div>
            `;
        }).join("");
        
        menu.innerHTML += `
            <button onclick="beginNewAdventure()">
                ➕ Begin New Adventure
            </button>
        `;
    }

    showScreen("adventure-select-screen");
}

// Escape text before putting player-controlled values into HTML.
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

// Start creating a separate adventure.
function beginNewAdventure() {
    currentAdventureId = null;

    document.getElementById("character-name").value = "";

    showCharacterCreation();
}

// Load a specific saved adventure.
function loadGame(adventureId) {
    const adventures = getSavedAdventures();

    const savedData = adventures.find(
        adventure => adventure.id === adventureId
    );

    if (!savedData) {
        showNotification(
            "That saved adventure could not be found.",
            "⚠️ Save Not Found"
        );
        return;
    }

    if (
        !savedData.player ||
        !classes[savedData.player.class] ||
        !races[savedData.player.race] ||
        !Array.isArray(savedData.inventory) ||
        !savedData.equipped ||
        !Array.isArray(savedData.defeatedBosses)
    ) {
        showNotification(
            "This save may be damaged or incompatible.",
            "⚠️ Load Failed"
        );
        return;
    }

    player = {
        ...player,
        ...savedData.player
    };

    inventory = savedData.inventory;

    equipped = {
        weapon: savedData.equipped.weapon || null,
        armor: savedData.equipped.armor || null
    };

    defeatedBosses = savedData.defeatedBosses;

    
const loadedQuestProgress = createQuestProgress();


if (
    savedData.questProgress &&
    typeof savedData.questProgress === "object"
) {
    questDefinitions.forEach(quest => {
        const savedQuest = savedData.questProgress[quest.id];

        if (savedQuest && typeof savedQuest === "object") {
            loadedQuestProgress[quest.id] = {
                progress: Number.isFinite(savedQuest.progress)
                    ? savedQuest.progress
                    : 0,
                completed: savedQuest.completed === true
            };
        }
    });

    updateActiveQuestTracker();
}

questProgress = loadedQuestProgress;

    currentAdventureId = savedData.id;

    currentEnemy = null;
    battleActive = false;
    abilityCooldown = 0;

    document.getElementById("welcome-message").textContent =
        `Welcome back, ${player.name}. Your adventure continues.`;

    updateXPBar();
    updateAbilityButton();
    renderInventory();

    showScreen("game-screen");

    showNotification(
        `Welcome back, ${player.name}!\nLevel: ${player.level}\nXP: ${player.xp} / ${player.xpToNextLevel}\nDefeated bosses: ${defeatedBosses.length}`,
        "📜 Adventure Restored"
    );
}

// Delete one adventure without touching the others.
function deleteAdventure(adventureId) {
    const adventures = getSavedAdventures();

    const selected = adventures.find(
        adventure => adventure.id === adventureId
    );

    if (!selected) {
        showAdventureMenu();
        return;
    }

    const confirmed = confirm(
        `Permanently delete ${selected.name}'s adventure? This cannot be undone.`
    );

    if (!confirmed) {
        return;
    }

    const remaining = adventures.filter(
        adventure => adventure.id !== adventureId
    );

    if (storeSavedAdventures(remaining)) {
        if (currentAdventureId === adventureId) {
            currentAdventureId = null;
        }

        showAdventureMenu();
    }
}



 // =========================
 // QUEST JOURNAL
 // =========================



function updateActiveQuestTracker() {
    const content = document.getElementById("active-quest-content");

    if (!content) {
        return;
    }

    // Find the first quest that hasn't been completed.
    const quest = questDefinitions.find(
        quest => !questProgress[quest.id]?.completed
    );

    // Show a message if every quest is finished.
    if (!quest) {
        content.innerHTML = `
            <p>🏆 All quests completed!</p>
            <p>You have conquered every current objective.</p>
        `;
        return;
    }

    const progress = questProgress[quest.id];
    const isBossQuest = quest.type === "boss";

    let currentProgress;
    let progressText;

    if (isBossQuest) {
        const defeated = defeatedBosses.includes(quest.target);
        currentProgress = defeated ? 1 : 0;
        progressText = defeated ? "1 / 1 boss defeated" : "0 / 1 boss defeated";
    } else {
        currentProgress = Math.min(progress.progress, quest.target);
        progressText = `${currentProgress} / ${quest.target} enemies defeated`;
    }

    const percentage = isBossQuest
        ? currentProgress * 100
        : (currentProgress / quest.target) * 100;

    content.innerHTML = `
        <h4>${escapeHTML(quest.title)}</h4>
        <p>${escapeHTML(quest.description)}</p>
        <p><strong>Progress:</strong> ${progressText}</p>
        <div class="quest-progress-track">
            <div class="quest-progress-fill" style="width: ${percentage}%"></div>
        </div>
        <p><strong>Reward:</strong> ${quest.rewardXP} XP + ${escapeHTML(quest.rewardItem)}</p>
    `;
}


function showShop() {
    renderShop();
    showScreen("shop-screen");
}

function renderShop() {
    const shopContainer = document.getElementById("shop-items");
    const goldDisplay = document.getElementById("player-gold");

    if (!shopContainer || !goldDisplay) {
        return;
    }

    goldDisplay.textContent = `💰 Gold: ${playerGold}`;

    shopContainer.innerHTML = shopItems.map(item => {
        const canAfford = playerGold >= item.price;

        return `
            <div class="shop-item">
                <h3>${escapeHTML(item.name)}</h3>
                <p>${escapeHTML(item.description)}</p>
                <p><strong>Price:</strong> 💰 ${item.price}</p>
                <button
                    onclick="buyShopItem('${item.id}')"
                    ${canAfford ? "" : "disabled"}
                >
                    ${canAfford ? "Buy Item" : "Not Enough Gold"}
                </button>
            </div>
        `;
    }).join("");
}

function buyShopItem(itemId) {
    const item = shopItems.find(item => item.id === itemId);

    if (!item) {
        return;
    }

    if (playerGold < item.price) {
        showShopMessage("You don't have enough gold!");
        renderShop();
        return;
    }

    playerGold -= item.price;

    // Add a separate copy to the player's inventory.
    const purchasedItem = {
        ...item,
        id: `item-${Date.now()}-${Math.floor(Math.random() * 100000)}`
    };

    inventory.push(purchasedItem);

    renderShop();
    renderInventory();
    autoSaveGame();

    showShopMessage(`Purchased ${item.name}!`);
}

function showShopMessage(message) {
    const messageElement = document.getElementById("shop-message");

    if (messageElement) {
        messageElement.textContent = message;
    }
}

function showQuests() {
    const questList = document.getElementById("quest-list");

    if (!questList) {
        showNotification(
            "The Quest Journal screen could not be found.",
            "⚠️ Screen Missing"
        );
        return;
    }

    questList.innerHTML = questDefinitions.map(quest => {
        const progress = questProgress[quest.id] || {
            progress: 0,
            completed: false
        };

        const isBossQuest = quest.type === "boss";

        const objectiveComplete = isBossQuest
            ? defeatedBosses.includes(quest.target)
            : progress.progress >= quest.target;

        const currentProgress = isBossQuest
            ? (objectiveComplete ? 1 : 0)
            : Math.min(progress.progress, quest.target);

        const progressText = isBossQuest
            ? `${currentProgress} / 1 boss defeated`
            : `${currentProgress} / ${quest.target} enemies defeated`;

        return `
            <div class="quest-card ${progress.completed ? "quest-completed" : ""}">
                <h3>${escapeHTML(quest.title)}</h3>
                <p>${escapeHTML(quest.description)}</p>
                <p><strong>Progress:</strong> ${progressText}</p>
                <p><strong>Reward:</strong> ${quest.rewardXP} XP + ${escapeHTML(quest.rewardItem)}</p>
                <p>${progress.completed ? "✅ Quest Completed!" : "🗡️ In Progress"}</p>
            </div>
        `;
    }).join("");

    updateActiveQuestTracker();
    showScreen("quest-screen");
}

// =========================
// NAVIGATION
// =========================

function returnToGame() {
    showScreen("game-screen");
}



function returnToTitle() {
    battleActive = false;
    updateTitleMenu();
    showScreen("title-screen");
}


function showAbout() {
    showScreen("about-screen");
}

function showComingSoon(feature) {
    alert(`${feature} is coming soon!`);
}



function updateTitleMenu() {
    const titleMenu = document.getElementById("title-menu");
    const adventures = getSavedAdventures();

    if (adventures.length > 0) {
        titleMenu.innerHTML = `
            <button onclick="showAdventureMenu()">
                📜 Load Adventure
            </button>

            <button onclick="beginNewAdventure()">
                ✨ Begin New Adventure
            </button>
        `;
    } else {
        titleMenu.innerHTML = `
            <button onclick="beginNewAdventure()">
                ⚔️ Begin Adventure
            </button>
        `;
    }
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

    updateTitleMenu();