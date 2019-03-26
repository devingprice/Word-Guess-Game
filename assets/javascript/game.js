var gameElem = document.getElementById('game');
var playing = false;
var finished = false;
var gameReady = true;
var messageHTML = '';

var wins = 0;
var strikesRemaining = 3;
var lettersGuessed = [];

var words = ['Madonna', 'KatyPerry'];
var index = 0;

function runGame(keyPressed){
    if(gameReady){
        gameReady=false;
        console.log('start playing')
    } else if (isValidKey(keyPressed)){
        lettersGuessed.push(keyPressed);
        if(!keyInWord(keyPressed,words[index])){
            strikesRemaining -= 1;
        }
        if(strikesRemaining === 0){
            lose();
        }
        if(guessedAllBool(words[index],lettersGuessed)){
            win();
        }
    }
    putResultsOnScreen();
    if(gameReady){
        reset();
        nextWord();
    }
}
function isValidKey(key){
    return /^[a-z0-9]$/i.test(key);
}
function keyInWord(key, word){
    var lowerCaseWord = word.toLowerCase();
    var lowerCaseLetter = key.toLowerCase();
    return lowerCaseWord.indexOf(lowerCaseLetter) !== -1;
}
function guessedAllBool(word, letters){
    return createBlanksString(word, letters) ===
        word.split('').join(' ')+" ";
}
function lose(){
    console.log('lose');
    gameReady = true;//playing = false;
    messageHTML = "<div>"+words[index]+"</div><div>You lost!</div><div>Press Any Key to Continue</div>";
}
function win(){
    console.log('win');
    gameReady = true; //playing = false;
    wins++;
    messageHTML = "<div>You Won!</div><div>Press Any Key to Continue</div>";
}
function reset(){
    strikesRemaining = 3;
    lettersGuessed = [];
    messageHTML = '';
}
function nextWord(){
    if(index < words.length -1){
        index++
    } else {
        console.log('finished')
        messageHTML = "You have finished all of the words"
        finished = true;
        gameElem.innerHTML += messageHTML;
        //document.write(messageHTML)
    }
}
function putResultsOnScreen(){
    var strikesString = "<div>Number of Guesses remaining: " 
        + strikesRemaining + 
        "</div>";
    var guessedString = "<div>Letters Guessed: " + 
        lettersGuessed.join(', ') +
        "</div>";
    var blanksString = "<div>"+
        createBlanksString(words[index], lettersGuessed) +
        "</div>";

    gameElem.innerHTML=(
        strikesString +
        guessedString +
        blanksString +
        messageHTML
    );
}
function createBlanksString(word, lettersGuessed){
    var resultString = '';
    for(var i=0;i<word.length;i++){
        if(keyInWord(word[i], lettersGuessed.join(""))){
        //if(lettersGuessed.indexOf(word[i]) !== -1){
            // if letter is in lettersGuessed
            resultString += word[i]+" ";
        } else {
            resultString += "_ ";
        }
    }
    return resultString;
}


document.onkeydown = function(evt){
    if(!finished){
        runGame(evt.key);
    }
    
}