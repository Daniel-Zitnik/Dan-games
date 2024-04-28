// sprites
let player, obstacles, edge;
// images
let playerImg, thornImg, thorn2Img, wallImg, wall2Img;
// info
let score, highScore;
// buttons
let play, restart, mode;
// sounds
let scoreSnd, jumpSnd, hiphopSnd;
// fonts
let maven;
// level
let level = {
  max: 0,
  min: 0,
  speed: 0,
  info: 0
}

function preload() {
  // load images
  playerImg = loadImage ("images/player.png");
  thornImg = loadImage ("images/thorn.png");
  thorn2Img = loadImage ("images/thorn2.png");
  wallImg = loadImage ("images/wall.png");
  wall2Img = loadImage ("images/wall2.png");
  // load sounds
  scoreSnd = loadSound ("sounds/Fairydust.wav");
  jumpSnd = loadSound ("sounds/WaterDrop.wav");
  hiphopSnd = loadSound ("sounds/HipHop.wav");
  // load fonts
  maven = loadFont ("../fonts/Maven_Pro/static/MavenPro-Medium.ttf");
}

function setup() {
  var cnv = createCanvas(600, 500);
  cnv.parent ("sketchHolder");
  background("black");
  frameRate (50);
  mode = 0;
  score = 0;
  highScore = 0;
  hiphopSnd.loop ();
  textFont (maven);
  // text
  textAlign (CENTER);
  textSize (50);
  fill ("#a00909");
  text ("JUMPER", width/2, 150);
  // sprites
  player = createSprite (50, 220);
  player.addImage (playerImg);
  player.scale = 0.6;
  edge = createSprite (-1, height/2, 1, height);
  obstacles = new Group ();
  // play button
  play = createButton ("Play");
  play.parent ("sketchHolder");
  play.position (200, 225);
  play.size (200, 50);
  play.style ("font-size", "40px");
  play.mousePressed (Play);
  // restart button
  restart = createButton ("Restart");
  restart.parent ("sketchHolder");
  restart.position (200, 300);
  restart.size (200, 50);
  restart.style ("font-size", "40px");
  restart.hide ();
  restart.mousePressed (Play);
}

function Play() {
  mode = 1;
  score = 0;
  level.max = 2;
  level.min = 1;
  level.speed = -3;
  level.info = 1;
  player.position.y = 220;
  play.hide ();
  restart.hide ();
}

function draw() {
  if (mode == 1) {
    // draw
    background("black");
    noStroke ();
    fill ("#1cb906");
    rect (0, 240, 600, 20);
    drawSprites ();
    // create obstacle
    if (frameCount % 100 == 0) {
      var r;
      r = round (random (floor (level.min), floor (level.max)));
      if (r == 1) createThorn (220, 0.4, thornImg);
      if (r == 2) createThorn (280, 0.2, thorn2Img);
      if (r == 3) createWall (174, wallImg);
      if (r == 4) createWall (326, wall2Img);
      if (r == 5) {
        createWall (326, wall2Img);
        createThorn (220, 0.4, thornImg);
      }

      if (r == 6) {
        createWall (174, wallImg);
        createThorn (280, 0.2, thorn2Img);
      }

    }

    // thorn move
    obstacles.overlap (edge, removeObstacle);
    // player move
    if (player.position.y > 219 && player.position.y < 250) {
      player.position.y = 220;
      player.velocity.y = 0;
      if (keyIsDown(UP_ARROW)) {
        player.velocity.y = -5;
        jumpSnd.play();
      }

      if (keyWentUp(DOWN_ARROW)) {
        player.position.y = 280;
      }

    }

    if (player.position.y < 281 && player.position.y > 250) {
      player.position.y = 280;
      player.velocity.y = 0;
      if (keyIsDown(DOWN_ARROW)) {
        player.velocity.y = 5;
        jumpSnd.play();
      }

      if (keyWentUp(UP_ARROW)) {
        player.position.y = 220;
      }

    }

    if (player.position.y < 120) {
      player.velocity.y = 3;
    }

    if (player.position.y > 380) {
      player.velocity.y = -3;
    }

    // text
    fill ("#eee");
    textSize (30);
    textAlign (LEFT);
    text ("score: " + score, 10, 35);
    textAlign (LEFT);
    text ("level: " + floor (level.info), 10, 75);
    textAlign (RIGHT);
    text ("high score: " + highScore, width - 10, 35);

    // collide
    if (player.overlap(obstacles)) {
      obstacles.removeSprites();
      if (highScore < score) {
        highScore = score;
      }

      background ("black");
      restart.show ();
      mode = 0;
      //text
      fill ("#a00909");
      textAlign (CENTER);
      textSize (50);
      text ("GAME OVER!", width / 2, 100);
      fill ("#eee");
      textSize (30);
      text ("score: "+score, width / 2, 170);
      text ("high score: " + highScore, width / 2, 210);
      text ("level: " + floor (level.info), width / 2, 250);
    }

  }

  if (keyWentUp(KEY.H)) {
    thorn.debug = !thorn.debug;
    player.debug = !player.debug;
  }

}

function createThorn (py, s, i) {
  var o;
  o = createSprite (random (800, 1000), py);
  o.addImage (i);
  o.scale = s;
  o.setCollider ("rectangle", 0, 3, 20, 85);
  o.velocity.x = level.speed;
  o.addToGroup (obstacles);
}

function createWall (py, i) {
  var o;
  o = createSprite (random (800, 1000), py);
  o.addImage (i);
  o.scale = 0.7;
  o.setCollider ("rectangle", 0, 0, 40, 185);
  o.velocity.x = level.speed;
  o.addToGroup (obstacles);
}

function removeObstacle (o) {
  o.remove();
  score ++;
  if (level.max < 6) level.max += 0.2;
  if (level.max > 5.9 && level.min < 5) level.min += 0.2;
  if (level.min > 4.9) level.speed -= 0.1;
  level.info += 0.2;
  scoreSnd.play();
}