// bullet
let r1 ,r2;
// sprites
let tank1, tank2;
// groups
let bullets, walls, explodes, missiles, boxes, oils, drawLast;
// images & animations
let PrimaryButtonImg, tank1Img, tank2Img, explodeAnim, bombImg, metalWallImage, grassTile1, grassTile2, bullet1Img, bullet2Img, missileImg, chipImg, oilImg, cursorImg, sliderPointerImg;
// buttons
let play, mode, settings, menu;
// game variables
let tank1Score, tank2Score, level, boxSize, levelOffsetX, levelOffsetY, dis;
// sounds
let explodeSnd, tankSnd, driveAroundSnd, bombExplodeSnd;
// fonts
let kenneyFont;
// sliders
let musicSlider;
// settings butttons & variables
let on, off, music;
// arrays
let explodedBoxes = [];
// const
const hp = 5, speed = 2, ViewRuler = false;

setCanvas (960, 540);

function init() {
	// loading text
	text.align = 'center';
	text.size = 32;
	fill('#fff');
	txt('Loading...', canvasWidth / 2, 500);
	// images and animations
	tank1Img = loadImage ("images/tankBlue.svg");
	tank2Img = loadImage ("images/tankRed.svg");
	metalWallImage = loadImage ("images/wall.svg");
	grassTile = loadImage ("images/groundGrass.svg");
	sandTile = loadImage ("images/groundSand.svg");
	bullet1Img = loadImage ("images/bulletBlue.svg");
	bullet2Img = loadImage ("images/bulletRed.svg");
	missileImg = loadImage ("images/missile.svg");
	boxImg = loadImage ("images/box.svg");
	chipImg = loadImage ("images/boxParticle.svg");
	oilImg = loadImage ("images/oil.svg");
	cursorImg = loadImage ("images/cursor_pointer3D.png");
	PrimaryButtonImg = loadImage ("images/redButton1.svg");
	SecondaryButtonImg = loadImage ("images/redButton2.svg");
	backgroundImg = loadImage ('images/Sample.png');
	sliderPointerImg = loadImage('images/sliderPointer.svg');
	minimizeIconImg = loadImage('images/minimize.svg');
	maximizeIconImg = loadImage('images/maximize.svg');
	checkBoxImg = loadImage('images/checkBox.svg');
	checkBoxTickedImg = loadImage('images/checkBoxTicked.svg');
	// sounds
	explodeSnd = loadSound ("sounds/Explode.wav");
	tankSnd = loadSound ("sounds/Tank.wav");
	driveAroundSnd = loadSound ("sounds/DriveAround.wav");
	bombExplodeSnd = loadSound ("sounds/bombExplode.wav");
	// load fonts
	kenneyFont = loadFont ("kenney", "url(../fonts/kenvector_future_thin.ttf)");
	// animations
	explodeAnim = loadAnimation (["animations/explosion1.svg", "animations/explosion2.svg", "animations/explosion3.svg", "animations/explosion4.svg", "animations/explosion5.svg"]);
}

