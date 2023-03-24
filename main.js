// Classes
class Action {
    constructor(id, name, cost, time, logmessage, requirements) {
        this.id = id;
        this.name = name;
        this.cost = cost;
        this.time = time;
        this.logmessage = logmessage;
        this.requirements = requirements;
    }
    runAction() {
        // If cost is met
        if (money >= this.cost) {
            money -= this.cost;
            let timeLeft = this.time * 100;
            let self = this;
            // Start timer
            let timer = setInterval(function() {
                timeLeft--;
                timeLeft = timeLeft.toFixed(2);
                document.getElementById(`action-${self.id}`).innerHTML = `${self.name} (${timeLeft / 100})`;
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    logMessages.unshift(self.logmessage);
                    completedActions.push(self.id);
                    updateLog();
                    updateActions();
                }
            }, 10);
        }
    }
}

// Variables
const logElement = document.getElementById("log");
const actionsElement = document.getElementById("actions");

let logMessages = ["You are an explorer from a far off land. You have been sent to explore the new world. After sailing for a while, you come across a new land."];
let money = 0;
let completedActions = [];
let actions = [
    new Action(0, "Dock your ship", 0, 5, "You dock your ship at shore. Looking into the distance, you see lots of trees and a large mountain in the distance.", []),
    new Action(1, "Unpack your ship", 0, 10, "You unpack some of your basic supplies from the ship - some food rations and a small tent.", [0]),
    new Action(2, "Set up camp", 0, 10, "", [1])
]

// Functions
function updateLog(message) {
    logElement.innerHTML = "";
    for (let i = 0; i < logMessages.length; i++) {
        logElement.innerHTML += `<p>${logMessages[i]}</p><br>`;
    }
}

function updateActions() {
    actionsElement.innerHTML = "";
    let requirementsMet = true;
    for (let i = 0; i < actions.length; i++) {
        // If requirements are met
        if (actions[i].requirements.length != 0) {
            for (let j = 0; j < actions[i].requirements.length; j++) {
                if (!completedActions.includes(actions[i].requirements[j])) {
                    requirementsMet = false;
                }
            }
        }
        if (requirementsMet) {
            if (completedActions.includes(actions[i].id) == false) {
                actionsElement.innerHTML += `<button onclick="actions[${i}].runAction()" id="action-${actions[i].id}" class="action">${actions[i].name}</button>`;
            }
        }
    }
}

function saveGame() {
    let save = {
        logMessages: logMessages,
        money: money,
        completedActions: completedActions
    }
    localStorage.setItem("save", JSON.stringify(save));
}

function loadGame() {
    let savegame = JSON.parse(localStorage.getItem("save"));
    if (typeof savegame.logMessages !== "undefined") logMessages = savegame.logMessages;
}

function clearSave() {
    localStorage.removeItem("save");
}

// Main
updateLog();
updateActions();

// Game Loop
setInterval(function() {
}, 10);