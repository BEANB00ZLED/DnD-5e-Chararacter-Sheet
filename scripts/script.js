// Updating ability modifiers when ability scores are changed
function updateModifier(scoreElement){
    function scoreToMod(score){
        return Math.floor(score / 2) - 5;
    }
    // Get references to the input scoreElements
    console.log("Ability score changed: " + scoreElement.getAttribute("id") + " = " + scoreElement.value);
    let modId = scoreElement.getAttribute("id").replace("score", "mod");
    const modElement = document.getElementById(modId);
    // Empty string is same as no value
    if(scoreElement.value != ""){
        let modifier = scoreToMod(parseInt(scoreElement.value));
        modElement.value  = (modifier<0?"":"+") + modifier;
        console.log("Updating associated modifier: " + modElement.getAttribute("id") + " = " + modElement.value);
    }
    else{
        console.log("Clearing modifier");
        modElement.value = "";
    }
}