function setup() {
	// set font
	text.font = "kenney";
	// set cursor
	dl.cursor.changeStyle ("custom");
	dl.cursor.addImage (cursorImg, 20, 24);
	// set variables
	music = 1;
	tank1Score = 0;
	tank2Score = 0;
	explodeAnim.frameDelay = 200;
	level = 1;
	dis = 360;
	// groups
	bullets = createGroup ();
	walls = createGroup ();
	explodes = createGroup ();
	missiles = createGroup ();
	boxes = createGroup ();
	oils = createGroup ();
	drawLast = createGroup ();
	// tank 1
	tank1 = createSprite (100, 100);
	tank1.addCostume ('base', tank1Img, 46, 42);
	tank1.rotateToDirection = false;
	tank1.setCollider ("circle", 0, 0, 22);
	tank1.friction = 0.1;
	tank1.scale = 0.9;
	tank1.OFF();
	// tank 2
	tank2 = createSprite (500, 400);
	tank2.addCostume ('base', tank2Img, 46, 38);
	tank2.rotateToDirection = false;
	tank2.setCollider ("circle", 0, 0, 22);
	tank2.friction = 0.1;
	tank2.scale = 0.9;
	tank2.OFF();
	// play button
	play = createButton ("Play", canvasWidth / 2, 200, playGame, -6);
	play.text.setVariables (26, "#7C390C", "kenney");
	play.hoverText.setVariables (26, "#eef8e9", "kenney");
	play.addImage (PrimaryButtonImg, 228, 60);
	// chage map button
	changeMap = createButton ("Change map", canvasWidth / 2, 270, ChangeMap, -6);
	changeMap.text.setVariables (26, "#E86A17", "kenney");
	changeMap.hoverText.setVariables (26, "#7C390C", "kenney");
	changeMap.addImage (SecondaryButtonImg, 228, 60);
	// settings button
	settings = createButton ("Settings", canvasWidth / 2, 340, Settings, -6);
	settings.text.setVariables (26, "#E86A17", "kenney");
	settings.hoverText.setVariables (26, "#7C390C", "kenney");
	settings.addImage (SecondaryButtonImg, 228, 60);
	// menu button
	menu = createButton ("Menu", canvasWidth / 2, 375, Menu, -6);
	menu.text.setVariables (26, "#7C390C", "kenney");
	menu.hoverText.setVariables (26, "#eef8e9", "kenney");
	menu.addImage (PrimaryButtonImg, 228, 60);
	// resume button
	resume = createButton ("Resume", canvasWidth / 2, 260, Resume, -6);
	resume.text.setVariables (26, "#7C390C", "kenney");
	resume.hoverText.setVariables (26, "#eef8e9", "kenney");
	resume.addImage (PrimaryButtonImg, 228, 60);
	// full screen button
	fullScreenBtn = createButton ("", canvasWidth - 30, 30, FullScreen, -6);
	fullScreenBtn.text.setVariables (26, "#7C390C", "kenney");
	fullScreenBtn.hoverText.setVariables (26, "#eef8e9", "kenney");
	fullScreenBtn.addImage (maximizeIconImg, 40, 40);
	// small screen button
	smallScreenBtn = createButton ("", canvasWidth - 30, 30, SmallScreen, -6);
	smallScreenBtn.text.setVariables (26, "#7C390C", "kenney");
	smallScreenBtn.hoverText.setVariables (26, "#eef8e9", "kenney");
	smallScreenBtn.addImage (minimizeIconImg, 40, 40);
	smallScreenBtn.visible = false;
	// music slider
	musicSlider = createSlider (canvasWidth / 2 - 125, 225, 0, 100, 100, 250, 5);
	musicSlider.addImages (sliderPointerImg);
	musicSlider.pointer.width = 28;
	musicSlider.pointer.height = 42;
	musicSlider.sliderColor = "#999";
	musicSlider.valueColor = "#60b13a";
	musicSlider.visible = false;
	// change volume of sounds
	musicSlider.valueChange = function () {
		explodeSnd.volume = musicSlider.value / 100;
		tankSnd.volume = musicSlider.value / 100;
		driveAroundSnd.volume = musicSlider.value / 100;
		bombExplodeSnd.volume = musicSlider.value / 100;
	}

	Menu ();
}

function FullScreen() {
	openFullscreen();
	fullScreenBtn.visible = false;
	smallScreenBtn.visible = true;
}

function SmallScreen() {
	closeFullscreen();
	fullScreenBtn.visible = true;
	smallScreenBtn.visible = false;
}

function createWalls (x, y, numX, numY) {
	for (let clonX = 0; clonX < numX; clonX++) {
		for (let clonY = 0; clonY < numY; clonY++) {
			let w = createSprite ((x + clonX) * boxSize + levelOffsetX, (y + clonY) * boxSize + levelOffsetY, boxSize, boxSize);
			w.setCollider ("rect", 0, 0, boxSize, boxSize);
			w.addToGroup (walls);
			w.addCostume ('base', metalWallImage, boxSize, boxSize);
			w.scale = 1.03;
		}
	}
}

