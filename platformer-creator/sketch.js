/* platformer creator beta 1.1.1
© 2020 - 2021 Dan games */
// sprites
let player, mouseC, checkPoint, start, exit;
// groups
let walls, lava, checkPoints, fallingBlocks, trampolines, ladders, ice, water, snow, decorations, spikes, saws, stoppers, movingSaws, halfSaws, fireBalls, fireBars, rotatingSaws, rotatingTypes, rSaws, pullingSpikes, stomps, stompSpikes, slimes;
// buttons
let play, creator, next, previous, resume, testLevel, testGame, menu, newGame, loadGame, back, saveGame, editLevel, createGame, newLevel, select, settings, edit, deleteB, yes, no, rename, nextLevel, getCode, playGame, enterCode, createLevel;
// game variables
let mode, block, Mode, level, maxLevel, track, tracksNumber, trackName, j, rotation, length, time, deaths;
let game = {
	blocksNumber: 0,
	build: 0,
	page: 0,
	premode: 0,
	code: 0,
	menu: 0,
	preMode: 0,
	trackOrder: []
}
// images
let metalImg, eraserImg, lavaImg, blueFlagImg, greenFlagImg, fallingBlockImg, trampolineImg, ladderImg, iceImg, waterImg, grassImg, dirtImg, snowImg, stoneImg, snowTundraImg, tundraImg, signExitImg, signRightImg, signLeftImg, bushImg, plantImg, rockImg, doorImg, yellowFlagImg, spikeImg, snowSpikeImg, littleSpikeImg, bigSpikeImg, smallSpikeImg, halfMetalImg, sawImg, stopperImg, movingSawImg, movingHalfSawImg, darkTapeImg, lightTapeImg, fireBarImg, fireBarRImg, fireBarLImg, fireBallImg, tapeEndImg, pullingSpikesImg, chainImg, halfStopperImg, lavaTopImg, waterTopImg, slimeImg, thumbnailImg, playerImg;
// lists
let positionX = [], positionY = [], Block = [], Rotation = [], code = [];
// inputs
let nameInput, codeInput;
// sounds
let xafSnd, loseSnd, clickSnd, winSnd;

function preload () {
	// fonts
	maven = loadFont ("../fonts/Maven_Pro/static/MavenPro-Medium.ttf");
	// sounds
	xafSnd = loadSound ("sounds/Xaf-Nebula.mp3");
	loseSnd = loadSound ("sounds/Oops.mp3");
	clickSnd = loadSound ("sounds/Wood-Tap.mp3");
	winSnd = loadSound ("sounds/Win.mp3");
	// animations
	slimeWalkAnim = loadAnimation ("animations/slimeWalk1.png", "animations/slimeWalk2.png")
	// images
	metalImg = loadImage ("images/metalCenter.png");
	eraserImg = loadImage ("images/eraser.png");
	lavaImg = loadImage ("images/liquidLava.png");
	blueFlagImg = loadImage ("images/flagBlue2.png");
	greenFlagImg = loadImage ("images/flagGreen2.png");
	fallingBlockImg = loadImage ("images/boxWarning.png");
	trampolineImg = loadImage ("images/springboardUp.png");
	ladderImg = loadImage ("images/ladder_mid.png");
	iceImg = loadImage ("images/iceWaterDeepStarsAlt.png");
	waterImg = loadImage ("images/liquidWater.png");
	grassImg = loadImage ("images/grassMid.png");
	dirtImg = loadImage ("images/grassCenter.png");
	snowImg = loadImage ("images/snowMid.png");
	stoneImg = loadImage ("images/snowCenter.png");
	snowTundraImg = loadImage ("images/tundraMid.png");
	tundraImg = loadImage ("images/tundraCenter.png");
	signExitImg = loadImage ("images/signExit.png");
	signRightImg = loadImage ("images/signRight.png");
	signLeftImg = loadImage ("images/signLeft.png");
	bushImg = loadImage ("images/bush.png");
	plantImg = loadImage ("images/plant.png");
	rockImg = loadImage ("images/rock.png");
	doorImg = loadImage ("images/door_closed.png");
	yellowFlagImg = loadImage ("images/flagYellow2.png");
	spikeImg = loadImage ("images/spikes.png");
	twoSpikesImg = loadImage ("images/platformIndustrial_052.png");
	smallSpikeImg = loadImage ("images/platformIndustrial_052s.png");
	halfMetalImg = loadImage ("images/metalHalfMid.png");
	sawImg = loadImage ("images/platformIndustrial_067.png");
	halfSawImg = loadImage ("images/platformIndustrial_068.png");
	stopperImg = loadImage ("images/stopper.png");
	movingSawImg = loadImage ("images/movingSaw.png");
	movingHalfSawImg = loadImage ("images/movingHalfSaw.png");
	darkTapeImg = loadImage ("images/darkTape.png");
	lightTapeImg = loadImage ("images/lightTape.png");
	fireBarImg = loadImage ("images/fireBar.png");
	fireBarRImg = loadImage ("images/fireBarR.png");
	fireBarLImg = loadImage ("images/fireBarL.png");
	fireBallImg = loadImage ("images/fireBall.png");
	tapeEndImg = loadImage ("images/tapeEnd.png");
	pullingSpikesImg = loadImage ("images/pullingSpikes.png");
	chainImg = loadImage ("images/image1.png");
	halfStopperImg = loadImage ("images/halfStopper.png");
	lavaTopImg = loadImage ("images/liquidLavaTop_mid.png");
	waterTopImg = loadImage ("images/liquidWaterTop_mid.png");
	slimeImg = loadImage ("animations/slimeWalk1.png");
	thumbnailImg = loadImage ("images/thumbnail.png");
	playerHurtImg = loadImage ("animations/p1_hurt.png");
	/*snowSpikeImg = loadImage ("images/spikesBottom.png");
	littleSpikeImg = loadImage ("images/spikesBottomAlt2.png");
	bigSpikeImg = loadImage ("images/spikesBottomAlt.png");*/
}

function setup() {
	var cnv = createCanvas(600, 500);
	cnv.parent ("sketchHolder");
	cnv.mouseWheel(changeBlock);
	frameRate (50);
	textFont (maven);
	background ("cyan");
	slimeWalkAnim.frameDelay = 10;
	// set variables
	mode = 2;
	block = 1;
	game.blocksNumber = 47;
	game.build = 1;
	game.page = 1;
	rotation = 0;
	length = 3;
	time = 0;
	deaths = 0;
	game.thumbnail = 0;
	// groups
	walls = new Group ();
	lava = new Group ();
	checkPoints = new Group ();
	fallingBlocks = new Group ();
	trampolines = new Group ();
	ladders = new Group ();
	ice = new Group ();
	water = new Group ();
	snow = new Group ();
	decorations = new Group ();
	spikes = new Group ();
	saws = new Group ();
	stoppers = new Group ();
	movingSaws = new Group ();
	halfSaws = new Group ();
	fireBalls = new Group ();
	fireBars = new Group ();
	rotatingSaws = new Group ();
	rotatingTypes = new Group ();
	rSaws = new Group ();
	pullingSpikes = new Group ();
	stomps = new Group ();
	stompSpikes = new Group ();
	slimes = new Group ();
	// checkPoint
	checkPoint = createSprite (width / 2, height / 2);
	checkPoint.addImage (greenFlagImg);
	checkPoint.scale = 0.72;
	checkPoint.setCollider ("rectangle", 0, 0, 68, 68);
	// start
	start = createSprite (width / 2, height / 2);
	start.addImage (yellowFlagImg);
	start.scale = 0.72;
	start.setCollider ("rectangle", 0, 0, 68, 68);
	// exit
	exit = createSprite (1000000, 1000000);
	exit.addImage (doorImg);
	exit.scale = 0.36;
	exit.setCollider ("rectangle", 0, 0, 136, 214);
	// player
	player = createSprite (checkPoint.position.x, checkPoint.position.y - 8);
	player.scale = 0.72;
	player.jumping = 1;
	player.velocityX = 0;
	player.velocityY = 0;
	player.death = 0;
	player.friction = 0.7;
	player.setCollider ("rectangle", 0, 0, 65, 91);
	// player animatons
	player.addAnimation ("front", "animations/player_front0001.png", "animations/player_front0001.png");
	player.addAnimation ("walk", "animations/player_walk0003.png", "animations/player_walk0007.png");
	player.addAnimation ("jump", "animations/player_jump0001.png", "animations/player_jump0001.png");
	player.addAnimation ("crouch", "animations/player_crouch0001.png", "animations/player_crouch0001.png");
	player.anim = 1;
	player.changeAnimation ("front");
	// mouseC
	mouseC = createSprite (mouseX, mouseY, 0, 0);
	mouseC.setCollider ("rectangle", 0, 0, 45, 45);
	// play button
	play = createButton ("Play");
	play.parent ("sketchHolder");
	play.position (395, 445);
	play.size (200, 50);
	play.style("font-size", "40px");
	play.mousePressed (Play);
	// creator button
	creator = createButton ("Creator");
	creator.parent ("sketchHolder");
	creator.position (395, 445);
	creator.size (200, 50);
	creator.style ("font-size", "40px");
	creator.mousePressed (Creator);
	creator.hide ();
	// next button
	next = createButton (">");
	next.parent ("sketchHolder");
	next.position (120, 450);
	next.size (40, 40);
	next.style ("font-size", "36px");
	next.mousePressed (Next);
	// previous button
	previous = createButton ("<");
	previous.parent ("sketchHolder");
	previous.position (10, 450);
	previous.size (40, 40);
	previous.style ("font-size", "36px");
	previous.mousePressed (Previous);
	// resume button
	resume = createButton ("Resume");
	resume.parent ("sketchHolder");
	resume.position (95, 165);
	resume.size (200, 50);
	resume.style ("font-size", "32px");
	resume.mousePressed (Resume);
	// test level button
	testLevel = createButton ("Test level");
	testLevel.parent ("sketchHolder");
	testLevel.position (95, 225);
	testLevel.size (200, 50);
	testLevel.style ("font-size", "32px");
	testLevel.mousePressed (TestLevel);
	// test game button
	testGame = createButton ("Test game");
	testGame.parent ("sketchHolder");
	testGame.position (95, 285);
	testGame.size (200, 50);
	testGame.style ("font-size", "32px");
	testGame.mousePressed (TestGame);
	// menu button
	menu = createButton ("Menu");
	menu.parent ("sketchHolder");
	menu.position (305, 165);
	menu.size (200, 50);
	menu.style ("font-size", "32px");
	menu.mousePressed (Menu);
	// save game button
	saveGame = createButton ("Save game");
	saveGame.parent ("sketchHolder");
	saveGame.position (450, 0);
	saveGame.size (150, 30);
	saveGame.style ("font-size", "24px");
	saveGame.mousePressed (SaveGame);
	// new game button
	newGame = createButton ("New game");
	newGame.parent ("sketchHolder");
	newGame.position (150, 165);
	newGame.size (300, 50);
	newGame.style ("font-size", "32px");
	newGame.mousePressed (gameName);
	// load game button
	loadGame = createButton ("Load game");
	loadGame.parent ("sketchHolder");
	loadGame.position (150, 225);
	loadGame.size (300, 50);
	loadGame.style ("font-size", "32px");
	loadGame.mousePressed (selectGame);
	// back button
	back = createButton ("Back");
	back.parent ("sketchHolder");
	back.position (210, 440);
	back.size (180, 50);
	back.style ("font-size", "32px");
	back.mousePressed (Back);
	// edit level button
	editLevel = createButton ("Edit level");
	editLevel.parent ("sketchHolder");
	editLevel.position (95, 225);
	editLevel.size (200, 50);
	editLevel.style ("font-size", "32px");
	editLevel.mousePressed (EditLevel);
	// create game button
	createGame = createButton ("Create game");
	createGame.parent ("sketchHolder");
	createGame.position (200, 240);
	createGame.size (200, 50);
	createGame.style ("font-size", "32px");
	createGame.mousePressed (NewGame);
	// settings button
	settings = createButton ("Settings");
	settings.parent ("sketchHolder");
	settings.position (305, 225);
	settings.size (200, 50);
	settings.style ("font-size", "32px");
	settings.mousePressed (Settings);
	// select button
	select = createButton ("Select");
	select.parent ("sketchHolder");
	select.position (210, 380);
	select.size (180, 50);
	select.style ("font-size", "32px");
	select.mousePressed (selectLevel);
	// new level button
	newLevel = createButton ("New level");
	newLevel.parent ("sketchHolder");
	newLevel.position (305, 285);
	newLevel.size (200, 50);
	newLevel.style ("font-size", "32px");
	newLevel.mousePressed (NewLevel);
	// edit button
	edit = createButton ("Edit");
	edit.parent ("sketchHolder");
	edit.position (210, 380);
	edit.size (180, 50);
	edit.style ("font-size", "32px");
	edit.mousePressed (loadLevel);
	// deleteB button
	deleteB = createButton ("Delete");
	deleteB.parent ("sketchHolder");
	deleteB.position (405, 380);
	deleteB.size (180, 50);
	deleteB.style ("font-size", "32px");
	deleteB.mousePressed (sureDelete);
	// yes button
	yes = createButton ("Yes");
	yes.parent ("sketchHolder");
	yes.position (350, 400);
	yes.size (200, 50);
	yes.style ("font-size", "32px");
	yes.mousePressed (Delete);
	// no button
	no = createButton ("No");
	no.parent ("sketchHolder");
	no.position (50, 400);
	no.size (200, 50);
	no.style ("font-size", "32px");
	no.mousePressed (No);
	// rename button
	rename = createButton ("Rename");
	rename.parent ("sketchHolder");
	rename.position (15, 380);
	rename.size (180, 50);
	rename.style ("font-size", "32px");
	rename.mousePressed (Rename);
	// next level button
	nextLevel = createButton ("Next level");
	nextLevel.parent ("sketchHolder");
	nextLevel.position (305, 285);
	nextLevel.size (200, 50);
	nextLevel.style ("font-size", "32px");
	nextLevel.mousePressed (NextLevel);
	// restart button
	restart = createButton ("Restart");
	restart.parent ("sketchHolder");
	restart.position (210, 350);
	restart.size (180, 50);
	restart.style ("font-size", "32px");
	restart.mousePressed (Restart);
	// get code button
	getCode = createButton ("Get code");
	getCode.parent ("sketchHolder");
	getCode.position (110, 440);
	getCode.size (180, 50);
	getCode.style ("font-size", "32px");
	getCode.mousePressed (GetCode);
	// play game button
	playGame = createButton ("Play game");
	playGame.parent ("sketchHolder");
	playGame.position (150, 285);
	playGame.size (300, 50);
	playGame.style ("font-size", "32px");
	playGame.mousePressed (PlayGame);
	// enter code button
	enterCode = createButton ("Enter code");
	enterCode.parent ("sketchHolder");
	enterCode.position (310, 380);
	enterCode.size (180, 50);
	enterCode.style ("font-size", "32px");
	enterCode.mousePressed (EnterCode);
	// create level button
	createLevel = createButton ("Create level");
	createLevel.parent ("sketchHolder");
	createLevel.position (210, 380);
	createLevel.size (180, 50);
	createLevel.style ("font-size", "30px");
	createLevel.mousePressed (CreateLevel);
	// name input
	nameInput = createInput ("my platformer");
	nameInput.parent ("sketchHolder");
	nameInput.position (148, 190);
	nameInput.size (300, 30);
	nameInput.style ("font-size", "24px");
	// code input
	codeInput = createInput ("");
	codeInput.parent ("sketchHolder");
	codeInput.position (198, 330);
	codeInput.size (200, 30);
	codeInput.style ("font-size", "24px");
	// volume slider
	volume = createSlider (0, 100, 100);
	volume.position (350, 160);
	volume.parent ("sketchHolder");
	volume.style ("width", "200px");
	// local storage
	tracksNumber = 0;
	if (localStorage.key ("tracksNumber")) {
		tracksNumber = localStorage.getItem("tracksNumber");
		var v;
		v = localStorage.getItem ("platformerCreator-volume");
		volume.value (v);
		masterVolume (v / 100);
		// game update
		j = localStorage.getItem ("plc-lastVersionPlayed");
		if (j == 1.0101) {
			j = localStorage.getItem ("trackOrder");
			game.trackOrder = JSON.parse (j);
		} else {
			for (let i = 1; i <= tracksNumber; i++) {
				append (game.trackOrder, i);	
			}
		
			j = JSON.stringify (game.trackOrder);
			localStorage.setItem ("trackOrder", j);
			localStorage.setItem ("plc-lastVersionPlayed", 1.0101);
			createTracks ();
		}
	} else {
		localStorage.setItem ("tracksNumber", tracksNumber);
		localStorage.setItem ("platformerCreator-volume", 100);
		localStorage.setItem ("plc-lastVersionPlayed", 1.0101);
		localStorage.setItem ("trackOrder", "[]");
		masterVolume (1);
		createTracks ();
	}

	Menu ();
	// sound
	xafSnd.loop ();
}

