// sprites
let opponents, player, walls;
// buttons
let normal, survival, respawn, menu, newGame, settings, resume, randomize;
// game variables
let mode, hs, kills, rank, j, cameraZoom;
// fonts
let maven;
// sliders
let botsNumberSlider, redSlider, greenSlider, blueSlider;
// sliders vallue
let botsNumber, red, green, blue;
// lists
let settingsVariables = [];

function preload () {
	maven = loadFont ("../fonts/Maven_Pro/static/MavenPro-Medium.ttf");
}

function setup() {
	var cnv = createCanvas(600, 500);
	cnv.parent ("sketchHolder");
	frameRate (30);
	textFont (maven);
	botsNumber = 100;
	// groups
	walls = new Group ();
	opponents = new Group ();
	// walls
	var wall;
	wall = createSprite (width / 2, 0, width, 5);
	wall.immovable = true;
	wall.addToGroup (walls);
	wall = createSprite (width / 2, height, width, 5);
	wall.immovable = true;
	wall.addToGroup (walls);
	wall = createSprite (0, height / 2, 5, height);
	wall.immovable = true;
	wall.addToGroup (walls);
	wall = createSprite (width, height / 2, 5, height);
	wall.immovable = true;
	wall.addToGroup (walls);
	// normal button
	normal = createButton ("Normal");
	normal.parent ("sketchHolder");
	normal.position (150, 215);
	normal.size (300, 50);
	normal.style ("font-size", "32px");
	normal.mousePressed (normalMode);
	// survival button
	survival = createButton ("Survival");
	survival.parent ("sketchHolder");
	survival.position (150, 275);
	survival.size (300, 50);
	survival.style ("font-size", "32px");
	survival.mousePressed (survivalMode);
	// respawn button
	respawn = createButton ("Respawn");
	respawn.parent ("sketchHolder");
	respawn.position (150, 225);
	respawn.size (300, 50);
	respawn.style ("font-size", "32px");
	respawn.mousePressed (respawnPlayer);
	// menu button
	menu = createButton ("Menu");
	menu.parent ("sketchHolder");
	menu.position (150, 270);
	menu.size (300, 50);
	menu.style ("font-size", "32px");
	menu.mousePressed (Menu);
	// newGame button
	newGame = createButton ("New game");
	newGame.parent ("sketchHolder");
	newGame.position (150, 225);
	newGame.size (300, 50);
	newGame.style ("font-size", "32px");
	newGame.mousePressed (NewGame);
	// settings button
	settings = createButton ("Settings");
	settings.parent ("sketchHolder");
	settings.position (150, 335);
	settings.size (300, 50);
	settings.style ("font-size", "32px");
	settings.mousePressed (Settings);
	// resume button
	resume = createButton ("Resume");
	resume.parent ("sketchHolder");
	resume.position (150, 215);
	resume.size (300, 50);
	resume.style ("font-size", "32px");
	resume.mousePressed (Resume);
	// randomize button
	randomize = createButton ("Randomize");
	randomize.parent ("sketchHolder");
	randomize.position (350, 370);
	randomize.size (200, 40);
	randomize.style ("font-size", "32px");
	randomize.mousePressed (Randomize);
	// bots number slider
	botsNumberSlider = createSlider (5, 300, 100);
	botsNumberSlider.position (275, 150);
	botsNumberSlider.parent ("sketchHolder");
	botsNumberSlider.style ("width", "300px");
	// red slider
	redSlider = createSlider (0, 255, random (255));
	redSlider.position (325, 260);
	redSlider.parent ("sketchHolder");
	redSlider.style ("width", "250px");
	// green slider
	greenSlider = createSlider (0, 255, random (255));
	greenSlider.position (325, 300);
	greenSlider.parent ("sketchHolder");
	greenSlider.style ("width", "250px");
	// blue slider
	blueSlider = createSlider (0, 255, random (255));
	blueSlider.position (325, 340);
	blueSlider.parent ("sketchHolder");
	blueSlider.style ("width", "250px");
	// local storage
	if (localStorage.lastVersionPlayed) {
		// last version played
		var lvp = [];
		j = localStorage.getItem ("lastVersionPlayed");
		lvp = JSON.parse (j);
		if (lvp[1] == 1.1) {
			// get variables
			j = localStorage.getItem ("feederVariables");
			settingsVariables = JSON.parse (j);
			// set variables
			botsNumber = settingsVariables[0];
			red = settingsVariables[1];
			green = settingsVariables[2];
			blue = settingsVariables[3];
			// sliders value
			botsNumberSlider.value (botsNumber);
			redSlider.value (red);
			greenSlider.value (green);
			blueSlider.value (blue);
		} else {
			// last version played
			var lvp = [];
			j = localStorage.getItem ("lastVersionPlayed");
			lvp = JSON.parse (j);
			lvp[1] = 1.1;
			j = JSON.stringify (lvp);
			localStorage.setItem ("lastVersionPlayed", j);
			// set variables
			red = redSlider.value ();
			green = greenSlider.value ();
			blue = blueSlider.value ();
			settingsVariables[0] = botsNumber;
			settingsVariables[1] = red;
			settingsVariables[2] = green;
			settingsVariables[3] = blue;
			j = JSON.stringify (settingsVariables);
			localStorage.setItem ("feederVariables", j);
		}
	} else if (localStorage.key ("plc-lastVersionPlayed")) {
		// last version played
		var lvp = [];
		j = localStorage.getItem ("plc-lastVersionPlayed");
		append (lvp, JSON.parse (j));
		append (lvp, 1.1);
		append (lvp, 0);
		append (lvp, 0);
		j = JSON.stringify (lvp);
		localStorage.setItem ("lastVersionPlayed", j);
		localStorage.removeItem ("plc-lastVersionPlayed");
		// set variables
		red = redSlider.value ();
		green = greenSlider.value ();
		blue = blueSlider.value ();
		settingsVariables[0] = botsNumber;
		settingsVariables[1] = red;
		settingsVariables[2] = green;
		settingsVariables[3] = blue;
		j = JSON.stringify (settingsVariables);
		localStorage.setItem ("feederVariables", j);
	} else {
		// last version played
		var lvp = [0, 1.1, 0, 0];
		j = JSON.stringify (lvp);
		localStorage.setItem ("lastVersionPlayed", j);
		// set variables
		red = redSlider.value ();
		green = greenSlider.value ();
		blue = blueSlider.value ();
		settingsVariables[0] = botsNumber;
		settingsVariables[1] = red;
		settingsVariables[2] = green;
		settingsVariables[3] = blue;
		j = JSON.stringify (settingsVariables);
		localStorage.setItem ("feederVariables", j);
	}

	mode = 1;
	Menu ();
}