function createBox (x, y, numX, numY) {
	for (let clonX = 0; clonX < numX; clonX++) {
		for (let clonY = 0; clonY < numY; clonY++) {
			let b = createSprite ((x + clonX) * boxSize + levelOffsetX, (y + clonY) * boxSize + levelOffsetY, boxSize, boxSize);
			b.setCollider ("rect", 0, 0, boxSize, boxSize);
			b.addToGroup (boxes);
			b.addToGroup (walls);
			b.addCostume ("box", boxImg, boxSize, boxSize);
			b.addCostume ("explode", explodeAnim, boxSize, boxSize, 100);
			b.changeCostume ("box");
			b.scale = 1.03;
		}
	}
}

function createOil (x, y) {
	let o;
	o = createSprite (x * boxSize + levelOffsetX, y * boxSize + levelOffsetY, boxSize, boxSize);
	o.setCollider ("circle", 0, 0, 15);
	o.addToGroup (oils);
	o.addCostume ('base', oilImg, boxSize, boxSize);
}

function Menu () {
	play.visible = true;
	changeMap.visible = true;
	settings.visible = true;
	menu.visible = false;
	resume.visible = false;
	musicSlider.visible = false;
	mode = 1;
	tank1.OFF();
	tank2.OFF();
	activeSprites.deleteSprites();
}

function ChangeMap () {
	mode = 5;
	play.visible = false;
	changeMap.visible = false;
	settings.visible = false;
	menu.visible = true;
	menu.position.set (canvasWidth / 2, canvasHeight - 80);
	// draw levels
	createLevel(1, 9, 230, 112);
	createLevel(2, 9, 496, 112);
	createLevel(3, 9, 230, 279);
	createLevel(4, 9, 496, 279);
}

function Settings () {
	mode = 3;
	play.visible = false;
	changeMap.visible = false;
	settings.visible = false;
	musicSlider.visible = true;
	menu.visible = true;
	menu.position.set (canvasWidth / 2, 345);
}

function playGame () {
	play.visible = false;
	settings.visible = false;
	changeMap.visible = false;
	newGame ();
	mode = 2;
	tank1.missile = 600;
	tank2.missile = 600;
	tank1.ON();
	tank2.ON();
}

function newGame () {
	walls.deleteSprites ();
	boxes.deleteSprites ();
	oils.deleteSprites ();
	tank1.energy = hp;
	tank2.energy = hp;
	tank1.missileExploded = true;
	tank2.missileExploded = true;
	r1 = 60;
	r2 = 60;
	
	explodedBoxes = [];
	createLevel(level, 37.5, 11.25, 7.5);
}

