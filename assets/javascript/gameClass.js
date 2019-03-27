class ScreenCapQuiz {
    constructor(height, width, words, gameElem) {
        this.height = height;
        this.width = width;

        this.gameElem = gameElem;
        this.finished = false;
        this.gameReady = true;

        this.wins = 0;
        this.strikesRemaining = 3;
        this.lettersGuessed = [];
        this.words = words;
        this.index = 0;

        var messageHTML = '';
    }

    runGame(keyPressed){
        if(this.gameReady){
            this.gameReady=false;
            console.log('start playing')
        } else if (this.isValidKey(keyPressed)){
            this.lettersGuessed.push(keyPressed);
            if(!this.keyInWord(keyPressed, this.words[this.index])){
                this.strikesRemaining -= 1;
            }
            if(this.strikesRemaining === 0){
                this.lose();
            }
            if(this.guessedAllBool(this.words[this.index], this.lettersGuessed)){
                this.win();
            }
        }
        this.putResultsOnScreen();
        if(this.gameReady){
            this.reset();
            this.nextWord();
        }   
    }
    
    isValidKey(key){
        return /^[a-z0-9]$/i.test(key);
    }
    keyInWord(key, word){
        var lowerCaseWord = word.toLowerCase();
        var lowerCaseLetter = key.toLowerCase();
        return lowerCaseWord.indexOf(lowerCaseLetter) !== -1;
    }
    guessedAllBool(word, letters){
        for(var i=0;i<word.length;i++){
            if (!( letters.indexOf(word[i].toUpperCase()) !== -1 ||
                letters.indexOf(word[i].toLowerCase()) !== -1
            )){
                if( word[i] !== " "){
                    return false;
                }
            }
        }
        return true;
    }
    lose(){
        console.log('lose');
        this.gameReady = true;
        this.messageHTML = "<div>"+this.words[this.index]+"</div><div>You lost!</div><div>Press Any Key to Continue</div>";
    }
    win(){
        console.log('win');
        this.gameReady = true; 
        this.wins++;
        this.messageHTML = "<div>You Won!</div><div>Press Any Key to Continue</div>";
    }
    reset(){
        this.strikesRemaining = 3;
        this.lettersGuessed = [];
        this.messageHTML = '';
    }
    nextWord(){
        if(this.index < this.words.length -1){
            this.index++
        } else {
            console.log('finished')
            this.messageHTML = "You have finished all of the words"
            this.finished = true;
            this.gameElem.innerHTML += this.messageHTML;
        }
    }
    putResultsOnScreen(){
        var strikesString = "<div>Number of Guesses remaining: " 
            + this.strikesRemaining + 
            "</div>";
        
        var blanksString = "<div>"+
            this.createBlanksString(this.words[this.index], this.lettersGuessed) +
            "</div>";
        
        gameElem.innerHTML=(
            strikesString +
            this.createLettersGuessedHTML(this.lettersGuessed) +
            blanksString +
            this.createTileGroupHTML(this.words[this.index], this.lettersGuessed) +
            this.messageHTML
        );
    }
    createBlanksString(word, lettersGuessed){
        var resultString = '';
        for(var i=0;i<word.length;i++){
            if(this.keyInWord(word[i], lettersGuessed.join(""))){
                resultString += word[i]+" ";
            } else if(word[i]===" "){
                resultString += "&nbsp;&nbsp;&nbsp;";
            } else {
                resultString += "_ ";
            }
        }
        return resultString;
    }
    createLettersGuessedHTML(lettersArray){
        var resultHTML = '<div class="guessed tile-container">';
        for(var i=0; i<lettersArray.length; i++){
            resultHTML += "<div class='faded tile tile--small'>" + lettersArray[i] + "</div>";
        }
        resultHTML += "</div>"
        return resultHTML;
    }
    createTileGroupHTML(word, lettersGuessed){
        var resultHTML = '<div>';
        var individualWords = word.split(' ');
        for(var i=0; i<individualWords.length; i++){
            var wordContainer = "<div class='tile-container'>";
            
            for(var j=0; j<individualWords[i].length; j++){
    
                if(this.keyInWord(individualWords[i][j], lettersGuessed.join(""))){
                    wordContainer += "<div class='wooden tile'>" + individualWords[i][j] + "</div>";
                } else if(word[i]===" "){ //shouldnt reach this after splitting, dead code
                    wordContainer += "<div class='wooden tile'>" + " " + "</div>";
                } else {
                    wordContainer += "<div class='empty tile'>"  + "</div>";
                }
            }
    
            wordContainer += "</div>"
            resultHTML += wordContainer;
        }
        resultHTML += "</div>"
        return resultHTML;
    }
}


var gameElem = document.getElementById('game');

var game = new ScreenCapQuiz(0,0,['Katy Perry', 'Madonna', 'Snoop'], gameElem)

document.onkeydown = function(evt){
    if(!game.finished){
        game.runGame(evt.key);
    }
    
}