function Menu () {
	background ("black");
	// sprites
	if (mode != 1) {
		player.remove ();
		opponents.removeSprites ();
	}

	mode = 1;
	// text
	fill ("#a00909");
	textAlign (CENTER);
	textSize (60);
	text ("FEEDER", width / 2, 130);
	// buttons
	survival.show ();
	normal.show ();
	settings.show ();
	respawn.hide ();
	menu.hide ();
	newGame.hide ();
	resume.hide ();
	randomize.hide ();
	// sliders
	botsNumberSlider.hide ();
	redSlider.hide ();
	greenSlider.hide ();
	blueSlider.hide ();
	// camera
	camera.zoom = 3;
	//player
	player = createFeeder (width / 2, height / 2, 6);
	player.maxSpeed = 1;
	player.friction = 0.9;
	player.shapeColor = color (red, green, blue);
	// local storage
	settingsVariables[0] = botsNumber;
	settingsVariables[1] = red;
	settingsVariables[2] = green;
	settingsVariables[3] = blue;
	j = JSON.stringify (settingsVariables);
	localStorage.setItem ("feederVariables", j);
	// opponents
	opponents.removeSprites ();
}

function survivalMode () {
	mode = 3;
	survival.hide ();
	normal.hide ();
	newGame.hide ();
	menu.hide ();
	settings.hide ();
	hs = 0;
	kills = 0;
	cameraZoom = 6;
	// opponents
	for (var l = botsNumber; l > 0; l--) {
		createOpponent ();
	}

	// player
	player.position.x = random (5, 595);
	player.position.y = random (5, 495);
	for (let i = 100; i > 0; i--) {
		if (player.overlap (opponents)) {
			player.position.x = random (5, 595);
			player.position.y = random (5, 495);
		} else {
			i = 0;
		}
	}
}

function normalMode () {
	mode = 2;
	normal.hide ();
	survival.hide ();
	settings.hide ();
	hs = 0;
	kills = 0;
	cameraZoom = 6;
	// opponents
	for (var l = botsNumber; l > 0; l--) {
		createOpponent ();
	}

	// player
	player.position.x = random (5, 595);
	player.position.y = random (5, 495);
	for (let i = 100; i > 0; i--) {
		if (player.overlap (opponents)) {
			player.position.x = random (5, 595);
			player.position.y = random (5, 495);
		} else {
			i = 0;
		}
	}
}

