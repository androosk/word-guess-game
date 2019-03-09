//1980s Dialup BBS styled wordgame
var dt = new Date();
document.getElementById("date").innerHTML = dt;

var i = 0;
var txt = 'Press any key to play'; /* The text */
var speed = 50; /* The speed/duration of the effect in milliseconds */

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("marquis").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
typeWriter();

var wonTries = 0;
var lostTries= 0;
var triesRemaining = 10;
var wordList = ["totally", "grody", "tubular", "chill", "bitchin", "righteous", "gnarly", "dude", "awesome", "radical"];
var imageList = ["allisonbreakfastclubrs.jpg", "backtofuturers.jpg", "bensteinrs.png", "bfstclbrs.jpg", "fbdors.jpg", "ghostbustersrs.jpg", "gooniesrs.jpg", "pretty_in_pink_duckyrs.jpg", "spicolirs.png", "valley-girlrs.jpg"];
var soundList = ["gnarly.wav", "tappin.wav", "totally.wav"];
var audioYes = new Audio("assets/sounds/totally.wav");
var audioNo = new Audio("assets/sounds/gnarly.wav");
var audioBkd = new Audio("assets/sounds/oxygene.mp3");
var answers = "";
var currentImg = "";
var currentWord = "";
var wrongLetter = [];
var rightLetter = [];
var wordString = [];
var randWord = 0;
var randImg = 0;
var playing = false;

document.getElementById("gameImage").src = "assets/images/8bitgw.jpg";

document.onkeyup = function() {
    resetWord();
    resetImg();
    playAudioBkd();
    playing = true;
    document.getElementById("marquis").innerHTML = "Pick letters to solve the puzzle.";
    document.getElementById("gameImage").src = theImage;

  document.onkeyup = function(event) {
    if (playing == true && 96 > event.key.charCodeAt(0) || event.key.charCodeAt(0) > 123) {
      alert("Please select a letter!");
    }
    else if (96 < event.key.charCodeAt(0) && event.key.charCodeAt(0) < 123) {
      var yourChoice = event.key;

        if (wordString.indexOf(yourChoice) === -1 && wrongLetter.indexOf(yourChoice) === -1) {

          if (currentWord.includes(yourChoice) === false) {
            triesRemaining--;

            if (triesRemaining > 0) {
             wrongLetter.push(yourChoice);
            }
            else if (triesRemaining <= 0) {
              resetVars();
              resetWord();
              resetImg();
              playAudio2();
              lostTries++
              document.getElementById("gameImage").src = theImage;
            }
          }
          else if (currentWord.includes(yourChoice) === true) {
            for (i = 0; i < currentWord.length; i++) {
              if (yourChoice == currentWord[i]) {
              wordString[i] = yourChoice;
                if (wordString.indexOf("_") === -1) {
                  wonTries++;
                  resetVars();
                  resetWord();
                  resetImg();
                  playAudio1();
                  document.getElementById("gameImage").src = theImage;
                }
              }
            }
          }
          document.getElementById("word-string").innerHTML = wordString.join(" ");
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

function resetVars() {
  triesRemaining = 10;
  wrongLetter = [];
  rightLetter = [];
  currentWord = [];
}

function resetWord() {
  wordString = [];
  randWord = Math.floor(Math.random() * wordList.length);
  currentWord = wordList[randWord];
  wordList.splice(randWord, 1);
  for (i = 0; i < currentWord.length; i++) {
    wordString.push("_");
    document.getElementById("word-string").innerHTML = wordString.join(" ");
  }
}
function resetImg() {
  randImg = Math.floor(Math.random() * imageList.length);
  currentImg = imageList[randImg];
  theImage = "assets/images/" + currentImg;
  imageList.splice(randImg, 1);
}
function playAudio1() {
  audioYes.play();
}
function playAudio2() {
  audioNo.play();
}
function playAudioBkd() {
  audioBkd.play();
}
