// Global Variables : *******************************************************
const src = './assets/icons/';
const handIcons = ['rock.png', 'paper.png', 'scissors.png'];
const handIconsLong = ['rockL.png', 'paperL.png', 'scissorsL.png'];

const gameResultTag = ['Draw', 'You Won!', 'You Lost!'];
let gameResult = 0
// Rock = 0 , Paper = 1 and Scissors = 2:
let oppHand = 0;

// playing interval:
let playInterval;


// Functions : *************************************************************

// Basic function for changing opponent hand:
function oppHandChange() {
    oppHand = Math.floor(Math.random() * 3);
    const oppIcon = document.getElementById('opponent-hand');
    oppIcon.src = src + handIcons[oppHand];
}


// Starting the opponent hand changing interval:
function startPlayInterval() {
    playInterval = setInterval(oppHandChange, 50);
}
// Stopping the opponent hand changing interval:
function stopPlayInterval() {
    clearInterval(playInterval);
}
// case analysis:
function refree(you, opp) {
    let result;
    if (you === opp) {
        result = 0;
    } else if (you === 0 && opp === 1) {
        result = 2;
    } else if (you === 0 && opp === 2) {
        result = 1;
    } else if (you === 1 && opp === 0) {
        result = 1;
    } else if (you === 1 && opp === 2) {
        result = 2;
    } else if (you === 2 && opp === 0) {
        result = 2;
    } else if (you === 2 && opp === 1) {
        result = 1;
    } else {
        document.getElementById('game-message').style.color = 'red';
        console.log(`Hand:${you} OppHand:${opp}`);
    }
    scoreRecord(result);
    return result;
}

// play button :
function play() {
    startPlayInterval();
    const oppSide = document.getElementById('l-side');
    const yourSide = document.getElementById('r-side');
    const message = document.getElementById('game-message');

    oppSide.src = '';
    oppSide.style.animation = 'idle 1s ease 0s';
    yourSide.src = '';
    yourSide.style.animation = 'idle 1s ease 0s';
    message.innerHTML = '...';
}

// player call :
function call(hand) {

    stopPlayInterval();
    const message = document.getElementById('game-message');
    const oppSide = document.getElementById('l-side');
    const yourSide = document.getElementById('r-side');

    gameResult = refree(hand, oppHand);
    oppSide.src = src + handIconsLong[oppHand];
    oppSide.style.animation = 'comeInL 1s ease 0s';
    yourSide.src = src + handIconsLong[hand];
    yourSide.style.animation = 'comeInR 1s ease 0s';
    
    message.innerHTML = gameResultTag[gameResult];
}

// Scoring : *************************************************
let gameScore = [];

function scoreRecord(score) {
    const scoreMeaning = ['Draw', 'Win', 'Loss'];
    gameScore.push(score);

    const scoreboard = document.getElementById('scores') ;

    scoreboard.innerHTML = gameScore.map(item => scoreMeaning[item]).join(' -> ');


    let draws, wins, losses;
    draws = gameScore.filter(item => {return item === 0}).length;
    wins = gameScore.filter(item => {return item === 1}).length;
    losses = gameScore.filter(item => {return item === 2}).length;

    document.getElementById('draws').innerHTML = draws;
    document.getElementById('wins').innerHTML = wins;
    document.getElementById('losses').innerHTML = losses;
}