function createWall (x, y, i, n) {
	var w;
	w = createSprite (x, y);
	w.immovable = false;
	w.addToGroup (walls);
	w.setCollider ("rectangle", 0, 0, 68, 68);
	// metal
	if (i == 1) {
		w.addImage (metalImg);
	}
	// falling block
	if (i == 2) {
		w.addImage (fallingBlockImg);
		w.addToGroup (fallingBlocks);
		w.friction = 0.9;
	}
	// grass
	if (i == 3) {
		w.addImage (grassImg);
	}
	// dirt
	if (i == 4) {
		w.addImage (dirtImg);
	}
	// snow
	if (i == 5) {
		w.addImage (snowImg);
		w.n = -1;
		w.addToGroup (snow);
	}
	// stone
	if (i == 6) {
		w.addImage (stoneImg);
	}
	// snow tundra
	if (i == 7) {
		w.addImage (snowTundraImg);
		w.addToGroup (snow);
	}
	// tundra
	if (i == 8) {
		w.addImage (tundraImg);
	}
	// half metal
	if (i == 9) {
		w.addImage (halfMetalImg);
		w.rotation = rotation * 90;
		if (rotation == 0) {
			w.setCollider ("rectangle", 0, -10.5, 68, 38);
		} else if (rotation == 1) {
			w.setCollider ("rectangle", 10.5, 0, 68, 38);
		} else if (rotation == 2) {
			w.setCollider ("rectangle", 0, 10.5, 68, 38);
		} else if (rotation == 3) {
			w.setCollider ("rectangle", -10.5, 0, 68, 38);
		}
	}
	w.scale = 0.72;
}

function deleteSpike(m ,b) {
	b.remove();
}

function deleteBlock (m, b) {
	for (var i = Block.length - 1; i >= 0; i--) {
		if (mouseC.position.x / 50 == positionX[i] && mouseC.position.y / 50 == positionY[i]) {
			if (Block[i] == 29 || Block[i] == 30) {
				mouseC.overlap (spikes, deleteSpike);
			}

			positionX.splice(i, 1);
			positionY.splice(i, 1);
			Block.splice(i, 1);
			Rotation.splice(i, 1);
			b.remove ();
			return;
		}
	}
}

function createLava (x, y, i) {
	var l;
	l = createSprite (x, y);
	l.addToGroup (lava);
	l.scale = 0.72;
	if (i == 1) {
		l.setCollider ("rectangle", 0, 0, 68, 68);
		l.addImage (lavaImg);
	} else {
		l.setCollider ("rectangle", 0, 10, 68, 40);
		l.addImage (lavaTopImg);
	}
}

function createCheckPoint (x, y) {
	var c;
	c = createSprite (x, y);
	c.addToGroup (checkPoints);
	c.setCollider ("rectangle", 0, 0, 68, 68);
	c.addImage (blueFlagImg);
	c.scale = 0.72;
	c.rotation = rotation * 90;
}

function createTrampoline (x, y) {
	var t;
	t = createSprite (x, y);
	t.addToGroup (trampolines);
	t.setCollider ("rectangle", 0, 7, 68, 50);
	t.addImage (trampolineImg);
	t.scale = 0.72;
}

function createLadder (x, y) {
	var l;
	l = createSprite (x, y);
	l.addToGroup (ladders);
	l.setCollider ("rectangle", 0, 0, 68, 68);
	l.addImage (ladderImg);
	l.scale = 0.72;
}

function createIce (x, y) {
	var i;
	i = createSprite (x, y);
	i.addToGroup (walls);
	i.addToGroup (ice);
	i.setCollider ("rectangle", 0, 0, 68, 68);
	i.addImage (iceImg);
	i.scale = 0.72;
}

function createWater (x, y, i) {
	var w;
	w = createSprite (x, y);
	w.addToGroup (water);
	w.scale = 0.72;
	if (i == 1) {
		w.setCollider ("rectangle", 0, 0, 68, 68);
		w.addImage (waterImg);
	} else {
		w.setCollider ("rectangle", 0, 10, 68, 40);
		w.addImage (waterTopImg);
	}
}

function createDecoration (x, y, i) {
	var d;
	d = createSprite (x, y);
	d.addToGroup (decorations);
	d.setCollider ("rectangle", 0, 0, 68, 68);
	// sign exit
	if (i == 1) {
		d.addImage (signExitImg);
	}
	// sign right
	if (i == 2) {
		d.addImage (signRightImg);
	}
	// sign left
	if (i == 3) {
		d.addImage (signLeftImg);
	}
	// bush
	if (i == 4) {
		d.addImage (bushImg);
	}
	// plant
	if (i == 5) {
		d.addImage (plantImg);
	}
	// rock
	if (i == 6) {
		d.addImage (rockImg);
	}
	// plant
	if (i == 7) {
		d.addImage (darkTapeImg);
	}
	// rock
	if (i == 8) {
		d.addImage (lightTapeImg);
	}

	// rotation
	if (i == 2 || i == 3) {
		d.rotation = rotation * 90;
	}

	if (i == 7 || i == 8) {
		if (rotation == 0 || rotation == 2) {
			d.rotation = 0;
		} else {
			d.rotation = 90;
		}
	}

	d.scale = 0.72;
}

function changePosition (x, y, b) {
	var i;
	if (b == 1) {
		checkPoint.position.x = x;
		checkPoint.position.y = y;
		start.position.x = x;
		start.position.y = y;
		i = Block.indexOf (22);
	}

	if (b == 2) {
		exit.position.x = x;
		exit.position.y = y - 14.286;
		i = Block.indexOf (23);
	}

	positionX[i] = x / 50;
	positionY[i] = y / 50;
}

function createSpike (x, y, i) {
	var s;
	s = createSprite (x, y);
	s.addToGroup (spikes);
	s.rotation = rotation * 90;
	s.scale = 0.72;
	// spike
	if (i == 1) {
		if (rotation == 0) {
			s.setCollider ("rectangle", 0, 13, 68, 30);
		} else if (rotation == 1) {
			s.setCollider ("rectangle", -14, 0, 68, 30);
		} else if (rotation == 2) {
			s.setCollider ("rectangle", 0, -14, 68, 30);
		} else if (rotation == 3) {
			s.setCollider ("rectangle", 13, 0, 68, 30);
		}

		s.addImage (spikeImg);
	}
	// two spikes
	if (i == 2) {
		if (rotation == 0) {
			s.setCollider ("rectangle", 0, 13, 68, 30);
		} else if (rotation == 1) {
			s.setCollider ("rectangle", -14, 0, 68, 30);
		} else if (rotation == 2) {
			s.setCollider ("rectangle", 0, -14, 68, 30);
		} else if (rotation == 3) {
			s.setCollider ("rectangle", 13, 0, 68, 30);
		}

		s.addImage (twoSpikesImg);
	}

	// right spike
	if (i == 3) {
		if (rotation == 0) {
			s.position.x = x + 12.5;
			s.position.y = y + 14.3;
		} else if (rotation == 1) {
			s.position.x = x - 14.3;
			s.position.y = y + 12.5;
		} else if (rotation == 2) {
			s.position.x = x - 12.5;
			s.position.y = y - 14.3;
		} else if (rotation == 3) {
			s.position.x = x + 14.3;
			s.position.y = y - 12.5;
		}

		s.addImage (smallSpikeImg);
		s.scale = 0.36;
		s.setCollider ("rectangle", 0, 0, 70, 60);
	}
	// left spike
	if (i == 4) {
		if (rotation == 0) {
			s.position.x = x - 12.5;
			s.position.y = y + 14.3;
		} else if (rotation == 1) {
			s.position.x = x - 14.3;
			s.position.y = y - 12.5;
		} else if (rotation == 2) {
			s.position.x = x + 12.5;
			s.position.y = y - 14.3;
		} else if (rotation == 3) {
			s.position.x = x + 14.3;
			s.position.y = y + 12.5;
		}

		s.addImage (smallSpikeImg);
		s.scale = 0.36;
		s.setCollider ("rectangle", 0, 0, 70, 60);
	}
	// snow spike
	/*if (i == 2) {
		if (rotation == 0) {
			s.setCollider ("rectangle", 0, 13, 68, 30);
		} else if (rotation == 1) {
			s.setCollider ("rectangle", -14, 0, 68, 30);
		} else if (rotation == 2) {
			s.setCollider ("rectangle", 0, -14, 68, 30);
		} else if (rotation == 3) {
			s.setCollider ("rectangle", 13, 0, 68, 30);
		}

		s.addImage (snowSpikeImg);
	}
	// little spike
	if (i == 3) {
		s.setCollider ("rectangle", 0, 16, 68, 23);
		if (rotation == 0) {
			s.setCollider ("rectangle", 0, 16, 68, 23);
		} else if (rotation == 1) {
			s.setCollider ("rectangle", -17, 0, 68, 23);
		} else if (rotation == 2) {
			s.setCollider ("rectangle", 0, -17, 68, 23);
		} else if (rotation == 3) {
			s.setCollider ("rectangle", 16, 0, 68, 23);
		}

		s.addImage (littleSpikeImg);
	}
	// big spike
	if (i == 4) {
		s.setCollider ("rectangle", 0, 10, 68, 39);
		if (rotation == 0) {
			s.setCollider ("rectangle", 0, 10, 68, 39);
		} else if (rotation == 1) {
			s.setCollider ("rectangle", -11, 0, 68, 39);
		} else if (rotation == 2) {
			s.setCollider ("rectangle", 0, -11, 68, 39);
		} else if (rotation == 3) {
			s.setCollider ("rectangle", 10, 0, 68, 39);
		}

		s.addImage (bigSpikeImg);
	}*/
}

function createWallSpike (x, y, i) {
	// spike
	var s;
	s = createSprite (x, y);
	s.addToGroup (spikes);
	s.rotation = rotation * 90;
	s.scale = 0.72;
	if (rotation == 0) {
		s.setCollider ("rectangle", 0, 13, 68, 30);
		s.position.y = y - 27;
	} else if (rotation == 1) {
		s.setCollider ("rectangle", -14, 0, 68, 30);
		s.position.x = x + 27;
	} else if (rotation == 2) {
		s.setCollider ("rectangle", 0, -14, 68, 30);
		s.position.y = y + 27;
	} else if (rotation == 3) {
		s.setCollider ("rectangle", 13, 0, 68, 30);
		s.position.x = x - 27;
	}

	if (i == 1) {
		s.addImage (spikeImg);
	} else {
		s.addImage (twoSpikesImg);
	}

	// wall
	var w;
	w = createSprite (x, y);
	w.immovable = false;
	w.addToGroup (walls);
	w.addImage (halfMetalImg);
	w.rotation = rotation * 90;
	w.scale = 0.72;
	if (rotation == 0) {
		w.setCollider ("rectangle", 0, -10.5, 68, 38);
		w.position.y = y + 23;
	} else if (rotation == 1) {
		w.setCollider ("rectangle", 10.5, 0, 68, 38);
		w.position.x = x - 23;
	} else if (rotation == 2) {
		w.setCollider ("rectangle", 0, 10.5, 68, 38);
		w.position.y = y - 23;
	} else if (rotation == 3) {
		w.setCollider ("rectangle", -10.5, 0, 68, 38);
		w.position.x = x + 23;
	}
}

function createHalfSaw(x, y) {
	var s;
	s = createSprite (x, y);
	s.addToGroup (halfSaws);
	s.rotation = rotation * 90;
	s.scale = 0.72;
	s.addAnimation ("creator", halfSawImg);
	s.addAnimation ("play", sawImg);
	s.changeAnimation ("creator");
	// collider
	if (rotation == 0) {
		s.setCollider ("rectangle", 0, 13, 68, 30);
	} else if (rotation == 1) {
		s.setCollider ("rectangle", -14, 0, 68, 30);
	} else if (rotation == 2) {
		s.setCollider ("rectangle", 0, -14, 68, 30);
	} else if (rotation == 3) {
		s.setCollider ("rectangle", 13, 0, 68, 30);
	}
}

function createSaw (x, y) {
	var s;
	s = createSprite (x, y);
	s.addToGroup (saws);
	s.scale = 0.72;
	s.addImage (sawImg);
	s.setCollider ("circle", 0, 0, 34);
}

function createStopper (x, y, i) {
	var s;
	s = createSprite (x, y);
	s.addToGroup (stoppers);
	s.scale = 0.00072;
	s.i = i;
	if (i == 1) {
		s.setCollider ("rectangle", 0, 0, 68000, 68000);
	} else {
		s.rotation = rotation * 90;
		if (rotation == 0) {
			s.setCollider ("rectangle", 0, -13, 68000, 35000);
		} else if (rotation == 1) {
			s.setCollider ("rectangle", 13, 0, 68000, 35000);
		} else if (rotation == 2) {
			s.setCollider ("rectangle", 0, 13, 68000, 35000);
		} else if (rotation == 3) {
			s.setCollider ("rectangle", -13, 0, 68000, 35000);
		}
	}
}

function createMovingSaw (x, y, i) {
	var s;
	s = createSprite (x, y);
	s.addToGroup (movingSaws);
	s.scale = 0.72;
	if (i == 1) {
		s.addAnimation ("play", sawImg);
		s.addAnimation ("creator", movingHalfSawImg);
		s.changeAnimation ("creator");
		s.setCollider ("rectangle", 0, 0, 68, 68);
		s.rotation = rotation * 90;
		s.r = rotation;
		s.i = 1;
	}

	if (i == 2) {
		s.addAnimation ("play", sawImg);
		s.addAnimation ("creator", movingSawImg);
		s.changeAnimation ("creator");
		s.setCollider ("circle", 0, 0, 34);
		s.i = 2;
		if (rotation == 0 || rotation == 2) {
			s.rotation = 0;
		} else {
			s.rotation = 90;
		}
	}
}

function createFireBar (x, y, i, l) {
	var f;
	f = createSprite (x, y);
	f.addToGroup (walls);
	f.addToGroup (fireBars);
	f.scale = 0.785;
	f.rotation = rotation * 90;
	f.setCollider ("rectangle", 0, 0, 62, 62);
	f.l = length;
	if (l == 1) {
		Rotation.splice(Rotation.length - 1, 1, (rotation + 1) * 10 + length);
	}

	if (i == 1) {
		f.addAnimation ("play", fireBarImg);
		f.addAnimation ("creator", fireBarRImg);
		f.changeAnimation ("creator");
		f.i = 1;
	} else {
		f.addAnimation ("play", fireBarImg);
		f.addAnimation ("creator", fireBarLImg);
		f.changeAnimation ("creator");
		f.i = 2;
	}
}

