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
                option.value = alignment.url;s
                option.textContent = alignment.name;
                option.id = alignment.index;
                dropdown.appendChild(option);
            });
        })
        .catch((error) => {
            console.error('Error fetching backgrounds:', error);
            
        });
});

