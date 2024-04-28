// imges
let cannonIm, enemy1Img, pathEdge1Img, pathCorner1Img, pathTurn1Img, ground1Img, buildGround1Img;
// groups
let cannons, enemies, bullets, paths;
// game variables
let money, hp;
// fonts
let maven;
// lists
let level = {
	layout: [],
	decorations: []
}
// wave
let wave = {
	number: 0,
	enemies: 0,
	process: 0,
	time: 0,
	timeOut: 0
}

function preload () {
	// fonts
	maven = loadFont ("../fonts/Maven_Pro/static/MavenPro-Medium.ttf");
	// images
	cannonImg = loadImage ("images/towerDefense_tile249.png");
	enemy1Img = loadImage ("images/towerDefense_tile245.png");
	pathEdge1Img = loadImage ("images/towerDefense_tile001.png");
	pathCorner1Img = loadImage ("images/towerDefense_tile002.png");
	pathTurn1Img = loadImage ("images/towerDefense_tile004.png");
	ground1Img = loadImage ("images/towerDefense_tile024.png");
	buildGround1Img = loadImage ("images/towerDefense_tile043.png");
}

function setup () {
	var cnv = createCanvas(750, 500);
	cnv.parent ("sketchHolder");
	cnv.mouseWheel (changeCameraZoom);
	frameRate (50);
	textFont (maven);
	// set variables
	money = 20;
	hp = 10;
	wave.number = 1;
	wave.enemies = 5;
	wave.process = 5;
	wave.time = 100;
	wave.timeOut = 100;
	// groups
	cannons = new Group ();
	enemies = new Group ();
	bullets = new Group ();
	paths = new Group ();
	// new level
	level.layout = [15, 13, 0, 3, 1, 2, 3, 1, 4, 3, 3, 4, 5, 5, 6, 5, 1, 8, 5, 3, 8, 7, 2, 8, 9, 2, 8, 11, 2];
	newLevel ();
}

function newLevel () {
	for (let i = 2; i < level.layout.length; i+= 3) {
		createPath (level.layout[i], level.layout[i + 1], level.layout[i + 2]);
	}
}

function createPath (x, y, i) {
	var p = createSprite (x * 64 + 64, y * 64 + 64);
	p.i = i;
	p.draw = function () {
		imageMode (CENTER);
		if (i < 3) {
			p.rotation = i * 90 - 90;
			translate (-32, -32);
			rotate (PI);
			image (pathEdge1Img);
			translate (-64, 0);
			image (pathEdge1Img);
			translate (0, -64);
			rotate (PI);
			image (pathEdge1Img);
			translate (-64, 0);
			image (pathEdge1Img);
		} else {
			p.rotation = i * 90 - 270;
			translate (-32, -32);
			rotate (PI);
			image (pathEdge1Img);
			rotate (PI);
			translate (64, 0);
			image (pathTurn1Img);
			translate (0, 64);
			rotate (PI / -2);
			image (pathEdge1Img);
			rotate (PI / 2);
			translate (-64, 0);
			image (pathCorner1Img);
		}
	}

	p.debug = true;
	p.setCollider ("rectangle", 0, 0, 128, 128);
	p.addToGroup (paths);
}

function createEnemy () {
	var e;
	e = createSprite (level.layout[2] * 64, level.layout[3] * 64);
	if (level.layout[4] == 1) {
		e.rotation = 0;
		e.position.y += 64;
	} else {
		e.rotation = 90;
		e.position.x += 64;
	}
	e.addImage (enemy1Img);
	e.setCollider ("circle", 0, 0, 32);
	e.setSpeed (1, e.rotation);
	e.timeOut = 0;
	e.straightPositionX = 0;
	e.straightPositionY = 0;
	e.scale = 0.65;
	e.addToGroup (enemies);
	e.hp = round (random (1, floor (wave.number / 3) + 1));
}

function createCannon (x, y) {
	var c;
	c = createSprite (x, y);
	c.setCollider ("circle", 0, 0, 16);
	if (c.overlap (paths) || c.overlap (cannons)) {
		c.remove ();
		money += 10;
		return;
	} else {
		c.addImage (cannonImg);
		c.addToGroup (cannons);
		c.timeOut = 0;
	}
}

