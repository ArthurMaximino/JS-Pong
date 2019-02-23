//Getting the canvas and context elements.
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//Setting the defaultValue variable(which is a parameter for the menu displayed in the home, where the user selects if he wants to play the game, see the ranking or go the game credits screen)
var defaultValue = 1;
var leftScore = 0;
var rightScore = 0;
var ballX = 0;
var ballSpeedX = 5;
var ballY = (canvas.height/2) - 10;
var ballSpeedY = 5;
const paddleAbsolutePosition = ((canvas.height/2)-(155/2));
var paddleLeftInitPosition = paddleAbsolutePosition;
var paddleRightInitPosition = paddleAbsolutePosition;



//When the page is finnally loaded, we present the main menu, calling the renderMenu() function.
window.onload = function() {
 renderMenu(defaultValue);
}

//Let's define the renderMenu function, and use a switch case statement to make the user browse through the available options.
function renderMenu(initialValue) {
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.font = "80px Arial";
ctx.fillStyle = "white"
ctx.fillText("JS Pong", 355, 300);
switch (initialValue)
{
 case 1:
  callOptionBlock("Play game", 422, 550, true);
  callOptionBlock("Ranking", 422, 590);
  callOptionBlock("Credits", 422, 630);
  break;
 case 2:
  callOptionBlock("Play game", 422, 550);
  callOptionBlock("Ranking", 422, 590, true);
  callOptionBlock("Credits", 422, 630);
  break;
 case 3:
  callOptionBlock("Play game", 422, 550);
  callOptionBlock("Ranking", 422, 590);
  callOptionBlock("Credits", 422, 630, true);
  break;

}
}

//The function callOptionBlock is the menu item displayed, like "Ranking", for example.
function callOptionBlock(text, txPosX, txPosY, hover, select) {
ctx.font = "20px Arial";
ctx.fillStyle = "white"
ctx.fillText(text, txPosX, txPosY);
if (hover == true)
{
 ctx.fillStyle = "white";
 ctx.beginPath();
     ctx.moveTo(580,txPosY);
     ctx.lineTo(602,(txPosY-10));
     ctx.lineTo(602,(txPosY+10));
     ctx.fill();
}
     }

//By adding an event listener, the user can browse through the main menu using his keyboard;
document.addEventListener("keydown", this.check);
function check(e)
     {
      var code = e.keyCode;
     switch(code)
     {
      //The case 13 means the "enter" key.
      //When the user presses the "enter" key, he will be redirected to the item function. 
      case 13:
      document.removeEventListener("keydown", arguments.callee);
      var audio = new Audio("../assets/choose.wav");
      audio.play();
      if (defaultValue == 1)
      {
      gameStart();
      }
      break;
      //The case 38 means the "up" key.
      case 38:
      if (defaultValue == 1)
      {
        defaultValue = 3;
        renderMenu(3);
        var audio = new Audio('../assets/select.wav');
        audio.play();
      }
      else if (defaultValue == 2)
      {
        defaultValue = 1;
        renderMenu(defaultValue);
        var audio = new Audio('../assets/select.wav');
        audio.play();
      }
      else if (defaultValue == 3)
      {
        defaultValue = 2;
        renderMenu(defaultValue);
        var audio = new Audio('../assets/select.wav');
        audio.play();
      }
      break;
      //The case 40 means the "down" key.
      case 40:
      if (defaultValue == 1)
      {
        defaultValue = 2;
        renderMenu(defaultValue);
        var audio = new Audio('../assets/select.wav');
        audio.play();
      }
      else if (defaultValue == 2)
      {
        defaultValue = 3;
        renderMenu(defaultValue);
        var audio = new Audio('../assets/select.wav');
        audio.play();
      }
      else if (defaultValue == 3)
      {
        defaultValue = 1;
        renderMenu(defaultValue);
        var audio = new Audio('../assets/select.wav');
        audio.play();
      }
      break;
     }
     }


//If the users selects the "Play game" option, he will end up here in this function
function gameStart() {
  setInterval(function(){
    hud();
    leftPaddle(paddleLeftInitPosition);
    rightPaddle(paddleRightInitPosition);
    //rightPaddle(paddleRightInitPosition);
    ballSpeedRegulation();
    score();
  }, 1000/65);
}

function hud() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fillRect(2, 2, (canvas.width-4), 10);
  ctx.fillStyle = "white";
  ctx.fillRect(2, (canvas.height-12), (canvas.width-4), 10);
  ctx.fillStyle = "white";
  for (var i = 10; i<(canvas.height - 10); i++)
  {
   ctx.fillRect(((canvas.width/2)-(10/2)), i, 10, 19);
   i = i+25;
  };
}
document.addEventListener("keydown", this.moveLeft);

function moveLeft(e) {
  var code = e.keyCode;
  switch(code)
  {
  case 38:
  if (paddleLeftInitPosition > 20)
  {
  paddleLeftInitPosition -= 8;
  }
  break;
  case 40:
  if (paddleLeftInitPosition < (canvas.height - 175))
  {
  paddleLeftInitPosition += 8;
  }
  break;
  }
}
function leftPaddle(paddleValueLeft) {

  ctx.fillStyle = "white";
  ctx.fillRect(5, paddleValueLeft, 20, 155);
};

function rightPaddle(paddleValueRight) {
  ctx.fillStyle = "white";
  ctx.fillRect(canvas.width - 25, paddleValueRight, 20, 155);
  if (paddleValueRight < ballY)
  {
    paddleRightInitPosition += 10;
  }
  else {
    paddleRightInitPosition -= 10;
  }
}

function ballSpeedRegulation(){
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(ballX, ballY, 10, 0, Math.PI*2, true);
  ctx.fill();
  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY;
  if (ballX > canvas.width)
  {
    if (ballY > (paddleRightInitPosition) && ballY < (paddleRightInitPosition + 155))
    {
    var audio = new Audio('../assets/colision.wav');
    audio.play();
    ballSpeedX = -ballSpeedX;  
    }
    else {
      console.log("Yahoo!");
    var audio = new Audio('../assets/goal.wav');
    audio.play();
    rightScore += 1;
    ballReset();
      
    }
  }
  if (ballX < 0)
  {
    if (ballY > (paddleLeftInitPosition) && ballY < (paddleLeftInitPosition + 155))
  {
    var audio = new Audio('../assets/colision.wav');
    audio.play();
    ballSpeedX = -ballSpeedX;
  }
    else {
   
    //ballSpeedX = -ballSpeedX;
    var audio = new Audio('../assets/goal.wav');
    audio.play();
    leftScore += 1;
    ballReset();
}
  }
  if (ballY > canvas.height)
  {
    ballSpeedY = -ballSpeedY;
  }
  if (ballY < 0)
  {
    ballSpeedY = -ballSpeedY;
  }
};
function ballReset() {
  ballX = canvas.width/2;
  ballSpeedX = 5;
  ballY = canvas.height/2;
  ballSpeedY = 5;
}
function score() {
  ctx.font = "55px Arial";
  ctx.fillStyle = "white"
  ctx.fillText(leftScore, (((canvas.width/2)-(10/2))+65), 65);
  ctx.font = "55px Arial";
  ctx.fillStyle = "white"
  ctx.fillText(rightScore, (((canvas.width/2)-(10/2))-95), 65);
}


