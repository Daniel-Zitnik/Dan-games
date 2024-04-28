// buttons
let menu, retry, button3, button4, button5;
// mode
let mode;
// info variables
let time3, bestTime3, time4, bestTime4, time5, bestTime5;
// lists
var stones = [], bestTimes = [];
// fonts
let maven;

function preload () {
	maven = loadFont ("../fonts/Maven_Pro/static/MavenPro-Medium.ttf");
}

function setup () {
	var cnv = createCanvas(600, 500);
	cnv.parent ("sketchHolder");
	frameRate (50);
	bestTime3 = 9999;
	bestTime4 = 9999;
	bestTime5 = 9999;
	textFont (maven);
	// 3×3 button
	button3 = createButton ("Easy");
	button3.parent ("sketchHolder");
	button3.position (150, 180);
	button3.size (300, 50);
	button3.style ("font-size", "36px");
	button3.mousePressed (play33);
	// 4×4 button
	button4 = createButton ("Normal");
	button4.parent ("sketchHolder");
	button4.position (150, 240);
	button4.size (300, 50);
	button4.style ("font-size", "36px");
	button4.mousePressed (play44);
	// 5×5 button
	button5 = createButton ("Hard");
	button5.parent ("sketchHolder");
	button5.position (150, 300);
	button5.size (300, 50);
	button5.style ("font-size", "36px");
	button5.mousePressed (play55);
	// menu button
	menu = createButton ("Menu");
	menu.parent ("sketchHolder");
	menu.position (150, 300);
	menu.size (300, 50);
	menu.style ("font-size", "36px");
	menu.mousePressed (Menu);
	// retry button
	retry = createButton ("Retry");
	retry.parent ("sketchHolder");
	retry.position (150, 360);
	retry.size (300, 50);
	retry.style ("font-size", "36px");
	retry.mousePressed (Retry);
	// resume button
	resume = createButton ("Resume");
	resume.parent ("sketchHolder");
	resume.position (150, 180);
	resume.size (300, 50);
	resume.style ("font-size", "36px");
	resume.mousePressed (Resume);
	// records button
	records = createButton ("Records");
	records.parent ("sketchHolder");
	records.position (150, 360);
	records.size (300, 50);
	records.style ("font-size", "36px");
	records.mousePressed (Records);
	// local storage
	if (localStorage.lastVersionPlayed) {
		// last version played
		var lvp = [];
		j = localStorage.getItem ("lastVersionPlayed");
		lvp = JSON.parse (j);
		if (lvp[3] == 1.1) {
			// get variables
			j = localStorage.getItem ("stoneGameVariables");
			bestTimes = JSON.parse (j);
			// set variables
			bestTime3 = bestTimes[0];
			bestTime4 = bestTimes[1];
			bestTime5 = bestTimes[2];
		} else {
			// last version played
			var lvp = [];
			j = localStorage.getItem ("lastVersionPlayed");
			lvp = JSON.parse (j);
			lvp[3] = 1.1;
			j = JSON.stringify (lvp);
			localStorage.setItem ("lastVersionPlayed", j);
			// best times
			bestTimes = [9999, 9999, 9999];
			j = JSON.stringify (bestTimes);
			localStorage.setItem ("stoneGameVariables", j);
		}
	} else if (localStorage.key ("plc-lastVersionPlayed")) {
		// last version played
		var lvp = [];
		j = localStorage.getItem ("plc-lastVersionPlayed");
		append (lvp, JSON.parse (j));
		append (lvp, 0);
		append (lvp, 0);
		append (lvp, 1.1);
		j = JSON.stringify (lvp);
		localStorage.setItem ("lastVersionPlayed", j);
		localStorage.removeItem ("plc-lastVersionPlayed");
		// best times
		bestTimes = [9999, 9999, 9999];
		j = JSON.stringify (bestTimes);
		localStorage.setItem ("stoneGameVariables", j);
	} else {
		// last version played
		var lvp = [0, 0, 0, 1.1];
		j = JSON.stringify (lvp);
		localStorage.setItem ("lastVersionPlayed", j);
		// best times
		bestTimes = [9999, 9999, 9999];
		j = JSON.stringify (bestTimes);
		localStorage.setItem ("stoneGameVariables", j);
	}

	Menu ();
}