function createRotatingSaw (x, y, i, l) {
	var r;
	r = createSprite (x, y);
	r.addToGroup (walls);
	r.addToGroup (rotatingSaws);
	r.scale = 0.785;
	r.rotation = rotation * 90;
	r.setCollider ("rectangle", 0, 0, 62, 62);
	r.l = length;
	if (l == 1) {
		Rotation.splice(Rotation.length - 1, 1, (rotation + 1) * 10 + length);
	}

	if (i == 1) {
		r.addAnimation ("play", fireBarImg);
		r.addAnimation ("creator", fireBarRImg);
		r.changeAnimation ("creator");
		r.i = 1;
	} else {
		r.addAnimation ("play", fireBarImg);
		r.addAnimation ("creator", fireBarLImg);
		r.changeAnimation ("creator");
		r.i = 2;
	}
}

function createPullingSpikes (x, y) {
	var p;
	p = createSprite (x, y);
	p.addToGroup (walls);
	p.p = 1;
	p.scale = 0.72;
	p.addImage (pullingSpikesImg);
	p.setCollider ("rectangle", 0, 0, 68, 68);
	p.rotation = rotation * 90;
}

function createStomp (x, y) {
	var s;
	s = createSprite (x, y);
	s.addToGroup (stomps);
	s.scale = 0.72;
	s.addImage (metalImg);
	s.setCollider ("rectangle", 0, 0, 68, 68);
	s.r = rotation;
}

function createSlime (x, y) {
	var s;
	s = createSprite (x, y + 12);
	s.addToGroup (slimes);
	s.scale = 1;
	s.addAnimation ("creator", slimeImg);
	s.addAnimation ("walk", slimeWalkAnim);
	s.addAnimation ("dead", "animations/slimeDead.png");
	s.changeAnimation ("creator");
	s.setCollider ("rectangle", 0, 0, 50, 26);
}

function Play () {
	game.thumbnail = 0;
	if (Mode == 1) {
		mode = 1;
		play.hide ();
		next.hide ();
		previous.hide ();
		creator.show ();
		player.velocity.y = 0;
		player.velocity.x = 0;
		SaveGame ();
		startPlay ();
	} else if (Mode == 3 && mode == 4) {
		clickSnd.play ();
		Mode = 4;
		game.code = 0;
		loadLevel ();
	} else if (mode == 2) {
		j = codeInput.value ();
		// error
		var c;
		c = j.substring (0, 1);
		if (j == null || c != "[") {
			game.thumbnail = 5;
			return;
		}

		code = JSON.parse (j);
		// error
		if (code.length < 4 || code == null) {
			game.thumbnail = 5;
			return;
		}
		mode = 3;
		Mode = 4;
		
		hideButtons ();
		codeInput.hide ();
		if (code[0] > -10000000) {
			game.code = 1;
		} else {
			game.code = 2;
			level = 1;
			maxLevel = code [1];
			trackName = code [0];
			Mode = 0;
			// draw
			background ("black");
			fill ("eee");
			textSize (60);
			textAlign (CENTER);
			text (trackName, width / 2, 230);
			textSize (50);
			if (maxLevel == 1) {
				text ("1 level", width / 2, 310);
			} else {
				text (maxLevel + " levels", width / 2, 310);
			}
			
			setTimeout (function () {
				Mode = 4;
				generateLevel ();
			}, 3000);
			return;
		}

		// lists
		positionX = [];
		positionY = [];
		Block = [];
		Rotation = [];
		// groups
		walls.removeSprites ();
		lava.removeSprites ();
		checkPoints.removeSprites ();
		fallingBlocks.removeSprites ();
		trampolines.removeSprites ();
		ladders.removeSprites ();
		ice.removeSprites ();
		water.removeSprites ();
		snow.removeSprites ();
		decorations.removeSprites ();
		spikes.removeSprites ();
		saws.removeSprites ();
		movingSaws.removeSprites ();
		halfSaws.removeSprites ();
		stoppers.removeSprites ();
		stomps.removeSprites ();
		resetBlocks ();
		// load code
		for (let i = 0; i < code.length; i += 4) {
			append (Block, code[i]);
			append (positionX, code[i + 1]);
			append (positionY, code[i + 2]);
			append (Rotation, code[i + 3]);
		}

		// create blocks
		for (var i = Block.length - 1; i >= 0; i--) {
			block = Block[i];
			rotation = Rotation[i];
			if (rotation != 0 && rotation != 1 && rotation != 2 && rotation != 3) {
				length = rotation - floor (rotation / 10) * 10;
				rotation = floor ((rotation - 10) / 10);
			}
	
			createBlock (positionX[i] * 50, positionY[i] * 50, 0);
		}
	
		// player
		checkPoint.position.x = start.position.x;
		checkPoint.position.y = start.position.y;
		checkPoint.rotation = 0;
		player.position.x = checkPoint.position.x;
		player.position.y = checkPoint.position.y - 20;

		startPlay ();
		saveGame.hide ();
	}
}

function startPlay () {
	time = 0;
	deaths = 0;
	player.velocityX = 0;
	player.velocityY = 0;
	player.death = 0;
	player.anim = 1;
	player.setCollider ("rectangle", 0, 0, 65, 91);
	player.visible = true;
	game.build = 0;
	// moving saws
	for (var i = movingSaws.length - 1; i >= 0; i--) {
		s = movingSaws[i];
		if (s.i == 1) {
			s.setCollider ("circle", 0, 0, 33);
			s.changeAnimation ("play");
			if (s.r == 0) {
				s.position.y += 25;
			} else if (s.r == 1) {
				s.position.x -= 25;
			} else if (s.r == 2) {
				s.position.y -= 25;
			} else if (s.r == 3) {
				s.position.x += 25;
			}
			if (s.rotation == 0 || s.rotation == 180) {
				s.velocity.x = 2;
			} else {
				s.velocity.y = 2;
			}
		} else {
			s.changeAnimation ("play");
			if (s.rotation == 0) {
				s.velocity.x = 2;
			} else {
				s.velocity.y = 2;
			}
		}
	}

	// half saws
	for (var i = halfSaws.length - 1; i >= 0; i--) {
		s = halfSaws[i];
		s.setCollider ("circle", 0, 0, 33);
		s.changeAnimation ("play");
		if (s.rotation == 0) {
			s.position.y += 25;
		} else if (s.rotation == 90) {
			s.position.x -= 25;
		} else if (s.rotation == 180) {
			s.position.y -= 25;
		} else if (s.rotation == 270) {
			s.position.x += 25;
		}
	}

	// fire bars
	for (var i = fireBars.length - 1; i >= 0; i--) {
		var f = fireBars[i];
		f.changeAnimation ("play");
		for (var l = 0; l <= f.l; l += 0.5) {
			var b
			if (f.rotation == 0) {
				b = createSprite (f.position.x, f.position.y + l * 50);
			} else if (f.rotation == 90) {
				b = createSprite (f.position.x + l * -50, f.position.y);
			} else if (f.rotation == 180) {
				b = createSprite (f.position.x, f.position.y + l * -50);
			} else if (f.rotation == 270) {
				b = createSprite (f.position.x + l * 50, f.position.y);
			}

			b.setCollider ("circle", 0, 0, 12);
			b.scale = 0.72;
			b.addImage (fireBallImg);
			b.l = l;
			if (f.i == 1) {
				b.r = f.rotation - 180;
			} else {
				b.r = f.rotation;
			}

			b.addToGroup (fireBalls);
			b.i = f.i;
		}
	}

	// rotating saws
	for (var i = rotatingSaws.length - 1; i >= 0; i--) {
		var r = rotatingSaws[i];
		r.changeAnimation ("play");
		for (var l = 0; l <= r.l; l ++) {
			var t
			if (r.rotation == 0) {
				t = createSprite (r.position.x, r.position.y + l * 50);
			} else if (r.rotation == 90) {
				t = createSprite (r.position.x + l * -50, r.position.y);
			} else if (r.rotation == 180) {
				t = createSprite (r.position.x, r.position.y + l * -50);
			} else if (r.rotation == 270) {
				t = createSprite (r.position.x + l * 50, r.position.y);
			}

			t.setCollider ("circle", 0, 0, 12);
			t.scale = 0.72;
			t.rotation = r.rotation + 90;
			if (l == 0) {
				t.addImage (tapeEndImg);
			} else if (l == r.l) {
				t.addImage (tapeEndImg);
				if (r.i == 1 && r.rotation == 180) {
					t.rotation = 90;
				} else if (r.i == 1 && r.rotation == 270) {
					t.rotation = 180;
				} else {
					t.rotation = r.rotation + 270;
				}

				var s
				if (r.rotation == 0) {
					s = createSprite (r.position.x, r.position.y + l * 50);
				} else if (r.rotation == 90) {
					s = createSprite (r.position.x + l * -50, r.position.y);
				} else if (r.rotation == 180) {
					s = createSprite (r.position.x, r.position.y + l * -50);
				} else if (r.rotation == 270) {
					s = createSprite (r.position.x + l * 50, r.position.y);
				}

				s.addImage (sawImg);
				s.addToGroup (rotatingTypes);
				s.addToGroup (rSaws);
				s.addToGroup (saws);
				s.scale = 0.72;
				s.setCollider ("circle", 0, 0, 34);
				s.l = l;
				s.i = r.i;
				if (r.i == 1) {
					s.r = r.rotation - 180;
				} else {
					s.r = r.rotation;
				}

				s.s = 1;
			} else {
				t.addImage (darkTapeImg);
			}

			t.l = l;
			if (r.i == 1) {
				t.r = r.rotation - 180;
			} else {
				t.r = r.rotation;
			}

			t.addToGroup (rotatingTypes);
			t.i = r.i;
		}
	}

	// pulling spikes
	for (var i = walls.length - 1; i >= 0; i--) {
		var w = walls[i];
		if (w.p == 1) {
			var p;
			if (w.rotation == 0) {
				p = createSprite (w.position.x, w.position.y - 25);
				p.setCollider ("rectangle", 0, 13, 68, 30);
			} else if (w.rotation == 90) {
				p = createSprite (w.position.x + 25, w.position.y);
				p.setCollider ("rectangle", -14, 0, 68, 30);
			} else if (w.rotation == 180) {
				p = createSprite (w.position.x, w.position.y + 25);
				p.setCollider ("rectangle", 0, -14, 68, 30);
			} else if (w.rotation == 270) {
				p = createSprite (w.position.x - 25, w.position.y);
				p.setCollider ("rectangle", 13, 0, 68, 30);
			}

			p.addImage (spikeImg);
			p.addToGroup (spikes);
			p.addToGroup (pullingSpikes);
			p.rotation = w.rotation;
			p.scale = 0.72;
			p.i = 2;
			p.t = 0;
		}
	}

	// stomps
	for (let i = stomps.length - 1; i >= 0; i--) {
		var t = stomps[i];
		t.id = i;
		t.timeOut = 0;
		var s;
		s = createSprite (t.position.x, t.position.y);
		s.addToGroup (spikes);
		s.addToGroup (stompSpikes);
		s.rotation = t.r * 90 + 180;
		s.scale = 0.72;
		s.addImage (spikeImg);
		s.id = i;
		s.timeOut = 0;
		if (t.r == 0) {
			s.setCollider ("rectangle", 0, -14, 68, 30);
			s.position.y += 50;
			s.velocity.y = 6;
			t.velocity.y = 6;
		} else if (t.r == 1) {
			s.setCollider ("rectangle", 13, 0, 68, 30);
			s.position.x -= 50;
			s.velocity.x = -6;
			t.velocity.x = -6;
		} else if (t.r == 2) {
			s.setCollider ("rectangle", 0, 13, 68, 30);
			s.position.y -= 50;
			s.velocity.y = -6;
			t.velocity.y = -6;
		} else if (t.r == 3) {
			s.setCollider ("rectangle", -14, 0, 68, 30);
			s.position.x += 50;
			s.velocity.x = 6;
			t.velocity.x = 6;
		}

	}

	// slimes
	for (let i = 0; i < slimes.length; i++) {
		var s = slimes[i];
		s.changeAnimation ("walk");
		s.velocity.x = -2;
		s.velocityY = 0;
		s.anim = 1;
	}

	reset ();
}

function Creator () {
	mode = 2;
	game.code = 0;
	// buttins
	play.show ();
	creator.hide ();
	next.show ();
	previous.show ();

	reset ();
	// player
	player.velocity.y = 0;
	player.velocity.x = 0;
	player.death = 0;
	player.visible = true;
	game.build = 0;
	// reset blocks
	resetBlocks ();
}

function resetBlocks () {
	movingSaws.removeSprites ();
	halfSaws.removeSprites ();
	saws.removeSprites ();
	fireBalls.removeSprites ();
	rotatingTypes.removeSprites ();
	rSaws.removeSprites ();
	pullingSpikes.removeSprites ();
	stompSpikes.removeSprites ();
	stomps.removeSprites ();
	slimes.removeSprites ();
	// change animations
	for (var i = fireBars.length - 1; i >= 0; i--) {
		var f = fireBars[i];
		f.changeAnimation ("creator");
	}

	for (var i = rotatingSaws.length - 1; i >= 0; i--) {
		var f = rotatingSaws[i];
		f.changeAnimation ("creator");
	}

	// create new sprites
	for (var i = Block.length - 1; i >= 0; i--) {
		var x = positionX[i] * 50;
		var y = positionY[i] * 50;
		rotation = Rotation[i];
		if (Block[i] == 34 || Block[i] == 35) {
			createMovingSaw (x, y, Block[i] - 33);
		}

		if (Block[i] == 31) {
			createHalfSaw (x, y);
		}

		if (Block[i] == 32) {
			createSaw (x, y);
		}

		if (Block[i] == 43) {
			createStomp (x, y);
		}

		if (Block[i] == 47) {
			createSlime (x, y);
		}
	}
}

function Next () {
	if (Mode == 1) {
		block ++;
		if (block > game.blocksNumber) {
			block = 1;
		}
	}

	if (Mode == 2) {
		clickSnd.play ();
		// local storage
		game.page ++;
		track = game.trackOrder[game.page];
		trackName = localStorage.getItem("track" + track + "name");
		maxLevel = localStorage.getItem("track" + track + "maxLevel");
		// buttons
		previous.show ();
		previous.position (10, 170);
		previous.size (40, 150);
		if (game.page == tracksNumber - 1) {
			next.hide ();
		}

		//text
		background ("black");
		text ("Load game", width / 2, 100);
		text (JSON.parse(trackName), width / 2, 220);
		if (maxLevel == 1) {
			text ("1 level", width / 2, 300);
		} else {
			text (maxLevel + " levels", width / 2, 300);
		}
	}

	if (Mode == 3) {
		clickSnd.play ();
		game.page ++;
		previous.show ();
		previous.position (10, 170);
		previous.size (40, 150);
		drawLevels ();
		if (maxLevel < game.page * 8) {
			next.hide ();
		}
	}
}

function Previous () {
	if (Mode == 1) {
		block --;
		if (block < 1) {
			block = game.blocksNumber;
		}
	}

	if (Mode == 2) {
		clickSnd.play ();
		// local storage
		game.page --;
		track = game.trackOrder[game.page];
		trackName = localStorage.getItem("track" + track + "name");
		maxLevel = localStorage.getItem("track" + track + "maxLevel");
		// buttons
		next.show ();
		if (game.page == 0) {
			previous.hide ();
		}

		// text
		background ("black");
		text ("Load game", width / 2, 100);
		text (JSON.parse(trackName), width / 2, 220);
		if (maxLevel == 1) {
			text ("1 level", width / 2, 300);
		} else {
			text (maxLevel + " levels", width / 2, 300);
		}
	}

	if (Mode == 3) {
		clickSnd.play ();
		game.page --;
		next.show ();
		drawLevels ();
		if (game.page == 1) {
			previous.hide ();
		}
	}
}

