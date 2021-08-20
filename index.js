var level=0;
var colorArray=["red","blue","green","yellow"];
var userPressed=[];
var gamePattern=[];
started = false;

$(document).keypress(function(){

  if(started===false){
    started=true;
    $("h1").text("level "+level);
    nextSequence();
  }
});

$(".btn").click(function(){
  var colorOfButton=$(this).attr("id");
  playSound(colorOfButton);
  animate(colorOfButton);
  userPressed.push(colorOfButton);
  check(userPressed.length-1);
})

function check(currentLevel){
  if(userPressed[currentLevel]===gamePattern[currentLevel]){
    if(userPressed.length===gamePattern.length){

      userPressed=[];
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else{
    var x="wrong";
    playSound(x);
    $("body").addClass("game-over");
    $("h1").text("game over, press any key to restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 1000);
    restart();

  }
}

function nextSequence(){
  level++;
  $("h1").text("level "+level);
  var temp=Math.floor(Math.random()*4);
  var value=colorArray[temp];
  playSound(value);
  animate(value);
  gamePattern.push(value);
}
function playSound(colorOfButton){
  var audio=new Audio("sounds/"+colorOfButton+".mp3");
  audio.play();
}

function animate(colorOfButton){
  $("."+colorOfButton).addClass("pressed");
  $("."+colorOfButton).fadeOut(100).fadeIn(100);
  setTimeout(function () {
    $("."+colorOfButton).removeClass("pressed");
  },10);
}

function restart(){
  started=false;
  level=0;
  gamePattern=[];
  userPressed=[];
}
