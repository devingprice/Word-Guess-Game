function isValidKey(key){
    return /^[a-zA-Z0-9]$/i.test(key); //from https://forums.asp.net/t/1289763.aspx?Regular+Expression+Validator+Letters+and+Numbers+only+
}
function keyInWord(key, word){
    var lowerCaseWord = word.toLowerCase();
    var lowerCaseLetter = key.toLowerCase();
    return lowerCaseWord.indexOf(lowerCaseLetter) !== -1;
}
function guessedAll(word, letters){
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
var audioPlayer = {
    right: function (){
        document.getElementById('audio-right').play();
    },
    wrong: function (){
        document.getElementById('audio-wrong').play();
    },
    victory: function(){
        document.getElementById('audio-win').play();
    }
}

var quizObject = {
    finished : false,
    gameReady : true,
    wins : 0,
    strikesRemaining : 3,
    lettersGuessed : [],
    index : 0,
    data : sources,
    title : sources[0].title,//just initializing  this.data[this.index].title,
    image : sources[0].image,//just initializing  this.data[this.index].image,
    messageHTML : '',
    runGame : function(keyPressed){
        if(this.gameReady){ // stop game until keypress at start or in between rounds
            this.gameReady=false;
            console.log('start playing')
        } else if (isValidKey(keyPressed)){ //if key is letter or num

            if(this.lettersGuessed.indexOf(keyPressed) === -1){ // if you havent already typed this
                this.lettersGuessed.push(keyPressed);  
                console.log(this.lettersGuessed)
            } else { //if new letter
                if(!keyInWord(keyPressed, this.title)){ //if not in title
                    console.log("keypressed:",keyPressed, this.title)
                    console.log(keyInWord(keyPressed, this.title))
                    this.strikesRemaining -= 1;
                    audioPlayer.wrong();
                } else {
                    audioPlayer.right();
                }
            }
            
            // win lose conditions
            if(this.strikesRemaining === 0){
                this.lose();
            } else if(guessedAll(this.title, this.lettersGuessed)){
                this.win();
                audioPlayer.victory();
            }
        }
        
        this.putResultsInPlaces(); //display
        //next round
        if(this.gameReady){
            this.reset();
            this.nextWord();
        }   
    },
    lose : function(){
        console.log('lose');
        this.gameReady = true;
        this.messageHTML = "<div>You lost!</div><div> Answer was: "+this.title+"</div><div>Press Any Key to Continue</div>";
    },
    win : function(){
        console.log('win');
        this.gameReady = true; 
        this.wins++;
        this.messageHTML = "<div>You Won!</div><div>Press Any Key to Continue</div>";
    },
    reset : function(){
        this.strikesRemaining = 3;
        this.lettersGuessed = [];
        this.messageHTML = '';
    },
    nextWord : function(){
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
    },
    createSolutionHTML : function(){
        var resultHTML = "";
        var individualWords = this.title.split(' ');
        for(var i=0; i<individualWords.length; i++){
            var wordContainer = "<div class='tile-container'>";
            
            for(var j=0; j<individualWords[i].length; j++){
                
                if(keyInWord(individualWords[i][j], this.lettersGuessed.join(""))){
                    wordContainer += "<div class='wooden tile'>" + individualWords[i][j] + "</div>";
                } else {
                    wordContainer += "<div class='empty tile'>"  + "</div>";
                }
            }
    
            wordContainer += "</div>"
            resultHTML += wordContainer;
        }
        return resultHTML;
    },
    putResultsInPlaces : function(){
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
            if(!keyInWord(this.lettersGuessed[i], this.title)){
                incorrectLetters += "<div class='tile '>" + this.lettersGuessed[i] + "</div>";
            }
        }
        
        document.getElementById('guessedWords').innerHTML = incorrectLetters;
        document.getElementById('winsNum').innerText = this.wins;
        document.getElementById('solution-container').innerHTML = this.createSolutionHTML(this.title,this.lettersGuessed);
    }
}


var game = quizObject; 

document.onkeydown = function(evt){
    //runs every click but just resets this value over and over
    document.getElementById('startMessage').setAttribute("style", "display:none");
    document.getElementById('frame-container').setAttribute("style", "display:flex"); 
    
    if(!game.finished){
        game.runGame(evt.key);
    }
    
}

console.log('loaded js')