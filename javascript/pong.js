//Getting the canvas and context elements.
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//Setting the defaultValue variable(which is a parameter for the menu displayed in the home, where the user selects if he wants to play the game, see the ranking or go the game credits screen)
var defaultValue = 1;
//Setting the default left and right score to zero.
var leftScore = 0;
var rightScore = 0;
//Setting the ball speed and position in the X and Y axis to their standard position
var ballX = 20;
var ballSpeedX = 5;
var ballY = (canvas.height/2) - 10;
var ballSpeedY = 5;
//Setting the initial position of the paddles in the middle of each side.
const paddleAbsolutePosition = ((canvas.height/2)-(155/2));
var paddleLeftInitPosition = paddleAbsolutePosition;
var paddleRightInitPosition = paddleAbsolutePosition;
var setScore = 1;
var eventFinish = 0;
var playerTurn = 1;
var enterBlinking = 0;
var timer;



//When the page is finnally loaded, we present the main menu, calling the renderMenu() function.
window.onload = function() {
 renderMenu(defaultValue);
}

//Let's define the renderMenu function, and use a switch case statement to make the user browse through the available options.
function renderMenu(initialValue) {
  document.addEventListener("keydown", this.check);
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.font = "80px Arial";
ctx.fillStyle = "white"
ctx.textAlign = 'left';
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
      eventFinish = 1;
      selectScoreToWin(setScore);
      //gameStart();
      }
      else if (defaultValue == 3)
      {
         timer = setInterval(creditScreen, 700);
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

function selectScoreToWin(selectHover) {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = "80px Arial";
  ctx.fillStyle = "white"
  ctx.fillText("JS Pong", 355, 300);

  switch(selectHover)
  {
    case 1:
    callOptionBlock("5 points", 422, 550, true);
    callOptionBlock("10 points", 422, 590);
    callOptionBlock("15 points", 422, 630);
    break;

    case 2:
    callOptionBlock("5 points", 422, 550);
    callOptionBlock("10 points", 422, 590, true);
    callOptionBlock("15 points", 422, 630);
    break;

    case 3:
    callOptionBlock("5 points", 422, 550);
    callOptionBlock("10 points", 422, 590);
    callOptionBlock("15 points", 422, 630, true);
    break;
  }
  if (eventFinish == 1)
{

document.addEventListener("keydown", this.scoreCheck);
}
};



function scoreCheck(e)
{
  var code = e.keyCode;
  switch (code)
  {
  //enter
  case 13:
  document.removeEventListener("keydown", arguments.callee);
  var audio = new Audio("../assets/choose.wav");
  audio.play();
  if (setScore == 1)
  {
    setScore = 5;
    gameStart();
  }
  else if (setScore == 2)
  {
    setScore = 10;
    gameStart();
  }
  else if (setScore == 3)
  {
    setScore = 15;
    gameStart();
  } 
  break;
  //up
  case 38:
  if (setScore == 1)
  {
    var audio = new Audio('../assets/select.wav');
    audio.play();
    setScore = 3;
    selectScoreToWin(setScore);
  }
  else if (setScore == 2)
  {
    var audio = new Audio('../assets/select.wav');
    audio.play();
    setScore = 1;
    selectScoreToWin(setScore);
  }
  else if (setScore == 3)
  {
    var audio = new Audio('../assets/select.wav');
    audio.play();
    setScore = 2;
    selectScoreToWin(setScore);
  }
  break;
  //down
  case 40:
  if (setScore == 1)
  {
    var audio = new Audio('../assets/select.wav');
    audio.play();
    setScore = 2;
    selectScoreToWin(setScore);
  }
  else if (setScore == 2)
  {
    var audio = new Audio('../assets/select.wav');
    audio.play();
    setScore = 3;
    selectScoreToWin(setScore);
  }
  else if (setScore == 3)
  {
    var audio = new Audio('../assets/select.wav');
    audio.play();
    setScore = 1;
    selectScoreToWin(setScore);
  }
  break;  
  }
}


//If the users selects the "Play game" option, he will end up here in this function
function gameStart() {
  var start = setInterval(function(){
    hud();
    leftPaddle(paddleLeftInitPosition);
    rightPaddle(paddleRightInitPosition);
    ballSpeedRegulation();
    score();
    if (rightScore == setScore || leftScore == setScore)
    {
       clearInterval(start);
       var defaultValue = 1;
       leftScore = 0;
       rightScore = 0;
       ballX = 20;
       ballSpeedX = 5;
       ballY = (canvas.height/2) - 10;
       ballSpeedY = 5;
       paddleLeftInitPosition = paddleAbsolutePosition;
       paddleRightInitPosition = paddleAbsolutePosition;
       setScore = 1;
       eventFinish = 0;
       document.addEventListener("keydown", this.check);
       renderMenu(defaultValue);
    }
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
  paddleLeftInitPosition -= 14;
  }
  break;
  case 40:
  if (paddleLeftInitPosition < (canvas.height - 175))
  {
  paddleLeftInitPosition += 14;
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
    if (paddleRightInitPosition < (canvas.height - 175))
    {
    paddleRightInitPosition += 7;
      
    }
  }
  else {
    if (paddleRightInitPosition > 20)
    {
    paddleRightInitPosition -= 12;
      
    }
  }
}

function ballSpeedRegulation(){
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(ballX, ballY, 10, 0, Math.PI*2, true);
  ctx.fill();
  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY;
  if (ballX > (canvas.width-20))
  {
    if (ballY > (paddleRightInitPosition - 11) && ballY < (paddleRightInitPosition + 160))
    {
    var audio = new Audio('../assets/colision.wav');
    audio.play();
    ballSpeedX = -ballSpeedX;
    if (ballSpeedY < 0)
    {
      ballSpeedY-=2;
    }
    else
    {
    ballSpeedY+=2;  
      
    }
    }
    else {
    var audio = new Audio('../assets/goal.wav');
    audio.play();
    leftScore += 1;
    ballReset();
    }
  }
  if (ballX < 20)
  {
    if (ballY > (paddleLeftInitPosition - 11) && ballY < (paddleLeftInitPosition + 166))
  {
    var audio = new Audio('../assets/colision.wav');
    audio.play();
    ballSpeedX = -ballSpeedX;
    if (ballSpeedY > 0)
    {
    ballSpeedY+=2;
      
    }
    else {
      ballSpeedY-=2;
    }
  }
    else {
    var audio = new Audio('../assets/goal.wav');
    audio.play();
    rightScore += 1;
    ballReset();
}
  }
  if (ballY > (canvas.height-10))
  {
    ballSpeedY = -ballSpeedY;
  }
  if (ballY < 20)
  {
    ballSpeedY = -ballSpeedY;
  }
};
function ballReset() {
  var respawn = Math.floor(Math.random() * 4) + 1;
  if (respawn == 1)
  {
    ballY = canvas.height/2;
  }
  else if (respawn == 2)
  {
    ballY = canvas.height/4;
  }
  else if (respawn == 3)
  {
    ballY = canvas.height/6;
  }
  else if (respawn == 4)
  {
    ballY = canvas.height/8;
  }
  ballX = canvas.width/2;
  if (playerTurn == 0)
  {
  ballSpeedX = 5;
  playerTurn = 1;
  }
  else if (playerTurn == 1)
  {
  ballSpeedX = -5;
  playerTurn = 0;
  }
  //ballY = canvas.height/2;
  ballSpeedY = 5;
}
function score() {
  ctx.font = "55px Arial";
  ctx.fillStyle = "white"
  ctx.fillText(rightScore, (((canvas.width/2)-(10/2))+65), 65);
  ctx.font = "55px Arial";
  ctx.fillStyle = "white"
  ctx.fillText(leftScore, (((canvas.width/2)-(10/2))-95), 65);
}

function creditScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = "45px Arial";
  ctx.fillStyle = "white"
  ctx.textAlign = 'center';
  ctx.fillText("Game developed by Arthur Maximino", 500, 300);

  ctx.font = "45px Arial";
  ctx.fillStyle = "white"
  ctx.fillText("https://github.com/ArthurMaximino/JS-Pong", 500, 350);
  
  if (enterBlinking == 0)
  {
  ctx.font = "35px Arial";
  ctx.fillStyle = "white"
  ctx.fillText("Press enter to go back to main menu", 500, 630);
  enterBlinking = 1;
  }

  else 
  {
  enterBlinking = 0;
  }
  document.addEventListener("keydown", this.backMenu);
}
  function backMenu (e) {
    var code = e.keyCode;
    switch (code)
    {
      case 13:
      clearInterval(timer);
      document.removeEventListener("keydown", arguments.callee);
      var audio = new Audio("../assets/choose.wav");
      audio.play();
      defaultValue = 1;
      renderMenu(defaultValue);
      //document.addEventListener("keydown", this.check);
      break;
      case 38:
      clearInterval(creditScreen);
      document.removeEventListener("keydown", arguments.callee);
      break;
    }
  }