function createLevel(level, size, ox, oy) {
	// level width - 26 blocks
	// level height - 15 blocks
	boxSize = size;
	levelOffsetX = ox; // 11.25
	levelOffsetY = oy; // 7.5
	// border walls
	createWalls (0, 0, 26, 1);
	createWalls (0, 14, 26, 1);
	createWalls (0, 1, 1, 13);
	createWalls (25, 1, 1, 13);

	if (level == 1) {
		tanksPosition(1, 1, 45, 23, 12, 225);
		// walls
		createWalls(4, 7, 7, 1);
		createWalls(15, 7, 7, 1);
		createWalls(7, 4, 1, 7);
		createWalls(18, 4, 1, 7);
		// boxes
		createBox(10, 4, 6, 1);
		createBox(10, 10, 6, 1);
		createBox(4, 1, 1, 3);
		createBox(21, 1, 1, 3);
		createBox(4, 11, 1, 3);
		createBox(21, 11, 1, 3);
		// oils
		createOil(3, 6);
		createOil(22, 8);
		createOil(5, 10);
		createOil(10, 6);
		createOil(21, 4);
		createOil(16, 9);
		createOil(13, 5);
		createOil(11, 13);
		createOil(16, 2);
	} else if (level == 2) {
		tanksPosition(12, 1, 135, 12, 12, 315);
		// walls
		createWalls(5, 4, 1, 7);
		createWalls(20, 4, 1, 7);
		createWalls(10, 1, 1, 3);
		createWalls(15, 1, 1, 3);
		createWalls(10, 11, 1, 3);
		createWalls(15, 11, 1, 3);
		createWalls(6, 7, 14, 1);
		// boxes
		createBox(5, 1, 1, 3);
		createBox(20, 1, 1, 3);
		createBox(5, 11, 1, 3);
		createBox(20, 11, 1, 3);
		// oils
		createOil(1, 6);
		createOil(1, 10);
		createOil(2, 2);
		createOil(3, 8);
		createOil(3, 12);
		createOil(4, 4);
		createOil(21, 2);
		createOil(21, 11);
		createOil(22, 5);
		createOil(23, 8);
		createOil(24, 4);
		createOil(24, 12);
	} else if (level == 3) {
		tanksPosition(1, 1, 90, 23, 12, 270);
		// walls
		createWalls(3, 1, 1, 3);
		createWalls(3, 6, 1, 6);
		createWalls(6, 3, 5, 1);
		createWalls(4, 6, 4, 1);
		createWalls(6, 9, 1, 1);
		createWalls(7, 9, 1, 5);
		createWalls(10, 4, 1, 8);
		createWalls(11, 9, 3, 1);
		createWalls(13, 1, 1, 3);
		createWalls(13, 12, 1, 2);
		createWalls(13, 6, 4, 1);
		createWalls(16, 7, 1, 5);
		createWalls(17, 11, 3, 1);
		createWalls(16, 3, 4, 1);
		createWalls(19, 4, 1, 5);
		createWalls(20, 6, 3, 1);
		createWalls(22, 3, 3, 1);
		createWalls(22, 9, 1, 5);
		// boxes
		createBox(4, 3, 2, 1);
		createBox(20, 3, 2, 1);
		createBox(3, 12, 1, 2);
		createBox(7, 7, 1, 2);
		createBox(11, 6, 2, 1);
		createBox(13, 10, 1, 2);
		createBox(16, 4, 1, 2);
		createBox(20, 11, 2, 1);
		// oils
		createOil(9, 2);
		createOil(18, 1);
		createOil(7, 4);
		createOil(1, 11);
		createOil(5, 10);
		createOil(9, 11);
		createOil(13, 5);
		createOil(14, 10);
		createOil(17, 13);
		createOil(20, 9);
	} if (level == 4) {
		tanksPosition(1, 6.5, 45, 23, 6.5, 225);
		// walls
		createWalls(4, 5, 1, 5);
		createWalls(21, 5, 1, 5);
		createWalls(6, 2, 1, 2);
		createWalls(7, 12, 1, 2);
		createWalls(8, 7, 1, 2);
		createWalls(11, 4, 1, 2);
		createWalls(12, 11, 1, 2);
		createWalls(13, 7, 1, 2);
		createWalls(15, 2, 1, 2);
		createWalls(16, 8, 1, 2);
		createWalls(18, 4, 1, 2);
		createWalls(19, 11, 1, 2);
		// boxes
		createBox(2, 3, 2, 1);
		createBox(3, 12, 2, 1);
		createBox(7, 5, 2, 1);
		createBox(7, 10, 2, 1);
		createBox(10, 8, 2, 1);
		createBox(11, 2, 2, 1);
		createBox(14, 12, 2, 1);
		createBox(15, 6, 2, 1);
		createBox(18, 9, 2, 1);
		createBox(19, 2, 2, 1);
		createBox(21, 11, 2, 1);
		createBox(23, 3, 2, 1);
		// oils
		createOil(4, 2);
		createOil(5, 11);
		createOil(9, 6);
		createOil(10, 12);
		createOil(13, 3);
		createOil(14, 9);
		createOil(17, 12);
		createOil(18, 2);
		createOil(20, 8);
		createOil(23, 4);
	}
}

function tanksPosition (x1, y1, r1, x2, y2, r2) {
	tank1.position.x = levelOffsetX + boxSize * (x1 + 0.5);
	tank1.position.y = levelOffsetY + boxSize * (y1 + 0.5);
	tank1.rotation = r1;
	tank2.position.x = levelOffsetX + boxSize * (x2 + 0.5);
	tank2.position.y = levelOffsetY + boxSize * (y2 + 0.5);
	tank2.rotation = r2;
}

