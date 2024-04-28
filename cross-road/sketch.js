// images
let BgImg;
// sprites
let player, car1, car2, car3, car4, coin;
// sounds
let deathSnd, motorSnd, endSnd;
// game variables
let score, level, highScore, mode, skin, money, Coins, gamePlayed, averageScore;
// buttons
let play, restart, menu, skins, next, previous, buy, selectB;
// font
let maven;
// sound
let sound = false;
// lists
let gameVariables = [], skinsUnlocked = [];
// animations
let coinAnim;
// groups
let coins, cars;

function preload() {
	// load font
	maven = loadFont("../fonts/Maven_Pro/static/MavenPro-Medium.ttf");
	// load images
	BgImg = loadImage("images/road.png");
	// load sounds
	deathSnd = loadSound("sounds/death.wav");
	motorSnd = loadSound("sounds/motor.wav");
	endSnd = loadSound("sounds/round_end.wav");
	// load animations
	coinAnim = loadAnimation ("animations/coin_0001.png", "animations/coin_0008.png");
}

function setup() {
	var cnv = createCanvas(600, 500);
	cnv.parent ("sketchHolder");
	frameRate (50);
	textFont (maven);
	coinAnim.getHeight (10);
	// groups
	coins = new Group ();
	cars = new Group ();
	// set variables
	money = 0;
	highScore = 0;
	gamePlayed = 0;
	averageScore = 0;
	mode = 1;
	skinsUnlocked = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	gameVariables = [0, 0, 0, 0, 0];
	// coin
	coin = createSprite (width - 25, 23);
	coin.addAnimation ("base", coinAnim);
	coin.scale = 0.7;
	coin.text = 0;
	// player
	player = createSprite (300, 435);
	player.scale = 0.3;
	// animations
	player.addAnimation ("1", "images/Boy.png");
	player.addAnimation ("2", "images/Boy2.png");
	player.addAnimation ("3", "images/snowman.png");
	player.addAnimation ("4", "images/Zombie.png");
	player.addAnimation ("5", "images/SuperMario.png");
	player.addAnimation ("6", "images/Joshy.png");
	player.addAnimation ("7", "images/Girl.png");
	player.addAnimation ("8", "images/FigurCatGirl.png");
	player.addAnimation ("9", "images/SpriteKnight.png");
	player.addAnimation ("10", "images/Pikachu.png");
	player.addAnimation ("11", "images/NinjaTurtles.png");
	player.changeAnimation ("1");
	player.anim = 1;
	player.skin = 1;
	// play button
	play = createButton ("Play");
	play.parent ("sketchHolder");
	play.position (150, 240);
	play.size (300, 50);
	play.style ("font-size", "36px");
	play.mousePressed (playGame);
	// restart button
	restart = createButton ("Restart");
	restart.parent ("sketchHolder");
	restart.position (150, 360);
	restart.size (300, 50);
	restart.style ("font-size", "36px");
	restart.mousePressed (playGame);
	// menu button
	menu = createButton ("Menu");
	menu.parent ("sketchHolder");
	menu.position (150, 420);
	menu.size (300, 50);
	menu.style ("font-size", "36px");
	menu.mousePressed (Menu);
	// skins button
	skins = createButton ("Skins");
	skins.parent ("sketchHolder");
	skins.position (150, 300);
	skins.size (300, 50);
	skins.style ("font-size", "36px");
	skins.mousePressed (Skins);
	// resume button
	resume = createButton ("Resume");
	resume.parent ("sketchHolder");
	resume.position (150, 210);
	resume.size (300, 50);
	resume.style ("font-size", "36px");
	resume.mousePressed (Resume);
	// next button
	next = createButton (">");
	next.parent ("sketchHolder");
	next.position (460, 150);
	next.size (40, 120);
	next.style ("font-size", "42px");
	next.mousePressed (Next);
	// previous button
	previous = createButton ("<");
	previous.parent ("sketchHolder");
	previous.position (100, 150);
	previous.size (40, 120);
	previous.style ("font-size", "42px");
	previous.mousePressed (Previous);
	// buy button
	buy = createButton ("Buy");
	buy.parent ("sketchHolder");
	buy.position (200, 300);
	buy.size (200, 50);
	buy.style ("font-size", "36px");
	buy.mousePressed (Buy);
	// select button
	selectB = createButton ("Select");
	selectB.parent ("sketchHolder");
	selectB.position (200, 300);
	selectB.size (200, 50);
	selectB.style ("font-size", "36px");
	selectB.mousePressed (Select);
	// stats button
	stats = createButton ("Stats");
	stats.parent ("sketchHolder");
	stats.position (150, 360);
	stats.size (300, 50);
	stats.style ("font-size", "36px");
	stats.mousePressed (Stats);
	// local storage
	if (localStorage.lastVersionPlayed) {
		// last version played
		var lvp = [];
		j = localStorage.getItem ("lastVersionPlayed");
		lvp = JSON.parse (j);
		if (lvp[2] == 1.2) {
			// get variables
			j = localStorage.getItem ("crossRoadVariables");
			gameVariables = JSON.parse (j);
			// set variables
			money = gameVariables[0];
			highScore = gameVariables[1];
			gamePlayed = gameVariables[2];
			averageScore = gameVariables[3];
			player.skin = gameVariables[4];
			player.anim = player.skin;
			// skins unlocked
			j = localStorage.getItem ("crossRoadSkinsUnlocked");
			skinsUnlocked = JSON.parse (j);
		} else {
			// last version played
			var lvp = [];
			j = localStorage.getItem ("lastVersionPlayed");
			lvp = JSON.parse (j);
			lvp[2] = 1.2;
			j = JSON.stringify (lvp);
			localStorage.setItem ("lastVersionPlayed", j);
			// stats variables
			j = JSON.stringify (gameVariables);
			localStorage.setItem ("crossRoadVariables", j);
			// skins unlocked
			j = JSON.stringify (skinsUnlocked);
			localStorage.setItem ("crossRoadSkinsUnlocked", j);

		}
	} else if (localStorage.key ("plc-lastVersionPlayed")) {
		// last version played
		var lvp = [];
		j = localStorage.getItem ("plc-lastVersionPlayed");
		append (lvp, JSON.parse (j));
		append (lvp, 0);
		append (lvp, 1.2);
		append (lvp, 0);
		j = JSON.stringify (lvp);
		localStorage.setItem ("lastVersionPlayed", j);
		localStorage.removeItem ("plc-lastVersionPlayed");
		// stats variables
		j = JSON.stringify (gameVariables);
		localStorage.setItem ("crossRoadVariables", j);
		// skins unlocked
		j = JSON.stringify (skinsUnlocked);
		localStorage.setItem ("crossRoadSkinsUnlocked", j);
	} else {
		// last version played
		var lvp = [0, 0, 1.2, 0];
		j = JSON.stringify (lvp);
		localStorage.setItem ("lastVersionPlayed", j);
		// stats variables
		j = JSON.stringify (gameVariables);
		localStorage.setItem ("crossRoadVariables", j);
		// skins unlocked
		j = JSON.stringify (skinsUnlocked);
		localStorage.setItem ("crossRoadSkinsUnlocked", j);
	}

	Menu();
}