function Resume () {
	clickSnd.play ();
	Mode = game.preMode;
	mode = game.premode;
	game.build = 0;
	hideButtons ();
	// show buttons
	if (mode == 1) {
		creator.show ();
	} else if (mode == 2) {
		play.show ();
		next.show ();
		previous.show ();
		game.build = -10;
	}

	// moving saws
	for (let i = 0; i < movingSaws.length; i++) {
		var s = movingSaws[i];
		s.velocity.x = s.preVelocityX;
		s.velocity.y = s.preVelocityY;
	}

	// stomps
	for (let i = 0; i < stomps.length; i++) {
		var s = stomps[i];
		s.velocity.x = s.preVelocityX;
		s.velocity.y = s.preVelocityY;
	}

	for (let i = 0; i < stompSpikes.length; i++) {
		var s = stompSpikes[i];
		s.velocity.x = s.preVelocityX;
		s.velocity.y = s.preVelocityY;
	}
	
	// slimes
	for (let i = 0; i < slimes.length; i++) {
		var s = slimes[i];
		s.velocity.x = s.preVelocityX;
		s.velocityY = s.preVelocityY;
	}
}

function Menu () {
	if (frameCount > 10) {
		clickSnd.play ();
	}

	nameInput.hide ();
	codeInput.hide ();
	volume.hide ();
	// buttons
	hideButtons ();
	newGame.show ();
	loadGame.show ();
	settings.show ();
	settings.position (150, 345);
	settings.size (300, 50);
	playGame.show ();

	Mode = 2;
	game.thumbnail = 1;
}

function Back () {
	clickSnd.play ();
	// select level
	if (Mode == 5 && mode == 4 || Mode == 5 && mode == 2) {
		game.code = 0;
		mode = 6;
		selectLevel ();
		codeInput.hide ();
		return;
	}
	// game name
	if (Mode == 5 && mode == 3) {
		gameName ();
		codeInput.hide ();
		Mode = 2;
		return;
	}
	// menu
	if (Mode == 2) {
		Menu ();
		return;
	}
	// select game
	if (mode == 4 || mode == 3) {
		game.code = 0;
		selectGame ();
		nameInput.hide ();
		codeInput.hide ();
		mode = 2;
		Mode = 2;
		return;
	}
	// pause
	if (Mode == 5) {
		mode = game.premode;
		Mode = game.preMode;
		game.build = 100;
		pause ();
		volume.hide ();
	}
}

function TestGame () {
	clickSnd.play ();
	Mode = 4;
	level = 1;
	game.code = 0;
	loadLevel ();
}

function TestLevel () {
	clickSnd.play ();
	mode = 3;
	Mode = 1;
	hideButtons ();
	checkPoint.position.x = start.position.x;
	checkPoint.position.y = start.position.y;
	player.position.x = start.position.x;
	player.position.y = start.position.y - 20;
	resetBlocks ();
	startPlay ();
}

function NextLevel () {
	clickSnd.play ();
	level ++;
	if (game.code == 0) {
		loadLevel ();
	} else {
		generateLevel ();
	}
}

function SaveGame () {
	saveGame.hide ();
	game.build = -10;
	// local storage
	j = JSON.stringify(positionX);
	localStorage.setItem("track" + track + "level" + level + "posX", j);
	j = JSON.stringify(positionY);
	localStorage.setItem("track" + track + "level" + level + "posY", j);
	j = JSON.stringify(Block);
	localStorage.setItem("track" + track + "level" + level + "blocks", j);
	j = JSON.stringify(Rotation);
	localStorage.setItem("track" + track + "level" + level + "rotation", j);
}

function NewGame () {
	// create game
	if (Mode == 5) {
		CreateGame ();
		return;
	}

	clickSnd.play ();
	game.thumbnail = 0;
	// local storage
	tracksNumber ++;
	localStorage.setItem("tracksNumber", tracksNumber);
	track = tracksNumber;
	trackName = JSON.stringify(nameInput.value ());
	localStorage.setItem("track" + track + "name", trackName);
	game.trackOrder.splice (0, 0, track);
	j = JSON.stringify (game.trackOrder);
	localStorage.setItem ("trackOrder", j);

	nameInput.hide ();
	maxLevel = 0;
	NewLevel ();
}

function NewLevel () {
	clickSnd.play ();
	if (maxLevel > 0) {
		// local storage
		j = localStorage.getItem ("track" + track + "level" + maxLevel + "posX");
		positionX = JSON.parse (j);
		j = localStorage.getItem ("track" + track + "level" + maxLevel + "posY");
		positionY = JSON.parse (j);
		j = localStorage.getItem ("track" + track + "level" + maxLevel + "blocks");
		Block = JSON.parse (j);
		// have exit
		var e;
		e = Block.indexOf (23);
		if (positionX[e] == 10000 && positionY[e] == 10000) {
			Mode = 5;
			// buttons
			hideButtons ();
			back.show ();
			back.position (200, 440);
			back.size (200, 50);
			// text
			background ("black");
			fill ("#eee");
			textSize (50);
			textAlign (CENTER);
			text ("The last level must", width / 2, 170);
			text ("have exit, that you", width / 2, 230);
			text ("can do the new one.", width / 2, 290);
			return;
		}
	}

	mode = 2;
	Mode = 1;
	game.code = 0;
	// level
	if (maxLevel == 0) {
		maxLevel = 1;
	} else {
		maxLevel ++;
	}

	level = maxLevel;
	// local storage
	localStorage.setItem("track" + track + "maxLevel", maxLevel);
	// buttons
	hideButtons ();
	next.show ();
	previous.show ();
	play.show ();
	next.position (120, 450);
	next.size (40, 40);
	previous.position (10, 450);
	previous.size (40, 40);
	play.position (395, 445);
	play.size (200, 50);
	// lists
	positionX = [];
	positionY = [];
	Block = [];
	Rotation = [];
	// groups
	walls.removeSprites ();
	lava.removeSprites ();
	checkPoints.removeSprites ();
	fallingBlocks.removeSprites ();
	trampolines.removeSprites ();
	ladders.removeSprites ();
	ice.removeSprites ();
	water.removeSprites ();
	snow.removeSprites ();
	decorations.removeSprites ();
	spikes.removeSprites ();
	saws.removeSprites ();
	movingSaws.removeSprites ();
	halfSaws.removeSprites ();
	stoppers.removeSprites ();
	stomps.removeSprites ();
	resetBlocks ();
	// create blocks
	createWall (300, 300, 1);
	exit.position.x = 500000;
	exit.position.y = 500000;
	start.position.x = 300;
	start.position.y = 250;
	checkPoint.position.x = start.position.x;
	checkPoint.position.y = start.position.y;
	checkPoint.rotation = 0;
	player.position.x = checkPoint.position.x;
	player.position.y = checkPoint.position.y - 20;
	// lists
	append(positionX, 6);
	append(positionY, 6);
	append(Block, 1);
	append(Rotation, 0);
	append(positionX, 6);
	append(positionY, 5);
	append(Block, 22);
	append(Rotation, 0);
	append(positionX, 10000);
	append(positionY, 10000);
	append(Block, 23);
	append(Rotation, 0);

	game.build = -10;
	SaveGame ();
}

function loadLevel () {
	clickSnd.play ();
	game.build = -10;
	play.position (395, 445);
	play.size (200, 50);
	previous.size (40, 40);
	next.size (40, 40);
	hideButtons ();
	if (mode == 6 || Mode == 4) {
		Mode = 4;
		mode = 3;
	} else {
		Mode = 1;
		mode = 2;
		// buttons
		next.show ();
		previous.show ();
		play.show ();
		next.position (120, 450);
		previous.position (10, 450);
	}

	// lists
	positionX = [];
	positionY = [];
	Block = [];
	Rotation = [];
	// groups
	walls.removeSprites ();
	lava.removeSprites ();
	checkPoints.removeSprites ();
	fallingBlocks.removeSprites ();
	trampolines.removeSprites ();
	ladders.removeSprites ();
	ice.removeSprites ();
	water.removeSprites ();
	snow.removeSprites ();
	decorations.removeSprites ();
	spikes.removeSprites ();
	saws.removeSprites ();
	movingSaws.removeSprites ();
	halfSaws.removeSprites ();
	stoppers.removeSprites ();
	stomps.removeSprites ();
	resetBlocks ();
	// local storage
	j = localStorage.getItem ("track" + track + "level" + level + "posX");
	positionX = JSON.parse (j);
	j = localStorage.getItem ("track" + track + "level" + level + "posY");
	positionY = JSON.parse (j);
	j = localStorage.getItem ("track" + track + "level" + level + "blocks");
	Block = JSON.parse (j);
	j = localStorage.getItem ("track" + track + "level" + level + "rotation");
	Rotation = JSON.parse (j);
	for (var i = Block.length - 1; i >= 0; i--) {
		block = Block[i];
		rotation = Rotation[i];
		if (rotation != 0 && rotation != 1 && rotation != 2 && rotation != 3) {
			length = rotation - floor (rotation / 10) * 10;
			rotation = floor ((rotation - 10) / 10);
		}

		createBlock (positionX[i] * 50, positionY[i] * 50, 0);
	}

	// player
	checkPoint.position.x = start.position.x;
	checkPoint.position.y = start.position.y;
	checkPoint.rotation = 0;
	player.position.x = checkPoint.position.x;
	player.position.y = checkPoint.position.y - 20;

	if (Mode == 4) {
		startPlay ();
	}
}

function EditLevel () {
	clickSnd.play ();
	Mode = 1;
	mode = 2;
	game.build = -10;
	resetBlocks ();
	// buttons
	hideButtons();
	next.show ();
	previous.show ();
	play.show ();
	next.position (120, 450);
	previous.position (10, 450);
}

function gameName () {
	clickSnd.play ();
	nameInput.show ();
	nameInput.position (148, 190);
	nameInput.value ("my platformer");
	game.thumbnail = 2;
	// buttons
	hideButtons ();
	back.show ();
	back.position (200, 440);
	back.size (200, 50);
	createGame.show ();
	enterCode.show ();
	enterCode.position (200, 330);
	enterCode.size (200, 50);
	createGame.position (200, 240);
}

function selectGame () {
	clickSnd.play ();
	mode = 2;
	game.thumbnail = 0;
	// buttons
	hideButtons ();
	back.show ();
	back.position (310, 440);
	back.size (180, 50);
	getCode.show ();
	// text
	background ("black");
	fill ("#eee");
	textSize (50);
	textAlign (CENTER);
	text ("Load game", width / 2, 100);
	if (tracksNumber > 0) {
		// local storage
		game.page = 0;
		track = game.trackOrder[0];
		trackName = localStorage.getItem ("track" + track + "name");
		// buttons
		select.show ();
		deleteB.show ();
		rename.show ();
		rename.position (15, 380);
		rename.size (180, 50);
		text (JSON.parse(trackName), width / 2, 220);
		if (tracksNumber > 1) {
			next.show ();
			next.position (550, 170);
			next.size (40, 150);
		}

		maxLevel = localStorage.getItem("track" + track + "maxLevel");
		if (maxLevel == 1) {
			text ("1 level", width / 2, 300);
		} else {
			text (maxLevel + " levels", width / 2, 300);
		}
	} else {
		// text
		textSize (30);
		text ("You don't have any platformer yet :(", width / 2, 220);
		text ("Create new with button: New game", width / 2, 260);
		getCode.hide ();
		back.position (210, 440);
	}
}

function selectLevel () {
	clickSnd.play ();
	if (mode != 6) {
		game.trackOrder.splice (game.page, 1);
		game.trackOrder.splice (0, 0, track);
		j = JSON.stringify (game.trackOrder);
		localStorage.setItem ("trackOrder", j);
	}

	mode = 4;
	Mode = 3;
	game.page = 1;
	// buttons
	hideButtons ();
	back.show ();
	back.position (210, 440);
	back.size (180, 50);
	maxLevel ++;
	if (maxLevel > 8) {
		next.show ();
		next.position (550, 170);
		next.size (40, 150);
	}

	maxLevel --;
	drawLevels ();
}

function drawLevels () {
	// text
	background ("black");
	fill ("#eee");
	textSize (50);
	textAlign (CENTER);
	text ("Select level", width / 2, 90);
	// draw
	strokeWeight (5);
	var maxX;
	var maxY;
	maxLevel ++;
	if (maxLevel > game.page * 8 - 4) {
		maxY = 2;
	} else {
		maxY = 1;
	}

	maxLevel --;
	for (var y = 0; y < maxY; y++) {
		if (y == 0) {
			maxX = maxLevel - game.page * 8 + 9;
		} else {
			maxX = maxLevel - game.page * 8 + 5;
		}

		if (maxX > 4) {
			maxX = 4;
		}

		for (var x = 0; x < maxX; x++) {
			// draw
			stroke ("#a00909");
			fill ("#151515");
			rect (x * 100 + 100, y * 100 + 150, 90, 90);
			noStroke ();
			fill ("#a00909");
			textSize (80);
			if (y == maxY - 1 && x == maxX - 1 && maxLevel - game.page * 8 < 0) {
				// new level
				textSize (140);
				text ("+", x * 100 + 139, y * 100 + 237);
			} else {
				// level number
				text (y * 4 + x + 1 + game.page * 8 - 8, x * 100 + 142, y * 100 + 222);
			}
		}
	}

	strokeWeight (1);
}

function sureDelete () {
	clickSnd.play ();
	// buttons
	hideButtons();
	yes.show ();
	no.show ();
	background ("black");
	fill ("#eee");
	textSize (50);
	textAlign (CENTER);
	if (mode == 4) {
		text ("Are you sure", width / 2, 130)
		text ("you want to", width / 2, 200);
		text ("delete level " + level + "?", width / 2, 270)
	} else {
		text ("Are you sure", width / 2, 130)
		text ("you want to delete", width / 2, 200);
		text ("track " + JSON.parse (trackName) + "?", width / 2, 270);
	}
}

function No () {
	clickSnd.play ();
	if (mode == 4) {
		mode = 6;
		selectLevel ();
	} else {
		selectGame ();
	}
}