function run () {
	if (mode == 1) {
		// menu
		drawMode = 'center';
		image(backgroundImg, 480 - (mouse.x - 480) / 10, 270 - (mouse.y - 270) / 10, 1055, 592);
		fill('#EEEEEE');
		rect(canvasWidth / 2, canvasHeight / 2, 248, 320, 0, 10);
		fill('#FFFFFF');
		strokeRect(canvasWidth / 2, canvasHeight / 2, 248, 320, 0, 2, 10);
		fill('#999999');
		strokeRect(canvasWidth / 2, canvasHeight / 2, 252, 324, 0, 2, 14);
		text.size = 32;
		text.align = "center";
		txt ("TANK DUEL", canvasWidth / 2, 150);
		fill ("#419FDD");
		text.size = 24;
		text.align = "left";
		txt ("Blue: " + tank1Score, 368, 406);
		fill ("#E74C3C");
		text.align = "right";
		txt ("Red: " + tank2Score, 597, 406);
	} else if (mode == 2) {
		// game
		gameUpdate();
	} else if (mode == 3) {
		// settings
		drawMode = 'center';
		image(backgroundImg, 480 - (mouse.x - 480) / 10, 270 - (mouse.y - 270) / 10, 1055, 592);
		fill('#EEEEEE');
		rect(canvasWidth / 2, canvasHeight / 2, 300, 250, 0, 10);
		fill('#FFFFFF');
		strokeRect(canvasWidth / 2, canvasHeight / 2, 300, 250, 0, 2, 10);
		fill('#999999');
		strokeRect(canvasWidth / 2, canvasHeight / 2, 302, 254, 0, 2, 14);
		text.size = 24;
		text.align = "center";
		txt ("volume: " + musicSlider.value, canvasWidth / 2, 185);
		// infinite bullet life
		text.align = "left";
		txt('bullet timeout', 360, 285);
		image(dis < 1000 ? checkBoxTickedImg : checkBoxImg, 595, 277.5, 30, 30);
		if (mouse.down && mouse.x > 580 && mouse.x < 610 && mouse.y > 262.5 && mouse.y < 292.5) {
			dis = dis < 1000 ? 60000000 : 360;
		}
	} else if (mode == 4) {
		// resume
		drawGame();
		text.align = 'center';
		fill('#EEEEEE');
		rect(canvasWidth / 2, canvasHeight / 2, 248, 200, 0, 10);
		fill('#FFFFFF');
		strokeRect(canvasWidth / 2, canvasHeight / 2, 248, 200, 0, 2, 10);
		fill('#999999');
		strokeRect(canvasWidth / 2, canvasHeight / 2, 252, 204, 0, 2, 14);
		text.size = 32;
		txt ("Paused", canvasWidth / 2, 210);
	} else if (mode == 5) {
		// change map
		drawMode = 'center';
		image(backgroundImg, 480 - (mouse.x - 480) / 10, 270 - (mouse.y - 270) / 10, 1055, 592);
		fill('#EEEEEE');
		rect(canvasWidth / 2, canvasHeight / 2, 564, 480, 0, 10);
		fill('#FFFFFF');
		strokeRect(canvasWidth / 2, canvasHeight / 2, 564, 480, 0, 2, 10);
		fill('#999999');
		strokeRect(canvasWidth / 2, canvasHeight / 2, 568, 484, 0, 2, 14);
		text.size = 32;
		text.align = 'center';
		txt ("Choose map", canvasWidth / 2, 80);
		// draw maps
		drawMode = 'corner';
		fill('#39C272');
		rect(225.5, 107.5, 234, 135);
		rect(491.5, 107.5, 234, 135);
		fill('#E7D4A9');
		rect(225.5, 274.5, 234, 135);
		rect(491.5, 274.5, 234, 135);
		drawSprites();
		// selected map
		fill('#E86A17');
		strokeRect(level % 2 ? 218 : 484, level > 2 ? 267 : 100, 249, 150, 0, 5);
		if (mouse.down) {
			if (mouse.x > 225.5 && mouse.x < 459.5 && mouse.y > 107.5 && mouse.y < 242.5) {
				level = 1;
			} else if (mouse.x > 491.5 && mouse.x < 725.5 && mouse.y > 107.5 && mouse.y < 242.5) {
				level = 2;
			} else if (mouse.x > 225.5 && mouse.x < 459.5 && mouse.y > 274.5 && mouse.y < 409.5) {
				level = 3;
			} else if (mouse.x > 491.5 && mouse.x < 725.5 && mouse.y > 274.5 && mouse.y < 409.5) {
				level = 4;
			}
		}
	}
}

