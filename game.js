var gamePattern = [];
var userClickedPattern = [];
var i=0;

var buttonColors = ["green" , "red", "yellow", "blue"];

var check = false;
var level = 0;

$(document).keypress(function () {
  if(!check){
    $("h1").text("Level " + level);
    nextSequence();
    check = true;
  }
});


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  level++;
  $("h1").text("Level " + level);
     var randomNumber;
     randomNumber = Math.floor(Math.random()*4);
     var randomChosenColour = buttonColors[randomNumber];
     gamePattern.push(randomChosenColour);
     animatePress(randomChosenColour);
     playSound(randomChosenColour);
}


$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(i);
});


function checkAnswer(currentLevel){
    if(gamePattern[i] === userClickedPattern[i]){
      i++;
      if(i==level){
        i=0;
        userClickedPattern=[];
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    }
    else{
      gamePattern=[];
      userClickedPattern=[];
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      $("h1").text("Game over! Press any key to restart the game.");
      level = 0;
      check = false;
    }

}
