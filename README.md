# word-guess-game
A word guess game utilizing javascript
## OVERVIEW
This is a web browser game where the player is given a random word from a list of ten 1980s slang words.

Jean Michel Jarre's Oxygene 4 plays in the background

Sound clips from the movie Fast Times at Ridgemont High play on events where the player is successful, fails and when the game ends.

### Following is the psuedocode I wrote for determining gameply

### Word Guess Game Play

* variables and type list
* wordList[] - list of 10 words to be chosen from
* imageList[] - list of ten pictures in the assets folder for display
* currentWord - word randomly chosen from wordList array
* yourChoice - represents key player chose
* gameWord[] - visual representation of word in play			DISPLAY ITEM
* wrongChoice[] - list of incorrect letters chosen during round		DISPLAY ITEM
* triesRemaining - number of key attempts left before end of round	DISPLAY ITEM
* wonTries - numeric representation of successful attempts		DISPLAY ITEM
* lostTries - numeric representation of unsuccessful attempts		DISPLAY ITEM

intro - press any key to continue
listening event, no var required

variables are emptied

new game word randomly chosen from wordList[]
  stored in currentWord
currentWord word is deleted (splice()) from wordList
gameWord is set as series of _ characters at length of currentWord to represent players view of word in play

Game play
  press any alpha key - prompt listening event
   is key alpha?
    |no
    | alert player to press alpha key
    |yes
      load key into var yourChoice
      does yourChoice match a letter in currentWord?
       |no
       | decrement triesRemaining by 1
       |  is triesRemaining = 0?
       |   |no
       |   | push character to wrongChoice array
       |   |yes
       |     increment lostTries by 1
       |     run functions for next round
       |yes
         replace "_" characters with alpha character in gameWord array
         is gameWord[] = currentWord?
           yes
            increment wonTries by 1
             is wonTries = 10?
               yes
                play game over sound
	        run functions for next round

  display
    gameWord
    wrongChoice
    triesRemaining
    wonTries