function gameUpdate () {
	// tank1 set max speed & rotation
	if (tank1.overlap (oils)) {
		tank1.speed = speed / 2;
		tank1.turn = speed * 0.6;
	} else {
		tank1.speed = speed;
		tank1.turn = speed * 1.2;
	}

	// tank1 turn
	if (keyDown ('ArrowRight') && keyDown ('ArrowDown')) {
		tank1.rotation -= tank1.turn;
	} else if (keyDown ('ArrowLeft') && keyDown ('ArrowDown')) {
		tank1.rotation += tank1.turn;
	} else if (keyDown ('ArrowRight')) {
		tank1.rotation += tank1.turn;
		tank1.setSpeed (tank1.speed / 2.5, tank1.rotation);
	} else if (keyDown ('ArrowLeft')) {
		tank1.rotation -= tank1.turn;
		tank1.setSpeed (tank1.speed / 2.5, tank1.rotation);
	}
	
	// tank1 move
	if (keyDown ('ArrowUp')) {
		tank1.setSpeed (tank1.speed, tank1.rotation);
	}

	if (keyDown ('ArrowDown')) {
		tank1.setSpeed (-tank1.speed, tank1.rotation);
	}

	tank1.collide (walls);
	// tank2 set max speed & rotation
	if (tank2.overlap (oils)) {
		tank2.speed = speed / 2;
		tank2.turn = speed * 0.6;
	} else {
		tank2.speed = speed;
		tank2.turn = speed * 1.2;
	}

	// tank2 turn
	if (keyDown ('KeyD') && keyDown ('KeyS')) {
		tank2.rotation -= tank2.turn;
	} else if (keyDown ('KeyA') && keyDown ('KeyS')) {
		tank2.rotation += tank2.turn;
	} else if (keyDown ('KeyD')) {
		tank2.rotation += tank2.turn;
		tank2.setSpeed (tank2.speed / 2.5, tank2.rotation);
	} else if (keyDown ('KeyA')) {
		tank2.rotation -= tank2.turn;
		tank2.setSpeed (tank2.speed / 2.5, tank2.rotation);
	}

	// tank2 move
	if (keyDown ('KeyW')) {
		tank2.setSpeed (tank2.speed, tank2.rotation);
	}

	if (keyDown ('KeyS')) {
		tank2.setSpeed (-tank2.speed, tank2.rotation);
	}

	tank2.collide (walls);
	// bullet
	if (keyUp ('KeyM') && r1 > 59 || keyUp('0') && r1 > 59) {
		createBullet (tank1, 1);
	}

	if (keyUp ('Space') && r2 > 59) {
		createBullet (tank2, 2);
	}

	if (keyUp ('KeyN') || keyUp('1')) {
		if (tank1.missileExploded == false) {
			missiles.forEach(m => {
				if (m.tank == 1) {
					m.phase = 3;
				}
			});
		} else if (tank1.missile >= 600) {
			createMissile (tank1, 1);
		}
	}

	if (keyUp ('KeyC')) {
		if (tank2.missileExploded == false) {
			missiles.forEach(m => {
				if (m.tank == 2) {
					m.phase = 3;
				}
			});
		} else if (tank2.missile >= 600) {
			createMissile (tank2, 2);
		}
	}

	// collide
	tank1.overlap (bullets, tankHit);
	tank2.overlap (bullets, tankHit);
	// bullets bounce
	bullets.bounce (walls, function (b, w) {
		if (boxes.contains (w)) {
			// box explode
			explodedBoxes.push (w.position.x - boxSize / 2);
			explodedBoxes.push (w.position.y - boxSize / 2);
			w.changeCostume ("explode");
			w.getCostume('explode').image.setFrame(1);
			w.life = 30;
			walls.remove (w);
			boxes.remove (w);
			b.delete ();
		}
	});
	// explode collide
	tank1.overlap (explodes, function (t, e) {
		if (e.damageable == true) {
			e.damageable = false;
			tank1.energy -= 1;
			explodeSnd.play();
		}
	});

	tank2.overlap (explodes, function (t, e) {
		if (e.damageable == true) {
			e.damageable = false;
			tank2.energy -= 1;
			explodeSnd.play();
		}
	});

	// tank1 win
	if (tank2.energy == 0) {
		tank1Score += 1;
		Menu();
	}

	// tank2 win
	if (tank1.energy == 0) {
		tank2Score += 1;
		Menu();
	}

	// reloading
	if (r1 < 60) r1 += 1;
	if (r2 < 60) r2 += 1;
	if (tank1.missile < 600) tank1.missile += 1;
	if (tank2.missile < 600) tank2.missile += 1;
	
	drawGame();

	// missiles
	missiles.forEach(m => {
		if (m.phase == 1) {
			if (m.scale <= 1) {
				m.scale += 0.02;
			} else {
				m.scale = 1;
				m.phase = 2;
				if (m.tank == 1) {
					tank1.missileExploded = false;
				} else {
					tank2.missileExploded = false;
				}
			}
		} else if (m.phase == 3) {
			if (m.scale >= 0.5) {
				m.scale -= 0.02;
			} else {
				missileExplode (m);
			}
		} else if (m.tank == 1 && tank1.missile > 300 || m.tank == 2 && tank2.missile > 300) {
			missileExplode(m);
		}
	});

	// explodes
	explodes.forEach(e => {
		e.scale += 0.0006 * boxSize
		e.overlap (boxes, function (e, b) {
			explodedBoxes.push (b.position.x - boxSize / 2);
			explodedBoxes.push (b.position.y - boxSize / 2);
			b.delete ();
		});
	});

	// resume
	if (keyPressed ('Escape')) {
		mode = 4;
		resume.visible = true;
		menu.visible = true;
		menu.position.set (canvasWidth / 2, 330);
	}
}

