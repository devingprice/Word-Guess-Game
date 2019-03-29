class ScreenCapQuiz {
    constructor(words, gameElem) {
        this.gameElem = gameElem;

        this.finished = false;
        this.gameReady = true;

        this.wins = 0;
        this.strikesRemaining = 3;
        this.lettersGuessed = [];

        this.index = 0;
        this.data = words;
        this.title = this.data[this.index].title;
        this.image = this.data[this.index].image;
       
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
            if(!this.keyInWord(keyPressed, this.title)){
                this.strikesRemaining -= 1;
                this.playWrong();
            } else {
                this.playRight();
            }
            if(this.strikesRemaining === 0){
                this.lose();
            }
            if(this.guessedAll(this.title, this.lettersGuessed)){
                this.win();
                this.playVictory();
            }
        }
        
        this.putResultsInPlaces();
        if(this.gameReady){
            this.reset();
            this.nextWord();
        }   
    }
    
    isValidKey(key){
        return /^[a-zA-Z0-9]$/i.test(key); //from https://forums.asp.net/t/1289763.aspx?Regular+Expression+Validator+Letters+and+Numbers+only+
    }
    keyInWord(key, word){
        var lowerCaseWord = word.toLowerCase();
        var lowerCaseLetter = key.toLowerCase();
        return lowerCaseWord.indexOf(lowerCaseLetter) !== -1;
    }
    guessedAll(word, letters){
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
        this.messageHTML = "<div>You lost!</div><div> Answer was: "+this.title+"</div><div>Press Any Key to Continue</div>";
    }
    playWrong(){
        document.getElementById('audio-wrong').play();
    }
    playRight(){
        document.getElementById('audio-right').play();
    }
    playVictory(){
        document.getElementById('audio-win').play();
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
        if(this.index < this.data.length -1){
            this.index++
            this.title = this.data[this.index].title;
            this.image = this.data[this.index].image;
        } else {
            console.log('finished')
            this.finished = true;
            
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
                "<img class='screenshot-img' src='"+ this.image + "'>" +
                "<div class='message-container' id='message-container'><div class='frame message-frame'><div class='frame-inside message-inside'>"+ 
                this.messageHTML + 
                "</div></div></div>"
            )
        } else {
            document.getElementById('image-container').innerHTML = (
                "<img class='screenshot-img' src='"+ this.image + "'>"
            )
        }
        document.getElementById('strikesNum').innerText = this.strikesRemaining;
        
        var incorrectLetters = '';
        for(var i=0; i<this.lettersGuessed.length; i++){
            if(!this.keyInWord(this.lettersGuessed[i], this.title)){
                incorrectLetters += "<div class='tile '>" + this.lettersGuessed[i] + "</div>";
            } //used to use faded class   tile--small
        }
        
        document.getElementById('guessedWords').innerHTML = incorrectLetters;
        document.getElementById('winsNum').innerText = this.wins;
        document.getElementById('solution-container').innerHTML = this.createSolutionHTML(this.title,this.lettersGuessed);
    }
}

/*
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
]*/

var gameElem = document.getElementById('game');

var game = new ScreenCapQuiz(sources, gameElem)

document.onkeydown = function(evt){
    document.getElementById('startMessage').setAttribute("style", "display:none");
    document.getElementById('frame-container').setAttribute("style", "display:flex"); 
    
    if(!game.finished){
        game.runGame(evt.key);
    }
    
}

console.log('loaded js')