function randomAnimation (c) {
	var r = random (1, 11);
	r = round (r);
	c.changeAnimation (r);
}

function Menu () {
	mode = 1;
	player.scale = 0.3;
	background ("black");
	// text
	fill ("#a00909");
	textSize (60);
	textAlign (CENTER);
	text ("CROSS ROAD", width / 2, 140);
	// buttons
	play.show ();
	menu.hide ();
	restart.hide ();
	skins.show ();
	stats.show ();
	resume.hide ();
	next.hide ();
	previous.hide ();
	buy.hide ();
	selectB.hide ();
	// local storage
	gameVariables[0] = money;
	gameVariables[4] = player.skin;
	j = JSON.stringify (gameVariables);
	localStorage.setItem ("crossRoadVariables", j);
	j = JSON.stringify (skinsUnlocked);
	localStorage.setItem ("crossRoadSkinsUnlocked", j);
	// player
	player.anim = player.skin;
	player.changeAnimation (player.skin);
	if (player.anim == 1 || player.anim == 8 || player.anim == 9 || player.anim == 11) {
		player.scale = 0.3;
	} else if (player.anim == 4) {
		player.scale = 0.18;
	} else if (player.anim == 5) {
		player.scale = 0.2;
	} else {
		player.scale = 0.22;
	}

}

