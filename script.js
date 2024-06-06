document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector(".Animation-Header");
    setTimeout(function () {
        header.classList.add("Animation-appear");
        header.classList.add("glow");
    }, 500);
});

const button1 = document.querySelector('.button1 button');
const button2 = document.querySelector('.button2 button');
const image1 = document.querySelector('.image1 img');
const image2 = document.querySelector('.image2 img');
const human1Score = document.querySelector('.Scores-Human1 .Scores-Human1-Score h3');
const human2Score = document.querySelector('.Scores-Human2 .Scores-Human2-Score h3');
const finalPointSelect = document.getElementById('finalPoint');
let human1Choice = null;
let human2Choice = null;
let human1Points = 0;
let human2Points = 0;
let finalScore = 3; 

finalPointSelect.value = finalScore; 

finalPointSelect.addEventListener('change', function () {
    finalScore = parseInt(this.value);
    image2.src = "Images/rock.png";
    image1.src = "Images/rock.png";
    resetScores();
});

let isHuman1Turn = true;

button1.addEventListener('click', function () {
    if (!isHuman1Turn) {
        showPopup("You can't change!");
        return;
    }
    
    human1Choice = Math.floor(Math.random() * 3);
    image1.src = "Images/rock.png";
    updateImages(human1Choice, image1); 
    if (human2Choice !== null) { 
        setTimeout(function () {
            updateScore();
        }, 2000); 
    }
    isHuman1Turn = false;
});

button2.addEventListener('click', function () {
    if (isHuman1Turn) {
        showPopup("You can't change!");
        return;
    }
    
    human2Choice = Math.floor(Math.random() * 3); 
    image2.src = "Images/rock.png";
    updateImages(human2Choice, image2);
    if (human1Choice !== null) { 
        setTimeout(function () {
            updateScore();
        }, 2000); 
    }
    isHuman1Turn = true;
});


function updateImages(choice, image) {
    image.classList.add("animate");

    setTimeout(function () {
        image.classList.remove("animate");

        if (choice === 0) {
            image.src = "Images/rock.png";
        } else if (choice === 1) {
            image.src = "Images/paper.png";
        } else if(choice==2){
            image.src = "Images/scissors.png";
        }
    }, 2000);
}

function updateScore() {
    if (human1Choice === human2Choice) {
        human1Points += 0;
        human2Points += 0;
    } else if ((human1Choice == 0 && human2Choice == 1) || (human1Choice == 1 && human2Choice ==2) || (human1Choice == 2 && human2Choice == 0)) {
        human2Points++;
    } else {
        human1Points++;
    }
    human1Score.textContent = human1Points;
    human2Score.textContent = human2Points;

    if (human1Points === finalScore || human2Points === finalScore) {
        showWinner();
        resetScores();
    }

    human1Choice = null;
    human2Choice = null;
}

function showPopup(message) {
    const winnerPopup = document.getElementById("winnerPopup");
    const winnerMessage = document.getElementById("winnerMessage");
    winnerMessage.textContent = message;
    winnerPopup.style.display = "block";
}

function closePopup() {
    const winnerPopup = document.getElementById("winnerPopup");
    winnerPopup.style.display = "none";
}

function showWinner() {
    if (human1Points > human2Points) {
        showPopup("Computer1 wins!");
    } else if (human2Points > human1Points) {
        showPopup("Computer2 wins!");
    } else {
        showPopup("It's a tie!");
    }
}

function resetScores() {
    human1Points = 0;
    human2Points = 0;
    human1Score.textContent = human1Points;
    human2Score.textContent = human2Points;
    image2.src = "Images/rock.png";
    image1.src = "Images/rock.png";
}
