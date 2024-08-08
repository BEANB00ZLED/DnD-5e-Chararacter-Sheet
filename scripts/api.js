const myHeaders = new Headers();
myHeaders.append("Accept", "application/json");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

document.addEventListener('DOMContentLoaded', () => {
    // Fetch alignments from api and populate selections
    fetch("https://www.dnd5eapi.co/api/alignments", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            const dropdown = document.getElementById('alignment');
            const data = result.results;
            data.forEach(alignment => {
                const option = document.createElement('option');
                option.value = alignment.url;
                option.textContent = alignment.name;
                option.id = alignment.index;
                dropdown.appendChild(option);
            });
        })
        .catch((error) => {
            console.error('Error fetching alignments:', error);
        });

    // Fetch races from api and populate selections
    fetch("https://www.dnd5eapi.co/api/races", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            const dropdown = document.getElementById('race');
            const data = result.results;
            data.forEach(alignment => {
                const option = document.createElement('option');
                option.value = alignment.url;
                option.textContent = alignment.name;
                option.id = alignment.index;
                dropdown.appendChild(option);
            });
        })
        .catch((error) => {
            console.error('Error fetching races:', error);
        });

    // Fetch backgrounds from api and populate selections
    fetch("https://www.dnd5eapi.co/api/backgrounds", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            const dropdown = document.getElementById('background');
            const data = result.results;
            data.forEach(alignment => {
                const option = document.createElement('option');
                option.value = alignment.url;
                option.textContent = alignment.name;
                option.id = alignment.index;
                dropdown.appendChild(option);
            });
        })
        .catch((error) => {
            console.error('Error fetching backgrounds:', error);
            
        });
    // Fetch classes from api and populate selections
    fetch("https://www.dnd5eapi.co/api/classes", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            const dropdown = document.getElementById('class');
            const data = result.results;
            data.forEach(alignment => {
                const option = document.createElement('option');
                option.value = alignment.url;
                option.textContent = alignment.name;
                option.id = alignment.index;
                dropdown.appendChild(option);
            });
        })
        .catch((error) => {
            console.error('Error fetching classes:', error);
            
        });

    // Make class feats update with level
    const level = document.getElementById('level');
    const charClass = document.getElementById('class');
    level.addEventListener('change', classLevel_feats);
    charClass.addEventListener('change', classLevel_feats);

    // Make hitdice update with class and level
    level.addEventListener('change', classLevel_hitDice);
    charClass.addEventListener('change', classLevel_hitDice);

    // Add search function to spell
    const searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click", searchButton_spellApi);
    
});

function addFeature(jsonFeature){
    // Get feature section and add feat
    const featSection = document.getElementsByClassName('features')[0].getElementsByTagName('div')[0];

    //Create the p element
    const pFeat = document.createElement('p');
    pFeat.classList.add('tooltip');
    pFeat.setAttribute('exp-tooltip', jsonFeature.desc.join("\n\n"));
    pFeat.id = jsonFeature.index;
    pFeat.innerText = jsonFeature.name;
    
    // Create the tooltip part of it
    const tooltipText = pFeat.getAttribute('exp-tooltip');
    const tooltipElement = document.createElement('div');
    tooltipElement.classList.add('tooltiptext');
    tooltipElement.innerText = tooltipText;
    pFeat.appendChild(tooltipElement);
    
    pFeat.addEventListener('mouseover', () => {
        tooltipElement.style.visibility = 'visible';
        tooltipElement.style.opacity = '1';
    });

    pFeat.addEventListener('mouseout', () => {
        tooltipElement.style.visibility = 'hidden';
        tooltipElement.style.opacity = '0';
    });
    
    featSection.appendChild(pFeat);
}

