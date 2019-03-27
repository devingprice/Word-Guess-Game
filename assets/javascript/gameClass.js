class ScreenCapQuiz {
    constructor(words, gameElem) {
        this.gameElem = gameElem;

        this.finished = false;
        this.gameReady = true;

        this.wins = 0;
        this.strikesRemaining = 3;
        this.lettersGuessed = [];

        this.index = 0;
        //this.words = words; /*
        this.words = words.map( movieObj => {
            return movieObj.title;
        });
        this.images = words.map( movieObj => {
            return movieObj.image;
        });

        this.messageHTML = '';
    }

    runGame(keyPressed){
        if(this.gameReady){
            this.gameReady=false;
            console.log('start playing')
        } else if (this.isValidKey(keyPressed)){

            if(this.lettersGuessed.indexOf(keyPressed) === -1){
                this.lettersGuessed.push(keyPressed);
            }

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
        //this.putResultsOnScreen();
        this.putResultsInPlaces();
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
        this.messageHTML = "<div>You lost!</div><div> Answer was: "+this.words[this.index]+"</div><div>Press Any Key to Continue</div>";
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
            this.finished = true;
            //this.gameElem.innerHTML += this.messageHTML;
            var messageContainer = document.getElementById('message-container');
            messageContainer.innerHTML = messageContainer.innerHTML.replace(
                "Press Any Key to Continue",
                "You have finished all of the words"
            )
        }
    }
    createSolutionHTML(word, lettersGuessed){
        var resultHTML = "";
        var individualWords = word.split(' ');
        for(var i=0; i<individualWords.length; i++){
            var wordContainer = "<div class='tile-container'>";
            
            for(var j=0; j<individualWords[i].length; j++){
                
                if(this.keyInWord(individualWords[i][j], lettersGuessed.join(""))){
                    wordContainer += "<div class='wooden tile'>" + individualWords[i][j] + "</div>";
                } else {
                    wordContainer += "<div class='empty tile'>"  + "</div>";
                }
            }
    
            wordContainer += "</div>"
            resultHTML += wordContainer;
        }
        return resultHTML;
    }

    putResultsInPlaces(){
        if(this.messageHTML !== ''){
            document.getElementById('image-container').innerHTML = (
                "<img class='screenshot-img' src='"+ this.images[this.index] + "'>" +
                "<div class='message-container' id='message-container'>"+ this.messageHTML + "</div>"
            )
        } else {
            document.getElementById('image-container').innerHTML = (
                "<img class='screenshot-img' src='"+ this.images[this.index] + "'>"
            )
        }
        document.getElementById('strikesNum').innerText = this.strikesRemaining;
        
        var incorrectLetters = '';
        for(var i=0; i<this.lettersGuessed.length; i++){
            if(!this.keyInWord(this.lettersGuessed[i], this.words[this.index])){
                incorrectLetters += "<div class='faded tile tile--small'>" + this.lettersGuessed[i] + "</div>";
            }
        }
        
        document.getElementById('guessedWords').innerHTML = incorrectLetters;
        document.getElementById('winsNum').innerText = this.wins;

        document.getElementById('solution-container').innerHTML = this.createSolutionHTML(this.words[this.index],this.lettersGuessed);
    }
}


var sources = [
    { 
        image: 'https://img.buzzfeed.com/buzzfeed-static/static/2018-12/16/16/enhanced/buzzfeed-prod-web-06/enhanced-8749-1544995921-7.jpg?downsize=800:*&output-format=auto&output-quality=auto',
        title: 'Peter Pan'
    },
    {
        image: 'https://img.buzzfeed.com/buzzfeed-static/static/2018-12/16/16/enhanced/buzzfeed-prod-web-01/enhanced-14589-1544994583-1.jpg?downsize=800:*&output-format=auto&output-quality=auto',
        title: 'Snow White and the Seven Dwarfs'
    },
    { 
        image: 'https://img.buzzfeed.com/buzzfeed-static/static/2018-12/16/16/enhanced/buzzfeed-prod-web-06/enhanced-7509-1544994782-1.jpg?downsize=800:*&output-format=auto&output-quality=auto',
        title: 'Mulan'
    },
    { 
        image: 'https://img.buzzfeed.com/buzzfeed-static/static/2018-12/16/16/enhanced/buzzfeed-prod-web-04/enhanced-7887-1544995461-1.jpg?downsize=800:*&output-format=auto&output-quality=auto',
        title: 'The Little Mermaid'
    },
    { 
        image: 'https://img.buzzfeed.com/buzzfeed-static/static/2018-12/16/16/enhanced/buzzfeed-prod-web-06/enhanced-8487-1544995699-1.jpg?downsize=800:*&output-format=auto&output-quality=auto',
        title: 'Sleeping Beauty'
    }
]

var gameElem = document.getElementById('game');

var game = new ScreenCapQuiz(sources, gameElem)

document.onkeydown = function(evt){
    document.getElementById('startMessage').setAttribute("style", "display:none");
    document.getElementById('game').setAttribute("style", "display:flex");
    
    if(!game.finished){
        game.runGame(evt.key);
    }
    
}

/*


    putResultsOnScreen(){
        var wordsContainer =
        "<div class='words-container'>" +
            "<div class='stats-container'>" +
            this.createStrikesHTML(this.strikesRemaining) +
            this.createLettersGuessedHTML(this.lettersGuessed) +
            this.createWinsHTML(this.wins) +
            "</div>" +
            //this.createBlanksHTML(this.words[this.index], this.lettersGuessed) +
            this.createTileGroupHTML(this.words[this.index], this.lettersGuessed) +
            //this.messageHTML +
        "</div>";

        var messageContainer = this.createMessageHTML(this.messageHTML);

        var imageContainer = "<div class='image-container'>"+
        "<img class='screenshot-img' src='"+ this.images[this.index] + "'>" + 
        messageContainer +
        "</div>"

        gameElem.innerHTML = "<div class='game-container'>"+ imageContainer + wordsContainer  + "</div>";
    }
    createMessageHTML(message){
        if(message !== ''){
            return "<div class='message-container'>"+
            message + "</div>";
        } else {
            return ""
        }
    }
    createWinsHTML(wins){
        return "<div class='wins-container'>" + 
            "<div class='wins--header'>Wins:</div> " +
            "<div class='winsNum'>" + wins + "</div>" +
        "</div>";
    }
    createStrikesHTML(strikeNum){
        return "<div class='strikes-container'>" + 
            "<div class='stikes--header'>Guesses Remaining:</div> " +
            "<div class='strikesNum'>" + strikeNum + "</div>" +
        "</div>";
    }
    createLettersGuessedHTML(lettersArray){
        var resultHTML = "<div class='guessed-container'>"+
        "<div class='guessed--header'>Incorrect Guesses </div> " +
        "<div class='tile-container'>";
        for(var i=0; i<lettersArray.length; i++){

            // only display incorrect guesses
            if(!this.keyInWord(lettersArray[i], this.words[this.index])){
                resultHTML += "<div class='faded tile tile--small'>" + lettersArray[i] + "</div>";
            }

        }
        resultHTML += "</div></div>"
        return resultHTML;
    }
    createTileGroupHTML(word, lettersGuessed){
        var resultHTML = "<div class='solution-container'>";
        var individualWords = word.split(' ');
        for(var i=0; i<individualWords.length; i++){
            var wordContainer = "<div class='tile-container'>";
            
            for(var j=0; j<individualWords[i].length; j++){
                
                if(this.keyInWord(individualWords[i][j], lettersGuessed.join(""))){
                    wordContainer += "<div class='wooden tile'>" + individualWords[i][j] + "</div>";
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
*/