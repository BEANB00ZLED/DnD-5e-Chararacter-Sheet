// Maps abilities to skills
const abilityToSkill = new Map();
abilityToSkill.set('strength', ['athletics']);
abilityToSkill.set('dexterity', ['acrobatics', 'sleight-of-hand', 'stealth']);
abilityToSkill.set('constitution', []);
abilityToSkill.set('intelligence', ['arcana', 'history', 'investigation', 'nature', 'religion']);
abilityToSkill.set('wisdom', ['animal-handling', 'insight', 'medicine', 'perception', 'survival']);
abilityToSkill.set('charisma', ['deception', 'intimidation', 'performance', 'persuasion']);

const skillToAbility = new Map();
skillToAbility.set('athletics', 'strength');
skillToAbility.set('acrobatics', 'dexterity');
skillToAbility.set('sleight-of-hand', 'dexterity');
skillToAbility.set('stealth', 'dexterity');
skillToAbility.set('arcana', 'intelligence');
skillToAbility.set('history', 'intelligence');
skillToAbility.set('investigation', 'intelligence');
skillToAbility.set('nature', 'intelligence');
skillToAbility.set('religion', 'intelligence');
skillToAbility.set('animal-handling', 'wisdom');
skillToAbility.set('insight', 'wisdom');
skillToAbility.set('medicine', 'wisdom');
skillToAbility.set('perception', 'wisdom');
skillToAbility.set('survival', 'wisdom');
skillToAbility.set('deception', 'charisma');
skillToAbility.set('intimidation', 'charisma');
skillToAbility.set('performance', 'charisma');
skillToAbility.set('persuasion', 'charisma');

window.onload = function() {
    // Gets the an html collection of the li in the saves ul
    const savesClass = document.getElementsByClassName("saves list-section box")[0];
    const savesList = savesClass.querySelector("ul").getElementsByTagName("li");
    // Loop through each save throw li
    for (var i = 0; i < savesList.length; ++i){
        let saveMod = savesList[i].querySelector('[id$="save"]');
        let profBubble = savesList[i].querySelector('[id$="prof"]');
        profBubble.addEventListener("click", profBubble_savesSkills);
    }
    // Add proficiency updating saves
    const profScore = document.getElementById("proficiencybonus");
    profScore.addEventListener("change", profScore_savesSkills);
    // Add ability modifiers updating saves
    const abilityClass = document.getElementsByClassName("scores")[0];
    const abilities = abilityClass.querySelector("ul").getElementsByTagName("li");
    // Loop thorugh each ability mod li
    for (var i = 0; i < abilities.length; ++i){
        const abilityMod = abilities[i].querySelector(".modifier").querySelector('[id$="mod"]');
        abilityMod.addEventListener("change", abilityMod_savesSkills);
    }

    // Loop through each skill li
    // Gets the an html collection of the li in the saves ul
    const skillsClass = document.getElementsByClassName("skills list-section box")[0];
    const skillsList = skillsClass.querySelector("ul").getElementsByTagName("li");
    // Loop through each save throw li
    for (var i = 0; i < skillsList.length; ++i){
        // Get the proff bubble
        let profBubble = skillsList[i].querySelector('[id$="prof"]');
        profBubble.addEventListener('click', profBubble_savesSkills);
    }

    // Add update for passive perception
    document.getElementById('perception').addEventListener('change', perception_passivePerception)

    // Add update for proff bonus when level changes
    document.getElementById('level').addEventListener('change', level_proffBonus)

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
function profBubble_savesSkills(){
    console.log(this.id + " was pressed, it is now " + this.checked);
    // Get the prof score
    const profScore = document.getElementById("proficiencybonus");
    // Get the associated ability modifier
    if (this.id.includes('save')){
        // If this is for a save throw
        var abilityMod = document.getElementById(this.id.replace('-save-prof', '-mod'));
    }
    else{
        // If this bubble is for a skill
        var abilityMod = document.getElementById(skillToAbility.get(this.id.replace('-prof', '')).concat('-mod'))
    }
    
    // Get the associated save modifier
    const saveMod = this.parentElement.querySelector('input[type=text]');
    saveMod.value = calculateSave(abilityMod.value, profScore.value, this.checked);
    // Dispatch event for perception
    if (saveMod.id.includes('perception')){
        saveMod.dispatchEvent(new Event('change'));
    }
    
}

// Function for updating saving throws whenever prof score changes
function profScore_savesSkills(){
    // SAVING THROW UPDATING
    // Gets the an html collection of the li in the saves ul
    const savesClass = document.getElementsByClassName("saves list-section box")[0];
    const savesList = savesClass.querySelector("ul").getElementsByTagName("li");
    // Loop through each save throw li
    for (var i = 0; i < savesList.length; ++i){
        // Get the score
        let saveMod = savesList[i].querySelector('[id$="save"]');
        // Get the proff bubble
        let profBubble = savesList[i].querySelector('[id$="prof"]');
        // Get the associated ability modifier
        let abilityMod = document.getElementById(saveMod.id.replace('-save', '-mod'));
        saveMod.value = calculateSave(abilityMod.value, this.value, profBubble.checked);
    }

    // SKILLS UPDATING
    const skillsClass = document.getElementsByClassName('skills list-section box')[0];
    const skillsList = skillsClass.querySelector('ul').getElementsByTagName('li');
    for (var i = 0; i < skillsList.length; ++i){
        // Get the skill modifier
        let skillMod = skillsList[i].querySelector('input[type=text]');
        // Get the profficiency bubble
        let profBubble = skillsList[i].querySelector('input[type=checkbox]');
        // Get the associated ability modifier
        let abilityMod = document.getElementById(skillToAbility.get(skillMod.id).concat('-mod'));
        console.log(abilityMod)
        skillMod.value = calculateSave(abilityMod.value, this.value, profBubble.checked);
        // Dispatch event for perception
        if (skillMod.id.includes('perception')){
            skillMod.dispatchEvent(new Event('change'));
        }
    }
    
}

// Function for updating saving throws whenever ability mod changes
function abilityMod_savesSkills(){
    // Get the associated saving throw
    const saveMod = document.getElementById(this.id.replace('-mod', '-save'));
    // Get the associated proff bubble
    const proffBubble = document.getElementById(saveMod.id.replace('-save', '-save-prof'));
    // Get the proff score
    const proffScore = document.getElementById("proficiencybonus");
    saveMod.value = calculateSave(this.value, proffScore.value, proffBubble.checked);

    // FOR UPDATING ASSOCIATED SKILLS
    const skillIds = abilityToSkill.get(this.id.replace('-mod', ''));
    for(var i = 0; i < skillIds.length; ++i){
        const skillMod = document.getElementById(skillIds[i]);
        const skillBubble = skillMod.parentElement.querySelector('input[type=checkbox]');
        skillMod.value = calculateSave(this.value, proffScore.value, skillBubble.checked);
        // Dispatch event for perception
        if (skillMod.id.includes('perception')){
            skillMod.dispatchEvent(new Event('change'));
        }
    }
}

// Updates passive perception when perception changes
function perception_passivePerception(){
    const passivePerception = document.getElementById('passive-perception');
    passivePerception.value = 10 + (this.value != "" ? parseInt(this.value) : 0);
}

// Updates proff bonus with level change
function level_proffBonus(){
    const proffBonus = document.getElementById("proficiencybonus");
    let level = this.value != "" ? parseInt(this.value) : 0;
    let bonus = Math.floor((level - 1) / 4) + 2
    proffBonus.value = formatInt(bonus)
    proffBonus.dispatchEvent(new Event('change'))
}