function createBullet (x, y, rotation) {
	var b;
	b = createSprite (x, y);
	b.draw = function () {
		noStroke ();
		fill ("gray");
		ellipse (0, 0, 10, 10);
	}

	b.scale = 1.5;
	b.setCollider ("circle", 0, 0, 5);
	b.rotation = rotation;
	b.setSpeed (25, rotation);
	b.life = 30;
	b.addToGroup (bullets);
}

function draw () {
	background ("#2ECC71");
	camera.on ();
	imageMode (CORNER);
	for (let x = 0; x < level.layout[0]; x++) {
		for (let y = 0; y < level.layout[1]; y++) {
			image (ground1Img, x * 64, y * 64);
		}
	}
	drawSprites ();
	camera.off ();
	// text
	noStroke ();
	fill ("black");
	textSize (35);
	textAlign (LEFT);
	text ("money: " + money, 10, 30);
	text ("wave: " + wave.number, 10, 70);
	textAlign (RIGHT);
	text ("hp: " + hp, width - 10, 30);
	// camera move
	if (keyIsDown (RIGHT_ARROW) || keyIsDown (KEY.D)) {
		camera.position.x += 10;
	}

	if (keyIsDown (LEFT_ARROW) || keyIsDown (KEY.A)) {
		camera.position.x -= 10;
	}

	if (keyIsDown (UP_ARROW) || keyIsDown (KEY.W)) {
		camera.position.y -= 10;
	}

	if (keyIsDown (DOWN_ARROW) || keyIsDown (KEY.S)) {
		camera.position.y += 10;
	}

	//wave
	if (wave.enemies > 0) {
		if (wave.timeOut == 0) {
			createEnemy ();
			wave.enemies --;
			wave.timeOut = wave.time;
		} else {
			wave.timeOut --;
		}
	}

	if (wave.process < 1) {
		wave.number ++;
		wave.enemies = wave.number + 4;
		wave.process = wave.number + 4;
		if (wave.time != 20) {
			wave.time -= 5;
		}
		
		wave.timeOut = wave.time;
	}
	
	// enemies
	enemies.overlap (bullets, enemyHit);
	for (let i = 0; i < enemies.length; i++) {
		var e = enemies[i];
		if (e.position.y > height) {
			e.remove ();
			hp --;
			wave.process --;
		}

		if (e.timeOut > 0) {
			if (e.timeOut == 1) {
				e.timeOut = 0;
				e.rotation = round (e.rotation);
				e.position.x = e.straightPositionX;
				e.position.y = e.straightPositionY;		
			} else {
				e.rotation += 0.9;
				e.setSpeed (1, e.rotation);
				e.timeOut --;
			}
		} else if (e.timeOut < 0) {
			if (e.timeOut == -1) {
				e.timeOut = 0;
				e.rotation = round (e.rotation);
				e.position.x = e.straightPositionX;
				e.position.y = e.straightPositionY;
			} else {
				e.rotation -= 0.9;
				e.setSpeed (1, e.rotation);
				e.timeOut ++;
			}
		} else {
			for (let l = 0; l < paths.length; l++) {
				var p = paths[l];
				if (e.rotation == 0) {
					if (e.position.y == p.position.y && e.position.x < p.position.x - 63 && e.position.x > p.position.x - 65) {
						if (p.i == 3) {
							e.position.x = p.position.x - 64;
							e.timeOut = 100;
							e.rotation += 0.9;
							e.setSpeed (1, e.rotation);
							e.straightPositionX = p.position.x;
							e.straightPositionY = p.position.y + 64;
						} else if (p.i == 4) {
							e.position.x = p.position.x - 64;
							e.timeOut = -100;
							e.rotation -= 0.9;
							e.setSpeed (1, e.rotation);
							e.straightPositionX = p.position.x;
							e.straightPositionY = p.position.y - 64;
						}
					}
				} else if (e.rotation == 90) {
					if (p.i == 6) {
						e.position.y = p.position.y - 64;
						e.timeOut = 100;
						e.rotation += 0.9;
						e.setSpeed (1, e.rotation);
						e.straightPositionX = p.position.x - 64;
						e.straightPositionY = p.position.y;
					} else if (p.i == 5) {
						e.position.x = p.position.y - 64;
						e.timeOut = -100;
						e.rotation -= 0.9;
						e.setSpeed (1, e.rotation);
						e.straightPositionX = p.position.x + 64;
						e.straightPositionY = p.position.y;
					}
				} else if (e.rotation == 180) {
					
				} else if (e.rotation == 270) {
					
				}
			}
		}
	}

	// cannon
	/*imageMode (CENTER);
	tint (255, 127);
	noFill ();
	strokeWeight (5);
	stroke ("#eee");
	ellipse (mouseX, mouseY, 150, 150)
	image (cannonImg, mouseX, mouseY);
	tint (255, 255);
	strokeWeight (1);
	imageMode (CORNER);*/

	for (let i = 0; i < cannons.length; i++) {
		var c = cannons[i];
		if (c.timeOut > 0) {
			c.timeOut --;
		}

		for (let l = 0; l < enemies.length; l++) {
			var e = enemies[l];
			var d = dist (c.position.x, c.position.y, e.position.x, e.position.y);
			if (d < 100) {
				var angle = Math.atan2 (e.position.y - c.position.y, e.position.x - c.position.x) * 180 / Math.PI;
				c.rotation = angle + 90;
				if (c.timeOut == 0) {
					createBullet (c.position.x, c.position.y, c.rotation - 90);
					c.timeOut = 175;
				}
			}
		}
	}

	// bullets
	for (let i = 0; i < bullets.length; i++) {
		var b = bullets[i];
		if (b.life == 29) {
			b.setSpeed (5, b.rotation);
		}
	}

	if (keyIsDown (KEY.F)) {
		print (int(getFrameRate()));
	}
}

