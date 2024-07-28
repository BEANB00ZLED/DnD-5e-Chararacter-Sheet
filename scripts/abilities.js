function scoreToMod(score){
    return Math.floor(score / 2) - 5;
}
// Turn int into +/-# string
function formatInt(num){
    return (num<0?"":"+") + num;
}

// Updating ability modifiers when ability scores are changed
function updateModifier(scoreElement){
    // Get references to the input scoreElements
    console.log("Ability score changed: " + scoreElement.getAttribute("id") + " = " + scoreElement.value);
    let modId = scoreElement.getAttribute("id").replace("score", "mod");
    const modElement = document.getElementById(modId);
    // Empty string is same as no value
    if(scoreElement.value != ""){
        let modifier = scoreToMod(parseInt(scoreElement.value));
        modElement.value  = formatInt(modifier);
        console.log("Updating associated modifier: " + modElement.getAttribute("id") + " = " + modElement.value);
        // Element is set to read only so event must be manually triggered
        modElement.dispatchEvent(new Event('change'));
    }
    else{
        console.log("Clearing modifier");
        scoreElement.value = 10;
        // To fix bug where clearing value but not typing anything in wouldnt trigger event
        scoreElement.dispatchEvent(new Event('change'));
    }
}


