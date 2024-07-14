window.onload = function() {
    // Gets the an html collection of the li in the saves ul
    const savesClass = document.getElementsByClassName("saves list-section box")[0];
    const savesList = savesClass.querySelector("ul").getElementsByTagName("li");
    console.log(savesList);
    // Loop through each save throw li
    for (var i = 0; i < savesList.length; ++i){
        console.log(savesList[i]);
        let saveMod = savesList[i].querySelector('[id$="save"]');
        let profBubble = savesList[i].querySelector('[id$="prof"]');
        profBubble.addEventListener("click", proffBubble_saveThrow);
    }
    // Add proficiency updating saves
    const profScore = document.getElementById("proficiencybonus")
    profScore.addEventListener("change", proffScore_saveThrow)
    // Add ability modifiers updating saves
    const abilityClass = document.getElementsByClassName("scores")[0];
    const abilities = abilityClass.querySelector("ul").getElementsByTagName("li");
    // Loop thorugh each ability mod li
    for (var i = 0; i < abilities.length; ++i){
        const abilityMod = abilities[i].querySelector(".modifier").querySelector('[id$="mod"]');
        console.log(abilityMod);
        abilityMod.addEventListener("change", abilityMod_saveThrow)
    }

};

// Calculates saving throw based on ability mod, proficiency score, and if proficient in throw
// pass in values of respective components
function calculateSave(abilityMod, profScore, profBonus){
    console.log(`ability mod is ${abilityMod}`);
    console.log(`prof score is ${profScore}`);
    console.log(`prof bonus is ${profBonus}`);
    abilityMod = abilityMod != "" ? parseInt(abilityMod) : 0;
    profScore = profScore != "" ? parseInt(profScore) : 0;
    let save = profBonus ? profScore + abilityMod : abilityMod;
    return formatInt(save);
}

// Function attatched to saving throw prof buttons, updates saving throw
function proffBubble_saveThrow(){
    console.log(this.id + " was pressed, it is now " + this.checked);
    // Get the prof score
    const profScore = document.getElementById("proficiencybonus");
    // Get the associated ability modifier
    const abilityMod = document.getElementById(this.id.replace('-save-prof', '-mod'));
    // Get the associated save modifier
    const saveMod = document.getElementById(this.id.replace('-prof', ''));
    saveMod.value = calculateSave(abilityMod.value, profScore.value, this.checked);
}

// Function for updating saving throws whenever prof score changes
function proffScore_saveThrow(){
    // Gets the an html collection of the li in the saves ul
    const savesClass = document.getElementsByClassName("saves list-section box")[0];
    const savesList = savesClass.querySelector("ul").getElementsByTagName("li");
    // Loop through each save throw li
    for (var i = 0; i < savesList.length; ++i){
        console.log(savesList[i]);
        // Get the score
        const saveMod = savesList[i].querySelector('[id$="save"]');
        // Get the proff bubble
        const profBubble = savesList[i].querySelector('[id$="prof"]');
        // Get the associated ability modifier
        const abilityMod = document.getElementById(saveMod.id.replace('-save', '-mod'));
        saveMod.value = calculateSave(abilityMod.value, this.value, profBubble.checked);
    }
}

// Function for updating saving throws whenever ability mod changes
function abilityMod_saveThrow(){
    // Get the associated saving throw
    const saveMod = document.getElementById(this.id.replace('-mod', '-save'));
    // Get the associated proff bubble
    const proffBubble = document.getElementById(saveMod.id.replace('-save', '-save-prof'));
    // Get the proff score
    const proffScore = document.getElementById("proficiencybonus");
    saveMod.value = calculateSave(this.value, proffScore.value, proffBubble.checked);
}
