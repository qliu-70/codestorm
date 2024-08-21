let hiddenword = '';

const start = async () => {
    const url = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/periodictable/JSON';
    let atomicnumber = Math.floor(Math.random() * 118)
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        console.log(data.Table.Row[atomicnumber]);
        let element = data.Table.Row[atomicnumber].Cell
        let atomicmass = element[3]
        let atomicsymbol = element[1]
        let atomicname = element[2]
        let yeardiscovered = element[16]
        let electrons = element[5]
        let state = element[11]
        hiddenword = atomicname.toLowerCase();
        console.log(atomicmass, atomicsymbol, atomicname, yeardiscovered, electrons, state)
         // Update the HTML elements with the fetched data
         $('#atomic-number').text(atomicnumber).hide();  // Hide initially
         $('#element-symbol').text(atomicsymbol).hide();  // Hide initially
         $('#atomic-mass').text(atomicmass).hide();  // Hide initially

         // Reset hint buttons
         $('#atomic-number-hint').text('Show Atomic Number');
         $('#element-symbol-hint').text('Show Element Symbol');
         $('#atomic-mass-hint').text('Show Atomic Mass');


    } catch (error) {
        console.error('Error fetching data:', error);
    }

};

function checkGuess() {
    var guess = document.getElementById("guess");
    element = guess.value.toLowerCase();
    console.log(element)
    console.log(hiddenword)
    if (element === hiddenword) {
        message.textContent = 'Correct!';
        message.className = 'text-success';
    } else {
        message.textContent = 'Try again!';
        message.className = 'text-danger';
    }
}

function displayMessage(message) {
    document.getElementById("message").textContent = message;
}


$(document).ready(() => {
    $('#start-button').on('click', start);

    // Event listeners to show hints
    $('#atomic-number-hint').on('click', function() {
        $('#atomic-number').toggle();
    });
    $('#element-symbol-hint').on('click', function() {
        $('#element-symbol').toggle();  // Toggle symbol visibility
    });
    $('#atomic-mass-hint').on('click', function() {
        $('#atomic-mass').toggle();
    });
});