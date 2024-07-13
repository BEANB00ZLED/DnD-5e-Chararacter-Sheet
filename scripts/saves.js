window.onload = function() {
    // Gets the an html collection of the li in the saves ul
    const savesClass = document.getElementsByClassName("saves list-section box")[0];
    const savesList = savesClass.querySelector("ul").getElementsByTagName("li");
    console.log(savesList);
    // Loop through each li
    for (var i = 0; i < savesList.length; ++i){
        console.log(savesList[i]);
        let saveMod = savesList[i].querySelector('[id$="save"]');
        let proffBubble = savesList[i].querySelector('[id$="prof"]');
        proffBubble.addEventListener("click", updateSaveProff)
    }
};

// Calculates saving throw based on ability mod, profficiency score, and if profficient in throw
// pass in values of respective components
function calculateSave(abilityMod, proffScore, proffBonus){
    console.log(`ability mod is ${abilityMod}`)
    console.log(`proff score is ${proffScore}`)
    console.log(`proff bonus is ${proffBonus}`)
    abilityMod = abilityMod != "" ? parseInt(abilityMod) : 0;
    proffScore = proffScore != "" ? parseInt(proffScore) : 0;
    let save = proffBonus ? proffScore + abilityMod : abilityMod;
    return formatInt(save);
}

// Function attatched to saving throw proff buttons, updates saving throw
function updateSaveProff(){
    console.log(this.id + " was pressed, it is now " + this.checked);
    // Get the proff score
    const proffScore = document.getElementById("proficiencybonus")
    // Get the associated ability modifier
    const abilityMod = document.getElementById(this.id.replace('-save-prof', '-mod'))
    // Get the associated save modifier
    const saveMod = document.getElementById(this.id.replace('-prof', ''))
    saveMod.value = calculateSave(abilityMod.value, proffScore.value, this.checked)
}