function mousePressed () {
	if (money > 9 && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
		createCannon (mouseX, mouseY);
		money -= 10;
	}
}

function enemyHit (e, b) {
	if (e.hp < 2) {
		e.remove ();
		wave.process --;
	} else {
		e.hp --;
	}

	b.remove ();
	money ++;
}

/*function changeDirection (e, d) {
	if (e.timeOut == 0) {
		e.timeOut = 8;
		if (d.i == 1) {
			if (d.position.x == 310 && d.position.y == 150) {
				if (e.velocity.y > 0) {
					e.position.y += 5;
				} else {
					e.position.y -= 5;
				}
			}

			if (d.rotation == 0) {
				e.velocity.x = 0.9 + wave.number / 10;
				e.velocity.y = 0;
				if (e.velocity.x > 3) {
					e.velocity.x = 3;
				}
			} else if (d.rotation == 1) {
				e.velocity.y = 0.9 + wave.number / 10;
				e.velocity.x = 0;
				if (e.velocity.y > 3) {
					e.velocity.y = 3;
				}
			} else if (d.rotation == 2) {
				e.velocity.x = -0.9 - wave.number / 10;
				e.velocity.y = 0;
				if (e.velocity.x < -3) {
					e.velocity.x = -3;
				}
			} else if (d.rotation == 3) {
				e.velocity.y = -0.9 - wave.number / 10;
				e.velocity.x = 0;
				if (e.velocity.y < -3) {
					e.velocity.y = -3;
				}
			}
		} else {
			var r = round (random (1));
			if (r == 0) {
				e.velocity.y = 0.9 + wave.number / 10;
				e.velocity.x = 0;
				if (e.velocity.y > 3) {
					e.velocity.y = 3;
				}
			} else {
				e.velocity.y = -0.9 - wave.number / 10;
				e.velocity.x = 0;
				if (e.velocity.y < -3) {
					e.velocity.y = -3;
				}
			}
		}
	}
}*/

function changeCameraZoom (event) {
	if (event.deltaY > 0) {
		if (camera.zoom > 0.5) {
			camera.zoom -= 0.1;
		}
	} else {
		if (camera.zoom < 1) {
			camera.zoom += 0.1;
		}
	}
}