function drawGame() {
	// draw grass
	drawMode = 'corner';
	for (let i = 0; i < 16; i++) {
		for (let l = 0; l < 9; l++) {
			image (level <= 2 ? grassTile : sandTile, i * 60, l * 60, 60, 60);
		}
	}

	drawMode = 'center';
	for (let i = 0; i < explodedBoxes.length; i += 2) {
		const x = explodedBoxes[i];
		const y = explodedBoxes[i + 1];
		translate (x + boxSize / 3, y + boxSize / 3.3);
		rotate (-45);
		image (chipImg, 0, 0, 12.35 * (boxSize / 40), 9.1 * (boxSize / 40));
		rotate (45);
		translate (-boxSize / 3, -boxSize / 3.3);
		translate (boxSize / 1.3, boxSize / 2.6);
		rotate (35);
		image (chipImg, 0, 0, 12.35 * (boxSize / 40), 9.1 * (boxSize / 40));
		rotate (-35);
		translate (-boxSize / 1.3, -boxSize / 2.6);
		translate (boxSize / 2, boxSize / 1.3);
		rotate (10);
		image (chipImg, 0, 0, 12.35 * (boxSize / 40), 9.1 * (boxSize / 40));
		rotate (-10);
		translate (-x - boxSize / 2, -y - boxSize / 1.3);
	}

	drawMode = 'corner';
	drawSprites ();
	tank1.draw();
	tank2.draw();
	drawLast.draw();
	// hp boxes
	drawMode = 'center';
	if (tank1.energy < hp) {
		fill ("#ddd");
		rect (tank1.position.x, tank1.position.y -35, 53, 8);
		fill ("#50C878");
		rect (tank1.position.x - (hp - tank1.energy) / hp * 25, tank1.position.y -35, tank1.energy / hp * 50, 5);
	}

	if (tank2.energy < hp) {
		fill ("#ddd");
		rect (tank2.position.x, tank2.position.y -35, 53, 8);
		fill ("#50C878");
		rect (tank2.position.x - (hp - tank2.energy) / hp * 25, tank2.position.y -35, tank2.energy / hp * 50, 5); // - (hp - tank2.energy) / hp * 20
	}

	if (tank1.missile < 600) {
		fill ("#FFBF00");
		if (tank1.energy == 5) {
			rect (tank1.position.x - tank1.missile / 22.64, tank1.position.y -35, 53 - tank1.missile / 11.32, 5);
		} else {
			rect (tank1.position.x - tank1.missile / 22.64, tank1.position.y -43, 53 - tank1.missile / 11.32, 5);
		}
	}

	if (tank2.missile < 600) {
		fill ("#FFBF00");
		if (tank2.energy == 5) {
			rect (tank2.position.x - tank2.missile / 22.64, tank2.position.y -35, 53 - tank2.missile / 11.32, 5);
		} else {
			rect (tank2.position.x - tank2.missile / 22.64, tank2.position.y -43, 53 - tank2.missile / 11.32, 5);
		}
	}

	if (ViewRuler == true) {
		fill('#000');
		text.align = 'center';
		text.size = boxSize / 2;
		for (let i = 1; i < 25; i++) {
			txt(i, levelOffsetX + boxSize * i, levelOffsetY + boxSize + 8);
		}

		for (let i = 1; i < 14; i++) {
			txt(i, levelOffsetX + boxSize, levelOffsetY + boxSize * i + 8);
		}
	}
}

