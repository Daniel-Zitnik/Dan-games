// variables
let loops, coins, loot, bank, mode, txt;
// buttons
let m1, m10, m100, randomat, doublemat, roulette, menu, take, double, black, red;
// images
let rouletteImg;

function preload () {
	// images
	rouletteImg = loadImage ("images/roullete.png");
	// fonts
 	maven = loadFont ("../fonts/Maven_Pro/static/MavenPro-Medium.ttf");
}

function setup () {
	var cnv = createCanvas(600, 500);
  	cnv.parent ("sketchHolder");
  	frameRate (50);
  	textFont (maven);
  	background ("black");
  	// set variables
  	loops = 0;
  	money = 100;
  	// roulette
  	rouletteWheel = createSprite (175, 175);
  	rouletteWheel.addImage (rouletteImg);
  	rouletteWheel.rotateToDirection = false;
  	rouletteWheel.scale = 0.75;
  	// randomat button
  	randomat = createButton ("Randomat");
	randomat.parent ("sketchHolder");
	randomat.position (150, 340);
	randomat.size (300, 50);
	randomat.style ("font-size", "32px");
	randomat.mousePressed (Randomat);
	// doublemat button
	doublemat = createButton ("Doublemat");
	doublemat.parent ("sketchHolder");
	doublemat.position (150, 280);
	doublemat.size (300, 50);
	doublemat.style ("font-size", "32px");
	doublemat.mousePressed (Doublemat);
	// roulette button
	roulette = createButton ("Roulette");
	roulette.parent ("sketchHolder");
	roulette.position (150, 220);
	roulette.size (300, 50);
	roulette.style ("font-size", "32px");
	roulette.mousePressed (Roulette);
	// menu button
	menu = createButton ("Menu");
	menu.parent ("sketchHolder");
	menu.position (200, 400);
	menu.size (200, 40);
	menu.style ("font-size", "32px");
	menu.mousePressed (Menu);
  	// m1 button
  	m1 = createButton ("1$");
	m1.parent ("sketchHolder");
	m1.position (60, height - 225);
	m1.size (120, 60);
	m1.style ("font-size", "40px");
	m1.mousePressed (play1);
	// m10 button
	m10 = createButton ("10$");
	m10.parent ("sketchHolder");
	m10.position (240, height - 225);
	m10.size (120, 60);
	m10.style ("font-size", "40px");
	m10.mousePressed (play10);
	// m100 button
	m100 = createButton ("100$");
	m100.parent ("sketchHolder");
	m100.position (420, height - 225);
	m100.size (120, 60);
	m100.style ("font-size", "40px");
	m100.mousePressed (play100);
	// take button
	take = createButton ("Take");
	take.parent ("sketchHolder");
	take.position (66, 275);
	take.size (200, 40);
	take.style ("font-size", "32px");
	take.mousePressed (Take);
	// double button
	double = createButton ("Double");
	double.parent ("sketchHolder");
	double.position (332, 275);
	double.size (200, 40);
	double.style ("font-size", "32px");
	double.mousePressed (Double);
	// black button
	black = createButton ("Black");
	black.parent ("sketchHolder");
	black.position (380, 200);
	black.size (160, 40);
	black.style ("font-size", "32px");
	black.mousePressed (Red);
	// red button
	red = createButton ("Red");
	red.parent ("sketchHolder");
	red.position (380, 200);
	red.size (160, 40);
	red.style ("font-size", "32px");
	red.mousePressed (Black);
	// restart button
	restart = createButton ("Restart");
	restart.parent ("sketchHolder");
	restart.position (200, 300);
	restart.size (200, 50);
	restart.style ("font-size", "32px");
	restart.mousePressed (Restart);
	Menu ();
}

function Menu () {
	background ("black");
	mode = 1;
	// buttons
	menu.hide ();
	m1.hide ();
	m10.hide ();
	m100.hide ();
	take.hide ();
	double.hide ();
	black.hide ();
	red.hide ();
	restart.hide ();
	randomat.show ();
	doublemat.show ();
	roulette.show ();
	// text
	fill ("#eee");
	textSize (60);
	textAlign (CENTER);
	text ("CASINO", width / 2, 140)
}

function Randomat () {
	background ("black");
	txt = 0;
	mode = 2;
	loot = 1;
	// buttons
	randomat.hide ();
	doublemat.hide ();
	roulette.hide ();
	menu.show ();
	m1.show ();
	m10.show ();
	m100.show ();
	m1.position (60, height - 200);
	m10.position (240, height - 200);
	m100.position (420, height - 200);
}

function Doublemat () {
	txt = 0;
	mode = 3;
	loot = 0;
	// buttons
	randomat.hide ();
	doublemat.hide ();
	roulette.hide ();
	menu.show ();
	m1.show ();
	m10.show ();
	m100.show ();
	take.show ();
	double.show ();
	m1.position (60, height - 165);
	m10.position (240, height - 165);
	m100.position (420, height - 165);
	menu.position (200, height - 80);
}

function Roulette () {
	txt = 0;
	mode = 4;
	loops = 0;
	loot = 1;
	// buttons
	randomat.hide ();
	doublemat.hide ();
	roulette.hide ();
	menu.show ();
	black.show ();
	m1.show ();
	m10.show ();
	m100.show ();
	m1.position (60, height - 165);
	m10.position (240, height - 165);
	m100.position (420, height - 165);
	menu.position (200, height - 80);
}

function play1 () {
	if (money > 0.9) {
		bank = 1;
		playGame ();
	} else {
		txt = 100;
	}
}

function play10 () {
	if (money > 9) {
		bank = 10;
		playGame ();
	} else {
		txt = 100;
	}
}

