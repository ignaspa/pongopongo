
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 20;
const PADDLE_SPEED = 10;
const BALL_RADIUS = 30;


var BALL_SPEED = 3;
var paddlecolor = "#34ddff"
var keys = {"topR":false, "topL":false, "botR":false, "botL":false}
var startgame = true;
var gameover = false;
var fault = 0
var touchp = false
var ballHits = 0

// setTimeout() invokes a callback function after a certain period.
//
// requestAnimationFrame allows the browser to perform optimizations on
// on the setTimeout() and is considered 'good practice'
var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60) };





var canvas = document.createElement('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight
var width = canvas.width
var height = canvas.height

// This will esentially tell the canvas that we want a 2d plane
var context = canvas.getContext('2d');


// This is a class definition in the latest JS (ES6?).
class Paddle {

  constructor(x, y, leftK, rightK){
    this.x = x
    this.y = y
    this.height = PADDLE_HEIGHT
    this.width = PADDLE_WIDTH
    this.speed = PADDLE_SPEED
    this.leftK = leftK
    this.rightK = rightK
  }
  // This the method we will call each time we render() in out step() loop
  render() {
    context.fillStyle = paddlecolor
    context.fillRect(this.x, this.y, this.width, this.height)
  }


 update(){
   if (keys[this.leftK] && this.x > 0){
     this.x = this.x - this.speed
   }
   if (keys[this.rightK] && this.x + PADDLE_WIDTH < width){
     this.x = this.x + this.speed
   }


 }
}

class Ball {
constructor (x, y)
{
  this.x = x
  //sets the initial random x direction of the ball
  this.xdir = Math.random()

  if( this.xdir >= 0.5){
    this.xdir = -1
  }
  else{
    this.xdir = 1
  }

//sets the inital random y direction of the ball
  this.y = y
  this.ydir = Math.random()

  if( this.ydir >= 0.5){
    this.ydir = -1
  }
  else{
    this.ydir = 1
  }

//sets the initial speed of the ball
  this.radius = BALL_RADIUS
  this.speed = BALL_SPEED
}





update(){


 if (touchp == true){
   if ((this.y - BALL_RADIUS > 0 + PADDLE_HEIGHT) && (this.y + BALL_RADIUS < height - PADDLE_HEIGHT)){
     touchp = false
   }
 }

 if (this.x + this.radius >= canvas.width){
   this.xdir = -this.xdir
 }
 if (this.y + this.radius >= canvas.height){
   gameover = true
   fault = 2
 }
 if (this.x - this.radius <= 0){
   this.xdir = -this.xdir
 }
 if (this.y - this.radius <= 0){
   fault = 1
   gameover = true
 }

this.speed = BALL_SPEED






if(this.y + BALL_RADIUS >= height - PADDLE_HEIGHT && touchp == false){

  if(this.x >= playerTwo.x && this.x <= playerTwo.x + PADDLE_WIDTH){
    ballHits = ballHits + 1
    touchp = true
    this.ydir = this.ydir * -1

  }

}

if ((Math.sqrt(Math.pow(this.y - (playerOne.y +PADDLE_HEIGHT), 2) + Math.pow(playerOne.x - this.x, 2)) <=  BALL_RADIUS) && touchp == false){
    this.ydir = this.ydir * -1
    this.xdir = this.xdir * -1
    touchp = true
    ballHits = ballHits + 1
  }
if ((Math.sqrt(Math.pow(this.y - (playerOne.y +PADDLE_HEIGHT), 2) + Math.pow(this.x - (playerOne.x + PADDLE_WIDTH), 2)) <= BALL_RADIUS) && touchp == false){
      this.ydir = this.ydir * -1
      this.xdir = this.xdir * -1
      touchp = true
      ballHits = ballHits + 1
  }

if(this.y - BALL_RADIUS <= 0 + PADDLE_HEIGHT && touchp == false){

  if(this.x >= playerOne.x && this.x <= playerOne.x + PADDLE_WIDTH){
    ballHits = ballHits + 1
    touchp = true
    this.ydir = this.ydir * -1

  }
}

if ((Math.sqrt(Math.pow(playerTwo.y - this.y, 2) + Math.pow(playerTwo.x - this.x, 2)) <=  BALL_RADIUS) && touchp == false){
    this.ydir = this.ydir * -1
    this.xdir = this.xdir * -1
    touchp = true
    ballHits = ballHits + 1
  }
if ((Math.sqrt(Math.pow(playerTwo.y - this.y, 2) + Math.pow(this.x - (playerTwo.x + PADDLE_WIDTH), 2)) <= BALL_RADIUS) && touchp == false){
      this.ydir = this.ydir * -1
      this.xdir = this.xdir * -1
      touchp = true
      ballHits = ballHits + 1
  }



}


render(){

    this.x = this.x + (this.xdir * this.speed)
    this.y = this.y + (this.ydir * this.speed)


    context.beginPath()
    context.fillstyle = "#FF1493"
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    context.fill()
  }
}

// This function will be called when the page finishes loading.
window.onload = () => {
  // This creates an HTML canvas element inside of <body></body>
  document.body.appendChild(canvas)
  // Start the program loop
  animate(step)
}

// This is a callback function. animate() will call this once it has done its
// thing.
var step = () => {

  update()

  render()

  if (gameover == false){
  animate(step)
}

}

window.addEventListener("keydown", function(event){
 if (event.keyCode == 65){
   keys["topL"] = true
 }

 if (event.keyCode == 68){
   keys["topR"] = true
 }
 if (event.keyCode == 37){
   keys["botL"] = true
 }
 if (event.keyCode == 39){
   keys["botR"] = true
 }
 if (event.keyCode == 82 && gameover == true){
     location.reload();
   }
 if (event.keyCode == 90){
     startgame = false
   }
});



window.addEventListener("keyup", function(event){
 if (event.keyCode == 65){
   keys["topL"] = false
 }
 if (event.keyCode == 68){
   keys["topR"] = false
 }
 if (event.keyCode == 37){
   keys["botL"] = false
 }
 if (event.keyCode == 39){
   keys["botR"] = false
 }
});

window.addEventListener("resize", function(event){
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  var width = canvas.width
  var height = canvas.height
});


var update = () => {

  if (ballHits == 3) {
    BALL_SPEED = 4
    console.log("hello frands")
  }
  if (ballHits == 7) {
    BALL_SPEED = 6
  }


  ballOne.update()
  playerOne.update()
  playerTwo.update()



}




var playerOne = new Paddle(canvas.width/2 - PADDLE_WIDTH/2,0, "topL", "topR")
var playerTwo = new Paddle(canvas.width/2- PADDLE_WIDTH/2, height - PADDLE_HEIGHT, "botL", "botR")
var ballOne = new Ball(0.5 * canvas.width, 0.5 * canvas.height)




var render = () => {
  context.fillStyle = "#000000" // This is a hex colour value (white)
  context.fillRect(0,0, width, height)

  if (startgame == true){
    context.font = "25px Courier New";
    context.fillStyle = "white";
    context.textAlign = "center"
    context.fillText("Press [Z] To Begin!", 0.5 * canvas.width, 0.5 * canvas.height);
    context.font = "22px Tahoma";
    context.fillStyle = "#66d966";

    context.fillText("i g n a s   p a n e r o   a r m o s k a", 0.5 * canvas.width, 0.6 * canvas.height);
    context.font = "18px Tahoma";
    context.fillStyle = "#1a544a";
    context.fillText("with kind support from:", 0.5 * canvas.width, 0.7 * canvas.height);
    context.fillText("David Ansermino && Jonah Simpson", 0.5 * canvas.width, 0.75 * canvas.height);
    context.beginPath();
    context.lineWidth="2";
    context.strokeStyle="#FF1493";
    context.rect(0.5 * canvas.width - 165, 0.5 * canvas.height- 33,325,50);
    context.stroke()

  }

 if (gameover == false){
   paddlecolor = "#34ddff"
   playerOne.render();
   paddlecolor = "#f8f44f"
   playerTwo.render();

   if (startgame == false) {
     context.fillStyle = "#FF69B4" // ball color value
     ballOne.render();
    }

  }



  if (gameover == true){
    context.font = "70px Tahoma"
    context.strokeStyle = "#f44f11"
    context.textAlign = "center"
    context.fillStyle = "white";
    context.strokeText("GAME OVER", 0.5 * canvas.width, 0.5 * canvas.height);
    context.font = "30px Tahoma"
  if (fault == 1){
      context.fillText("YELLOW WINS !", 0.5 * canvas.width, 0.6 * canvas.height);
      context.fillText("press R to play again", 0.5 * canvas.width, 0.65 * canvas.height);
  }
  if (fault == 2){
      context.fillText("BLUE WINS !", 0.5 * canvas.width, 0.6 * canvas.height);
      context.fillText("press R to play again", 0.5 * canvas.width, 0.65 * canvas.height);
  }

}
}
