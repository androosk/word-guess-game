//1980s Dialup BBS styled wordgame
// This routine runs a typing style marquis out to tell the player to press any key
var dt = new Date();
document.getElementById("date").innerHTML = dt;

var i = 0;
var txt = 'Press any key to play';
var speed = 50;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("marquis").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
typeWriter();
//Set variables for gameplay
var wonTries = 0;
var lostTries= 0;
var triesRemaining = 10;
var wordList = ["totally", "grody", "tubular", "chill", "bitchin", "righteous", "gnarly", "dude", "awesome", "radical"];
var imageList = ["allisonbreakfastclubrs.jpg", "backtofuturers.jpg", "bensteinrs.png", "bfstclbrs.jpg", "fbdors.JPG", "ghostbustersrs.jpg", "gooniesrs.jpg", "pretty_in_pink_duckyrs.jpg", "spicolirs.png", "valley-girlrs.jpg"];
var audioYes = new Audio("assets/sounds/totally.wav");
var audioNo = new Audio("assets/sounds/gnarly.wav");
var audioEnd = new Audio("assets/sounds/tappin.wav");
var audioBkd = new Audio("assets/sounds/oxygene.mp3");
var currentImg = "";
var currentWord = "";
var wrongLetter = [];
var rightLetter = [];
var wordString = [];
var randWord = 0;
var randImg = 0;
var playing = false;
//Set introductory image
document.getElementById("gameImage").src = "assets/images/8bitgw.jpg";
// Wait for user to press a key to start gameplay - if playing var is true, play game
document.onkeyup = function() {
    resetAll();
    playAudioBkd();
    playing = true;
    document.getElementById("marquis").innerHTML = "Pick letters to solve the puzzle.";
    document.getElementById("gameImage").src = theImage;
// If playing var is false (this will happen at the end of the game) run the function sequence to start the next game
  document.onkeyup = function(event) {
    if (playing === false) {
      stopAudioBkd();
      endGameAudio();
      document.getElementById("word-string").innerHTML = "GAME OVER";
      document.getElementById("wrong-letter").innerHTML = "THANK YOU FOR PLAYING";
      setTimeout(restart, 3000);
    }
// Gameplay section
//If player does not choose a letter from lowercase a-z an alert box will pop up telling the player to do so
    else if (playing == true && 96 > event.key.charCodeAt(0) || event.key.charCodeAt(0) > 123) {
      alert("Please select a letter!");
    }
//If player choice falls within acceptable parameters - load it into var playerChoice
    else if (96 < event.key.charCodeAt(0) && event.key.charCodeAt(0) < 123) {
      var yourChoice = event.key;
//Check to see if the letter has been chosen previously in the game
        if (wordString.indexOf(yourChoice) === -1 && wrongLetter.indexOf(yourChoice) === -1) {
//If the letter is not in the current word, decrement tries by 1
          if (currentWord.includes(yourChoice) === false) {
            triesRemaining--;
//If tries remaining for current word is greater than 0, put the value of yourChoice into the incorrect letter var
            if (triesRemaining > 0) {
             wrongLetter.push(yourChoice);
            }
//If tries remaining for current word is at 0, increment the losses
            else if (triesRemaining <= 0) {
              lostTries++;
//If the total number of words (10) has been played, change playing to false to end game play
              if ((wonTries + lostTries) >= 10) {
                playing = false;
              }
//If the total number of words has not been played, reset game play variables, play the lost try sound and change the display image
              else {
                resetAll();
                playAudio2();
                document.getElementById("gameImage").src = theImage;
              }
            }
          }
 //If the player choice is included in the current word, replace underscores with letters where necessary
          else if (currentWord.includes(yourChoice) === true) {
            for (i = 0; i < currentWord.length; i++) {
              if (yourChoice == currentWord[i]) {
              wordString[i] = yourChoice;
//Check to see if wordString is the complete word from the round. If there are no underscores left, the word is successfully figured out - a win
              if (wordString.indexOf("_") === -1) {
//Increment wins by 1
                  wonTries++;
//Check to see if wins and losses = 10, signaling the end of the game
                  if ((wonTries + lostTries) >= 10) {
//If true, set playing to false to reset the game
                    playing = false;
                  }
                  else {
//If game play is still happening, reset variables, play winning audio sound and display game image
                    resetAll();
                    playAudio1();
                    document.getElementById("gameImage").src = theImage;
                  }
                }
              }
            }
          }
//Display gameplay text in current game box
          document.getElementById("word-string").innerHTML = wordString.join(" ");
//To keep formatting consistent, display a dummy string where incorrect guesses string normally goes during gameplay
          if (wrongLetter.length === 0) {
            document.getElementById("wrong-letter").innerHTML = "_ _ _ _ _ _ _";
          }
          else {
          document.getElementById("wrong-letter").innerHTML = wrongLetter;
          }
          document.getElementById("guesses-left").innerHTML = "Guesses Left: " + triesRemaining;
          document.getElementById("current-score").innerHTML = "Current Score: " +  wonTries;
          document.getElementById("missed-attempts").innerHTML = "Missed Attempts: " + lostTries;
        }
    }

  }
}
//Function to reset gameplay variables
function resetAll() {
  triesRemaining = 10;
  wrongLetter = [];
  rightLetter = [];
  currentWord = [];
  wordString = [];
  randWord = Math.floor(Math.random() * wordList.length);
  currentWord = wordList[randWord];
  wordList.splice(randWord, 1);
  for (i = 0; i < currentWord.length; i++) {
    wordString.push("_");
    document.getElementById("word-string").innerHTML = wordString.join(" ");
  }
  randImg = Math.floor(Math.random() * imageList.length);
  currentImg = imageList[randImg];
  theImage = "assets/images/" + currentImg;
  imageList.splice(randImg, 1);
}
//Function to play success wav
function playAudio1() {
  audioYes.play();
}
//function to play missed attempt wav
function playAudio2() {
  audioNo.play();
}
//function to play background music
function playAudioBkd() {
  audioBkd.play();
}
//Function to stop background music at end of game
function stopAudioBkd() {
  audioBkd.pause();
  audioBkd.currentTime = 0;
}
//Function to play end of game wav
function endGameAudio() {
  audioEnd.play();
}
//Function to reload game
function restart() {
  document.location.reload();
}
