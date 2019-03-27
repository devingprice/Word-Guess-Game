var gameElem = document.getElementById('game');
var playing = false;
var finished = false;
var gameReady = true;
var messageHTML = '';

var wins = 0;
var strikesRemaining = 3;
var lettersGuessed = [];

var words = ['Katy Perry', 'Madonna', 'Snoop'];
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
        if(guessedAllBool(words[index], lettersGuessed)){
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
    //return createBlanksString(word, letters) ===
    //    word.split('').join(' ')+" ";
    
    for(var i=0;i<word.length;i++){
        if (!( letters.indexOf(word[i].toUpperCase()) !== -1 ||
            letters.indexOf(word[i].toLowerCase()) !== -1
        )){
            if( word[i] !== " "){
                //console.log("doesn't contain " + word[i])
                return false;
            }
        }
    }
    return true;
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
        createTileGroup(words[index], lettersGuessed) +
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
        } else if(word[i]===" "){
            resultString += "&nbsp;&nbsp;&nbsp;";
        } else {
            resultString += "_ ";
        }
    }
    return resultString;
}
function createTileGroup(word, lettersGuessed){
    var resultHTML = '<div>';
    var individualWords = word.split(' ');
    console.log(individualWords)
    for(var i=0; i<individualWords.length; i++){
        var wordContainer = "<div class='tile-container'>";
        
        for(var j=0; j<individualWords[i].length; j++){

            if(keyInWord(individualWords[i][j], lettersGuessed.join(""))){
                wordContainer += "<div class='wooden tile'>" + individualWords[i][j] + "</div>";
            } else if(word[i]===" "){ //shouldnt reach this after splitting, dead code
                wordContainer += "<div class='wooden tile'>" + " " + "</div>";
            } else {
                wordContainer += "<div class='empty tile'>"  + "</div>";
            }

            //wordContainer += "<div class='tile'>" + individualWords[i][j] + "</div>";
        }

        wordContainer += "</div>"
        console.log(wordContainer)
        resultHTML += wordContainer;
    }
    resultHTML += "</div>"
    return resultHTML;
}

document.onkeydown = function(evt){
    if(!finished){
        runGame(evt.key);
    }
    
}