function createBullet (tank, img) {
	tankSnd.play();
	const a = tank.rotation / 180 * Math.PI;
	const x = Math.cos (a) * 28 + tank.position.x;
	const y = Math.sin (a) * 28 + tank.position.y;
	let b;
	b = createSprite (x, y, 15, 15);
	// bullet image
	if (img == 1) {
		b.addCostume ("bullet", bullet1Img, 16, 12);
	} else {
		b.addCostume ("bullet", bullet2Img, 16, 12);
	}

	b.addCostume ("explode", explodeAnim, 25, 25, 100);
	b.changeCostume ("bullet");
	// bullet seting
	b.rotateToDirection = true;
	b.setCollider ("rect", 0, 0, 6, 6);
	b.setSpeed (5, tank.rotation);
	b.life = dis;
	b.addToGroup (bullets);
	b.addToGroup (drawLast);
	if (tank == tank1) {
		r1 = 0;
	} else {
		r2 = 0;
	}
}

function tankHit (t, b) {
		b.changeCostume ("explode");
		b.getCostume('explode').image.setFrame(1);
		b.life = 30;
		b.setSpeed (0, 0);
		explodeSnd.play();
		t.energy -= 1;
		bullets.remove (b);
}

function createMissile (t, tank) {
	// missile
	let m;
	m = createSprite (t.position.x, t.position.y, 75, 75);
	m.addCostume ('base', missileImg, 57, 39);
	m.addToGroup (missiles);
	m.addToGroup (drawLast);
	m.setSpeed (5, t.rotation);
	m.scale = 0.5;
	m.phase = 1;
	m.rotation = t.rotation;
	m.tank = tank;
	t.missile = 0;
}

function missileExplode (m) {
	// explode
	let e = createSprite (m.position.x, m.position.y);
	e.addCostume ("base", explodeAnim, 90, 90, 100);
	e.getCostume('base').image.setFrame(1);
	e.life = 30;
	e.scale = 0.006 * boxSize;
	e.setCollider ("circle", 0, 0, 45);
	e.addToGroup (explodes);
	e.addToGroup (drawLast);
	e.damageable = true;
	m.delete ();
	bombExplodeSnd.play ();
	if (m.tank == 1) {
		tank1.missileExploded = true;
	} else {
		tank2.missileExploded = true;
	}
}

function Resume () {
	mode = 2;
	menu.visible = false;
	resume.visible = false;
}