function Delete () {
	clickSnd.play ();
	if (Mode == 2) {
		// local storage
		for (var t = track; t != tracksNumber; t++) {
			maxLevel = localStorage.getItem ("track" + t + "maxLevel");
			for (var i = maxLevel; i > 0; i--) {
				localStorage.removeItem("track" + t + "level" + i + "posX");
				localStorage.removeItem("track" + t + "level" + i + "posY");
				localStorage.removeItem("track" + t + "level" + i + "blocks");
				localStorage.removeItem("track" + t + "level" + i + "rotation");
			}
			localStorage.removeItem("track" + t + "maxLevel");
			localStorage.removeItem("track" + t + "name");
			maxLevel = localStorage.getItem ("track" + (t + 1) + "maxLevel");
			for (var i = maxLevel; i > 0; i--) {
				j = localStorage.getItem ("track" + (t + 1) + "level" + i + "posX");
				localStorage.setItem ("track" + t + "level" + i + "posX", j);
				j = localStorage.getItem ("track" + (t + 1) + "level" + i + "posY");
				localStorage.setItem ("track" + t + "level" + i + "posY", j);
				j = localStorage.getItem ("track" + (t + 1) + "level" + i + "blocks");
				localStorage.setItem ("track" + t + "level" + i + "blocks", j);
				j = localStorage.getItem ("track" + (t + 1) + "level" + i + "rotation");
				localStorage.setItem ("track" + t + "level" + i + "rotation", j);
			}

			j = localStorage.getItem ("track" + (t + 1) + "maxLevel");
			localStorage.setItem ("track" + t + "maxLevel", j);
			j = localStorage.getItem ("track" + (t + 1) + "name");
			localStorage.setItem ("track" + t + "name", j);
		}

		for (var i = maxLevel; i > 0; i--) {
			localStorage.removeItem("track" + tracksNumber + "level" + i + "posX");
			localStorage.removeItem("track" + tracksNumber + "level" + i + "posY");
			localStorage.removeItem("track" + tracksNumber + "level" + i + "blocks");
			localStorage.removeItem("track" + tracksNumber + "level" + i + "rotation");
		}

		localStorage.removeItem("track" + tracksNumber + "name");
		localStorage.removeItem("track" + tracksNumber + "maxLevel");
		tracksNumber --;
		localStorage.setItem("tracksNumber", tracksNumber);
		for (let i = 1; i <= tracksNumber; i++) {
			if (game.trackOrder[i - 1] > track) {
				game.trackOrder[i - 1] --;
			}
		}
		game.trackOrder.splice (game.page, 1);
		j = JSON.stringify (game.trackOrder);
		localStorage.setItem ("trackOrder", j);
		selectGame ();
	} else {
		// buttons
		yes.hide ();
		no.hide ();
		back.show ();
		// local storage
		for (var i = level; i != maxLevel; i++) {
			j = localStorage.getItem ("track" + track + "level" + (i + 1) + "posX");
			localStorage.setItem ("track" + track + "level" + i + "posX", j);
			j = localStorage.getItem ("track" + track + "level" + (i + 1) + "posY");
			localStorage.setItem ("track" + track + "level" + i + "posY", j);
			j = localStorage.getItem ("track" + track + "level" + (i + 1) + "blocks");
			localStorage.setItem ("track" + track + "level" + i + "blocks", j);
			j = localStorage.getItem ("track" + track + "level" + (i + 1) + "rotation");
			localStorage.setItem ("track" + track + "level" + i + "rotation", j);
		}

		localStorage.removeItem("track" + track + "level" + maxLevel + "posX");
		localStorage.removeItem("track" + track + "level" + maxLevel + "posY");
		localStorage.removeItem("track" + track + "level" + maxLevel + "blocks");
		localStorage.removeItem("track" + track + "level" + maxLevel + "rotation");
		maxLevel --;
		localStorage.setItem("track" + track + "maxLevel", maxLevel);
		mode = 6;
		selectLevel ();
	}
}

function Rename () {
	clickSnd.play ();
	hideButtons ();
	if (mode == 3) {
		// local storage
		trackName = JSON.stringify(nameInput.value ());
		localStorage.setItem("track" + track + "name", trackName);

		nameInput.hide ();
		selectGame ();
	} else {
		mode = 3;
		// buttons
		rename.show ();
		rename.position (50, 400);
		rename.size (200, 50);
		back.show ();
		back.position (350, 400);
		back.size (200, 50);
		// text
		background ("black");
		fill ("#eee")
		textSize (50);
		textAlign (CENTER);
		text ("Rename", width / 2, 110);
		textSize (30);
		text ("Name:", width / 2, 230);
		// input
		nameInput.show ();
		nameInput.position (148, 250);
		nameInput.value (JSON.parse(trackName));
	}
}

function reset () {
	fallingBlocks.removeSprites ();
	for (var i = Block.length - 1; i >= 0; i--) {
		if (Block[i] == 5) {
			var x = positionX[i] * 50;
			var y = positionY[i] * 50;
			createWall (x, y, 2);
		}
	}
}

function pause () {
	game.preMode = Mode;
	game.premode = mode;
	if (Mode != 4) {
		SaveGame ();
	}

	hideButtons ();
	if (Mode == 4) {
		restart.show ();
		restart.position (95, 285);
		restart.size (200, 50);
	} else {
		testGame.show ();
	}

	Mode = 5;
	// draw
	background ("black");
	fill ("#eee");
	textAlign (CENTER);
	textSize (50);
	text ("Paused", width / 2, 110);
	// buttons
	resume.show ();
	menu.show ();
	menu.size (200, 50);
	settings.show ();
	settings.size (200, 50);
	if (game.code == 1) {
		menu.position (305, 215);
		settings.position (305, 275);
		resume.position (95, 215);
		restart.position (95, 275);
	} else {
		menu.position (305, 165);
		settings.position (305, 225);
		resume.position (95, 165);
		if (game.code == 2) {
			restart.position (95, 225);
			if (level < maxLevel) {
				nextLevel.show ();
				nextLevel.position (95, 285);
				nextLevel.size (200, 50);
			}
		} else {
			newLevel.show ();
			newLevel.position (305, 285);
			newLevel.size (200, 50);
			if (mode == 3) {
				editLevel.show ();
			} else {
				testLevel.show ();
			}

			if (level == maxLevel) {
				newLevel.show ();
			} else {
				nextLevel.show ();
				nextLevel.position (305, 285);
				nextLevel.size (200, 50);
			}
		}
	}

	if (game.build != 100) {
		// moving saws
		for (let i = 0; i < movingSaws.length; i++) {
			var s = movingSaws[i];
			s.preVelocityX = s.velocity.x;
			s.preVelocityY = s.velocity.y;
			s.velocity.x = 0;
			s.velocity.y = 0;
		}

		// stomps
		for (let i = 0; i < stomps.length; i++) {
			var s = stomps[i];
			s.preVelocityX = s.velocity.x;
			s.preVelocityY = s.velocity.y;
			s.velocity.x = 0;
			s.velocity.y = 0;
		}

		for (let i = 0; i < stompSpikes.length; i++) {
			var s = stompSpikes[i];
			s.preVelocityX = s.velocity.x;
			s.preVelocityY = s.velocity.y;
			s.velocity.x = 0;
			s.velocity.y = 0;
		}

		// slimes
		for (let i = 0; i < slimes.length; i++) {
			var s = slimes[i];
			s.preVelocityX = s.velocity.x;
			s.preVelocityY = s.velocityY;
			s.velocity.x = 0;
			s.velocityY = 0;
		}
	}
}

function Settings () {
	clickSnd.play ();
	mode = 5;
	if (Mode == 2) {
		game.thumbnail = 3;
	}
	
	// buttons
	hideButtons();
	volume.show ();
	back.show ();
	back.position (200, 430);
	back.size (200, 50);
}

function Restart () {
	clickSnd.play ();
	Mode = 4;
	mode = 3;
	time = 0;
	deaths = 0;
	player.anim = 1;
	player.death = 0;
	hideButtons ();
	checkPoint.position.x = start.position.x;
	checkPoint.position.y = start.position.y;
	player.position.x = start.position.x;
	player.position.y = start.position.y - 20;
	resetBlocks ();
	startPlay ();
}

function GetCode () {
	clickSnd.play ();
	game.code = 3;
	// draw
	background ("black");
	fill ("#eee");
	textAlign (CENTER);
	textSize (50);
	text ("Save code", width / 2, 100);
	textSize (35);
	text ("Select the code by triple clicking it", width / 2, 200);
	text ("Press ctrl+c to save the code", width / 2, 260);
	// buttons
	hideButtons ();
	back.show ();
	back.position (210, 440);
	// input
	codeInput.show ();
	codeInput.position (198, 330);
	codeInput.value ("");
	if (mode == 4) {
		// local storage
		code = [];
		j = localStorage.getItem ("track" + track + "level" + level + "posX");
		positionX = JSON.parse (j);
		j = localStorage.getItem ("track" + track + "level" + level + "posY");
		positionY = JSON.parse (j);
		j = localStorage.getItem ("track" + track + "level" + level + "blocks");
		Block = JSON.parse (j);
		j = localStorage.getItem ("track" + track + "level" + level + "rotation");
		Rotation = JSON.parse (j);
		// generate code
		for (let i = Block.length - 1; i >= 0; i--) {
			append (code, Block[i]);
			append (code, positionX[i]);
			append (code, positionY[i]);
			append (code, Rotation[i]);
		}

		j = JSON.stringify (code);
		codeInput.value (j);
		Mode = 5;
	} else {
		// local storage
		code = [];
		append (code, JSON.parse (trackName));
		append (code, JSON.parse (maxLevel));
		for (let i = 1; i <= maxLevel; i++) {
			j = localStorage.getItem ("track" + track + "level" + i + "posX");
			positionX = JSON.parse (j);
			j = localStorage.getItem ("track" + track + "level" + i + "posY");
			positionY = JSON.parse (j);
			j = localStorage.getItem ("track" + track + "level" + i + "blocks");
			Block = JSON.parse (j);
			j = localStorage.getItem ("track" + track + "level" + i + "rotation");
			Rotation = JSON.parse (j);
			append (code, Block.length);
			// generate code
			for (let l = Block.length - 1; l >= 0; l--) {
				append (code, Block[l]);
				append (code, positionX[l]);
				append (code, positionY[l]);
				append (code, Rotation[l]);
			}
		}

		j = JSON.stringify (code);
		codeInput.value (j);
		mode = 4;
		Mode = 3;
	}	
}

function PlayGame () {
	clickSnd.play ();
	mode = 2;
	game.thumbnail = 4;
	// buttons
	hideButtons ();
	back.show ();
	back.position (200, 430);
	back.size (200, 50);
	play.show ();
	play.position (200, 370);
	play.size (200, 50);
	// input
	codeInput.show ();
	codeInput.position (198, 250);
	codeInput.value ("");
}

function EnterCode () {
	clickSnd.play ();
	Mode = 5;
	mode = 2;
	// buttons
	hideButtons ();
	back.show ();
	back.size (180, 50);
	back.position (210, 440);
	if (game.thumbnail == 2) {
		createGame.show ();
		createGame.position (200, 380);
		back.size (200, 50);
		back.position (200, 440);
		game.thumbnail = 0;
		mode = 3;
	} else {
		createLevel.show ();
	}
	
	// input
	nameInput.hide ();
	codeInput.show ();
	codeInput.position (198, 280);
	codeInput.value ("");
	// draw
	background ("black");
	fill ("#eee");
	textSize (50);
	textAlign (CENTER);
	text ("Enter code", width / 2, 110);
	textSize (35);
	text ("Press ctrl+v to enter the code", width / 2, 200);
}

function CreateLevel () {
	clickSnd.play ();
	maxLevel ++;
	level = maxLevel;
	localStorage.setItem ("track" + track + "maxLevel", maxLevel);
	game.build = -10;
	Play ();
	mode = 2;
	Mode = 1;
	game.code = 0;
	Creator ();
	SaveGame ();
	// buttons
	play.position (395, 445);
	play.size (200, 50);
	previous.size (40, 40);
	next.size (40, 40);
	next.position (120, 450);
	previous.position (10, 450);
}

function CreateGame (i) {
	game.code = 0;
	hideButtons ();
	codeInput.hide ();
	// set variables
	j = codeInput.value ();
	code = JSON.parse (j);
	tracksNumber ++;
	track = tracksNumber;
	game.trackOrder.splice (0, 0, track);
	// local storage
	j = JSON.stringify (game.trackOrder);
	localStorage.setItem ("trackOrder", j);
	localStorage.setItem ("tracksNumber", tracksNumber);
	if (i != 1) {
		trackName = code [0];
	}
	
	localStorage.setItem ("track" + track + "name", JSON.stringify (trackName));
	maxLevel = code [1];
	localStorage.setItem ("track" + track + "maxLevel", maxLevel);
	// load code
	var l = 2;
	for (let lvl = 1; lvl <= maxLevel; lvl++) {
		if (lvl > 1) {
			l += code [l] * 4 + 1;
		}
		
		// lists
		positionX = [];
		positionY = [];
		Block = [];
		Rotation = [];
		// set lists
		for (let i = l + 1; i < code [l] * 4 + l + 1; i += 4) {
			append (Block, code[i]);
			append (positionX, code[i + 1]);
			append (positionY, code[i + 2]);
			append (Rotation, code[i + 3]);
		}

		// save level
		j = JSON.stringify(positionX);
		localStorage.setItem("track" + track + "level" + lvl + "posX", j);
		j = JSON.stringify(positionY);
		localStorage.setItem("track" + track + "level" + lvl + "posY", j);
		j = JSON.stringify(Block);
		localStorage.setItem("track" + track + "level" + lvl + "blocks", j);
		j = JSON.stringify(Rotation);
		localStorage.setItem("track" + track + "level" + lvl + "rotation", j);
	}

	// select level
	if (i != 1) {
		selectLevel ();
	}
}

function generateLevel () {
	hideButtons ();
	// set variables
	Mode = 4;
	mode = 3;
	player.anim = 1;
	player.death = 0;
	deaths = 0;
	time = 0;
	// lists
	positionX = [];
	positionY = [];
	Block = [];
	Rotation = [];
	// groups
	walls.removeSprites ();
	lava.removeSprites ();
	checkPoints.removeSprites ();
	fallingBlocks.removeSprites ();
	trampolines.removeSprites ();
	ladders.removeSprites ();
	ice.removeSprites ();
	water.removeSprites ();
	snow.removeSprites ();
	decorations.removeSprites ();
	spikes.removeSprites ();
	saws.removeSprites ();
	movingSaws.removeSprites ();
	halfSaws.removeSprites ();
	stoppers.removeSprites ();
	stomps.removeSprites ();
	resetBlocks ();
	// load code
	var l = 2;
	for (let i = level - 1; i > 0; i--) {
		l += code [l] * 4 + 1;
	}
	for (let i = l + 1; i < code [l] * 4 + l + 1; i += 4) {
		append (Block, code[i]);
		append (positionX, code[i + 1]);
		append (positionY, code[i + 2]);
		append (Rotation, code[i + 3]);
	}

	// create blocks
	for (var i = Block.length - 1; i >= 0; i--) {
		block = Block[i];
		rotation = Rotation[i];
		if (rotation != 0 && rotation != 1 && rotation != 2 && rotation != 3) {
			length = rotation - floor (rotation / 10) * 10;
			rotation = floor ((rotation - 10) / 10);
		}

		createBlock (positionX[i] * 50, positionY[i] * 50, 0);
	}

	// player
	checkPoint.position.x = start.position.x;
	checkPoint.position.y = start.position.y;
	checkPoint.rotation = 0;
	player.position.x = checkPoint.position.x;
	player.position.y = checkPoint.position.y - 20;

	startPlay ();
	saveGame.hide ();
}

function hideButtons () {
	resume.hide ();
	testLevel.hide ();
	testGame.hide ();
	menu.hide ();
	settings.hide ();
	newGame.hide ();
	editLevel.hide ();
	newLevel.hide ();
	play.hide ();
	creator.hide ();
	next.hide ();
	previous.hide ();
	loadGame.hide ();
	back.hide ();
	saveGame.hide ();
	createGame.hide ();
	select.hide ();
	edit.hide ();
	deleteB.hide ();
	yes.hide ();
	no.hide ();
	rename.hide ();
	nextLevel.hide ();
	restart.hide ();
	getCode.hide ();
	playGame.hide ();
	enterCode.hide ();
	createLevel.hide ();
}