function play33 () {
	mode = 3;
	time3 = 0;
	button3.hide ();
	button4.hide ();
	button5.hide ();
	menu.hide ();
	retry.hide ();
	records.hide ();
	stones = [1, 2, 3, 4, 5, 6, 7, 8, 0];
	stones = shuffle (stones);
}

function play44 () {
	mode = 4;
	time4 = 0;
	button3.hide ();
	button4.hide ();
	button5.hide ();
	menu.hide ();
	retry.hide ();
	records.hide ();
	stones = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
	stones = shuffle (stones);
}

function play55 () {
	mode = 5;
	time5 = 0;
	button3.hide ();
	button4.hide ();
	button5.hide ();
	menu.hide ();
	retry.hide ();
	records.hide ();
	stones = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 0];
	//stones = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 24];
	stones = shuffle (stones);
}

function Menu () {
	background ("black");
	mode = 2;
	button3.show ();
	button4.show ();
	button5.show ();
	menu.hide ();
	retry.hide ();
	resume.hide ();
	records.show ();
	// text
	fill ("#a00909");
	textSize (60);
	textAlign (CENTER);
	text ("STONE GAME", width/2, 110);
}

function Resume () {
	menu.hide ();
	retry.hide ();
	resume.hide ();
	if (mode == 33) {
		mode = 3;
	}

	if (mode == 44) {
		mode = 4;
	}

	if (mode == 55) {
		mode = 5;
	}
}

function Records () {
	button3.hide ();
	button4.hide ();
	button5.hide ();
	records.hide ();
	menu.show ();
	menu.position (150, 400);
	background ("black");
	fill ("#a00909");
	noStroke ();
	textSize (60);
	textAlign (CENTER);
	text ("RECORDS", width / 2, 110);
	fill ("#eee");
	textSize (30);
	textAlign (LEFT);
	text ("3x3 mode: " + round (bestTime3 * 100) / 100 + "s", 50, 175);
	text ("4x4 mode: " + round (bestTime4 * 100) / 100 + "s", 50, 225);
	text ("5x5 mode: " + round (bestTime5 * 100) / 100 + "s", 50, 275);
}

function draw () {
	if (mode == 3 || mode == 4 || mode == 5) {
		gameUpdate ();
	}
}

function gameUpdate () {
	background("#151515");
	// mode 3×3
	if (mode == 3) {
		time3 += 0.02;
		for (var y = 0; y < 3; y++) {
			for (var x = 0; x < 3; x++) {
				drawStone (stones[x + y * 3], x, y);
			}
		}
	}

	// mode 4×4
	if (mode == 4) {
		time4 += 0.02;
		for (var y = 0; y < 4; y++) {
			for (var x = 0; x < 4; x++) {
				drawStone (stones[x + y * 4], x, y);
			}
		}
	}

	// mode 5×5
	if (mode == 5) {
		time5 += 0.02;
		for (var y = 0; y < 5; y++) {
			for (var x = 0; x < 5; x++) {
				drawStone (stones[x + y * 5], x, y);
			}
		}
	}

	// win
	if (stones.toString() == "1,2,3,4,5,6,7,8,0" || stones.toString() == "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0" || stones.toString() == "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,0" || stones.toString() == "1,2,3,4,5,6,8,7,0" || stones.toString() == "1,2,3,4,5,6,7,8,9,10,11,12,14,13,15,0" || stones.toString() == "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,22,21,23,24,0") {
		background ("black");
		fill ("#a00909");
		noStroke ();
		textSize (60);
		textAlign (CENTER);
		text ("YOU WIN!", width / 2, 110);
		menu.show ();
		retry.show ();
		retry.position (150, 360);
		fill ("#eee");
		if (mode == 3) {
			mode = 33;
			textSize (35);
			textAlign (CENTER);
			text ("time: " + round (time3 * 100) / 100 + "s", width / 2, 190);
			if (time3 < bestTime3) {
				bestTime3 = round (time3 * 100) / 100;
				bestTimes[0] = bestTime3;
				j = JSON.stringify (bestTimes);
				localStorage.setItem ("stoneGameVariables", j);
			}

			text ("best time: " + bestTime3 + "s", width / 2, 235);
		}

		if (mode == 4) {
			mode = 44;
			textSize (35);
			textAlign (CENTER);
			text ("time: " + round (time4 * 100) / 100 + "s", width / 2, 190);
			if (time4 < bestTime4) {
				bestTime4 = round (time4 * 100) / 100;
				bestTimes[1] = bestTime4;
				j = JSON.stringify (bestTimes);
				localStorage.setItem ("stoneGameVariables", j);
			}

			text ("best time: " + bestTime4 + "s", width / 2, 235);
		}

		if (mode == 5) {
			mode = 55;
			textSize (35);
			textAlign (CENTER);
			text ("time: " + round (time5 * 100) / 100 + "s", width / 2, 190);
			if (time5 < bestTime5) {
				bestTime5 = round (time5 * 100) / 100;
				bestTimes[2] = bestTime5;
				j = JSON.stringify (bestTimes);
				localStorage.setItem ("stoneGameVariables", j);
			}

			text ("best time: " + bestTime5 + "s", width / 2, 235);
		}
	}
}

