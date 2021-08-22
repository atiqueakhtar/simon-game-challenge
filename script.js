var clickSequence = [];
var colorSeq = [];
var level = 0;
var started = false;

$(document).keydown(() => {
    if(started == false){
        $("h1").text("Level" + level);
        setTimeout(nextSequence, 500);
        started = true;
    }
});

function nextSequence(){    
    clickSequence = [];
    level++;
    var randomNumber = Math.floor(Math.random()*4);
    var colorsArray = ["red", "blue", "green", "yellow"];
    buttonFlash(colorsArray[randomNumber]);
    colorSeq.push(colorsArray[randomNumber]);
    console.log(colorSeq)
}

function buttonFlash(color){
    $("#" + color).fadeOut(100).fadeIn(100);
    var audio = new Audio("./sounds/" + color + ".mp3");
    audio.play();   
}

$(".btn").click((e) => {
    var colorClicked = e.currentTarget.id;
    buttonFlash(colorClicked);
    var audio = new Audio("./sounds/" + colorClicked + ".mp3");
    audio.play();  
    clickSequence.push(colorClicked);
    console.log(clickSequence)
    checkAnswer(clickSequence.length-1);
});

function checkAnswer(currLevel){
    if(clickSequence[currLevel] == colorSeq[currLevel]){
        if(clickSequence.length == colorSeq.length){
            setTimeout(() => {
                nextSequence();
            }, 1000)
        }
    }
    else{
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();  
        $("body").addClass("game-over");
        $("#level-title").text("Press Any Key To Restart.")
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver(){
    level = 0;
    colorSeq = [];
    started = false;
}