function playGame () {
	player.position.x = width / 2;
	player.position.y = 435;
	coin.position.y = 23;
	// buttons
	play.hide ();
	restart.hide ();
	menu.hide ();
	skins.hide ();
	stats.hide ();
	// set variables
	mode = 2;
	level = 1;
	score = 0;
	Coins = 0;
	// coins
	coins.removeSprites ();
	createCoin (random (width), round (random (1, 4)) * 77 + 55);
	createCoin (random (width), round (random (1, 4)) * 77 + 55);
	createCoin (random (width), round (random (1, 4)) * 77 - 445);
	createCoin (random (width), round (random (1, 4)) * 77 - 445);
	// cars
	cars.removeSprites ();
	createCar (random (width), 130, 1);
	createCar (random (width), 207, 2);
	createCar (random (width), 286, 1);
	createCar (random (width), 365, 2);
	createCar (random (width), -370, 1);
	createCar (random (width), -293, 2);
	createCar (random (width), -214, 1);
	createCar (random (width), -135, 2);
}

function Skins () {
	mode = 4;
	coin.position.y = 23;
	// buttons
	play.hide ();
	skins.hide ();
	stats.hide ();
	menu.show ();
	menu.position (150, 430);
	next.show ();
	previous.show ();
	// player
	player.position.x = width / 2, 
	player.position.y = 210;
	player.velocity.x = 0;
	player.changeAnimation (player.anim);
	if (player.anim == 1 || player.anim == 8 || player.anim == 9 || player.anim == 11) {
		player.scale = 0.6;
	} else if (player.anim == 4 || player.anim == 5) {
		player.scale = 0.35;
	} else {
		player.scale = 0.45;
	}
}

function Next () {
	if (player.anim < 11) {
		player.anim ++;
	} else {
		player.anim = 1;
	}

	player.changeAnimation (player.anim);
	if (player.anim == 1 || player.anim == 8 || player.anim == 9 || player.anim == 11) {
		player.scale = 0.6;
	} else if (player.anim == 4) {
		player.scale = 0.35;
	} else if (player.anim == 5) {
		player.scale = 0.4;
	} else {
		player.scale = 0.45;
	}

	if (skinsUnlocked[player.anim - 1] == 1) {
		buy.hide ();
		if (player.anim == player.skin) {
			selectB.hide ();
		} else {
			selectB.show ();
		}
	} else {
		buy.show ();
		selectB.hide ();
	}
}

function Previous () {
	if (player.anim > 1) {
		player.anim --;
	} else {
		player.anim = 11;
	}

	player.changeAnimation (player.anim);
	if (player.anim == 1 || player.anim == 8 || player.anim == 9 || player.anim == 11) {
		player.scale = 0.6;
	} else if (player.anim == 4) {
		player.scale = 0.35;
	} else if (player.anim == 5) {
		player.scale = 0.4;
	} else {
		player.scale = 0.45;
	}

	if (skinsUnlocked[player.anim - 1] == 1) {
		buy.hide ();
		if (player.anim == player.skin) {
			selectB.hide ();
		} else {
			selectB.show ();
		}
	} else {
		buy.show ();
		selectB.hide ();
	}
}

function Buy () {
	if (money > 99) {
		money -= 100;
		skinsUnlocked[player.anim - 1] = 1;
		player.skin = player.anim;
		buy.hide ();
	} else {
		coin.text = 150;
	}
}

function Select () {
	player.skin = player.anim;
	selectB.hide ();
}

function Resume () {
	menu.hide ();
	resume.hide ();
	mode = 2;
	// cars
	for (let i = 0; i < cars.length; i++) {
		var c = cars[i];
		if (c.i == 1) {
			c.velocity.x = -2;
		} else {
			c.velocity.x = 2;
		}
	}
}

function Stats () {
	stats.hide ();
	play.hide ();
	skins.hide ();
	menu.show ();
	// text
	background ("black");
	fill ("#a00909");
	textSize (60);
	textAlign (CENTER);
	text ("STATS", width / 2, 100);
	fill ("#eee");
	textSize (30);
	textAlign (LEFT);
	text ("high score: " + highScore, 50, 175);
	text ("game played: " + gamePlayed, 50, 225);
	text ("average score: " + averageScore, 50, 275);
}

