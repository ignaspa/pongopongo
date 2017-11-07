// Before getting started you need to find the Console in your browser
// The command console.log() is like print() but you'll see it in the
// console along with errors etc.

// Note that I'm not using semicolons. They are not required but may
// help when getting familiar with JS.

// Don't worry about understanding everything except where noted.

// Some constants we will use later
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 20;
const PADDLE_SPEED = 5;
const BALL_SPEED = 2;
const BALL_RADIUS = 30;
// setTimeout() invokes a callback function after a certain period.
//
// requestAnimationFrame allows the browser to perform optimizations on
// on the setTimeout() and is considered 'good practice'
var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60) };

// This is the canvas on which we will paint our masterpiece
var canvas = document.createElement('canvas')
var width = window.innerWidth
var height = window.innerHeight
canvas.width = width
canvas.height = height
// This will esentially tell the canvas that we want a 2d plane
var context = canvas.getContext('2d')

//==============================================================================
// Everything below here you should try your best to understand.
//==============================================================================

// This is a class definition in the latest JS (ES6?). You might
// find examples that look quite different from ES5 etc.
class Paddle {
  constructor(x, y){
    this.x = x
    this.y = y
    this.height = PADDLE_HEIGHT
    this.width = PADDLE_WIDTH
    this.speed = PADDLE_SPEED
  }
  // This the method we will call each time we render() in out step() loop
  render() {
    context.fillStyle = "#FFFFFF"
    context.fillRect(this.x, this.y, this.width, this.height)
  }
}


class Ball {
constructor (x, y)
{
  this.x = x
  this.y = y
  this.radius = BALL_RADIUS
  this.speed = BALL_SPEED
}
render(){
    context.beginPath()
    context.fillstyle = "#FF1493"
    context.arc(this.x, this.y, this.radius, 0, 2*Math.PI)
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
  animate(step)
}

// This is where we will tell the ball to keep moving and check
// if it has collided with a paddle
var update = () => {

  //comment added by ignas: we will make a boundary type thing for the paddles
  //and check if the x and y of the ball are within them, thats a hit, rebound
  //if the ball hits the top or bottom thats a point gained by opposing
  //if hits side needs to rebound


}
// An example player
var playerOne = new Paddle(100,0)

// Everytime we call update we have to redraw everthing. We could optimize this
// but its not gonna be a problem for us.
var render = () => {
  context.fillStyle = "#000000" // This is a hex colour value (white)
  context.fillRect(0,0, width, height)
  playerOne.render();
}