function mousePressed () {
	var x = floor (mouseX / 100);
	var y = floor (mouseY / 100);
	var r;
	// mode 3×3
	if (mode == 3) {
		r = 3 * y  + x;
		if (stones[r] == 0) {
			return;
		}
		if (stones[r - 1] == 0 && x > 0) {
			swapStones (r, r - 1);
		}
		if (stones[r + 1] == 0 && x < 2) {
			swapStones (r, r + 1);
		}
		if (stones[r - 3] == 0) {
			swapStones (r, r - 3);
		}
		if (stones[r + 3] == 0) {
			swapStones (r, r + 3);
		}
	}

	// mode 4×4
	if (mode == 4) {
		r = 4 * y  + x;
		if (stones[r] == 0) {
			return;
		}
		if (stones[r - 1] == 0 && x > 0) {
			swapStones (r, r - 1);
		}
		if (stones[r + 1] == 0 && x < 3) {
			swapStones (r, r + 1);
		}
		if (stones[r - 4] == 0) {
			swapStones (r, r - 4);
		}
		if (stones[r + 4] == 0) {
			swapStones (r, r + 4);
		}
	}

	// mode 5×5
	if (mode == 5) {
		r = 5 * y  + x;
		if (stones[r] == 0) {
			return;
		}
		if (stones[r - 1] == 0 && x > 0) {
			swapStones (r, r - 1);
		}
		if (stones[r + 1] == 0 && x < 4) {
			swapStones (r, r + 1);
		}
		if (stones[r - 5] == 0) {
			swapStones (r, r - 5);
		}
		if (stones[r + 5] == 0) {
			swapStones (r, r + 5);
		}
	}
}

function swapStones (s, n) {
	var pn;
	pn = stones[n];
	stones[n] = stones[s];
	stones[s] = pn;
}

function drawStone (n, x, y) {
	if (n > 0.5) {
		// square
		stroke ("orange");
		strokeWeight (5);
		fill ("yellow");
		rect (x * 100, y * 100, 100, 100);
		// text
		fill ("orange");
		noStroke ();
		textFont ();
		textAlign (CENTER);
		textSize (80);
		text (n, x * 100 + 48, y * 100 + 78);
	}

}

function Retry () {
	resume.hide ();
	if (mode == 33) {
		play33();
	}

	if (mode == 44) {
		play44();
	}

	if (mode == 55) {
		play55();
	}
}

function keyPressed () {
	if (keyCode == 27 && mode > 2 && mode < 6) {
		mode *= 11;
		resume.show ();
		menu.show ();
		retry.show ();
		retry.position (150, 240);
		// draw
		background ("black");
		fill ("#a00909");
		textAlign (CENTER);
		textSize (60);
		text ("Paused", width / 2, 110);
	}
}