function draw () {
	if (mode == 2) {
		gameUpdate();
	}

	if (mode == 4) {
		// skins
		camera.off ();
		background ("black");
		fill ("ddd");
		textSize (60);
		textAlign (CENTER);
		text ("Skins", width / 2, 80);
		drawSprite (player);
		drawSprite (coin);
		textSize (35);
		textAlign (RIGHT);
		text (money, width - 50, 35);
		textAlign (CENTER);
		if (player.anim == player.skin) {
			textSize (40);
			text ("Selected", width / 2, 335);
		} else if (skinsUnlocked[player.anim - 1] == 0) {
			textSize (30);
			if (coin.text > 0) {
				fill ("#a00909");
				text ("Not enough money!", width / 2, 385);
			} else {
				text ("cost 100 coins", width / 2, 385);
			}
		}

		if (coin.text > 0) {
			coin.text --;
		}
		// colliders
		if (player.anim == 1 || player.anim == 8 || player.anim == 11) {
			player.setCollider ("rectangle", 0, 0, 150, 170);
		} else if (player.anim == 9) {
			player.setCollider ("rectangle", 0, 0, 120, 170);
		} else if (player.anim == 4) {
			player.setCollider ("rectangle", 0, 0, 150, 280);
		} else if (player.anim == 3) {
			player.setCollider ("rectangle", 0, 0, 170, 240);
		} else if (player.anim == 5) {
			player.setCollider ("rectangle", 0, 0, 190, 240);
		} else if (player.anim == 10) {
			player.setCollider ("rectangle", 0, 0, 190, 220);
		} else {
			player.setCollider ("rectangle", 0, 0, 170, 220);
		}
	}
}

function gameUpdate () {
	// draw
	background ("black");
	camera.on ();
	image (BgImg, 0, 0);
	image (BgImg, 0, -500);
	drawSprites();
	drawSprite (player);
	drawSprite (coin);
	camera.off ();
	// info text
	fill ("black");
	textSize (35);
	textAlign (LEFT);
	text ("score: " + round (score), 10, 35);
	textAlign (CENTER);
	text ("level: " + level, width / 2, 35);
	textAlign (RIGHT);
	text (Coins, width - 50, 35);
	// player
	if (keyIsDown (UP_ARROW) || keyIsDown (KEY.W)) {
		if (!sound) {
			motorSnd.loop();
			sound = true;
		}

		player.position.y -= 3;
		coin.position.y -= 3;
		score += 0.1;
	}

	if (keyIsDown (DOWN_ARROW) || keyIsDown (KEY.S)) {
		if (player.position.y < 435) {
			player.position.y += 3;
			coin.position.y += 3;
			score -= 0.1;
		}
	}

	if (keyIsDown (RIGHT_ARROW) || keyIsDown (KEY.D)) {
		player.velocity.x = 4;
		if (player.anim > 8 || player.anim == 1 || player.anim > 3 && player.anim < 7) {
			player.mirrorX (1);
		} else {
			player.mirrorX (-1);
		}
	}

	if (keyIsDown (LEFT_ARROW) || keyIsDown (KEY.A)) {
		player.velocity.x = -4;
		if (player.anim > 8 || player.anim == 1 || player.anim > 3 && player.anim < 7) {
			player.mirrorX (-1);
		} else {
			player.mirrorX (1);
		}
	}

	if (player.velocity.x > 0) {
		player.velocity.x --;
	} else if (player.velocity.x < 0) {
		player.velocity.x ++;
	}

	player.position.x = constrain (player.position.x, 0, width);
	player.overlap (coins, collectCoin);
	// cars around
	for (let i = 0; i < cars.length; i++) {
		var c = cars[i];
		if (c.position.x < -50 && c.i == 1) {
			createCar (random (650, 800), c.position.y, 1);
			c.remove ();
		}

		if (c.position.x > 650 && c.i == 2) {
			createCar (random (-200, -50), c.position.y, 2);
			c.remove ();
		}
	}

	// next level
	if (player.position.y < -65) {
		level += 1;
		// cars
		for (let i = 0; i < cars.length; i++) {
			var c = cars[i];
			if (c.position.y > player.position.y) {
				c.remove ();
				i --;
			} else {
				c.position.y += 500;
				c.velocity.x += 0.2;
			}
		}

		createCar (random (width), -370, 1);
		createCar (random (width), -293, 2);
		createCar (random (width), -214, 1);
		createCar (random (width), -135, 2);
		// coins
		for (let i = 0; i < coins.length; i++) {
			var c = coins[i];
			if (c.position.y > player.position.y) {
				c.remove ();
				i --;
			} else {
				c.position.y += 500;
			}
		}

		for (let i = 0; i < 2 + floor (level / 3); i++) {
			createCoin (random (width), round (random (1, 4)) * 77 - 445);
		}

		player.position.y += 500;
		coin.position.y += 500;
		endSnd.play ();
	}

	camera.position.y = player.position.y - 185;
	// lose
	if (player.overlap (cars)) {
		if (round (score) > highScore) {
			highScore = round (score);
		}

		player.position.x = 300;
		player.mirrorX (1);
		deathSnd.play ();
		money += Coins;
		// menu
		mode = 3;
		restart.show ();
		menu.show ();
		menu.position (150, 420);
		background ("black");
		// local storage
		averageScore = (averageScore * gamePlayed + round (score)) / (gamePlayed + 1);
		averageScore = round (averageScore * 10) / 10;
		gamePlayed ++;
		gameVariables[0] = money;
		gameVariables[1] = highScore;
		gameVariables[2] = gamePlayed;
		gameVariables[3] = averageScore;
		j = JSON.stringify (gameVariables);
		localStorage.setItem ("crossRoadVariables", j);
		// text
		textAlign (CENTER);
		textSize (60);
		fill ("#a00909");
		text ("GAME OVER!", width / 2, 85);
		fill ("#ddd");
		textSize (35);
		textAlign (LEFT);
		stroke ("#a00909");
		strokeWeight (3);
		line (180, 125, 180, 330);
		noStroke ();
		strokeWeight (1);
		text ("level: " + level, 200, 160);
		text ("score: " + round (score), 200, 210);
		text ("high score: " + highScore, 200, 260);
		text ("coins: " + Coins, 200, 310);
	}
}

