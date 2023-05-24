var buttonColours=["red", "blue", "green", "yellow"]
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var checkAnswerCount=0;
var started = false;


$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


function nextSequence(){
    level++;
    userClickedPattern = [];
    $("#level-title").text("Level " + level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    console.log(gamePattern);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

} 
$(".btn").on("click",function (e) {

       var userChosenColour= e.target.id;
       userClickedPattern.push(userChosenColour);

       playSound(userChosenColour);
       animatePress(userChosenColour);

       checkAnswer(userClickedPattern.length-1);
    // console.log(userClickedPattern.length-1);
}); 



//Game logic


function checkAnswer(currentLevel)
{
    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
      } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
  
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}




//Sound
function playSound(name){
     
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


// Animation
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
  
    setTimeout(function() {
        $("#"+currentColour).removeClass('pressed');
    }, 100);
  }

  function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
