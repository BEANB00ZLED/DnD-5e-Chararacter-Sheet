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