// Function attatched to level to update feats based on level and class
async function classLevel_feats(){
    // Get feature section and clear all <p> children
    const featSection = document.getElementsByClassName('features')[0].getElementsByTagName('div')[0];
    featSection.querySelectorAll('p').forEach(feat =>{
        feat.remove();
    })
    const charClass = document.getElementById('class');
    const level = document.getElementById('level')
    charLevel = level.value != "" ? parseInt(level.value) : 0;
    console.log("https://www.dnd5eapi.co" + charClass.value + '/levels')
    // Fetch the levels of the class
    fetch("https://www.dnd5eapi.co" + charClass.value + '/levels', requestOptions)
        .then((response) => response.json())
        .then((result) => {
            const data = result;
            console.log(data)
            // Loop through class level features equal to number of levels
            for(let i = 0; (i < charLevel) && (i < data.length); i++){
                // Get all the features of that level
                const levelFeatures = data[i].features;
                console.log(levelFeatures)
                // Loop through each feature
                levelFeatures.forEach(feat => {
                    fetch("https://www.dnd5eapi.co" + feat.url, requestOptions)
                        .then((response) => response.json())
                        .then((result) => {
                            const featData = result;
                            console.log(featData.name);
                            console.log(featData.desc);
                            addFeature(featData);
                        })
                        .catch((error) => {
                            console.error('Error fetching specific feat:', error)
                        });
                })
            }
        })
        .catch((error) => {
            console.error('Error fetching class feats:', error);
        });
}

// Function attatched to level and class to update total hit dice
async function classLevel_hitDice(){
    const charClass = document.getElementById('class');
    const level =  document.getElementById('level');
    fetch("https://www.dnd5eapi.co" + charClass.value, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            const hitDice = document.getElementById('totalhd');
            let size = result.hit_die;
            hitDice.value = String(level.value) + "d" + String(size);
        })
        .catch((error) => {
            console.error('Error fetching class hit die:', error);
        });
}

function searchButton_spellApi(){

    function populateSpellCard(name, castingTime, range, components, duration, description, level, school){
        const spellCard = document.getElementsByClassName("spell-card")[0];
        // Set the spell name
        const nameLabel = spellCard.querySelector("div.spell-name > label");
        nameLabel.innerText = name;
        // Set the spell casting time
        const castingTimeP = spellCard.querySelector("table.spell-specs div.casting-time > p");
        castingTimeP.innerText = castingTime;
        // Set spell range
        const rangeP = spellCard.querySelector("table.spell-specs div.range > p");
        rangeP.innerText = range;
        // Set spell components
        const componentsP = spellCard.querySelector("table.spell-specs div.components > p");
        componentsP.innerText = components;
        // Set spell duration
        const durationP = spellCard.querySelector("table.spell-specs div.duration > p");
        durationP.innerText = duration;
        // Set spell description
        const descriptionP = spellCard.querySelector("div.spell-desc > p");
        descriptionP.innerText = description;
        // Set spell class
        const classP = spellCard.querySelectorAll("div.spell-misc > p")[0];
        classP.innerText = level;
        // Set level and school
        const levelScoolP = spellCard.querySelectorAll("div.spell-misc > p")[1];
        levelScoolP.innerText = school
    }

    const searchField = document.getElementById("searchField");
    fetch("https://www.dnd5eapi.co/api/spells/" + searchField.value)
        .then((response) => response.json())
        .then((result) => {
            console.log(result)

            let name = result.name;
            let casting_time = result.casting_time;
            let range = result.range;
            let components = result.components;
            if (result.material.match(/\d+gp/i)) {
                components = components + '\n(' + result.material + ')';
            }
            let duration = result.duration;
            let description = (result.desc && result.higher_level) ? result.desc + "\n\n" + result.higher_level : result.desc;
            let level = '';
            switch (result.level) {
                case undefined:
                    level = undefined;
                    break;
                case 1:
                    level = '1st';
                    break
                case 2:
                    level = '2nd';
                    break;
                case 3:
                    level = '3rd';
                    break;
                default:
                    level = result.level + "th";
            }
            level = level + ' level';
            let school = result.school.name;
            populateSpellCard(
                name,
                casting_time,
                range,
                components,
                duration,
                description,
                level,
                school
            );
        })
        .catch((error) => {
            console.error('Error fetching searched spell: ', error)
            populateSpellCard(
                'Unkown Spell',
                'Unkown',
                'Uknown',
                'Unknown',
                'Unknown',
                'Please try again',
                'Unkown level',
                'Unknown school'
            );
        });
}