function draw () {
	if (Mode == 1 || Mode == 4) {
		gameUpdate ();
	}

	if (mode == 5) {
		var v;
		v = volume.value ();
		masterVolume (v / 100);
		localStorage.setItem("platformerCreator-volume", v);
		// text
		camera.off ();
		background ("black");
		fill ("#eee");
		textSize (50);
		textAlign (CENTER);
		text ("Settings", width / 2, 90);
		textSize (30);
		textAlign (LEFT);
		text ("volume: " + v, 50, 180);
	}

	if (game.thumbnail != 0) {
		camera.off ();
		background ("black");
		imageMode (CENTER);
		image (thumbnailImg, width / 2 + (mouseX - width / 2) / 25, width / 2 + (mouseY - width / 2) / 25 - 15, 700, 600);
		imageMode (CORNER);
		fill ("#151515");
		if (game.thumbnail == 1) {
			// menu
			textSize (50);
			textAlign (CENTER);
			text ("Platformer creator", width / 2, 110);
			textSize (30);
			textAlign (LEFT);
			text ("Beta 1.1.1", 15, 480);
		} else if (game.thumbnail == 2) {
			// game name
			textSize (35);
			textAlign (CENTER);
			text ("name:", width / 2, 170);
			text ("or", width / 2, 320);
			textSize (50);
			text ("Platformer creator", width / 2, 110);
		} else if (game.thumbnail == 3) {
			// settings
			textSize (50);
			textAlign (CENTER);
			text ("Settings", width / 2, 90);
			textSize (30);
			textAlign (LEFT);
			text ("volume: " + v, 50, 180);
		} else if (game.thumbnail == 4) {
			// play game
			textSize (50);
			textAlign (CENTER);
			text ("Enter code", width / 2, 110);
			textSize (35);
			text ("Press ctrl+v to enter the code", width / 2, 200);
		} else if (game.thumbnail == 5) {
			// invalid code
			fill ("#a00909");
			textSize (50);
			textAlign (CENTER);
			text ("Invalid code!", width / 2, 110);
			fill ("#151515");
			textSize (35);
			text ("Press ctrl+v to enter the code", width / 2, 200);
		}
	}
}

function gameUpdate () {
	camera.off ();
	// play mode
	if (mode == 1 || mode == 3) {
		if (player.death == 0) {
			time += 0.02;
			// y position
			if (player.overlap (ladders)) {
				if (player.velocityY > 0) {
					player.velocityY -= 0.5;
				}

				if (player.velocityY < 0) {
					player.velocityY += 0.5;
				}
			} else {
				if (player.overlap (water)) {
					if (player.velocityY < 4) {
						player.velocityY += 0.1;
					} else {
						player.velocityY = 4;
					}
				} else if (player.velocityY < 20) {
					player.velocityY ++;
					if (player.velocityY < 1 && player.velocityY > -1) {
						player.velocityY = 0;
					}
				}
			}

			// x position
			player.position.y ++;
			if (keyIsDown (RIGHT_ARROW) || keyIsDown (KEY.D)) {
				if (player.overlap (water)) {
					if (player.velocityX < 4) {
						player.velocityX += 1;
					}
				} else if (player.overlap (snow) && player.anim != 5) {
					if (player.velocityX < 4) {
						player.velocityX += 1;
					}
				} else if (player.overlap (ice) && player.anim != 5) {
					if (player.velocityX < 10) {
						player.velocityX += 2;
					}
				} else if (player.velocityX < 8 && player.anim != 5) {
					player.velocityX += 2;
				}

				// anim
				if (player.anim != 2 && player.anim != 4 && player.anim != 5) {
					player.changeAnimation ("walk");
					player.anim = 2;
					player.mirrorX (1);
				}
			}

			if (keyIsDown (LEFT_ARROW) || keyIsDown (KEY.A)) {
				if (player.overlap (water)) {
					if (player.velocityX > -4) {
						player.velocityX += -1;
					}
				} else if (player.overlap (snow) && player.anim != 5) {
					if (player.velocityX > -4) {
						player.velocityX += -1;
					}
				} else if (player.overlap (ice) && player.anim != 5) {
					if (player.velocityX > -10) {
						player.velocityX += -2;
					}
				} else if (player.velocityX > -8 && player.anim != 5) {
					player.velocityX += -2;
				}

				// anim
				if (player.anim != 3 && player.anim != 4 && player.anim != 5) {
					player.changeAnimation ("walk");
					player.anim = 3;
					player.mirrorX (-1);
				}
			}
			
			// player don't move
			if (player.velocityX == 0 && player.anim != 1 && player.anim != 4 && player.anim != 5) {
				player.changeAnimation ("front");
				player.anim = 1;
			}

			if (player.velocityY == -2 && player.anim != 5) {
				player.changeAnimation ("front");
				player.anim = 1;
			}

			// player x friction
			if (player.overlap (ice)) {
				if (player.velocityX > 0) {
					player.velocityX -= 0.1;
				}

				if (player.velocityX < 0) {
					player.velocityX += 0.1;
				}

				if (player.velocityX < 0.11 && player.velocityX > -0.11) {
					player.velocityX = 0;
				}
			} else {
				if (player.velocityX > 0) {
					player.velocityX -= 0.5;
				}

				if (player.velocityX < 0) {
					player.velocityX += 0.5;
				}

				if (player.velocityX < 0.41 && player.velocityX > -0.41) {
					player.velocityX = 0;
				}
			}

			player.position.y --;
			player.position.x += player.velocityX;
			// walls collide
			if (player.collide (walls) || player.collide (stomps)) {
				if (player.velocityX > 0) {
					for (var i = player.velocityX + 1; i >= 0; i--) {
						if (player.collide (walls) || player.collide (stomps)) {
							player.position.x --;
						} else {
							i = 0;
						}
					}
				} else {
					for (var i = -player.velocityX + 1; i >= 0; i--) {
						if (player.collide (walls) || player.collide (stomps)) {
							player.position.x ++;
						} else {
							i = 0;
						}
					}
				}

				player.velocityX = 0;
			}

			// y position
			player.position.y += player.velocityY;
			player.overlap (fallingBlocks, goDown);
			if (player.collide (walls) || player.collide (stomps)) {
				if (player.velocityY > 0) {
					for (var i = player.velocityY + 1; i >= 0; i--) {
						if (player.collide (walls) || player.collide (stomps)) {
							player.position.y --;
						} else {
							i = 0;
						}
					}

					player.jumping = 10;
				} else {
					for (var i = -player.velocityY + 1; i >= 0; i--) {
						if (player.collide (walls) || player.collide (stomps)) {
							player.position.y ++;
						} else {
							i = 0;
						}
					}
				}

				player.velocityY = 0;
				if (player.anim == 4) {
					player.anim = 1;
					player.changeAnimation ("front");
				}
			}

			player.position.y ++;
			if (player.overlap (snow)) {
				player.jumping = 0;
			}

			player.position.y --;
			if (player.overlap (ladders)) {
				// ladder
				player.jumping = 0;
				if (keyIsDown (UP_ARROW) && player.velocityY > -4 || keyIsDown (KEY.W) && player.velocityY > -4) {
					player.velocityY -= 2;
				}

				if (keyIsDown (DOWN_ARROW) && player.velocityY < 4 || keyIsDown (KEY.S) && player.velocityY < 4) {
					player.velocityY += 2;
				}
			} else if (keyIsDown (UP_ARROW) && player.velocityY > -5 && player.overlap (water) || keyIsDown (KEY.W) && player.velocityY > -5 && player.overlap (water)) {
				// water
				player.jumping = 0;
				player.velocityY -= 0.5;
			} else {
				if (keyIsDown (UP_ARROW) && player.jumping > 0 && player.anim != 5 || keyIsDown (KEY.W) && player.jumping > 0 && player.anim != 5) {
					if (player.jumping > 4) {
						player.jumping = 5;
						player.velocityY = -9;
					} else {
						player.velocityY -= 3;
					}
					
					// anim
					player.changeAnimation ("jump");
					player.anim = 4;
				}
			}

			player.jumping --;
			// crouch
			if (keyIsDown (DOWN_ARROW) && player.anim != 5 && player.overlap (ladders) == false || keyIsDown (KEY.S) && player.anim != 5 && player.overlap (ladders) == false) {
				player.anim = 5;
				player.scale = 0.7;
				player.changeAnimation ("crouch");
				player.setDefaultCollider ();
			}
			
			if (keyIsDown (KEY.S) || keyIsDown (DOWN_ARROW)) {} else if (player.anim == 5) {
				player.anim = 1;
				player.scale = 0.72;
				player.changeAnimation ("front");
				player.setCollider ("rectangle", 0, 0, 65, 91);
			}

			// trampoline
			if (player.collide (trampolines)) {
				player.velocityY = -25;
				player.jumping = 0;
			}

			// lose
			if (player.position.y > 2000 || player.overlap (lava) || player.overlap (spikes) || player.overlap (halfSaws) || player.overlap (saws) || player.overlap (movingSaws) || player.overlap (fireBalls)) {
				loseSnd.play ();
				deaths ++;
				player.death = 50;
				player.visible = false;
			}

			// checkpoint
			player.overlap (checkPoints, newCheckPoint);
		}
		
		// stomps
		stomps.overlap (walls, stompsCollide);
		stomps.overlap (stoppers, stompsCollide);
		// saws rotation
		for (var i = saws.length - 1; i >= 0; i--) {
			var s = saws[i];
			if (s.rotation < 360) {
				s.rotation += 5;
			} else {
				s.rotation = 5;
			}
		}

		for (var i = halfSaws.length - 1; i >= 0; i--) {
			var s = halfSaws[i];
			if (s.rotation < 360) {
				s.rotation += 5;
			} else {
				s.rotation = 5;
			}
		}

		// moving saws
		for (var i = movingSaws.length - 1; i >= 0; i--) {
			var s = movingSaws[i];
			if (s.rotation < 360) {
				s.rotation += 5;
			} else {
				s.rotation = 5;
			}

			if (s.i == 1) {
				if (s.r == 0) {
					s.position.y -= 25;
				} else if (s.r == 1) {
					s.position.x += 25;
				} else if (s.r == 2) {
					s.position.y += 25;
				} else if (s.r == 3) {
					s.position.x -= 25;
				}

				s.overlap (walls, changeDirection);
				s.overlap (stoppers, changeDirection);

				if (s.r == 0) {
					s.position.y += 25;
				} else if (s.r == 1) {
					s.position.x -= 25;
				} else if (s.r == 2) {
					s.position.y -= 25;
				} else if (s.r == 3) {
					s.position.x += 25;
				}
			} else {
				s.overlap (walls, changeDirection);
				s.overlap (stoppers, changeDirection);
			}
		}

		// fire balls rotate
		for (var i = fireBalls.length - 1; i >= 0; i--) {
			var f = fireBalls[i];
			if (f.rotation < 360) {
				f.rotation += 5;
			} else {
				f.rotation = 5;
			}

			if (f.i == 1) {
				if (f.r < 360) {
					f.r += 2;
				} else {
					f.r = 2;
				}

				f.setSpeed (1.745329 * f.l, f.r);
			} else {
				if (f.r > 0) {
					f.r -= 2;
				} else {
					f.r = 358;
				}

				f.setSpeed (1.745329 * f.l, f.r);
			}
		}

		// rotating saws
		for (var i = rotatingTypes.length - 1; i >= 0; i--) {
			var r = rotatingTypes[i];
			if (r.i == 1) {
				if (r.s != 1) {
					if (r.rotation < 360) {
						r.rotation += 2;
					} else {
						r.rotation = 2;
					}
				}

				if (r.r < 360) {
					r.r += 2;
				} else {
					r.r = 2;
				}

				r.setSpeed (1.745329 * r.l, r.r);
			} else {
				if (r.s != 1) {
					if (r.rotation > 0) {
						r.rotation -= 2;
					} else {
						r.rotation = 358;
					}
				}

				if (r.r > 0) {
					r.r -= 2;
				} else {
					r.r = 358;
				}

				r.setSpeed (1.745329 * r.l, r.r);
			}
		}

		// pulling spikes
		for (var i = pullingSpikes.length - 1; i >= 0; i--) {
			var p = pullingSpikes[i];
			if (p.i == 2) {
				p.t ++;
				if (p.t == 100) {
					p.setSpeed (2.5, p.rotation - 90);
				}

				if (p.t == 110) {
					p.setSpeed (0, 0);
				}

				if (p.t == 160) {
					p.setSpeed (1, p.rotation + 90);
				}

				if (p.t == 185) {
					p.setSpeed (0, 0);
					p.t = 0;
				}
			}
		}

		// stomps
		for (var i = stomps.length - 1; i >= 0; i--) {
			var t = stomps[i];
			if (t.timeOut == 1) {
				t.velocity.y = -t.vy * 3;
				t.velocity.x = -t.vx * 3;
				t.timeOut = 0;
			} else if (t.timeOut > 1) {
				t.timeOut --;
			}
		}

		// stomps spikes
		for (var i = stompSpikes.length - 1; i >= 0; i--) {
			var s = stompSpikes[i];
			if (s.timeOut == 1) {
				s.velocity.y = -s.vy * 3;
				s.velocity.x = -s.vx * 3;
				s.timeOut = 0;
			} else if (s.timeOut > 1) {
				s.timeOut --;
			}
		}

		// slimes
		player.overlap (slimes, slimeCollide);
		for (let i = 0; i < slimes.length; i++) {
			var s = slimes[i];
			if (s.anim != 2) {
				// position y
				s.velocityY ++;
				s.position.y += s.velocityY;
				for (let i = s.velocityY + 1; i > 0; i--) {
					if (s.overlap (walls) || s.overlap (stoppers)) {
						s.position.y --;
						s.velocityY = 0;
					}
				}

				// position x
				if (s.overlap (walls) || s.overlap (stoppers)) {
					if (s.velocity.x > 0) {
						s.velocity.x = -2;
						s.mirrorX (1);
					} else {
						s.velocity.x = 2;
						s.mirrorX (-1);
					}	
				}
			}	
		}
	}

	// creator mode
	if (mode == 2) {
		if (player.anim != 1) {
			player.changeAnimation ("front");
			player.anim = 1;
		}

		if (keyIsDown (RIGHT_ARROW) || keyIsDown (KEY.D)) {
			player.velocity.x = 17;
		}

		if (keyIsDown (LEFT_ARROW) || keyIsDown (KEY.A)) {
			player.velocity.x = -17;
		}

		if (keyIsDown (UP_ARROW) || keyIsDown (KEY.W)) {
			player.velocity.y = -17;
		}

		if (keyIsDown (DOWN_ARROW) || keyIsDown (KEY.S)) {
			player.velocity.y = 17;
		}

		// rotate
		if (keyWentUp (KEY.R)) {
			if (rotation == 3) {
				rotation = 0;
			} else {
				rotation ++;
			}
		}

		// length
		if (keyWentUp (KEY.L)) {
			if (length == 8) {
				length = 1;
			} else {
				length ++;
			}
		}
	}

	// draw
	background ("#4db6e1");
	camera.on ();
	drawSprites ();
	// chains
	for (let i = stomps.length - 1; i >= 0; i--) {
		var s = stomps[i];
		imageMode (CENTER);
		translate (s.position.x, s.position.y);
		rotate(PI / 2 * s.r);
		if (mode == 2) {
			rotate(PI / 180 * 180);
			image (spikeImg, 0, -50, 50, 50);
			rotate(PI / 180 * -180);
		}
		
		image (chainImg, 0, -50, 50, 50);
		image (chainImg, 0, -100, 50, 50);
		image (chainImg, 0, -150, 50, 50);
		rotate(PI / 2 * -s.r);
		translate (-s.position.x, -s.position.y);
	}
	
	drawGroup (decorations);
	drawGroup (checkPoints);
	drawGroup (spikes);
	drawGroup (saws);
	drawGroup (stompSpikes);
	drawGroup (stomps);
	drawGroup (halfSaws);
	drawGroup (movingSaws);
	drawGroup (walls);
	drawSprite (checkPoint);
	drawSprite (start);
	drawSprite (exit);
	drawGroup (rotatingTypes);
	drawGroup (slimes);
	drawGroup (fireBalls);
	drawGroup (rSaws);
	// draw
	if (mode == 2) {
		fill ("red");
		rect (-1000000, 2000, 2000000, 5);
		imageMode (CENTER);
		// stopper
		for (var i = stoppers.length - 1; i >= 0; i--) {
			var s = stoppers[i];
			if (s.i == 1) {
				image (stopperImg, s.position.x, s.position.y, 50, 50);
			} else {
				translate (s.position.x, s.position.y);
				rotate(PI / 180 * s.rotation);
				image (halfStopperImg, 0, 0, 50, 50);
				rotate(PI / 180 * -s.rotation);
				translate (-s.position.x, -s.position.y);
			}	
		}
		// fire bar
		for (var l = fireBars.length - 1; l >= 0; l--) {
			var f = fireBars[l];
			translate (f.position.x, f.position.y);
			rotate (PI / 180 * f.rotation);
			image (fireBallImg, 0, 0, 50, 50);
			image (fireBallImg, 0, 25, 50, 50);
			for (var i = 1; i <= f.l; i += 0.5) {
				image (fireBallImg, 0, i * 50, 50, 50);
			}

			rotate(PI / 180 * -f.rotation);
			translate (-f.position.x, -f.position.y);
		}
		// fire bar
		for (var l = rotatingSaws.length - 1; l >= 0; l--) {
			var r = rotatingSaws[l];
			translate (r.position.x, r.position.y);
			rotate (PI / 180 * r.rotation);
			rotate (PI / 180 * 90);
			image (tapeEndImg, 0, 0, 50, 50);
			rotate (PI / 180 * -90);
			for (var i = 1; i < r.l; i ++) {
				translate (0, i * 50);
				rotate (PI / 180 * 90);
				image (darkTapeImg, 0, 0, 50, 50);
				rotate (PI / 180 * -90);
				translate (0, i * -50);
			}
			translate (0, r.l * 50);
			rotate (PI / 180 * -90);
			image (tapeEndImg, 0, 0, 50, 50);
			image (sawImg, 0, 0, 50, 50);
			rotate (PI / 180 * 90);
			translate (0, r.l * -50);
			rotate (PI / 180 * -r.rotation);
			translate (-r.position.x, -r.position.y);
		}
	}

	// death
	if (player.death > 0) {
		if (player.death == 1) {
			player.position.x = checkPoint.position.x;
			player.position.y = checkPoint.position.y;
			reset ();
			player.death = 0;
			player.visible = true;
			if (player.anim != 1) {
				player.changeAnimation ("front");
				player.anim = 1;
			}
		} else {
			imageMode (CENTER);
			tint (255, player.death * 5);
			image (playerHurtImg, player.position.x, player.position.y, 46.8 * ((50 - player.death) / 30 + 1), 65.5 * ((50 - player.death) / 30 + 1));
			tint (255, 255);
			imageMode (CORNER);
			player.death --;
		}
	}

	drawSprite (player);
	camera.position = player.position;
	camera.off ();
	if (mode == 1 || mode == 3) {
		// draw time
		fill ("#151515");
		textSize (35);
		textAlign (LEFT);
		text ("time: " + round (time * 10) / 10, 15, 35);
	}

	if (mode == 1) {
		// draw
		fill ("#242424");
		noStroke ();
		rect (390, 440, width, 60);
		fill ("#eee");
	}

	if (mode == 2) {
		showImage (block);
		// draw
		fill ("#242424");
		noStroke ();
		rect (0, 440, width, 60);
		fill ("#eee");
		textAlign (LEFT);
		textSize (35);
		mouseC.position.x = round ((mouseX + player.position.x - width / 2) / 50) * 50;
		mouseC.position.y = round ((mouseY + player.position.y - height / 2) / 50) * 50;
		// image blocks
		if (block == 1) {
			// metal
			image (metalImg, 60, 445, 50, 50);
			text ("metal", 180, 483);
		}

		if (block == 2) {
			// eraser
			image (eraserImg, 60, 445, 50, 50);
			text ("eraser", 180, 483);
		}

		if (block == 3) {
			// lava
			image (lavaImg, 60, 445, 50, 50);
			text ("lava", 180, 483);
		}

		if (block == 4) {
			// check point
			image (blueFlagImg, 60, 445, 50, 50);
			text ("check point", 180, 483);
		}

		if (block == 5) {
			// falling block
			image (fallingBlockImg, 60, 445, 50, 50);
			text ("falling block", 180, 483);
		}

		if (block == 6) {
			// trampoline
			image (trampolineImg, 60, 445, 50, 50);
			text ("trampoline", 180, 483);
		}

		if (block == 7) {
			// ladder
			image (ladderImg, 60, 445, 50, 50);
			text ("ladder", 180, 483);
		}

		if (block == 8) {
			// ice
			image (iceImg, 60, 445, 50, 50);
			text ("ice", 180, 483);
		}

		if (block == 9) {
			// water
			image (waterImg, 60, 445, 50, 50);
			text ("water", 180, 483);
		}

		if (block == 10) {
			// grass
			image (grassImg, 60, 445, 50, 50);
			text ("grass", 180, 483);
		}

		if (block == 11) {
			// dirt
			image (dirtImg, 60, 445, 50, 50);
			text ("dirt", 180, 483);
		}

		if (block == 12) {
			// snow
			image (snowImg, 60, 445, 50, 50);
			text ("snow", 180, 483);
		}

		if (block == 13) {
			// stone
			image (stoneImg, 60, 445, 50, 50);
			text ("stone", 180, 483);
		}

		if (block == 14) {
			// snow tundra
			image (snowTundraImg, 60, 445, 50, 50);
			text ("snow tundra", 180, 483);
		}

		if (block == 15) {
			// tundra
			image (tundraImg, 60, 445, 50, 50);
			text ("tundra", 180, 483);
		}

		if (block == 16) {
			// sign exit
			image (signExitImg, 60, 445, 50, 50);
			text ("sign exit", 180, 483);
		}

		if (block == 17) {
			// sign right
			image (signRightImg, 60, 445, 50, 50);
			text ("sign right", 180, 483);
		}

		if (block == 18) {
			// sign left
			image (signLeftImg, 60, 445, 50, 50);
			text ("sign left", 180, 483);
		}

		if (block == 19) {
			// bush
			image (bushImg, 60, 445, 50, 50);
			text ("bush", 180, 483);
		}

		if (block == 20) {
			// plant
			image (plantImg, 60, 445, 50, 50);
			text ("plant", 180, 483);
		}

		if (block == 21) {
			// rock
			image (rockImg, 60, 445, 50, 50);
			text ("rock", 180, 483);
		}

		if (block == 22) {
			// start
			image (yellowFlagImg, 60, 445, 50, 50);
			text ("start", 180, 483);
		}

		if (block == 23) {
			// exit
			image (doorImg, 70, 445, 31.82, 50);
			text ("exit", 180, 483);
		}

		if (block == 24) {
			// spike
			image (spikeImg, 60, 445, 50, 50);
			text ("spike", 180, 483);
		}

		if (block == 25) {
			// spike
			image (twoSpikesImg, 60, 445, 50, 50);
			text ("two spikes", 180, 483);
		}

		if (block == 26) {
			// right spike
			image (smallSpikeImg, 85, 470, 25, 25);
			text ("right spike", 180, 483);
		}

		if (block == 27) {
			// left spike
			image (smallSpikeImg, 60, 470, 25, 25);
			text ("left spike", 180, 483);
		}

		if (block == 28) {
			// half metal
			image (halfMetalImg, 60, 465, 50, 50);
			text ("half metal", 180, 483);
		}

		if (block == 29) {
			// metal + spike
			image (halfMetalImg, 60, 467, 50, 50);
			image (spikeImg, 60, 417, 50, 50);
			text ("metal+spike", 180, 483);
		}

		if (block == 30) {
			// metal + spike
			image (halfMetalImg, 60, 467, 50, 50);
			image (twoSpikesImg, 60, 417, 50, 50);
			text ("metal+spike", 180, 483);
		}

		if (block == 31) {
			// half saw
			image (halfSawImg, 60, 445, 50, 50);
			text ("half saw", 180, 483);
		}

		if (block == 32) {
			// saw
			image (sawImg, 60, 445, 50, 50);
			text ("saw", 180, 483);
		}

		if (block == 33) {
			// stopper
			image (stopperImg, 60, 445, 50, 50);
			text ("stopper", 180, 483);
		}

		if (block == 34) {
			// moving half saw
			image (movingHalfSawImg, 60, 445, 50, 50);
			text ("moving saw", 180, 483);
		}

		if (block == 35) {
			// moving saw
			image (movingSawImg, 60, 445, 50, 50);
			text ("moving saw", 180, 483);
		}

		if (block == 36) {
			// dark tape
			image (darkTapeImg, 60, 445, 50, 50);
			text ("dark tape", 180, 483);
		}

		if (block == 37) {
			// light tape
			image (lightTapeImg, 60, 445, 50, 50);
			text ("light tape", 180, 483);
		}

		if (block == 38) {
			// right fire bar
			image (fireBallImg, 45, 430, 50, 50);
			image (fireBallImg, 60, 445, 50, 50);
			image (fireBallImg, 75, 460, 50, 50);
			text ("fire bar", 180, 483);
		}

		if (block == 39) {
			// left fire bar
			image (fireBallImg, 45, 430, 50, 50);
			image (fireBallImg, 60, 445, 50, 50);
			image (fireBallImg, 75, 460, 50, 50);
			text ("fire bar", 180, 483);
		}

		if (block == 40) {
			// right rotating saw
			image (fireBarRImg, 60, 445, 50, 50);
			text ("rotating saw", 180, 483);
		}

		if (block == 41) {
			// left rotating saw
			image (fireBarLImg, 60, 445, 50, 50);
			text ("rotating saw", 180, 483);
		}

		if (block == 42) {
			// pulling spikes
			image (pullingSpikesImg, 60, 445, 50, 50);
			text ("pulling spikes", 180, 483);
		}

		if (block == 43) {
			// stomp
			image (metalImg, 65, 445, 40, 40);
			imageMode (CENTER);
			translate (85, 505);
			rotate(PI / 180 * 180);
			image (spikeImg, 0, 0, 40, 40);
			rotate(PI / 180 * -180);
			translate (-80, -505);
			imageMode (CORNER);
			text ("stomp", 180, 483);
		}

		if (block == 44) {
			// half stopper
			image (halfStopperImg, 60, 445, 50, 50);
			text ("half stopper", 180, 483);
		}

		if (block == 45) {
			// lava top
			image (lavaTopImg, 60, 445, 50, 50);
			text ("lava top", 180, 483);
		}

		if (block == 46) {
			// water top
			image (waterTopImg, 60, 445, 50, 50);
			text ("water top", 180, 483);
		}

		if (block == 47) {
			// slime
			image (slimeImg, 60, 465, 50, 28);
			text ("slime", 180, 483);
		}

		/*if (block == 25) {
			// snow spike
			image (snowSpikeImg, 60, 445, 50, 50);
			text ("snow spike", 180, 483);
			tintImage (25);
		}

		if (block == 26) {
			// little spike
			image (littleSpikeImg, 60, 445, 50, 50);
			text ("little spike", 180, 483);
			tintImage (26);
		}

		if (block == 27) {
			// big spike
			image (bigSpikeImg, 60, 445, 50, 50);
			text ("big spike", 180, 483);
			tintImage (27);
		}*/
	}

	if (mouseIsPressed && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < 440 && mode == 2 && Mode == 1 && mouseC.overlap (exit) == false && mouseC.overlap (start) == false && game.build == 1) {
		saveGame.show ();
		createBlock (mouseC.position.x, mouseC.position.y, 1);
	}

	// next level
	if (player.overlap (exit) && mode == 3) {
		winSnd.play ();
		if (Mode == 4) {
			Mode = 2;
			mode = 6;
			if (level == maxLevel && game.code != 1) {
				// draw
				background ("black");
				fill ("#eee");
				textSize (75);
				textAlign (CENTER);
				text ("You won!", width / 2, 110);
				textSize (35);
				text ("time: " + round (time * 100) / 100, width / 2, 210);
				text ("deaths: " + deaths, width / 2, 270);
				// buttons
				menu.show ();
				menu.position (150, 350);
				menu.size (300, 50);
			} else {
				// draw
				background ("black");
				fill ("#eee");
				textSize (50);
				textAlign (CENTER);
				text ("Level completed!", width / 2, 110);
				textSize (35);
				text ("time: " + round (time * 100) / 100, width / 2, 210);
				text ("deaths: " + deaths, width / 2, 270);
				// buttons
				menu.show ();
				menu.size (180, 50);
				restart.show ();
				restart.size (180, 50);
				if (game.code == 1) {
					menu.position (110, 350);
					restart.position (310, 350);
				} else {
					menu.position (15, 350);
					restart.position (210, 350);
					nextLevel.show ();
					nextLevel.position (405, 350);
					nextLevel.size (180, 50);
				}
			}
		} else {
			EditLevel ();
		}
	}

	if (game.build < 1) {
		game.build ++;
	}

	camera.on ();
}

