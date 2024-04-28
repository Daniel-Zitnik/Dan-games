// sounds
let bulletSnd, technoSnd;
// info variables
let score, highScore, bulletN;
// groups
let asteroids, bullets;
// sprites & game variables
let ship, edge, speed, mode;
// images & animations
let shipAnim, asteroidAnim, bulletImg, explodeAnim;
// fonts
let maven;
// buttons
let play, restart;

function preload() {
  // animation
  shipAnim = loadAnimation("pictures/ship0001.png", "pictures/ship0002.png", "pictures/ship0003.png");
  asteroidAnim = loadSpriteSheet ("pictures/asteroid_strip64.png", 128, 128, 64);
  bulletImg = loadImage ("pictures/bullet.png");
  explodeAnim = loadSpriteSheet ("pictures/explosion_512x512.png", 170, 170, 3);
  /*bulletSnd = loadSound ("sounds/Pew.wav");
  technoSnd = loadSound ("sounds/Techno.wav");*/
  // load fonts
  maven = loadFont ("../fonts/Maven_Pro/static/MavenPro-Medium.ttf");
}

function setup() {
  var cnv = createCanvas(600, 500);
  cnv.parent ("sketchHolder");
  frameRate (50);
  background ("black")
  textFont (maven);
  // set variables
  score = 0;
  highScore = 0;
  bulletN = 5;
  speed = 1;
  mode = 1;
  // ship
  ship = createSprite (width / 2, height - 50);
  ship.addAnimation ("base", shipAnim);
  ship.addAnimation ("explode", explodeAnim);
  ship.friction = 0.9;
  // groups
  asteroids = new Group();
  bullets = new Group();
  // play button
  play = createButton ("Play");
  play.parent ("sketchHolder");
  play.position (200, 225);
  play.size (200, 50);
  play.style("font-size", "40px");
  play.mousePressed (playGame);
  // restart button
  restart = createButton ("Restart");
  restart.parent ("sketchHolder");
  restart.position (200, 300);
  restart.size (200, 50);
  restart.style ("font-size", "40px");
  restart.mousePressed (playGame);
  restart.hide ();
  // edge
  edge = createSprite (width / 2, height + 50, width, 20);
  // text
  noStroke ();
  textAlign (CENTER);
  textSize (50);
  fill ("#a00909");
  text ("SPACE SHIP", width / 2, 130)
}

function playGame() {
  play.hide ();
  restart.hide ();
  mode = 2;
}

function draw() {
  if (mode == 2) {
    gameUpdate ();
  }

}

function gameUpdate() {
  background("black");
  drawSprites();
  // ship move
  if (keyIsDown(RIGHT_ARROW)) {
    ship.addSpeed (1, 0);
  }

  if (keyIsDown(LEFT_ARROW)) {
    ship.addSpeed (1, 180);
  }

  ship.position.x = constrain (ship.position.x, 10, width-10);
  // create asteroids
  if (frameCount % 100 == 0) {
    createAsteroid ();
    speed += 0.1;
  }

  // bullet number
  if (frameCount % 90 == 0) {
    bulletN += 1;
  }

  // create bullets
  if (keyWentUp(KEY.SPACE) || keyWentUp(UP_ARROW)) {
    if (bulletN > 0) {
      createBullet ();
      bulletN -= 1;
    }

  }

  // ship collide
  if (ship.collide(asteroids)) {
    ship.changeAnimation ("explode");
    setTimeout (replay, 2000);
  }

  // asteroid collide
  bullets.collide(asteroids, asteroidHit);
  edge.collide(asteroids, asteroidEdge);
  // draw info
  fill ("#eee");
  textSize (30);
  textAlign (LEFT);
  text ("score: "+score, 15, 35);
  textAlign (RIGHT);
  text ("high score: "+highScore, width-15, 35);
  textAlign (LEFT);
  text ("bullets: "+bulletN, 15, 75);
}

// asteroid
function createAsteroid () {
  var asteroid;
  asteroid = createSprite (random(0, width), 0);
  asteroid.addAnimation ("base", asteroidAnim);
  asteroid.addAnimation ("explode", explodeAnim);
  asteroid.addSpeed (speed, 90);
  asteroid.scale = random (0.5, 1);
  asteroid.setCollider ("circle", 0, 0, 45);
  asteroids.add(asteroid);
}

// bullet
function createBullet () {
  var bullet;
  bullet = createSprite (ship.position.x, 425);
  bullet.addSpeed (5, 270);
  bullet.addImage (bulletImg);
  bullets.add (bullet);
}

function asteroidHit (bullet, asteroid) {
  bullet.remove();
  asteroid.changeAnimation ("explode");
  asteroid.life = 10;
  score += 1;
}

function asteroidEdge (edge, asteroid) {
  asteroid.position.y = -50;
  asteroid.friction = 0;
  asteroid.friction = 1;
  asteroid.addSpeed (0.4, 90);
}

function replay () {
  asteroids.removeSprites ();
  speed = 1;
  bulletN = 5;
  // score & highScore
  if (score > highScore) {
    highScore = score;
  }

  // ship
  ship.changeAnimation ("base");
  ship.position.x = width / 2;
  ship.position.y = height - 50;
  // set menu
  background ("black");
  mode = 1;
  restart.show ();
  // text
  fill ("#a00909");
  textAlign (CENTER);
  textSize (50);
  text ("GAME OVER!", width / 2, 110);
  fill ("#eee")
  textSize (30);
  text ("score: "+score, width / 2, 200);
  text ("highScore: "+highScore, width / 2, 240)
}