function play100 () {
	if (money > 99) {
		bank = 100;
		playGame ();
	} else {
		txt = 100;
	}
}

function playGame () {
	if (mode == 2) {
		loops = round (random (10, 30));
	}

	if (mode == 4) {
		loops = round (random (250, 350));
	}

	money -= bank;
	if (mode != 4) {
		loot = 1;
	}

}

function Restart () {
	loops = 0;
	money = 100;
	Menu ();
}

function draw () {
	if (frameCount % 10 == 0 && mode == 2) {
		randomatUpdate ();
	}

	if (mode == 3) {
		doublematUpdate ();
	}

	if (mode == 4) {
		rouletteUpdate ();
	}

	// lose
	if (money == 0 && bank == 0 && loops == 0) {
		mode = 1;
		// buttons
		m1.hide ();
		m10.hide ();
		m100.hide ();
		randomat.hide ();
		doublemat.hide ();
		roulette.hide ();
		menu.hide ();
		take.hide ();
		double.hide ();
		black.hide ();
		red.hide ();
		// draw
		background ("black");
		fill ("red");
		textSize (50);
		textAlign (CENTER);
		text ("Game over!", width / 2, 200);
		restart.show ();
	}
}

function randomatUpdate () {
	background ("black");
	if (loops > 1) {
		loops --;
		if (loot < 5) {
			loot ++;
		} else {
			loot = 1;
		}
	}

	if (loops == 1) {
		loops = 0;
		if (loot == 3) {
			money += 5 * bank;
		}

		bank = 0;
	}

	// draw
	strokeWeight (10);
	stroke ("red");
	fill ("#999");
	rect (75, 150, 50, 50);
	rect (175, 150, 50, 50);
	rect (375, 150, 50, 50);
	rect (475, 150, 50, 50);
	stroke ("#2eb714")
	rect (275, 150, 50, 50);
	noStroke ();
	fill ("yellow");
	rect (100 * loot -20, 155, 40, 40);
	// text
	fill ("#eee");
	textSize (30);
	textAlign (CENTER);
	text ("money: " + money + "$", width/2, 80);
	if (txt > 49) {
		if (txt == 50) {
			txt = 0;
		}

		fill ("red");
		textSize (35);
		textAlign (CENTER);
		text ("You don't have enough money!", width / 2, 260);
		txt -= 10;
	}
}

function doublematUpdate () {
	background ("black");
	// text money
	fill ("#eee");
	textSize (30);
	textAlign (CENTER);
	text ("money: " + money + "$", width/2, 60);
	// squares & numbers
	textSize (25);
	for (var l = 1; l<8; l++) {
		fill ("#999");
		rect (75 * l - 25, 140, 50, 50);
		fill ("#eee")
		text (pow(2, l) / 2 + "×", 75 * l, 130);
	}

	fill ("yellow");
	if (loot > 0) {
		for (let i = 1; i <= loot; i++) {
			rect (75 * i - 25, 140, 50, 50);	
		}
	}

	// text
	if (txt > 50) {
		if (txt == 51) {
			txt = 0;
		}

		fill ("red");
		textSize (35);
		textAlign (CENTER);
		text ("You don't have enough money!", width / 2, 235);
		txt --;
	} else if (txt > 0) {
		fill ("#2eb714");
		textSize (35);
		textAlign (CENTER);
		text ("double!", width / 2, 235);
		txt --;
	} else if (txt < 0) {
		fill ("red");
		textSize (35);
		textAlign (CENTER);
		text ("lose!", width / 2, 235);
		txt ++;
	}

	loops --;
	if (loops > 1) {
		if (floor (loops / 20) == 0 || floor (loops / 20) == 2 || floor (loops / 20) == 4) {
			fill ("yellow");
			rect (75 * (loot + 1) - 25, 140, 50, 50);
		}
	} else if (loops == 1) {
		if (bank > 0) {
			loot ++;
			txt = 50;
		} else {
			loot = 0;
			txt = -50;
		}
	}
}

function rouletteUpdate () {
	// draw
	background ("black");
	drawSprite (rouletteWheel);
	fill ("#eee");
	noStroke ();
	triangle (160, 15, 190, 15, 175, 55);
	// text
	fill ("#eee");
	textSize (30);
	textAlign (CENTER);
	text ("money: " + money + "$", 450, 60);
	text ("color: ", 460, 170);
	if (txt > 50) {
		if (txt == 51) {
			txt = 0;
		}

		fill ("red");
		textSize (25);
		textAlign (CENTER);
		text ("You don't have", 450, 275);
		text ("enough money!", 450, 305);
		txt --;
	}

	// wheel rotation
	if (loops > 1) {
		rouletteWheel.rotation += loops / 50 + 0.1;
		loops --;
		if (rouletteWheel.rotation > 360) {
			rouletteWheel.rotation -= 360;
		}
	}

	if (loops == 1) {
		loops = 0;
		var l;
		l = round (rouletteWheel.rotation / 9.7297297297297297297297297297297);
		if (l == 0 || l == 37) {
			money += bank;
		} else {
			if (l % 2 == 0 && loot == 2) {
				money += bank * 2;
			}

			if (l % 2 != 0 && loot == 1) {
				money += bank * 2;
			}

			bank = 0;
		}
	}
}

function Black () {
	red.hide ();
	black.show ();
	loot = 1;
}

function Red () {
	red.show ();
	black.hide ();
	loot = 2;
}

function Take () {
	if (loot > 0) {
		money += bank;
		loot = 0;
	}
}

function Double () {
	if (loot > 0) {
		loops = round (random (11, 12)) * 10;
		if (loops - 120 == 0) {
			bank *= 2;
		} else {
			bank = 0;
		}
	}
}