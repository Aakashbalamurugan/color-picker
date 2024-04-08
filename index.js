console.log("hi")
let level = 1;
let numOptions = 6;

function getRandomColor(targetColor) {
    const tolerance = 50 / level; // Adjust tolerance based on level
    const r = Math.max(0, Math.min(255, Math.round(Math.random() * tolerance * 2 + parseInt(targetColor.substr(1, 2), 16) - tolerance)));
    const g = Math.max(0, Math.min(255, Math.round(Math.random() * tolerance * 2 + parseInt(targetColor.substr(3, 2), 16) - tolerance)));
    const b = Math.max(0, Math.min(255, Math.round(Math.random() * tolerance * 2 + parseInt(targetColor.substr(5, 2), 16) - tolerance)));
    return '#' + ('00' + r.toString(16)).slice(-2) + ('00' + g.toString(16)).slice(-2) + ('00' + b.toString(16)).slice(-2);
}

function generateOptions(targetColor) {
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    const correctColorIndex = Math.floor(Math.random() * numOptions);
    for (let i = 0; i < numOptions; i++) {
        const option = document.createElement('div');
        option.className = 'option';
        if (i === correctColorIndex) {
            option.style.backgroundColor = targetColor;
            option.onclick = function() {
                if (level ==6) {
                    alert("Congratulation, you won the game");
                    level = 1;
                    numOptions = 6;  
                }
                level++;
                if (level % 3 === 0) {
                    numOptions = Math.max(3, numOptions - 1);
                }
                document.getElementById('level').textContent = 'Level: ' + level;
                newGame();
            };
        } else {
            option.style.backgroundColor = getRandomColor(targetColor);
            option.onclick = function() {
                alert('Oops! Try again.');
                level = 1;
                numOptions = 6; // Reset number of options
                document.getElementById('level').textContent = 'Level: ' + level;
                newGame();
            };
        }
        optionsContainer.appendChild(option);
    }
}

function newGame() {
    const colorBox = document.getElementById('color-box');
    const targetColor = '#' + ('00' + Math.floor(Math.random() * 256).toString(16)).slice(-2) + ('00' + Math.floor(Math.random() * 256).toString(16)).slice(-2) + ('00' + Math.floor(Math.random() * 256).toString(16)).slice(-2);
    colorBox.style.backgroundColor = targetColor;
    generateOptions(targetColor);
}

newGame();