function createCoin (x, y) {
	var c;
	c = createSprite (x, y);
	c.addAnimation ("base", coinAnim);
	c.setCollider ("circle", 0, 0, 20);
	for (let i = 0; i < 100; i++) {
		if (c.overlap (coins)) {
			c.position.x = random (width);
		} else {
			i = 100;
		}
	}

	c.addToGroup (coins);
	c.scale = 0.7;
}

function collectCoin (p, c) {
	Coins ++;
	c.remove ();
}

function createCar (x, y, i) {
	var c;
	c = createSprite (x, y);
	c.scale = 0.8;
	c.addToGroup (cars);
	c.i = i;
	c.setDefaultCollider ();
	c.velocity.y = 0;
	c.setSpeed (0, 0);
	if (i == 1) {
		c.rotation = 90;
		c.velocity.x = -2 - level / 5;
	} else {
		c.rotation = 270;
		c.velocity.x = 2 + level / 5;
	}
	
	// animations
	c.addAnimation ("1", "images/car1.png");
	c.addAnimation ("2", "images/car2.png");
	c.addAnimation ("3", "images/car3.png");
	c.addAnimation ("4", "images/car4.png");
	c.addAnimation ("5", "images/car5.png");
	c.addAnimation ("6", "images/car6.png");
	c.addAnimation ("7", "images/car7.png");
	c.addAnimation ("8", "images/car8.png");
	c.addAnimation ("9", "images/car9.png");
	c.addAnimation ("10", "images/car10.png");
	c.addAnimation ("11", "images/car11.png");
	randomAnimation (c);
}

function keyPressed () {
	if (keyCode == 27 && mode == 2) {
		mode = 5;
		resume.show ();
		menu.show ();
		menu.position (150, 270);
		// draw
		background ("black");
		fill ("#a00909");
		textAlign (CENTER);
		textSize (60);
		text ("Paused", width / 2, 110);
		// cars
		for (let i = 0; i < cars.length; i++) {
			var c = cars[i];
			c.velocity.x = 0;
		}
	}
}