document.body.addEventListener('click', clickOrTouch, true)
document.body.addEventListener('touch', clickOrTouch, true)
document.body.addEventListener('click touch', clickOrTouch, true)

function clickOrTouch(){
    console.log('clicked screen');
    document.getElementById('hidden-text').focus();
    console.log(document.getElementById('hidden-text').value);

}
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

var animationController = {
    count : 0,
    frameContainer: document.getElementById('frame-container'),
    startMessage: document.getElementById('startMessage'),
    handleAnimations: function(){
        if( this.count === 0){
            this.start();
        } else if ( this.count === 1){
            this.first();
        } else if (this.count >1 ){
            this.after();
        }
    },
    start : function(){
        this.startMessage.setAttribute("style", "display:none");
        this.frameContainer.setAttribute("style", "display:flex"); 
        this.frameContainer.classList.remove('faded-out');
        this.frameContainer.classList.add("fade-in");
        this.count++;
    },
    first : function(){
        this.frameContainer.classList.remove('faded-in');
        this.frameContainer.classList.add("slide-sideways");
        this.count++;
    },
    after : function(){
        this.frameContainer.className = "";
        window.requestAnimationFrame(function(time) {
            window.requestAnimationFrame(function(time) {
                document.getElementById('frame-container').className = "slide-sideways";
            });
        });
        this.count++;
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
        if(this.gameReady){ // stop game until keypress at start 
            this.gameReady=false;
            animationController.handleAnimations();
            console.log('start playing')
        } else if (isValidKey(keyPressed)){ //if key is letter or num

            if(this.lettersGuessed.indexOf(keyPressed) === -1){ // if you havent already typed this
                console.log("new letter")
                this.lettersGuessed.push(keyPressed);  

                if(!keyInWord(keyPressed, this.title)){ //if not in title
                    this.strikesRemaining -= 1;
                    audioPlayer.wrong();
                } else { // is in title
                    audioPlayer.right();
                }

            }  else {
                console.log('old letter -> do nothing')
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

        //next round state update | not dom
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
                    wordContainer += "<div class='entered tile'>" + individualWords[i][j] + "</div>";
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
                incorrectLetters += "<div class='tile--small '>" + this.lettersGuessed[i] + "</div>";
            }
        }
        
        document.getElementById('guessedWords').innerHTML = incorrectLetters;
        document.getElementById('winsNum').innerText = this.wins;
        document.getElementById('solution-container').innerHTML = this.createSolutionHTML(this.title,this.lettersGuessed);
    }
}


var game = quizObject; 

document.onkeydown = function(evt){
    //document.getElementById('tempAddTo').textContent += evt.key;
    var key = evt.key;
    // if( key === 'unidentified' || evt.keyCode === 229 ){
    //     key =
    // }
    if(!game.finished){
        game.runGame( key);
    } 
}
document.getElementById('hidden-text').addEventListener('input', function(e){
    var key = e.srcElement.value[e.srcElement.value.length-1];
    // document.getElementById('tempAddTo').textContent += key;
    if(!game.finished){
        game.runGame( key);
    } 
})
console.log('loaded js')