function createBlock (x, y, l) {
	if (block != 2 && block != 22 && block != 23 && l == 1) {
		deleteOld ();
		append(positionX, x / 50);
		append(positionY, y / 50);
		append(Block, block);
		append(Rotation, rotation);
	}

	// create wall
	if (block == 1) {
		createWall (x, y, 1);
	}
	// eraser
	if (block == 2) {
		deleteOld ();
	}
	// lava
	if (block == 3) {
		createLava (x, y, 1);
	}
	// check point
	if (block == 4) {
		createCheckPoint (x, y);
	}
	// falling block
	if (block == 5) {
		createWall (x, y, 2);
	}
	// trampoline
	if (block == 6) {
		createTrampoline (x, y);
	}
	// ladder
	if (block == 7) {
		createLadder (x, y);
	}
	// ice
	if (block == 8) {
		createIce (x, y);
	}
	// water
	if (block == 9) {
		createWater (x, y, 1);
	}
	// grass
	if (block == 10) {
		createWall (x, y, 3);
	}
	// dirt
	if (block == 11) {
		createWall (x, y, 4);
	}
	// snow
	if (block == 12) {
		createWall (x, y, 5);
	}
	// stone
	if (block == 13) {
		createWall (x, y, 6);
	}
	// snow tundra
	if (block == 14) {
		createWall (x, y, 7);
	}
	// tundra
	if (block == 15) {
		createWall (x, y, 8);
	}
	// sign exit
	if (block == 16) {
		createDecoration (x, y, 1);
	}
	// sign right
	if (block == 17) {
		createDecoration (x, y, 2);
	}
	// sign left
	if (block == 18) {
		createDecoration (x, y, 3);
	}
	// bush
	if (block == 19) {
		createDecoration (x, y, 4);
	}
	// plant
	if (block == 20) {
		createDecoration (x, y, 5);
	}
	// rock
	if (block == 21) {
		createDecoration (x, y, 6);
	}
	// start
	if (block == 22) {
		changePosition (x, y, 1);
	}
	// exit
	if (block == 23) {
		changePosition (x, y, 2);
	}
	// spike
	if (block == 24) {
		createSpike (x, y, 1);
	}
	// two spikes
	if (block == 25) {
		createSpike (x, y, 2);
	}
	// right spike
	if (block == 26) {
		createSpike (x, y, 3);
	}
	// left spike
	if (block == 27) {
		createSpike (x, y, 4);
	}
	// half metal
	if (block == 28) {
		createWall (x, y, 9);
	}
	// metal + spike
	if (block == 29) {
		createWallSpike (x, y, 1);
	}
	// metal + spike
	if (block == 30) {
		createWallSpike (x, y, 2);
	}
	// half saw
	if (block == 31) {
		createHalfSaw (x, y);
	}
	// saw
	if (block == 32) {
		createSaw (x, y);
	}
	// stopper
	if (block == 33) {
		createStopper (x, y, 1);
	}
	// moving half saw
	if (block == 34) {
		createMovingSaw (x, y, 1);
	}
	// moving saw
	if (block == 35) {
		createMovingSaw (x, y, 2);
	}
	// dark tape
	if (block == 36) {
		createDecoration (x, y, 7);
	}
	// light tape
	if (block == 37) {
		createDecoration (x, y, 8);
	}
	// right fire bar
	if (block == 38) {
		createFireBar (x, y, 1, l);
	}
	// left fire bar
	if (block == 39) {
		createFireBar (x, y, 2, l);
	}
	// right rotating saw
	if (block == 40) {
		createRotatingSaw (x, y, 1, l);
	}
	// left rotating saw
	if (block == 41) {
		createRotatingSaw (x, y, 2, l);
	}
	// pulling spikes
	if (block == 42) {
		createPullingSpikes (x, y);
	}
	// stomp
	if (block == 43) {
		createStomp (x, y);
	}
	// half stopper
	if (block == 44) {
		createStopper (x, y, 2);
	}
	// lava top
	if (block == 45) {
		createLava (x, y, 2);
	}
	// water top
	if (block == 46) {
		createWater (x, y, 2);
	}
	// slime
	if (block == 47) {
		createSlime (x, y);
	}
	// snow spike
	/*if (block == 25) {
		createSpike (x, y, 2);
	}
	// little spike
	if (block == 26) {
		createSpike (x, y, 3);
	}
	// big spike
	if (block == 27) {
		createSpike (x, y, 4);
	}*/
}

