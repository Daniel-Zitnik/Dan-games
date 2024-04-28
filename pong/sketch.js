// sprites
let paddle, ball, bricks;
// game dificulty
let speed;
// walls
let topWall, rightWall, leftWall;
// buttons
let play, mode;
// scores
let score, highScore;
// fonts
let maven;
//let popSnd, pongSnd;
function preload () {
  /*popSnd = loadSound ("sounds/pop.wav");
  pongSnd = loadSound ("sounds/Water_drop.wav");*/
}

function preload () {
  maven = loadFont ("../fonts/Maven_Pro/static/MavenPro-Medium.ttf");
}

function setup() {
  var cnv = createCanvas(600, 500);
  cnv.parent ("sketchHolder");
  frameRate (30);
  background ("black");
  speed = 20;
  mode = 1;
  score = 0;
  highScore = 0;
  textFont (maven);
  // bricks
  bricks = new Group();
  for (y = 0; y < 8; y += 1) {
    for (x = 0; x < 12; x += 1) {
      createBrick (80 + x * 40, 80 + y * 20);
    }

  }

  // paddle
  paddle = createSprite (width / 2, 450);
  paddle.draw = function () {
    noStroke();
    fill ("blue");
    rect (0, 0, 100, 20);
  }

  paddle.setCollider ("rectangle", 0, 0, 100, 20);
  paddle.friction = 0.7;
  paddle.immovable = true;
  // ball
  ball = createSprite (width / 2, 400);
  ball.draw = function () {
    noStroke();
    fill ("white");
    ellipse (0, 0, 20, 20);
  }

  ball.setCollider ("rectangle", 0, 0, 20, 20);
  ball.setSpeed (speed / 2, 90);
  // walls
  topWall = createSprite (width / 2, -6, width, 10);
  topWall.immovable = true;
  rightWall = createSprite (606, height / 2, 10, height);
  rightWall.immovable = true;
  leftWall = createSprite (-6, height / 2, 10, height);
  leftWall.immovable = true;
  // play button
  play = createButton ("Play");
  play.parent ("sketchHolder");
  play.position (200, 225);
  play.size (200, 50);
  play.style("font-size", "40px");
  play.mousePressed (playGame);
  // text
  noStroke ();
  fill ("#a00909");
  textAlign (CENTER);
  textSize (70);
  text ("PONG", width / 2, 150);
}

function playGame () {
  play.hide();
  mode = 2;
  ball.position.y = 400;
  score = 0;
}

function createBrick (x, y) {
  var brick;
  brick = createSprite (x, y, 40, 20);
  brick.immovable = true;
  brick.addToGroup (bricks);
}

function draw () {
  if (mode == 2) {
    gameUpdate ();
  }

}

function gameUpdate () {
  background(0);
  drawSprites();
  // paddle move
  if (keyDown(RIGHT_ARROW)) {
    paddle.setSpeed (speed, 0);
  }

  if (keyDown(LEFT_ARROW)) {
    paddle.setSpeed (speed, 180);
  }

  paddle.position.x = constrain (paddle.position.x, 0, width);
  // ball bounces
  if (ball.bounce(paddle)) {
    var d;
    d = ball.position.x - paddle.position.x;
    ball.setSpeed (speed / 2, -90 + d);
  }

  ball.bounce(topWall);
  ball.bounce(leftWall);
  ball.bounce(rightWall);
  ball.bounce(bricks, breakeBrick);
  // game over
  if (ball. position.y > height) {
    mode = 1;
    background ("black");
    noStroke ();
    fill ("#a00909");
    textAlign (CENTER);
    textSize (50);
    text ("GAME OVER!", width / 2, 150);
    newGame ();
  }

  //win
  if (bricks.length == 0) {
    mode = 1;
    background ("black");
    noStroke ();
    fill ("#a00909");
    textAlign (CENTER);
    textSize (50);
    text ("YOU WIN!", width / 2, 150);
    newGame ();
  }

  // info
  fill ("#eee");
  textAlign (LEFT);
  textSize (30);
  text ("score: "+score, 15, 35);
  textAlign (RIGHT);
  textSize (30);
  text ("high score: "+highScore, width - 15, 35);
}

function newGame () {
  if (score > highScore) {
    highScore = score;
  }

  play.show ();
  bricks.removeSprites();
  ball.position.x = width / 2;
  ball.position.y = 400;
  ball.setSpeed (speed / 2, 90);
  paddle.position.x = width / 2;
  for (y = 0; y < 8; y += 1) {
    for (x = 0; x < 12; x += 1) {
      createBrick (80 + x * 40, 80 + y * 20);
    }

  }

}

function breakeBrick (ball, brick) {
  brick.remove();
  score += 1;
}