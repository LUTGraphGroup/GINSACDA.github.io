let data = [];

// Load JSON data
fetch('build/data.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData;
        console.log(data); // Debugging output
    })
    .catch(error => {
        console.error('Error loading JSON data:', error);
    });

const examplecircRNAs = ["circRNA-000911", "hsa_circ_0001821", "hsa_circ_0002874", "hsa_circ_0067531", "hsa_circ_0067934"];

function fillExample() {
    const randomIndex = Math.floor(Math.random() * examplecircRNAs.length);
    document.getElementById('circRNA').value = examplecircRNAs[randomIndex];
}

function queryDisease() {
    const circRNA = document.getElementById('circRNA').value.trim().toLowerCase();
    const modalResultsDiv = document.getElementById('modal-results');
    const modal = document.getElementById('myModal');

    modalResultsDiv.innerHTML = ''; // Clear previous results

    if (!circRNA) {
        modalResultsDiv.innerHTML = 'Please enter a circRNA.';
        modal.style.display = "block";
        return;
    }

    // Find associated diseases
    const results = data.filter(item => item.circRNA && item.circRNA.toLowerCase() === circRNA);

    if (results.length > 0) {
        const output = results.map(item => `${item.disease} (Score: ${item.score})`).join('<br>');
        modalResultsDiv.innerHTML = 'Diseases:<br>' + output;
    } else {
        modalResultsDiv.innerHTML = 'No diseases found for this circRNA.';
    }
    modal.style.display = "block"; // Show modal
}

function clearInput() {
    document.getElementById('circRNA').value = '';
    closeModal();
}

function closeModal() {
    document.getElementById('myModal').style.display = "none";
}

// Close modal on click
window.onclick = function(event) {
    const modal = document.getElementById('myModal');
    if (event.target == modal) {
        closeModal();
    }
}