function showImage (b) {
	if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < 440 && mode == 2) {
		camera.on ();
		rotate(0);
		imageMode (CENTER);
		translate (mouseC.position.x, mouseC.position.y);
		// metal
		if (b == 1) {
			image (metalImg, 0, 0, 50, 50);
		}
		// eraser
		if (b == 2) {
			image (eraserImg, 0, 0, 50, 50);
		}
		// lava
		if (b == 3) {
			image (lavaImg, 0, 0, 50, 50);
		}

		rotate(PI / 180 * rotation * 90);
		// check point
		if (b == 4) {
			image (blueFlagImg, 0, 0, 50, 50);
		}

		rotate(PI / 180 * rotation * -90);
		// falling block
		if (b == 5) {
			image (fallingBlockImg, 0, 0, 50, 50);
		}
		// trampoline
		if (b == 6) {
			image (trampolineImg, 0, 0, 50, 50);
		}
		// ladder
		if (b == 7) {
			image (ladderImg, 0, 0, 50, 50);
		}
		// ice
		if (b == 8) {
			image (iceImg, 0, 0, 50, 50);
		}
		// water
		if (b == 9) {
			image (waterImg, 0, 0, 50, 50);
		}
		// grass
		if (b == 10) {
			image (grassImg, 0, 0, 50, 50);
		}
		// dirt
		if (b == 11) {
			image (dirtImg, 0, 0, 50, 50);
		}
		// snow
		if (b == 12) {
			image (snowImg, 0, 0, 50, 50);
		}
		// stone
		if (b == 13) {
			image (stoneImg, 0, 0, 50, 50);
		}
		// snow tundra
		if (b == 14) {
			image (snowTundraImg, 0, 0, 50, 50);
		}
		// tundra
		if (b == 15) {
			image (tundraImg, 0, 0, 50, 50);
		}
		// sign exit
		if (b == 16) {
			image (signExitImg, 0, 0, 50, 50);
		}

		rotate(PI / 180 * rotation * 90);
		// sign right
		if (b == 17) {
			image (signRightImg, 0, 0, 50, 50);
		}
		// sign left
		if (b == 18) {
			image (signLeftImg, 0, 0, 50, 50);
		}

		rotate(PI / 180 * rotation * -90);
		// bush
		if (b == 19) {
			image (bushImg, 0, 0, 50, 50);
		}
		// plant
		if (b == 20) {
			image (plantImg, 0, 0, 50, 50);
		}
		// rock
		if (b == 21) {
			image (rockImg, 0, 0, 50, 50);
		}
		// start
		if (b == 22) {
			image (yellowFlagImg, 0, 0, 50, 50);
		}
		// exit
		if (b == 23) {
			image (doorImg, 0, -13.572, 50, 78.57);
		}

		rotate(PI / 180 * rotation * 90);
		// spike
		if (b == 24) {
			image (spikeImg, 0, 0, 50, 50);
		}
		// two spikes
		if (b == 25) {
			image (twoSpikesImg, 0, 0, 50, 50);
		}
		// right spike
		if (b == 26) {
			image (smallSpikeImg, 12.5, 12.5, 25, 25);
		}
		// left spike
		if (b == 27) {
			image (smallSpikeImg, -12.5, 12.5, 25, 25);
		}
		// half metal
		if (b == 28) {
			image (halfMetalImg, 0, 0, 50, 50);
		}
		// metal + spike
		if (b == 29) {
			image (halfMetalImg, 0, 23, 50, 50);
			image (spikeImg, 0, -27, 50, 50);
		}
		// metal + spike
		if (b == 30) {
			image (halfMetalImg, 0, 23, 50, 50);
			image (twoSpikesImg, 0, -27, 50, 50);
		}
		// half saw
		if (b == 31) {
			image (halfSawImg, 0, 0, 50, 50);
		}

		rotate(PI / 180 * rotation * -90);
		// saw
		if (b == 32) {
			image (sawImg, 0, 0, 50, 50);
		}
		// stopper
		if (b == 33) {
			image (stopperImg, 0, 0, 50, 50);
		}

		rotate(PI / 180 * rotation * 90);
		// moving half saw
		if (b == 34) {
			image (movingHalfSawImg, 0, 0, 50, 50);
		}
		// moving saw
		if (b == 35) {
			image (movingSawImg, 0, 0, 50, 50);
		}
		// dark tape
		if (b == 36) {
			image (darkTapeImg, 0, 0, 50, 50);
		}
		// light tape
		if (b == 37) {
			image (lightTapeImg, 0, 0, 50, 50);
		}
		// right fire bar
		if (b == 38) {
			image (fireBarRImg, 0, 0, 50, 50);
			image (fireBallImg, 0, 0, 50, 50);
			image (fireBallImg, 0, 25, 50, 50);
			for (var i = 1; i <= length; i += 0.5) {
				image (fireBallImg, 0, i * 50, 50, 50);
			}
		}
		// left rotating saw
		if (b == 39) {
			image (fireBarLImg, 0, 0, 50, 50);
			image (fireBallImg, 0, 0, 50, 50);
			image (fireBallImg, 0, 25, 50, 50);
			for (var i = 1; i <= length; i += 0.5) {
				image (fireBallImg, 0, i * 50, 50, 50);
			}
		}
		// right rotating saw
		if (b == 40) {
			image (fireBarRImg, 0, 0, 50, 50);
			rotate (PI / 180 * 90);
			image (tapeEndImg, 0, 0, 50, 50);
			rotate (PI / 180 * -90);
			for (var i = 1; i < length; i ++) {
				translate (0, i * 50);
				rotate (PI / 180 * 90);
				image (darkTapeImg, 0, 0, 50, 50);
				rotate (PI / 180 * -90);
				translate (0, i * -50);
			}
			translate (0, length * 50);
			rotate (PI / 180 * -90);
			image (tapeEndImg, 0, 0, 50, 50);
			image (sawImg, 0, 0, 50, 50);
			rotate (PI / 180 * 90);
			translate (0, length * -50);
		}
		// left fire bar
		if (b == 41) {
			image (fireBarLImg, 0, 0, 50, 50);
			rotate (PI / 180 * 90);
			image (tapeEndImg, 0, 0, 50, 50);
			rotate (PI / 180 * -90);
			for (var i = 1; i < length; i ++) {
				translate (0, i * 50);
				rotate (PI / 180 * 90);
				image (darkTapeImg, 0, 0, 50, 50);
				rotate (PI / 180 * -90);
				translate (0, i * -50);
			}
			translate (0, length * 50);
			rotate (PI / 180 * -90);
			image (tapeEndImg, 0, 0, 50, 50);
			image (sawImg, 0, 0, 50, 50);
			rotate (PI / 180 * 90);
			translate (0, length * -50);
		}
		// pulling spikes
		if (b == 42) {
			image (pullingSpikesImg, 0, 0, 50, 50);
		}
		// stomp
		if (b == 43) {
			image (metalImg, 0, 0, 50, 50);
			rotate(PI / 180 * 180);
			image (spikeImg, 0, -50, 50, 50);
			rotate(PI / 180 * -180);
			image (chainImg, 0, -50, 50, 50);
			image (chainImg, 0, -100, 50, 50);
			image (chainImg, 0, -150, 50, 50);
		}
		// halfStopper
		if (b == 44) {
			image (halfStopperImg, 0, 0, 50, 50);
		}

		rotate(PI / 180 * rotation * -90);
		// lava top
		if (b == 45) {
			image (lavaTopImg, 0, 0, 50, 50);
		}
		// water top
		if (b == 46) {
			image (waterTopImg, 0, 0, 50, 50);
		}
		// slime
		if (b == 47) {
			image (slimeImg, 0, 12, 50, 28);
		}
		// snow spike
		/*if (b == 25) {
			image (snowSpikeImg, 0, 0, 50, 50);
		}
		// little spike
		if (b == 26) {
			image (littleSpikeImg, 0, 0, 50, 50);
		}
		// big spike
		if (b == 27) {
			image (bigSpikeImg, 0, 0, 50, 50);
		}*/

		// square
		noFill ();
		stroke ("#666");
		strokeWeight (2);
		rect (-28, -28, 56, 56);
		strokeWeight (1);

		imageMode (CORNER);
		translate (-mouseC.position.x, -mouseC.position.y);
		camera.off ();
	}
}

function stompsCollide (t, w) {
	if (t.velocity.y == 6 || t.velocity.y == -6 || t.velocity.x == 6 || t.velocity.x == -6) {
		t.velocity.y /= -3;
		t.velocity.x /= -3;
		t.position.y += t.velocity.y * 3;
		t.position.x += t.velocity.x * 3;
	} else {
		t.vy = t.velocity.y;
		t.vx = t.velocity.x;
		t.velocity.y = 0;
		t.velocity.x = 0;
		t.position.y += t.vy * -1;
		t.position.x += t.vx * -1;
		t.timeOut = 50;
	}

	for (let i = stompSpikes.length - 1; i >= 0; i--) {
		var s = stompSpikes[i];
		if (s.id == t.id) {
			if (s.velocity.y == 6 || s.velocity.y == -6 || s.velocity.x == 6 || s.velocity.x == -6) {
				s.velocity.y /= -3;
				s.velocity.x /= -3;
				s.position.y += s.velocity.y * 3;
				s.position.x += s.velocity.x * 3;
			} else {
				s.vy = s.velocity.y;
				s.vx = s.velocity.x;
				s.velocity.y = 0;
				s.velocity.x = 0;
				s.position.y += s.vy * -1;
				s.position.x += s.vx * -1;
				s.timeOut = 50;
			}
		}
	}
}

function slimeCollide (p, s) {
	if (p.position.x > s.position.x - 42 && player.position.x < s.position.x + 42 && s.anim != 2 && p.position.y < s.position.y - 25 && player.death == 0) {
		// slime kill
		s.changeAnimation ("dead");
		s.anim = 2;
		s.position.y += 8;
		s.velocity.x = 0;
		s.life = 25;
		p.velocityY = -12;
		p.jumping = 7;
	} else if (s.anim != 2 && player.death == 0) {
		// lose
		loseSnd.play ();
		player.death = 50;
		player.visible = false;
		deaths ++;
	}
}

function drawGroup (g) {
	for (var i = g.length - 1; i >= 0; i--) {
		var s = g[i];
		drawSprite (s);
	}
}

function changeDirection (s, b) {
	s.velocity.x *= -1;
	s.velocity.y *= -1;
}

function newCheckPoint (p, c) {
	checkPoint.position.x = c.position.x;
	checkPoint.position.y = c.position.y;
	checkPoint.rotation = c.rotation;
}

function goDown (p, b) {
	b.setSpeed (5, 90);
}

function deleteOld () {
	mouseC.overlap (walls, deleteBlock);
	mouseC.overlap (lava, deleteBlock);
	mouseC.overlap (checkPoints, deleteBlock);
	mouseC.overlap (trampolines, deleteBlock);
	mouseC.overlap (ladders, deleteBlock);
	mouseC.overlap (spikes, deleteBlock);
	mouseC.overlap (saws, deleteBlock);
	mouseC.overlap (stoppers, deleteBlock);
	mouseC.overlap (stomps, deleteBlock);
	mouseC.overlap (slimes, deleteBlock);
	mouseC.overlap (halfSaws, deleteBlock);
	if (block != 35) {
		mouseC.overlap (decorations, deleteBlock);
	}

	if (block != 4 && block != 16 && block != 17 && block != 18 && block != 44) {
		if (block < 22 || block > 37) {
			mouseC.overlap (water, deleteBlock);
		}
	}
	if (block != 36 && block != 37) {
		mouseC.overlap (movingSaws, deleteBlock);
	}

	if (mouseC.overlap (checkPoint)) {
		checkPoint.position.x = start.position.x;
		checkPoint.position.y = start.position.y;
		checkPoint.rotation = 0;
	}
}

function changeBlock (event) {
	if (event.deltaY > 0) {
		if (block < game.blocksNumber) {
			block ++;
		} else {
			block = 1;
		}
	} else {
		if (block > 1) {
			block --;
		} else {
			block = game.blocksNumber;
		}
	}
}

function keyPressed () {
	if (keyCode == 32 && Mode == 1 && mode !=3) {
		if (mode == 1) {
			Creator ();
		} else {
			Play ();
		}
	}

	if (keyCode == 27 && Mode == 1 && mode < 4 || keyCode == 27 && Mode == 4 && mode == 3) {
		pause ();
	}

	if (keyCode == 69 && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < 440 && mode == 2 && Mode == 1) {
		block = 2;
		for (var i = Block.length - 1; i >= 0; i--) {
			if (mouseC.position.x / 50 == positionX[i] && mouseC.position.y / 50 == positionY[i]) {
				block = Block[i];
				rotation = Rotation[i];
				if (rotation != 0 && rotation != 1 && rotation != 2 && rotation != 3) {
					length = rotation - floor (rotation / 10) * 10;
					rotation = floor ((rotation - 10) / 10);
				}

				return;
			}
		}
	}
}

function mousePressed () {
	if (Mode == 3 && mouseX >= 100 && mouseX <= 500 && mouseY >= 150 && mouseY <= 350 && mode == 4 && game.code == 0) {
		level = floor (mouseX / 100) + floor((mouseY - 150) / 100) * 4 + game.page * 8 - 8;
		if (level - 1 > maxLevel) {
			return;
		}
		// draw
		drawLevels ();
		noStroke ();
		fill ("black");
		rect (50, 30, width - 50, 110);
		fill ("#eee");
		textAlign (CENTER);
		textSize (50);
		if (level > maxLevel) {
			text ("new level", width / 2, 90);
			// buttons
			newLevel.position (110, 380);
			newLevel.size (180, 50);
			newLevel.show ();
			edit.hide ();
			play.hide ();
			deleteB.hide ();
			getCode.hide ();
			back.position (210, 440);
			enterCode.show ();
			enterCode.position (310, 380);
			enterCode.size (180, 50);
		} else {
			text ("level " + level, width / 2, 90);
			// buttons
			newLevel.hide ();
			edit.show ();
			play.show ();
			play.size (180, 50);
			back.position (310, 440);
			getCode.show ();
			enterCode.hide ();
			if (maxLevel > 1) {
				deleteB.show ();
				play.position (15, 380);
				edit.position (210, 380);
			} else {
				play.position (110, 380);
				edit.position (310, 380);
			}
		}

		strokeWeight (5);
		stroke ("#a00909");
		fill ("#242424");
		rect (floor (mouseX / 100) * 100, floor((mouseY - 50) / 100) * 100 + 50, 90, 90);
		noStroke ();
		fill ("#a00909");
		textSize (80);
		text (level, floor (mouseX / 100) * 100 + 42, floor((mouseY - 150) / 100) * 100 + 222);
		strokeWeight (1);
	}
}