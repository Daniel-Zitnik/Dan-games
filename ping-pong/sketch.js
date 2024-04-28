// scores
let p1s, bs, p2s;
// sprites
let p1, p2, bot, ball;
// walls
let walls;
// buttons
let one, two;
// fonts
let maven;

function preload () {
  maven = loadFont ("../fonts/Maven_Pro/static/MavenPro-Medium.ttf");
}

function setup() {
  var cnv = createCanvas(600, 500);
  cnv.parent ("sketchHolder");
  mode = 1;
  textFont (maven);
  // create sprites
  p1 = createSprite (20, 200);
  bot = createSprite (580, 200);
  ball = createSprite (300, 200);
  p2 = createSprite (580, 200);
  // draw sprites
  p1.draw = function () {
    strokeWeight (3);
    stroke ("white");
    fill ("blue");
    rect (0, 0, 20, 50);

  }

  bot.draw = function () {
    strokeWeight (3);
    stroke ("white");
    fill ("red");
    rect (0, 0, 20, 50);
  }

  ball.draw = function () {
    noStroke ();
    fill ("white");
    ellipse (0, 0, 20, 20);
  }

  p2.draw = function () {
    strokeWeight (3);
    stroke ("white");
    fill ("red");
    rect (0, 0, 20, 50);
  }

  // strites settings
  p1.setCollider ("rectangle", 0, 0, 20, 50);
  p2.setCollider ("rectangle", 0, 0, 20, 50);
  bot.setCollider ("rectangle", 0, 0, 20, 50);
  ball.setCollider ("circle", 0, 0, 10);
  p1.immovable = true;
  bot.immovable = true;
  // walls
  walls = new Group ();
  var wall;
  wall = createSprite (width/2, -1, width, 1);
  wall.immovable = true;
  wall.addToGroup (walls);
  wall = createSprite (width/2, height+1, width, 1);
  wall.immovable = true;
  wall.addToGroup (walls);
  // menu
  background ("black");
  textAlign (CENTER);
  textSize (50);
  fill ("#a00909");
  text ("PING PONG", width/2, 150);
  // one button
  one = createButton("1 player");
  one.parent ("sketchHolder");
  one.position (200, 225);
  one.size (200, 40);
  one.style("font-size", "32px");
  one.mousePressed (g1);
  // two button
  two = createButton("2 players");
  two.parent ("sketchHolder");
  two.position (200, 275);
  two.size (200, 40);
  two.style("font-size", "32px");
  two.mousePressed (g2);
}

function g1 () {
  one.hide ();
  two.hide ();
  p1s = 0;
  bs = 0;
  mode = 2;
  ball.setSpeed (5, random (-45, 45));
}

function g2 () {
  one.hide ();
  two.hide ();
  p1s = 0;
  p2s = 0;
  mode = 3;
  ball.setSpeed (5, random (-45, 45));
}

function draw () {
  if (mode == 2 || mode == 3) gameUpdate ();
}

function gameUpdate() {
  // draw
  background("black");
  drawSprite(ball);
  drawSprite(p1);
  if (mode == 2) {
    drawSprite(bot);
    if (ball.overlap (bot)) ball.setSpeed (6, 180 + (-2) * (ball.position.y - bot.position.y));
  } else {
    drawSprite(p2);
    if (ball.overlap (p2)) ball.setSpeed (6, 180 + (-2) * (ball.position.y - p2.position.y));
  }

  // p1 move
  if (keyIsDown(UP_ARROW)) {
    p1.velocity.y = -5;
  }

  if (keyIsDown(DOWN_ARROW)) {
    p1.velocity.y = 5;
  }

  if (keyIsDown(DOWN_ARROW) == false && keyIsDown(UP_ARROW) == false) {
    p1.velocity.y = 0;
  }

  p1.position.y = constrain (p1.position.y, 0, height);
  // p2 move
  if (keyIsDown(KEY.W)) {
    p2.velocity.y = -5;
  }

  if (keyIsDown(KEY.S)) {
    p2.velocity.y = 5;
  }

  if (keyIsDown(KEY.W) == false && keyIsDown(KEY.S) == false) {
    p2.velocity.y = 0;
  }

  p2.position.y = constrain (p2.position.y, 0, height);
  // score
  if (ball.position.x > width) {
    p1s += 1;
    ball.position.x = width/2;
    ball.position.y = height/2;
    ball.setSpeed (5, random (135, 225));
  }

  if (ball.position.x < 0) {
    if (mode == 3) {
      p2s += 1;
    } else {
      bs += 1;
    }

    ball.position.x = width/2;
    ball.position.y = height/2;
    ball.setSpeed (5, random (-45, 45));
  }

  // text
  textSize (30);
  textAlign (LEFT);
  fill ("blue");
  text (p1s, 150, 30);
  textAlign (RIGHT);
  fill ("red");
  if (mode == 2) {
    text (bs, width - 150, 30);
  }

  if (mode == 3) {
    text (p2s, width - 150, 30);
  }

  // bounces
  ball.bounce (walls);
  if (ball.overlap (p1)) ball.setSpeed (6, (-2) * (p1.position.y - ball.position.y));
  // bot move
  if (ball.position.y + 5 > bot.position.y) {
    bot.position.y += 4;
  }

  if (ball.position.y - 5 < bot.position.y) {
    bot.position.y -= 4;
  }

}