function NewGame () {
	Menu ();
	survivalMode ();
}

function Settings () {
	mode = 6;
	// sliders
	botsNumberSlider.show ();
	redSlider.show ();
	greenSlider.show ();
	blueSlider.show ();
	// buttons
	normal.hide ();
	survival.hide ();
	settings.hide ();
	randomize.show ();
	menu.show ();
	menu.position (150, 430);
}

function Resume () {
	resume.hide ();
	menu.hide ();
	mode *= -1;
}

function Randomize () {
	redSlider.value (random (255));
	greenSlider.value (random (255));
	blueSlider.value (random (255));
}

function draw () {
	if (mode == 2 || mode == 3 || mode == 4 || mode == 7) {
		gameUpdate ();
	}

	if (mode == 6) {
		// settings
		camera.off ();
		// sliders
		botsNumber = botsNumberSlider.value ();
		red = redSlider.value ();
		green = greenSlider.value ();
		blue = blueSlider.value ();
		// text
		background ("black");
		fill ("#a00909");
		textSize (60);
		textAlign (CENTER);
		text ("Settings", width / 2, 90)
		textSize (40);
		text ("player color", width / 2, 230);
		textSize (30);
		fill ("ddd");
		textAlign (LEFT);
		text ("bots: " + botsNumber, 50, 170);
		text ("red: " + red, 150, 280);
		text ("green: " + green, 150, 320);
		text ("blue: " + blue, 150, 360);
		// draw
		fill (red, green, blue);
		noStroke ();
		rect (25, 260, 100, 100);
	}

	textAlign (CENTER);
	textSize (50);
	if (mode == 7) {
		camera.off ();
		textSize (60);
		textAlign (CENTER);
		text ("YOU LOSE!", width/2, 175);
	}

	if (mode == 4) {
		camera.off ();
		textSize (60);
		textAlign (CENTER);
		text ("GAME OVER!", width / 2, 175);
	}
}

function gameUpdate () {
	background(0);
	for (var l = 0; l < opponents.length; l++) {
		updateOpponent (opponents[l]);
	}

	// draw
	stroke ("white");
	strokeWeight (0.1);
	for (var o = 1; o < 20; o++) {
		line (0, o * 25, width, o * 25);
	}

	for (var p = 1; p < 24; p++) {
		line (p * 25, 0, p * 25, height);
	}

	drawSprites();
	// bounces
	opponents.bounce(walls);
	opponents.overlap(opponents, opponentsMeet);
	// rank
	rank = 1;
	for (let i = 0; i < opponents.length; i++) {
		var o = opponents[i];
		if (o.scale > player.scale) {
			rank ++;
		}
	}
	// text
	camera.off();
	fill ("#eee");
	textAlign (LEFT);
	textSize (30);
	text ("score: " + round (player.scale * player.scale), 15, 30);
	text ("kills: " + kills, 15, 70);
	textAlign (RIGHT);
	if (mode != 7 && mode != 4) {
		text ("rank: " + rank, width - 15, 70);
	}
	
	if (mode != 3 && mode != 4) {
		text ("high score: " + hs, width - 15, 30);
	}
	
	if (mode == 3) {
		text("alive: " + (opponents.length + 1), width - 15, 30);
	}

	if (mode == 4) {
		text("alive: " + (opponents.length), width - 15, 30);
	}

	camera.on();
	if (mode != 7 && mode != 4) {
		// player
		player.bounce(walls);
		player.overlap(opponents, opponentHit);
		if (mode == 2 && player.scale > 15) {
			player.scale -= player.scale / (150000 / botsNumber);
			if (botsNumber > 200) {
				player.scale -= player.scale / 2500;
			}
		}

		player.attractionPoint (1, mouseX * camera.zoom + (player.position.x - 300 * camera.zoom), mouseY * camera.zoom + (player.position.y - 250 * camera.zoom));
		// camera
		camera.position = player.position;
		if (player.scale > cameraZoom + cameraZoom / 2) {
			cameraZoom += 2;
		}

		if (player.scale < cameraZoom) {
			cameraZoom -= 2;
		}

		if (camera.zoom > 36 / cameraZoom && camera.zoom > 1) {
			camera.zoom -= 0.01;
		}

		if (camera.zoom < 36 / cameraZoom && cameraZoom < 4) {
			camera.zoom += 0.01;
		}
		// high score
		if (round (player.scale * player.scale) > hs) {
			hs = round (player.scale * player.scale);
		}
		// win
		if (mode == 3 && opponents.length == 0) {
			mode = 5;
			newGame.show();
			menu.show();
			menu.position (150, 285);
			background ("black");
			camera.off();
			background ("black");
			player.setSpeed (0, 0);
			textAlign (CENTER);
			textSize (50);
			fill ("#a00909");
			text("YOU WIN!", width / 2, 175);
		}
	}
}

function respawnPlayer () {
	respawn.hide();
	menu.hide();
	player.visible = true;
	player.scale = 6;
	camera.zoom = 3;
	cameraZoom = 6;
	hs = 0;
	kills = 0;
	player.maxSpeed = 1;
	mode = 2;
	player.position.x = random (5, 595);
	player.position.y = random (5, 495);
	for (let i = 100; i > 0; i--) {
		if (player.overlap (opponents)) {
			player.position.x = random (5, 595);
			player.position.y = random (5, 495);
		} else {
			i = 0;
		}
	}
}

function opponentHit (p, o) {
	if (p.scale >= o.scale) {
		// kill
		p.scale = sqrt (p.scale * p.scale + o.scale * o.scale);
		kills += 1;
		if (mode == 2 || mode == 7) {
			o.position.x = random (5, 595);
			o.position.y = random (5, 495);
			o.scale = 5;
			for (let i = 100; i > 0; i--) {
				if (o.overlap (opponents) || o.overlap (player)) {
					o.position.x = random (5, 595);
					o.position.y = random (5, 495);
				} else {
					i = 0;
				}
			}

			o.scale = 5;
		} else {
			o.remove();
		}
	} else {
		// lose
		o.scale = sqrt(o.scale * o.scale + p.scale * p.scale);
		p.position.x = width / 2;
		p.position.y = height / 2;
		p.maxSpeed = 0;
		camera.zoom = 1;
		p.visible = false;
		menu.show();
		menu.position (150, 285);
		if (mode == 2) {
			respawn.show();
			mode = 7;
		}

		if (mode == 3) {
			newGame.show();
			mode = 4;
		}
	}
}

function opponentsMeet (o1, o2) {
	if (o1.scale >= o2.scale) {
		o1.scale = sqrt(o1.scale * o1.scale + o2.scale * o2.scale);
		if (mode == 2 || mode == 7) {
			o2.position.x = random (5, 595);
			o2.position.y = random (5, 495);
			o2.scale = 5;
			for (let i = 100; i > 0; i--) {
				if (o2.overlap (opponents) || o2.overlap (player)) {
					o2.position.x = random (5, 595);
					o2.position.y = random (5, 495);
				} else {
					i = 0;
				}
			}
		} else {
			o2.remove();
		}
	} else {
		o2.scale = sqrt(o2.scale * o2.scale + o1.scale * o1.scale);
		if (mode == 2 || mode == 7) {
			o1.position.x = random (5, 595);
			o1.position.y = random (5, 495);
			o1.scale = 5;
			for (let i = 100; i > 0; i--) {
				if (o1.overlap (opponents) || o1.overlap (player)) {
					o1.position.x = random (5, 595);
					o1.position.y = random (5, 495);
				} else {
					i = 0;
				}
			}
		} else {
			o1.remove();
		}
	}
}

function updateOpponent (o) {
	if (mode == 2 && o.scale > 15 || mode == 7 && o.scale > 15) {
		o.scale -= o.scale / (200000 / botsNumber);
		if (botsNumber > 200) {
			o.scale -= o.scale / 2500;
		}
	}
	// walk distance
	if (o.framesToWalk > 0) {
		o.framesToWalk -= 1;
		return;
	}

	// new direction
	var dir;
	dir = random (360);
	o.setSpeed (1, dir);
	o.framesToWalk = random (30, 90);
}

function createOpponent () {
	var x = random (5, 595);
	var y = random (5, 495);
	o = createFeeder (x, y, 5);
	o.setCollider ("rectangle", 0, 0, 1, 1);
	o.framesToWalk = 0;
	o.addToGroup (opponents);
	return o;
}

function createFeeder (x, y, feederScale) {
	f = createSprite (x, y, 1, 1);
	f.scale = feederScale;
	return f;
}

function keyPressed () {
	if (keyCode == 27 && mode == 2 || keyCode == 27 && mode == 3) {
		mode *= -1;
		resume.show ();
		menu.show ();
		menu.position (150, 275);
		// draw
		background ("black");
		fill ("#eee");
		textAlign (CENTER);
		textSize (50);
		text ("Paused", width / 2, 110);
		// opponents
		for (let i = 0; i < opponents.length; i++) {
			var o = opponents[i];
			o.setSpeed (0, 0);
			o.framesToWalk = 0;
		}
	}
}