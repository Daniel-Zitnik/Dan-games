/* platformer creator beta 1.1.1
© 2020 - 2021 Dan games */
// sprites
let player, mouseC, checkPoint, start, exit;
// groups
let walls, lava, checkPoints, fallingBlocks, trampolines, ladders, ice, water, decorations, spikes, saws, stoppers, movingSaws, halfSaws, fireBalls, fireBars, rotatingSaws, rotatingTypes, rSaws, pullingSpikes, stomps, stompSpikes, slimes, blueRedSwitches, blueBlocks, redBlocks, timedBlocks, greenButtons, greenBlocks, bridges, boosters, lifts, rubies, weights, walls2, oneWayWalls, stickyBlocks, bounceBlocks, fallingBlocks2, deadWeights;
// buttons
let play, creator, next, previous, resume, testLevel, testGame, menu, newGame, loadGame, back, saveGame, editLevel, createGame, newLevel, select, settings, edit, deleteB, yes, no, rename, nextLevel, getCode, playGame, enterCode, createLevel;
// game variables
let mode, block, Mode, level, maxLevel, track, tracksNumber, trackName, j, rotation, length, time, deaths;
// images
let metalImg, eraserImg, lavaImg, blueFlagImg, greenFlagImg, fallingBlockImg, trampolineImg, ladderImg, iceImg, waterImg, grassImg, dirtImg, snowImg, stoneImg, snowTundraImg, tundraImg, signExitImg, signRightImg, signLeftImg, bushImg, plantImg, rockImg, doorImg, yellowFlagImg, spikeImg, snowSpikeImg, littleSpikeImg, bigSpikeImg, smallSpikeImg, halfMetalImg, sawImg, stopperImg, movingSawImg, movingHalfSawImg, darkTapeImg, lightTapeImg, fireBarImg, fireBarRImg, fireBarLImg, fireBallImg, tapeEndImg, pullingSpikesImg, bigChainImg, yellowFallingBlockImg, redFallingBlockImg, slimeImg, thumbnailImg, playerImg, blueSwitchImg, redSwitchImg, blueBlockImg, redBlockImg, blueDottedLineImg, redDottedLineImg, yellowBlockImg, yellowDottedLineImg, greenButtonImg, greenPressedButtonImg, greenBlockImg, greenDottedLineImg, bridgeImg, boosterImg, arrowImg, liftImg, lift1Img, lift2Img, rubyImg, HUDrubyImg, weightImg, chainImg, purplePlantImg, oneWayWallImg, stickyBlockImg, bounceBlockImg, greenCaneImg, redCaneImg, deadTreeImg, frozenPlantImg, plantAltImg, snowRockImg, rockAltImg, bridgeLiftImg, bridgeLiftRLImg, bridgeLiftUDImg, snowHillImg, bigGreenCaneImg, bigRedCaneImg, snowyPileImg, smallSnowyPileImg;
// lists
let positionX = [], positionY = [], Block = [], Rotation = [], code = [], slime = [];
// inputs
let nameInput, codeInput;
// sounds
let xafSnd, loseSnd, clickSnd, winSnd;
// animations
let slimeWalkAnim, boosterAnim;
// game
let game = {
	blocksNumber: 0,
	build: 0,
	page: 0,
	premode: 0,
	code: 0,
	menu: 0,
	preMode: 0,
	trackOrder: [],
	pullingSpikes: 0,
	switch: 1,
	buttonPressed: 0,
	timedBlocks: 0,
	collectedrubies: 0,
	totalrubies: 0,
	debug: 0,
	info: 0,
	fps: 0
}
// inventory
let inventory = {
	walls: [],
	hazard: [],
	decorations: [],
	other: [],
	blocksSelected: [],
	categorySelected: 0,
	preBlock: 0,
	preRotation: 0,
	preLenght: 0
}
// optimization
let optimization = {
	chunkUpdate: 0,
	rotatingBlocksRotaion: 0,
	rubyInfo: [],
	buttonPressed: [],
	fallingBlockY: [],
	weightX: []
}

function preload () {
	// fonts
	maven = loadFont ("../fonts/Maven_Pro/static/MavenPro-Medium.ttf");
	// sounds
	xafSnd = loadSound ("sounds/Xaf-Nebula.mp3");
	loseSnd = loadSound ("sounds/Oops.mp3");
	clickSnd = loadSound ("sounds/Wood-Tap.mp3");
	winSnd = loadSound ("sounds/Win.mp3");
	// animations
	slimeWalkAnim = loadAnimation ("animations/slimeWalk1.png", "animations/slimeWalk2.png");
	boosterAnim = loadAnimation ("animations/booster0001.png", "animations/booster0004.png");
	// images
	metalImg = loadImage ("images/metalCenter.png");
	eraserImg = loadImage ("images/eraser.png");
	lavaImg = loadImage ("images/lavaTop.png");
	blueFlagImg = loadImage ("images/flagBlue2.png");
	greenFlagImg = loadImage ("images/flagGreen2.png");
	fallingBlockImg = loadImage ("images/boxWarning.png");
	trampolineImg = loadImage ("animations/springboardUp.png");
	ladderImg = loadImage ("images/ladder_mid.png");
	iceImg = loadImage ("images/iceBlockAlt.png");
	waterImg = loadImage ("images/waterTop.png");
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
	bigChainImg = loadImage ("images/image1.png");
	yellowFallingBlockImg = loadImage ("images/yellowFallingBlock.png");
	redFallingBlockImg = loadImage ("images/redFallingBlock.png");
	slimeImg = loadImage ("animations/slimeWalk1.png");
	thumbnailImg = loadImage ("images/thumbnail.png");
	playerHurtImg = loadImage ("animations/p1_hurt.png");
	snowSpikeImg = loadImage ("images/spikesBottom.png");
	littleSpikeImg = loadImage ("images/spikesBottomAlt2.png");
	bigSpikeImg = loadImage ("images/spikesBottomAlt.png");
	blueSwitchImg = loadImage ("images/blueSwitch.png");
	redSwitchImg = loadImage ("images/redSwitch.png");
	blueBlockImg = loadImage ("images/platformPack_tile007.png");
	redBlockImg = loadImage ("images/platformPack_tile020.png");
	blueDottedLineImg = loadImage ("images/platformPack_tile009.png");
	redDottedLineImg = loadImage ("images/platformPack_tile022.png");
	yellowBlockImg = loadImage ("images/platformPack_tile008.png");
	yellowDottedLineImg = loadImage ("images/platformPack_tile010.png");
	greenButtonImg = loadImage ("images/platformPack_tile062.png");
	greenPressedButtonImg = loadImage ("images/platformPack_tile063.png");
	greenBlockImg = loadImage ("images/platformPack_tile019.png");
	greenDottedLineImg = loadImage ("images/platformPack_tile021.png");
	bridgeImg = loadImage ("images/bridge.png");
	boosterImg = loadImage ("animations/booster0004.png");
	arrowImg = loadImage ("images/platformIndustrial_070.png");
	rubyImg = loadImage ("images/gemRed.png");
	HUDrubyImg = loadImage ("images/hud_gem_red.png");
	weightImg = loadImage ("images/weightChained.png");
	chainImg = loadImage ("images/chain.png");
	purplePlantImg = loadImage ("images/plantPurple.png");
	oneWayWallImg = loadImage ("images/oneWayWall.png");
	stickyBlockImg = loadImage ("images/stickyBlock.png");
	bounceBlockImg = loadImage ("images/bounceBlock.png");
	greenCaneImg = loadImage ("images/caneGreenSmall.png");
	redCaneImg = loadImage ("images/caneRedSmall.png");
	deadTreeImg = loadImage ("images/deadTree.png");
	frozenPlantImg = loadImage ("images/frozenPlant.png");
	plantAltImg = loadImage ("images/plantAlt.png");
	snowRockImg = loadImage ("images/snowRock.png");
	rockAltImg = loadImage ("images/rockAlt.png");
	bridgeLiftImg = loadImage ("images/bridgeLift.png");
	bridgeLiftRLImg = loadImage ("images/bridgeLiftRL.png");
	bridgeLiftUDImg = loadImage ("images/bridgeLiftUD.png");
	liftImg = loadImage ("images/lift.png");
	lift1Img = loadImage ("images/lift1.png");
	lift2Img = loadImage ("images/lift2.png");
	snowHillImg = loadImage ("animations/snowHillLow.png");
	bigGreenCaneImg = loadImage ("animations/caneGreenTop.png");
	bigRedCaneImg = loadImage ("animations/caneRedTop.png");
	smallSnowyPileImg = loadImage ("images/snowBallGround.png");
	snowyPileImg = loadImage ("images/snowBallBigGround.png");
	//halfStopperImg = loadImage ("images/halfStopper.png");
	//halfLiftImg = loadImage ("images/halfLift.png");
	//halfLift1Img = loadImage ("images/halfLift1.png");
	//halfLift2Img = loadImage ("images/halfLift2.png");
}

function setup() {
	var cnv = createCanvas (600, 500);
	cnv.parent ("sketchHolder");
	cnv.mouseWheel (changeBlock);
	frameRate (50);
	textFont (maven);
	background ("cyan");
	slimeWalkAnim.frameDelay = 10;
	boosterAnim.frameDelay = 10;
	// set variables
	mode = 2;
	block = 1;
	game.blocksNumber = 77;
	game.build = 1;
	game.page = 1;
	rotation = 0;
	length = 3;
	time = 0;
	deaths = 0;
	game.thumbnail = 0;
	game.debug = 0;
	game.info = 0;
	// inventory
	inventory.walls = [1, 5, 8, 10, 11, 12, 13, 14, 28, 45, 46, 51, 52, 53, 54, 56, 57, 61, 62, 63, 64];
	inventory.hazard = [3, 24, 25, 26, 27, 29, 30, 31, 32, 34, 35, 38, 39, 40, 41, 42, 43, 47, 48, 49, 50, 66];
	inventory.decorations = [15, 16, 17, 18, 19, 20, 21, 36, 37, 60, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80];
	inventory.other = [4, 6, 7, 9, 22, 23, 33, 44, 55, 58, 59, 65, 68];
	inventory.blocksSelected = [0, 3, 0, 1, 0];
	inventory.categorySelected = 1;
	inventory.preBlock = 1;
	inventory.preRotation = 0;
	inventory.preLenght = 1;
	// groups
	walls = new Group ();
	lava = new Group ();
	checkPoints = new Group ();
	fallingBlocks = new Group ();
	trampolines = new Group ();
	ladders = new Group ();
	ice = new Group ();
	water = new Group ();
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
	blueRedSwitches = new Group ();
	blueBlocks = new Group ();
	redBlocks = new Group ();
	timedBlocks = new Group ();
	greenButtons = new Group ();
	greenBlocks = new Group ();
	bridges = new Group ();
	boosters = new Group ();
	lifts = new Group ();
	rubies = new Group ();
	weights = new Group ();
	walls2 = new Group ();
	oneWayWalls = new Group ();
	stickyBlocks = new Group ();
	bounceBlocks = new Group ();
	fallingBlocks2 = new Group ();
	deadWeights = new Group ();
	// checkPoint
	checkPoint = createSprite (width / 2, height / 2);
	checkPoint.addImage (greenFlagImg);
	checkPoint.scale = 0.72;
	checkPoint.setCollider ("rectangle", 0, 0, 68, 68);
	checkPoint.undestroyable = 1;
	// start
	start = createSprite (width / 2, height / 2);
	start.addImage (yellowFlagImg);
	start.scale = 0.72;
	start.setCollider ("rectangle", 0, 0, 68, 68);
	start.undestroyable = 1;
	// exit
	exit = createSprite (1000000, 1000000);
	exit.addAnimation ("closed", doorImg);
	exit.addAnimation ("open", "images/door_open.png");
	exit.changeAnimation ("closed");
	exit.scale = 0.36;
	exit.setCollider ("rectangle", 0, 0, 136, 214);
	exit.undestroyable = 1;
	// player
	player = createSprite (checkPoint.position.x, checkPoint.position.y - 8);
	player.setCollider ("rectangle", 0, 0, 65, 91);
	player.scale = 0.72;
	player.jumping = 0;
	player.velocityX = 0;
	player.velocityY = 0;
	player.death = 0;
	player.undestroyable = 1;
	player.unsqueezable = 0;
	player.water = 0;
	player.waterTimeOut = 0;
	player.preVelocityX = 0;
	player.preVelocityY = 0;
	player.noMoveTime = 0;
	// player animatons
	player.addAnimation ("front", "animations/player_front0001.png");
	player.addAnimation ("walk", "animations/player_walk0003.png", "animations/player_walk0007.png");
	player.addAnimation ("jump", "animations/player_jump0001.png");
	player.addAnimation ("crouch", "animations/player_crouch0001.png");
	player.addAnimation ("climb1", "animations/alienGreen_climb1.png");
	player.addAnimation ("climb2", "animations/alienGreen_climb2.png");
	player.addAnimation ("swim1", "animations/alienGreen_swim1.png");
	player.addAnimation ("swim2", "animations/alienGreen_swim2.png");
	player.anim = 1;
	player.changeAnimation ("front");
	// mouseC
	mouseC = createSprite (mouseX, mouseY, 0, 0);
	mouseC.setCollider ("rectangle", 0, 0, 45, 45);
	mouseC.undestroyable = 1;
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
	saveGame.hidden = true;
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
	if (localStorage.lastVersionPlayed) {
		// last version played
		var lvp = [];
		j = localStorage.getItem ("lastVersionPlayed");
		lvp = JSON.parse (j);
		if (lvp[0] == 1.2) {
			// get variables
			j = localStorage.getItem ("trackOrder");
			game.trackOrder = JSON.parse (j);
			tracksNumber = localStorage.getItem("tracksNumber");
			var v;
			v = localStorage.getItem ("platformerCreator-volume");
			volume.value (v);
			masterVolume (v / 100);
			//localStorage.removeItem ("lastVersionPlayed");
			//localStorage.setItem ("plc-lastVersionplayed", 1.0101);
		} else {
			// last version played
			var lvp = [];
			j = localStorage.getItem ("lastVersionPlayed");
			lvp = JSON.parse (j);
			lvp[0] = 1.2;
			j = JSON.stringify (lvp);
			localStorage.setItem ("lastVersionPlayed", j);
			// set storage
			localStorage.setItem ("tracksNumber", tracksNumber);
			localStorage.setItem ("platformerCreator-volume", 100);
			localStorage.setItem ("trackOrder", "[]");
			masterVolume (1);
			//createTracks ();
		}
	} else if (localStorage.key ("plc-lastVersionPlayed")) {
		// get variables
		tracksNumber = localStorage.getItem ("tracksNumber");
		var v;
		v = localStorage.getItem ("platformerCreator-volume");
		masterVolume (v / 100);
		volume.value (v);
		// change blocks
		for (let i = 0; i < tracksNumber; i++) {
			maxLevel = localStorage.getItem ("track" + (i + 1) + "maxLevel");
			for (let l = 0; l < maxLevel; l++) {
				j = localStorage.getItem ("track" + (i + 1) + "level" + (l + 1) + "blocks");
				Block = JSON.parse (j);
				for (let o = 0; o < Block.length; o++) {
					var b = Block[o];
					if (b == 11) {
						b = 10;
					} else if (b == 12 || b == 13) {
						b = 11;
					} else if (b == 14 || b == 15) {
						b = 12;
					} else if (b == 45) {
						b = 3;
					} else if (b == 46) {
						b = 9;
					}

					Block[o] = b;
				}

				j = JSON.stringify (Block);
				localStorage.setItem ("track" + (i + 1) + "level" + (l + 1) + "blocks", j);
			}
		}

		var plvp = localStorage.getItem ("plc-lastVersionPlayed");
		if (plvp == 1.0101) {
			// last version played
			var lvp = [1.2, 0, 0, 0];
			j = JSON.stringify (lvp);
			localStorage.setItem ("lastVersionPlayed", j);
			localStorage.removeItem ("plc-lastVersionPlayed");
			// get variables
			j = localStorage.getItem ("trackOrder");
			game.trackOrder = JSON.parse (j);
			//createTracks ();
		} else {
			// last version played
			var lvp = [1.2, 0, 0, 0];
			j = JSON.stringify (lvp);
			localStorage.setItem ("lastVersionPlayed", j);
			localStorage.removeItem ("plc-lastVersionPlayed");
			// track order
			for (let i = 1; i <= tracksNumber; i++) {
				append (game.trackOrder, i);
			}
		
			j = JSON.stringify (game.trackOrder);
			localStorage.setItem ("trackOrder", j);
			//createTracks ();
		}
	} else {
		// last version played
		var lvp = [1.2, 0, 0, 0];
		j = JSON.stringify (lvp);
		localStorage.setItem ("lastVersionPlayed", j);
		// set storage
		localStorage.setItem ("tracksNumber", tracksNumber);
		localStorage.setItem ("platformerCreator-volume", 100);
		localStorage.setItem ("trackOrder", "[]");
		masterVolume (1);
		//createTracks ();
	}

	Menu ();
	// sound
	xafSnd.loop ();
}

function createWall (x, y, i, id) {
	var w;
	w = createSprite (x, y);
	w.shapeColor = color (0, 200, 0);
	w.immovable = false;
	w.scale = 0.72;
	w.setCollider ("rectangle", 0, 0, 68, 68);
	if (i != 2) {
		w.addToGroup (walls);
	}
	
	// metal
	if (i == 1) {
		w.addImage (metalImg);
		w.i = 1;
	}
	// falling block
	if (i == 2) {
		w.addImage (fallingBlockImg);
		w.addToGroup (fallingBlocks);
		w.addToGroup (walls2);
		if (mode != 2) {
			w.id = id;
		}
	}
	// grass
	if (i == 3) {
		w.addAnimation ("top", grassImg);
		w.addAnimation ("mid", dirtImg);
		w.i = 2;
	}
	// snow
	if (i == 4) {
		w.addAnimation ("top", snowImg);
		w.addAnimation ("mid", stoneImg);
		w.i = 2;
	}
	// tundra
	if (i == 5) {
		w.addAnimation ("top", snowTundraImg);
		w.addAnimation ("mid", tundraImg);
		w.i = 2;
	}
	// sticky block
	if (i == 6) {
		w.addImage (stickyBlockImg);
		w.addToGroup (stickyBlocks);
		w.scale = 0.393;
		w.setCollider ("rectangle", 0, 0, 125, 125);
	}
	// bounce block
	if (i == 7) {
		w.addImage (bounceBlockImg);
		w.addToGroup (bounceBlocks);
		w.scale = 0.393;
		w.setCollider ("rectangle", 0, 0, 125, 125);
	}
	// half metal
	if (i == 8) {
		w.addImage (halfMetalImg);
		w.rotation = rotation * 90;
		w.halfBlock = 1;
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

	// walls image
	if (w.i > 0) {
		for (let i = 0; i < walls.length; i++) {
			var b = walls[i];
			if (b.i == 2 && b.f != 1) {
				if (w.position.y == b.position.y - 50 && w.position.x == b.position.x) {
					b.changeAnimation ("mid");
					b.i = 3;
				}
			}
		}

		for (let i = 0; i < water.length; i++) {
			var a = water[i];
			if (a.i == 1) {
				if (w.position.y == a.position.y - 50 && w.position.x == a.position.x) {
					a.changeAnimation ("mid");
					a.i = 2;
				}
			}
		}
	
		for (let i = 0; i < lava.length; i++) {
			var a = lava[i];
			if (a.i == 1) {
				if (w.position.y == a.position.y - 50 && w.position.x == a.position.x) {
					a.changeAnimation ("mid");
					a.i = 2;
				}
			}
		}

		// snow hill
		for (let i = 0; i < decorations.length; i++) {
			var a = decorations[i];
			if (a.i > 0 && a.id == 1) {
				if (w.position.y == a.position.y) {
					if (w.position.x == a.position.x + 50) {
						a.changeAnimation ("ground");
						a.mirrorX (1);
						a.i = 5;
					} else if (w.position.x == a.position.x - 50) {
						a.changeAnimation ("ground");
						a.mirrorX (-1);
						a.i = 6;
					}
				}
				
			}
		}

		if (w.i == 2) {
			w.changeAnimation ("top");
			for (let i = 0; i < walls.length; i++) {
				var b = walls[i];
				if (b.i > 0 && b.f != 1) {
					if (w.position.y == b.position.y + 50 && w.position.x == b.position.x) {
						w.changeAnimation ("mid");
						w.i = 3;
					}
				}
			}
		}	
	}
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

function createLava (x, y) {
	var l;
	l = createSprite (x, y);
	l.scale = 0.785;
	l.addAnimation ("top", lavaImg);
	l.addAnimation ("mid", "images/lava.png");
	l.changeAnimation ("top");
	l.setCollider ("rectangle", 0, 0, 63, 63);
	l.addToGroup (lava);
	l.i = 1;
	// image
	for (let i = 0; i < lava.length; i++) {
		var a = lava[i];
		if (l.position.x == a.position.x) {
			if (l.position.y == a.position.y - 50 && a.i == 1) {
				a.changeAnimation ("mid");
				a.i = 2;
			} else if (l.position.y == a.position.y + 50) {
				l.changeAnimation ("mid");
				l.i = 2;
			}
		}
	}

	for (let i = 0; i < water.length; i++) {
		var a = water[i];
		if (l.position.x == a.position.x) {
			if (l.position.y == a.position.y - 50 && a.i == 1) {
				a.changeAnimation ("mid");
				a.i = 2;
			} else if (l.position.y == a.position.y + 50) {
				l.changeAnimation ("mid");
				l.i = 2;
			}
		}
	}

	for (let i = 0; i < walls.length; i++) {
		var b = walls[i];
		if (b.i > 0 && b.f != 1) {	
			if (l.position.y == b.position.y + 50 && l.position.x == b.position.x) {
				l.changeAnimation ("mid");
				l.i = 2;
			}
		}
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
	t.addToGroup (walls);
	t.setCollider ("rectangle", 0, 7, 68, 50);
	t.scale = 0.72;
	t.addAnimation ("base", trampolineImg);
	t.addAnimation ("press", "animations/springboardDown.png");
	t.changeAnimation ("base");
	t.timeOut = 0;
}

function createLadder (x, y) {
	var l;
	l = createSprite (x, y);
	l.addToGroup (ladders);
	l.setCollider ("rectangle", 0, 0, 34, 68);
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

function createWater (x, y) {
	var w;
	w = createSprite (x, y);
	w.addToGroup (water);
	w.scale = 0.785;
	w.addAnimation ("top", waterImg);
	w.addAnimation ("mid", "images/water.png");
	w.changeAnimation ("top");
	w.setCollider ("rectangle", 0, 0, 63, 63);
	w.addToGroup (water);
	w.i = 1;
	// image
	for (let i = 0; i < lava.length; i++) {
		var a = lava[i];
		if (w.position.x == a.position.x) {
			if (w.position.y == a.position.y - 50 && a.i == 1) {
				a.changeAnimation ("mid");
				a.i = 2;
			} else if (w.position.y == a.position.y + 50) {
				w.changeAnimation ("mid");
				w.i = 2;
			}
		}
	}

	for (let i = 0; i < water.length; i++) {
		var a = water[i];
		if (w.position.x == a.position.x) {
			if (w.position.y == a.position.y - 50 && a.i == 1) {
				a.changeAnimation ("mid");
				a.i = 2;
			} else if (w.position.y == a.position.y + 50) {
				w.changeAnimation ("mid");
				w.i = 2;
			}
		}
	}

	for (let i = 0; i < walls.length; i++) {
		var b = walls[i];
		if (b.i > 0 && b.f != 1) {	
			if (w.position.y == b.position.y + 50 && w.position.x == b.position.x) {
				w.changeAnimation ("mid");
				w.i = 2;
			}
		}
	}
}

function createDecoration (x, y, i) {
	var d;
	d = createSprite (x, y);
	d.setCollider ("rectangle", 0, 0, 68, 68);
	d.scale = 0.72;
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
	// dark tape
	if (i == 7) {
		d.addImage (darkTapeImg);
	}
	// light tape
	if (i == 8) {
		d.addImage (lightTapeImg);
	}
	// arrow
	if (i == 9) {
		d.addImage (arrowImg);
		d.setCollider ("circle", 0, 0, 34);
	}
	// chain
	if (i == 10) {
		d.addImage (chainImg);
	}
	// purple plant
	if (i == 11) {
		d.addImage (purplePlantImg);
	}
	// green cane
	if (i == 12) {
		d.addImage (greenCaneImg);
	}
	// red cane
	if (i == 13) {
		d.addImage (redCaneImg);
	}
	// frozen tree
	if (i == 14) {
		d.addImage (deadTreeImg);
	}
	// frozen plant
	if (i == 15) {
		d.addImage (frozenPlantImg);
	}
	// frozen plant
	if (i == 16) {
		d.addImage (plantAltImg);
	}
	// snow rock
	if (i == 17) {
		d.addImage (snowRockImg);
	}
	// snow rock
	if (i == 18) {
		d.addImage (rockAltImg);
	}
	// snow hill
	if (i == 19) {
		// animations
		d.addAnimation ("mid", "animations/snowMid.png");
		d.addAnimation ("corner", "animations/snowRight.png");
		d.addAnimation ("self", "animations/snowHillLow.png");
		d.addAnimation ("ground", "animations/snowGroundRight.png");
		// image
		d.changeAnimation ("self");
		d.mirrorX (1);
		d.i = 1;
		d.id = 1;
		// snow hill
		for (let i = 0; i < decorations.length; i++) {
			var s = decorations[i];
			if (s.i > 0 && s.id == 1) {
				if (d.position.y == s.position.y) {
					if (d.position.x == s.position.x - 50) {
						d.changeAnimation ("corner");
						d.mirrorX (-1);
						d.i = 4;
						if (s.i == 1) {
							s.changeAnimation ("corner");
							s.mirrorX (1);
							s.i = 3;
						} else if (s.i == 4) {
							s.changeAnimation ("mid");
							s.mirrorX (1);
							s.i = 2;
						}
					} else if (d.position.x == s.position.x + 50) {
						if (d.i == 1) {
							d.changeAnimation ("corner");
							d.mirrorX (1);
							d.i = 3;
						} else {
							d.changeAnimation ("mid");
							d.mirrorX (1);
							d.i = 2;
						}
						
						if (s.i == 1) {
							s.changeAnimation ("corner");
							s.mirrorX (-1);
							s.i = 4;
						} else if (s.i == 3) {
							s.changeAnimation ("mid");
							s.mirrorX (1);
							s.i = 2;
						}
					}
				}
				
			}
		}

		// walls
		for (let i = 0; i < walls.length; i++) {
			var w = walls[i];
			if (w.i > 0 && w.f != 1) {
				if (d.position.y == w.position.y) {
					if (d.position.x == w.position.x - 50) {
						d.changeAnimation ("ground");
						d.mirrorX (1);
						d.i = 5;
					} else if (d.position.x == w.position.x + 50) {
						d.changeAnimation ("ground");
						d.mirrorX (-1);
						d.i = 6;
					}
				}
				
			}
		}
	}
	// green cane
	if (i == 20) {
		d.addAnimation ("top", bigGreenCaneImg);
		d.addAnimation ("bottom", "animations/caneGreen.png");
	}
	// red cane
	if (i == 21) {
		d.addAnimation ("top", bigRedCaneImg);
		d.addAnimation ("bottom", "animations/caneRed.png");
	}
	// cane image
	if (i == 20 || i == 21) {
		d.id = 2;
		d.i = 1;
		d.changeAnimation ("top");
		// snow hill
		for (let i = 0; i < decorations.length; i++) {
			var s = decorations[i];
			if (s.i > 0 && s.id == 2) {
				if (s.position.x == d.position.x) {
					if (s.position.y == d.position.y + 50) {
						s.changeAnimation ("bottom");
						s.i = 2;
					}
	
					if (s.position.y == d.position.y - 50) {
						d.changeAnimation ("bottom");
						d.i = 2;
					}
				}
			}
		}
	}
	// small snowy pile
	if (i == 22) {
		d.addImage (smallSnowyPileImg);
	}
	// snowy pile
	if (i == 23) {
		d.addImage (snowyPileImg);
	}
	// rotation
	if (i == 2 || i == 3) {
		d.rotation = rotation * 90;
	}

	if (i == 9) {
		d.rotation = rotation * 45;
	}

	if (i == 7 || i == 8) {
		if (rotation == 0 || rotation == 2) {
			d.rotation = 0;
		} else {
			d.rotation = 90;
		}
	}

	d.addToGroup (decorations);
}

function changePosition (x, y, b) {
	var i;
	if (b == 1) {
		if (checkPoint.position.x == start.position.x && checkPoint.position.y == start.position.y) {
			checkPoint.position.x = x;
			checkPoint.position.y = y;
		}
		
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
	if (i == 5) {
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
	if (i == 6) {
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
	if (i == 7) {
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
	}
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

	if (mode != 2) {
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
	} else {
		s.changeAnimation ("creator");
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
	s.setCollider ("rectangle", 0, 0, 68000, 68000);
	// HS deleted-1
}

function createMovingSaw (x, y, i) {
	var s;
	s = createSprite (x, y);
	s.addToGroup (movingSaws);
	s.scale = 0.72;
	s.nearPlayer = 0;
	if (i == 1) {
		s.addAnimation ("play", sawImg);
		s.addAnimation ("creator", movingHalfSawImg);
		s.setCollider ("rectangle", 0, 0, 68, 68);
		s.rotation = rotation * 90;
		s.r = rotation;
		s.i = 1;
	}

	if (i == 2) {
		s.addAnimation ("play", sawImg);
		s.addAnimation ("creator", movingSawImg);
		s.setCollider ("circle", 0, 0, 34);
		s.i = 2;
		if (rotation == 0 || rotation == 2) {
			s.rotation = 0;
		} else {
			s.rotation = 90;
		}
	}
	
	s.changeAnimation ("creator");
}

function createFireBar (x, y, i, l, id) {
	var f;
	f = createSprite (x, y);
	f.addToGroup (walls);
	f.addToGroup (fireBars);
	f.scale = 0.785;
	f.rotation = rotation * 90;
	f.setCollider ("rectangle", 0, 0, 62, 62);
	f.l = length;
	f.id = id;
	f.i = i;
	if (l == 1) {
		Rotation.splice(Rotation.length - 1, 1, (rotation + 1) * 10 + length);
	}

	if (i == 1) {
		f.addAnimation ("play", fireBarImg);
		f.addAnimation ("creator", fireBarRImg);
	} else {
		f.addAnimation ("play", fireBarImg);
		f.addAnimation ("creator", fireBarLImg);
	}

	if (mode == 2) {
		f.changeAnimation ("creator");
	} else {
		f.changeAnimation ("play");
		// fire balls
		for (var l = 0; l <= f.l; l += 0.5) {
			var b = createSprite (f.position.x, f.position.y);
			b.addToGroup (fireBalls);
			b.setCollider ("circle", 0, 0, 12);
			b.scale = 0.72;
			b.addImage (fireBallImg);
			b.l = l;
			b.i = f.i;
			b.id = id;
			b.undestroyable = 1;
			b.barPositionX = f.position.x;
			b.barPositionY = f.position.y;
			b.r = rotation + 1;
		}
	}
}

function createRotatingSaw (x, y, i, l, id) {
	var r;
	r = createSprite (x, y);
	r.addToGroup (walls);
	r.addToGroup (rotatingSaws);
	r.scale = 0.785;
	r.rotation = rotation * 90;
	r.setCollider ("rectangle", 0, 0, 62, 62);
	r.l = length;
	r.i = i;
	r.id = id;
	if (l == 1) {
		Rotation.splice(Rotation.length - 1, 1, (rotation + 1) * 10 + length);
	}

	if (i == 1) {
		r.addAnimation ("play", fireBarImg);
		r.addAnimation ("creator", fireBarRImg);
	} else {
		r.addAnimation ("play", fireBarImg);
		r.addAnimation ("creator", fireBarLImg);
	}

	if (mode == 2) {
		r.changeAnimation ("creator");
	} else {
		r.changeAnimation ("play");
		// rotating tapes
		for (var l = 0; l <= r.l; l ++) {
			var t;
			t = createSprite (r.position.x, r.position.y);
			t.setCollider ("circle", 0, 0, 12);
			t.addToGroup (rotatingTypes);
			t.scale = 0.72;
			t.l = l;
			t.i = i;
			t.id = id;
			t.undestroyable = 1;
			t.startPositionX = r.position.x;
			t.startPositionY = r.position.y;
			t.r = rotation + 1;
			if (l == 0) {
				t.addImage (tapeEndImg);
			} else if (l == r.l) {
				t.addImage (tapeEndImg);
				t.lastType = true;
				// rotating saw
				var s;
				s = createSprite (r.position.x, r.position.y);
				s.addImage (sawImg);
				s.addToGroup (rotatingTypes);
				s.addToGroup (rSaws);
				s.addToGroup (saws);
				s.scale = 0.72;
				s.setCollider ("circle", 0, 0, 34);
				s.l = l;
				s.i = r.i;
				s.id = id;
				s.undestroyable = 1;
				s.startPositionX = r.position.x;
				s.startPositionY = r.position.y;
				s.r = rotation + 1;
				s.s = 1;
			} else {
				t.addImage (darkTapeImg);
			}
		}
	}
}

function createPullingSpikes (x, y, id) {
	var w;
	w = createSprite (x, y);
	w.addToGroup (walls);
	w.pullingBlock = 1;
	w.scale = 0.72;
	w.addImage (pullingSpikesImg);
	w.setCollider ("rectangle", 0, 0, 68, 68);
	w.rotation = rotation * 90;
	// spike
	if (mode != 2) {
		w.id = id;
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
		p.pullingSpikes = 1;
		p.id = id;
		if (p.rotation == 0) {
			if (game.pullingSpikes > 100 && game.pullingSpikes < 110) {
				p.setSpeed (2.5, p.rotation - 90);
				p.position.y -= 2.5 * (game.pullingSpikes - 99);
			} else if (game.pullingSpikes > 109 && game.pullingSpikes < 161) {
				p.position.y -= 25;
			} else if (game.pullingSpikes > 160) {
				p.setSpeed (1, p.rotation + 90);
				p.position.y -= 25;
				p.position.y += game.pullingSpikes - 159;
			}
		}

		if (p.rotation == 90) {
			if (game.pullingSpikes > 100 && game.pullingSpikes < 110) {
				p.setSpeed (2.5, p.rotation - 90);
				p.position.x += 2.5 * (game.pullingSpikes - 99);
			} else if (game.pullingSpikes > 109 && game.pullingSpikes < 161) {
				p.position.x += 25;
			} else if (game.pullingSpikes > 160) {
				p.setSpeed (1, p.rotation + 90);
				p.position.x += 25;
				p.position.x -= game.pullingSpikes - 159;
			}
		}

		if (p.rotation == 180) {
			if (game.pullingSpikes > 100 && game.pullingSpikes < 110) {
				p.setSpeed (2.5, p.rotation - 90);
				p.position.y += 2.5 * (game.pullingSpikes - 99);
			} else if (game.pullingSpikes > 109 && game.pullingSpikes < 161) {
				p.position.y += 25;
			} else if (game.pullingSpikes > 160) {
				p.setSpeed (1, p.rotation + 90);
				p.position.y += 25;
				p.position.y -= game.pullingSpikes - 159;
			}
		}

		if (p.rotation == 270) {
			if (game.pullingSpikes > 100 && game.pullingSpikes < 110) {
				p.setSpeed (2.5, p.rotation - 90);
				p.position.x -= 2.5 * (game.pullingSpikes - 99);
			} else if (game.pullingSpikes > 109 && game.pullingSpikes < 161) {
				p.position.x -= 25;
			} else if (game.pullingSpikes > 160) {
				p.setSpeed (1, p.rotation + 90);
				p.position.x -= 25;
				p.position.x += game.pullingSpikes - 159;
			}
		}
	}
}

function createStomp (x, y) {
	var s;
	s = createSprite (x, y);
	s.addToGroup (stomps);
	s.addToGroup (walls2);
	s.nearPlayer = 0;
	s.scale = 0.72;
	s.addImage (metalImg);
	s.setCollider ("rectangle", 0, 0, 68, 68);
	s.r = rotation;
	s.timeOut = 0;
}

function createSlime (x, y, id) {
	var s;
	s = createSprite (x, y);
	s.addToGroup (slimes);
	s.scale = 1;
	s.addAnimation ("creator", slimeImg);
	s.addAnimation ("walk", slimeWalkAnim);
	s.addAnimation ("dead", "animations/slimeDead.png");
	s.setCollider ("rectangle", 0, 0, 48, 26);
	s.water = 0;
	s.id = id;
	if (mode == 2) {
		s.changeAnimation ("creator");
		s.position.y += 12;
	} else {
		s.changeAnimation ("walk");
		s.velocity.x = slime[id].velX;
		s.velocityY = slime[id].velY;
		s.anim = 1;
		s.slime = 1;
		s.new = true;
		if (s.velocity.x > 0) {
			s.mirrorX (-1);
		}
	}
}

function createBlueRedSwitch (x, y) {
	var s;
	s = createSprite (x, y);
	s.addToGroup (blueRedSwitches);
	s.addToGroup (walls);
	s.scale = 0.785;
	s.addAnimation ("blue", blueSwitchImg);
	s.addAnimation ("red", redSwitchImg);
	s.setCollider ("rectangle", 0, 0, 63.5, 63.5);
	s.prePositionY = s.position.y;
	s.move = 0;
	if (game.switch == 1) {
		s.changeAnimation ("blue");
	} else {
		s.changeAnimation ("red");
	}
}

function createBlueRedBlock (x, y, i) {
	var s;
	s = createSprite (x, y);
	s.scale = 0.785;
	s.setCollider ("rectangle", 0, 0, 63, 63);
	if (i == 1) {
		s.addAnimation ("block", blueBlockImg);
		s.addAnimation ("dottedLine", blueDottedLineImg);
		s.changeAnimation ("block");
		s.addToGroup (blueBlocks);
		if (game.switch == 1) {
			s.changeAnimation ("block");
			s.addToGroup (walls);
		} else {
			s.changeAnimation ("dottedLine");
		}
	} else {
		s.addAnimation ("block", redBlockImg);
		s.addAnimation ("dottedLine", redDottedLineImg);
		s.addToGroup (redBlocks);
		if (game.switch == 1) {
			s.changeAnimation ("dottedLine");
		} else {
			s.changeAnimation ("block");
			s.addToGroup (walls);
		}
	}
}

function createTimedBlock (x, y) {
	var t;
	t = createSprite (x, y);
	t.addToGroup (timedBlocks);
	t.scale = 0.785;
	t.addAnimation ("block", yellowBlockImg);
	t.addAnimation ("dottedLine", yellowDottedLineImg);
	
	t.setCollider ("rectangle", 0, 0, 63.5, 63.5);
	if (game.timedBlocks > 149 && game.timedBlocks < 300) {
		t.changeAnimation ("dottedLine");
	} else {
		t.changeAnimation ("block");
		t.addToGroup (walls);
	}
}

function createGreenButton (x, y, i, liftID, r) {
	var g;
	g = createSprite (x, y);
	g.addToGroup (greenButtons);
	g.addToGroup (walls2);
	g.scale = 0.785;
	g.addAnimation ("base", greenButtonImg);
	g.addAnimation ("pressed", greenPressedButtonImg);
	g.changeAnimation ("base");
	if (liftID == undefined) {
		g.rotation = rotation * 90;
		if (rotation == 0) {
			g.setCollider ("rectangle", 0, 12, 60, 32);
		} else if (rotation == 1) {
			g.setCollider ("rectangle", -12, 0, 60, 32);
		} else if (rotation == 2) {
			g.setCollider ("rectangle", 0, -12, 60, 32);
		} else if (rotation == 3) {
			g.setCollider ("rectangle", 12, 0, 60, 32);
		}
	} else {
		g.liftID = liftID;
		g.rotation = r * 90 - 90;
		if (r == 1) {
			g.setCollider ("rectangle", 0, 12, 60, 32);
		} else if (r == 2) {
			g.setCollider ("rectangle", -12, 0, 60, 32);
		} else if (r == 3) {
			g.setCollider ("rectangle", 0, -12, 60, 32);
		} else if (r == 4) {
			g.setCollider ("rectangle", 12, 0, 60, 32);
		}
	}

	if (mode != 2) {
		g.id = i;
	}
}

function createGreenBlock (x, y, i) {
	var b;
	b = createSprite (x, y);
	b.scale = 0.785;
	b.setCollider ("rectangle", 0, 0, 63, 63);
	b.addAnimation ("block", greenBlockImg);
	b.addAnimation ("dottedLine", greenDottedLineImg);
	b.addToGroup (greenBlocks);
	if (i == 1) {
		b.id = 1;
		if (game.buttonPressed > 0) {
			b.changeAnimation ("dottedLine");
		} else {
			b.changeAnimation ("block");
			b.addToGroup (walls);
		}
	} else {
		b.id = 2;
		if (game.buttonPressed == 0) {
			b.changeAnimation ("dottedLine");
		} else {
			b.changeAnimation ("block");
			b.addToGroup (walls);
		}
	}
}

function createBridge (x, y) {
	var b;
	b = createSprite (x, y);
	b.addToGroup (bridges);
	b.scale = 0.72;
	b.addImage (bridgeImg);
	b.setCollider ("rectangle", 0, -17, 68, 22);
}

function createBooster (x, y) {
	var b;
	b = createSprite (x, y);
	b.addToGroup (boosters);
	b.scale = 0.72;
	b.addAnimation ("play", boosterAnim);
	b.addAnimation ("creator", boosterImg);
	b.setCollider ("rectangle", 0, 0, 65, 65);
	b.rotation = rotation * 90;
	if (mode == 2) {
		b.changeAnimation ("creator");
	} else {
		b.changeAnimation ("play");
	}
}

function createLift (x, y, i) {
	var l;
	l = createSprite (x, y);
	l.addToGroup (lifts);
	l.scale = 0.72;
	l.i = i;
	l.nearPlayer = 0;
	// HL deleted-1
	// lift
	if (i == 3) {
		l.addToGroup (walls2);
		l.setCollider ("rectangle", 0, 0, 68, 68);
		if (rotation == 0 || rotation == 2) {
			l.addAnimation ("creator", lift1Img);
			l.r = 1;
		} else {
			l.addAnimation ("creator", lift2Img);
			l.r = 2;
		}
		
		l.addAnimation ("play", liftImg);
		l.changeAnimation ("creator");
	}

	// bridge lift
	if (i == 4) {
		l.addToGroup (bridges);
		l.addAnimation ("play", bridgeLiftImg);
		l.setCollider ("rectangle", 0, -17.5, 68, 20);
		if (rotation == 0 || rotation == 2) {
			l.r = 1;
			l.addAnimation ("creator", bridgeLiftRLImg);
		} else {
			l.r = 2;
			l.addAnimation ("creator", bridgeLiftUDImg);
		}

		l.changeAnimation ("creator");
	}
}

function createRuby (x, y, id, enemy, EID) {
	var r;
	r = createSprite (x, y);
	r.addToGroup (rubies);
	r.scale = 0.72;
	r.addImage (rubyImg);
	r.setCollider ("rectangle", 0, 0, 35, 25);
	if (mode != 2) {
		r.id = id;
		r.velocity.y = 0.25;
		r.time = 25;
		if (enemy == 1) {
			r.weightID = EID;
		}
	}
}

function createWeight (x, y, id) {
	var w;
	w = createSprite (x, y);
	w.addToGroup (weights);
	w.scale = 0.72;
	w.addAnimation ("base", weightImg);
	w.addAnimation ("falling", "images/weight.png");
	w.changeAnimation ("base");
	w.setCollider ("rectangle", 0, 3, 68, 58);
	w.prePositionY = w.position.y;
	w.timeOut = 0;
	w.falling = 1;
	if (mode != 2) {
		w.id = id;
		w.addToGroup (walls2);
		for (let i = 2; i < optimization.rubyInfo.length; i += 3) {
			if (optimization.rubyInfo[i] == id) {
				if (optimization.rubyInfo[i - 1] == 1) {
					w.rubyID = optimization.rubyInfo[i - 2];
					i = optimization.rubyInfo.length;
					createRuby (w.position.x, w.position.y, w.rubyID, 1, w.id);
				}
			}
		}
	}
}

function createOneWayWall (x, y) {
	var o;
	o = createSprite (x, y);
	o.addToGroup (oneWayWalls);
	o.scale = 0.785;
	o.addImage (oneWayWallImg);
	o.setCollider ("rectangle", 0, 0, 63, 63);
	o.rotation = rotation * 90;
}

function createFallingBlock (x, y, i, id) {
	var f;
	f = createSprite (x, y);
	f.addToGroup (fallingBlocks2);
	f.addToGroup (walls);
	f.scale = 0.72;
	f.setCollider ("rectangle", 0, 0, 68, 68);
	f.prePositionY = f.position.y;
	f.timeOut = 0;
	f.falling = 1;
	if (mode != 2) {
		f.id = id;
	}
	
	if (i == 1) {
		f.addAnimation ("base", yellowFallingBlockImg);
		f.addAnimation ("touch", "images/orangeFallingBlock.png");
		f.changeAnimation ("base");
		f.i = 1;
	} else {
		f.addImage (redFallingBlockImg);
		f.i = 2;
	}
}

function Play () {
	game.thumbnail = 0;
	if (Mode == 1) {
		mode = 1;
		play.hide ();
		next.hide ();
		previous.hide ();
		creator.show ();
		SaveGame ();
		startPlay ();
		player.unsqueezable = 25;
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
		// reset
		RemoveSprites ();
		resetBlocks ();
		// load code
		for (let i = 0; i < code.length; i += 4) {
			append (Block, code[i]);
			append (positionX, code[i + 1]);
			append (positionY, code[i + 2]);
			append (Rotation, code[i + 3]);
		}
	
		// player
		checkPoint.position.x = start.position.x;
		checkPoint.position.y = start.position.y;
		checkPoint.rotation = 0;
		player.position.x = checkPoint.position.x;
		player.position.y = checkPoint.position.y - 20;

		startPlay ();
		saveGame.hide ();
		saveGame.hidden = true;
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
	player.position.x = round (player.position.x);
	player.position.y = round (player.position.y);
	player.prePositionX = round (player.position.x / 50) * 50;
	player.prePositionY = round (player.position.y / 50) * 50;
	game.build = 0;
	game.switch = 1;
	game.buttonPressed = 0;
	game.timedBlocks = 0;
	game.pullingSpikes = 0;
	optimization.buttonPressed = [];
	optimization.rubyInfo = [];
	optimization.fallingBlockY = [];
	optimization.weightX = [];
	optimization.rotatingBlocksRotaion = 0;
	inventory.preBlock = block;
	inventory.preRotation = rotation;
	inventory.preLenght = length;
	RemoveSprites ();
	// create blocks
	for (var i = Block.length - 1; i >= 0; i--) {
		block = Block[i];
		rotation = Rotation[i];
		if (rotation > 7) {
			length = rotation - floor (rotation / 10) * 10;
			rotation = floor ((rotation - 10) / 10);
		}

		if (block == 55) {
			// green buttons
			append (optimization.buttonPressed, i);
			append (optimization.buttonPressed, 1);
			createGreenButton (positionX[i] * 50, positionY[i] * 50, i);
		} else if (block == 65) {
			// rubies
			append (optimization.rubyInfo, i);
			append (optimization.rubyInfo, 1);
			append (optimization.rubyInfo, -1);
			createRuby (positionX[i] * 50, positionY[i] * 50, i);
		} else if (block == 5) {
			// falling blocks
			append (optimization.fallingBlockY, i);
			append (optimization.fallingBlockY, positionY[i] * 50);
			createWall (positionX[i] * 50, positionY[i] * 50, 2, i);
		} else if (block == 45 || block == 46) {
			// yellow & red falling blocks
			createFallingBlock (positionX[i] * 50, positionY[i] * 50, block - 44, i);
		} else if (block == 66) {
			// weights
			append (optimization.weightX, i);
			append (optimization.weightX, positionX[i] * 50);
			createWeight (positionX[i] * 50, positionY[i] * 50, i);
		} else if (block == 42) {
			// pulling spikes
			createPullingSpikes (positionX[i] * 50, positionY[i] * 50, i);
		} else if (block == 47) {
			// slimes
			let sl = {
				ID: i,
				posX: positionX[i] * 50,
				posY: positionY[i] * 50 + 9,
				alive: true,
				active: true,
				velX: -2,
				velY: 0
			}

			slime.push (sl);
			createSlime (positionX[i] * 50, positionY[i] * 50, slime.length - 1);
		} else {
			createBlock (positionX[i] * 50, positionY[i] * 50, 2, i);
		}
	}

	// moving saws
	for (let i = 0; i < movingSaws.length; i++) {
		var s = movingSaws[i];
		s.undestroyable = 1;
		s.moveTime = 0;
		if (s.rotation == 0 || s.rotation == 180) {
			detectWalls (s, 1);
		} else {
			detectWalls (s, 2);
		}

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

	// stomps
	for (let i = stomps.length - 1; i >= 0; i--) {
		var t = stomps[i];
		t.id = i;
		t.moveTime = 0;
		t.undestroyable = 1;
		var s;
		s = createSprite (t.position.x, t.position.y);
		s.addToGroup (spikes);
		s.addToGroup (stompSpikes);
		s.rotation = t.r * 90 + 180;
		s.scale = 0.72;
		s.addImage (spikeImg);
		s.id = i;
		s.undestroyable = 1;
		if (t.r == 0) {
			detectWalls (t, 2);
			s.setCollider ("rectangle", 0, -14, 68, 30);
			s.position.y += 50;
			s.velocity.y = 6;
			t.velocity.y = 6;
		} else if (t.r == 1) {
			detectWalls (t, 3);
			s.setCollider ("rectangle", 13, 0, 68, 30);
			s.position.x -= 50;
			s.velocity.x = -6;
			t.velocity.x = -6;
		} else if (t.r == 2) {
			detectWalls (t, 4);
			s.setCollider ("rectangle", 0, 13, 68, 30);
			s.position.y -= 50;
			s.velocity.y = -6;
			t.velocity.y = -6;
		} else if (t.r == 3) {
			detectWalls (t, 1);
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
		s.position.y -= 3;
		s.slime = 1;
	}

	// lifts
	for (let i = 0; i < lifts.length; i++) {
		var l = lifts[i];
		l.changeAnimation ("play");
		l.undestroyable = 1;
		l.moveTime = 0;
		// detect walls
		if (l.i == 1) {
			if (l.rotation == 0 || l.rotation == 180) {
				detectWalls (l, 1);
			} else {
				detectWalls (l, 2);
			}
		} else if (l.i == 2) {
			if (l.rotation == 0 || l.rotation == 180) {
				detectWalls (l, 2);
			} else {
				detectWalls (l, 1);
			}
		} else {
			if (l.r == 1) {
				detectWalls (l, 1);
			} else {
				detectWalls (l, 2);
			}
		}

		// HL deleted-2

		// lift
		if (l.i == 3) {
			if (l.r == 1) {
				l.velocity.x = 2;
			} else {
				l.velocity.y = 2;
			}

			// lift green buttons
			l.greenButton = [0, 0, 0, 0];
			for (let o = 0; o < greenButtons.length;) {
				let g = greenButtons[o];
				if (g.rotation == 0 && g.position.x == l.position.x && g.position.y == l.position.y - 50) {
					l.greenButton[0] = 1;
					buttonPressed (l, g, 1);
				} else if (g.rotation == 90 && g.position.x == l.position.x + 50 && g.position.y == l.position.y) {
					l.greenButton[1] = 1;
					buttonPressed (l, g, 1);
				} else if (g.rotation == 180 && g.position.x == l.position.x && g.position.y == l.position.y + 50) {
					l.greenButton[2] = 1;
					buttonPressed (l, g, 1);
				} else if (g.rotation == 270 && g.position.x == l.position.x - 50 && g.position.y == l.position.y) {
					l.greenButton[3] = 1;
					buttonPressed (l, g, 1);
				} else {
					o++
				}
			}
		}
		
		// bridge lift
		if (l.i == 4) {
			if (l.r == 1) {
				l.velocity.x = 2;
			} else {
				l.velocity.y = 2;
			}
		}
	}

	// rubies
	game.collectedrubies = 0;
	game.totalrubies = rubies.length;
	for (let i = 0; i < rubies.length; i++) {
		var r = rubies[i];
		r.overlap (weights, function (r, w) {
			for (let l = 0; l < optimization.rubyInfo.length; l += 3) {
				if (optimization.rubyInfo[l] == r.id) {
					optimization.rubyInfo[l + 2] = w.id;
					l = optimization.rubyInfo.length;
				}
			}
		});

		r.velocity.y = 0.25;
		r.time = 25;
	}

	// exit
	if (game.totalrubies > 0) {
		exit.changeAnimation ("closed");
	} else {
		exit.changeAnimation ("open");
	}

	// reset blocks
	weights.removeSprites ();
	rubies.removeSprites ();
	for (let i = 0; i < Block.length; i++) {
		const block = Block[i];
		if (block == 65) {
			for (let l = 0; l < optimization.rubyInfo.length; l+= 3) {
				if (optimization.rubyInfo[l] == i) {
					if (optimization.rubyInfo[l + 2] == -1) {
						createRuby (positionX[i] * 50, positionY[i] * 50, i);
						l = optimization.rubyInfo.length;
					} else {
						l = optimization.rubyInfo.length;
					}
				}
			}
		} else if (block == 66) {
			createWeight (positionX[i] * 50, positionY[i] * 50, i);
		}
	}
	// optimization
	for (let i = 0; i < allSprites.length;) {
		var s = allSprites[i];
		if (s.undestroyable != 1) {
			if (fireBars.contains (s)) {
				// fire bar
				if (s.position.x > player.prePositionX + 725 || s.position.x < player.prePositionX - 725 || s.position.y < player.prePositionY -675 || s.position.y > player.prePositionY + 675) {
					for (let l = 0; l < fireBalls.length;) {
						var f = fireBalls[l];
						if (f.id == s.id) {
							f.remove ();
						} else {
							l++;
						}
					}

					s.remove ();
				} else {
					i ++;
				}
			} else if (rotatingSaws.contains (s)) {
				// rotating saw
				if (s.position.x > player.prePositionX + 725 || s.position.x < player.prePositionX - 725 || s.position.y < player.prePositionY - 675 || s.position.y > player.prePositionY + 675) {
					for (let l = 0; l < rotatingTypes.length;) {
						var r = rotatingTypes[l];
						if (r.id == s.id) {
							r.remove ();
						} else {
							l++;
						}
					}

					s.remove ();
				} else {
					i ++;
				}
			} else if (slimes.contains (s)) {
				// slimes
				if (s.position.x > player.prePositionX + 350 || s.position.x < player.prePositionX - 350 || s.position.y < player.prePositionY - 350 || s.position.y > player.prePositionY + 350) {
					slime[s.id].active = false;
					s.remove ();
				} else {
					i ++;
				}
			} else if (s.position.x > player.prePositionX + 425 || s.position.x < player.prePositionX - 425 || s.position.y < player.prePositionY - 425 || s.position.y > player.prePositionY + 425) {
				s.remove ();
			} else {
				i ++;
			}
		} else {
			i ++;
		}
	}

	block = inventory.preBlock;
	rotation = inventory.preRotation;
	length = inventory.preLenght;
}

function Creator () {
	mode = 2;
	game.code = 0;
	game.switch = 1;
	game.buttonPressed = 0;
	game.timedBlocks = 0;
	// buttons
	play.show ();
	creator.hide ();
	next.show ();
	previous.show ();
	// player
	player.velocityX = 0;
	player.velocityY = 0;
	player.death = 0;
	player.visible = true;
	game.build = 0;
	player.prePositionX = round (player.position.x / 50) * 50;
	player.prePositionY = round (player.position.y / 50) * 50;
	exit.changeAnimation ("closed");
	RemoveSprites ();
	// create blocks
	inventory.preBlock = block;
	inventory.preRotation = rotation;
	inventory.preLenght = length;
	for (let i = 0; i < Block.length; i++) {
		block = Block[i];
		rotation = Rotation[i];
		if (rotation > 7) {
			length = rotation - floor (rotation / 10) * 10;
			rotation = floor ((rotation - 10) / 10);
		}

		if (block == 38 || block == 39 || block == 40 || block == 41) {
			if (positionX[i] < (player.prePositionX + 701) / 50 && positionX[i] > (player.prePositionX - 701) / 50 && positionY[i] > (player.prePositionY - 651) / 50 && positionY[i] < (player.prePositionY + 651) / 50) {
				if (block == 38 || block == 39) {
					// fire bar
					createFireBar (positionX[i] * 50, positionY[i] * 50, block - 37, 0, i);
				} else {
					// rotating saw
					createRotatingSaw (positionX[i] * 50, positionY[i] * 50, block - 39, 0, i);
				}
			}
		} else if (positionX[i] < (player.prePositionX + 401) / 50 && positionX[i] > (player.prePositionX - 401) / 50 && positionY[i] > (player.prePositionY - 401) / 50 && positionY[i] < (player.prePositionY + 401) / 50) {
			createBlock (positionX[i] * 50, positionY[i] * 50, 2, i);
		}
	}

	block = inventory.preBlock;
	rotation = inventory.preRotation;
	length = inventory.preLenght;
}

function resetBlocks (reset) {
	camera.zoom = 1;
	player.velocityX = 0;
	player.velocityY = 0;
	player.velocity.y = 0;
	player.velocity.x = 0;
	player.death = 0;
	player.anim = 1;
	player.changeAnimation ("front");
	player.setCollider ("rectangle", 0, 0, 65, 91);
	player.visible = true;
	player.position.x = round (player.position.x);
	player.position.y = round (player.position.y);
	player.prePositionX = round (player.position.x / 50) * 50;
	player.prePositionY = round (player.position.y / 50) * 50;
	game.build = 0;
	game.switch = 1;
	game.buttonPressed = 0;
	game.timedBlocks = 0;
	game.pullingSpikes = 0;
	slime = [];
	// green buttons on lift
	greenButtons.forEach (g => {
		if (g.liftID > -1) {
			lifts[g.liftID].greenButton[g.rotation / 90] = 1;
		}
	});

	// reset green buttons
	for (let i = 1; i <= optimization.buttonPressed.length; i += 2) {
		optimization.buttonPressed[i] = 1;
	}

	// falling blocks
	for (let i = 0; i < optimization.fallingBlockY.length; i += 2) {
		optimization.fallingBlockY[i + 1] = positionY[optimization.fallingBlockY[i]] * 50;
	}

	// level reset
	if (reset != 1) {
		time = 0;
		game.collectedrubies = 0;
		deaths = 0;
		for (let i = 0; i < optimization.rubyInfo.length; i += 3) {
			optimization.rubyInfo[i + 1] = 1;
		}
	}

	// delete blocks
	fireBalls.removeSprites ();
	rotatingTypes.removeSprites ();
	for (let i = 0; i < allSprites.length;) {
		var s = allSprites[i];
		if (s.undestroyable != 1) {
			s.remove ();
		} else {
			i ++;
		}
	}
	
	// create blocks
	inventory.preBlock = block;
	inventory.preRotation = rotation;
	inventory.preLenght = length;
	for (let i = 0; i < Block.length; i++) {
		block = Block[i];
		rotation = Rotation[i];
		if (rotation > 7) {
			length = rotation - floor (rotation / 10) * 10;
			rotation = floor ((rotation - 10) / 10);
		}

		if (block == 47) {
			// slimes
			let sl = {
				ID: i,
				posX: positionX[i] * 50,
				posY: positionY[i] * 50 + 9,
				alive: true,
				active: true,
				velX: -2,
				velY: 0
			}

			slime.push (sl);
			createSlime (positionX[i] * 50, positionY[i] * 50, slime.length - 1);
		} else if (block == 38 || block == 39 || block == 40 || block == 41) {
			if (positionX[i] < (player.prePositionX + 701) / 50 && positionX[i] > (player.prePositionX - 701) / 50 && positionY[i] > (player.prePositionY - 651) / 50 && positionY[i] < (player.prePositionY + 651) / 50) {
				if (block == 38 || block == 39) {
					// fire bar
					createFireBar (positionX[i] * 50, positionY[i] * 50, block - 37, 0, i);
				} else {
					// rotating saw
					createRotatingSaw (positionX[i] * 50, positionY[i] * 50, block - 39, 0, i);
				}
			}
		} else if (positionX[i] < (player.prePositionX + 401) / 50 && positionX[i] > (player.prePositionX - 401) / 50 && positionY[i] > (player.prePositionY - 401) / 50 && positionY[i] < (player.prePositionY + 401) / 50) {
			if (block == 55) {
				// green button
				for (let l = 0; l < Block.length; l++) {
					const b = Block[l];
					if (b == 63) {
						// detect if it's on lift
						if (positionX[i] == positionX[l] + 1 && positionY[i] == positionY[l] || positionX[i] == positionX[l] - 1 && positionY[i] == positionY[l] || positionX[i] == positionX[l] && positionY[i] == positionY[l] - 1 || positionX[i] == positionX[l] && positionY[i] == positionY[l] + 1) {} else {
							createGreenButton (positionX[i] * 50, positionY[i] * 50, i);
						}
					}
				}
			} else if (block == 65) {
				if (reset == 1) {
					// rubies
					for (let l = 0; l < optimization.rubyInfo.length; l += 3) {
						if (optimization.rubyInfo[l] == i) {
							if (optimization.rubyInfo[l + 1] == 1 && optimization.rubyInfo[l + 2] == -1) {
								createRuby (positionX[i] * 50, positionY[i] * 50, i);
								l = optimization.rubyInfo.length;
							} else {
								l = optimization.rubyInfo.length;
							}
						}
					}
				}
			} else if (block == 5) {
				createWall (positionX[i] * 50, positionY[i] * 50, 2, i);
			} else if (block == 45 || block == 46) {
				createFallingBlock (positionX[i] * 50, positionY[i] * 50, block - 44, i);
			} else if (block == 66) {
				createWeight (positionX[i] * 50, positionY[i] * 50, i);
			} else if (block == 42) {
				createPullingSpikes (positionX[i] * 50, positionY[i] * 50, i);
			} else if (block != 43 && block != 63 && block != 64 && block != 34 && block != 35) {
				createBlock (positionX[i] * 50, positionY[i] * 50, 2, i);
			}
		}
	}

	for (let i = 0; i < slimes.length; i++) {
		const s = slimes[i];
		if (s.position.x > player.prePositionX + 350 || s.position.x < player.prePositionX - 350 || s.position.y > player.prePositionY + 350 || s.position.y < player.prePositionY - 350) {
			// slime too far
			if (s.life = -1) {
				slime[s.id].active = false;
				s.remove ();
			}
		}
	}

	block = inventory.preBlock;
	rotation = inventory.preRotation;
	length = inventory.preLenght;
	player.changeAnimation ("front");
	player.anim = 1;
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

	// rubies
	for (let i = 0; i < rubies.length; i++) {
		var r = rubies[i];
		if (r.time == -1000) {
			r.velocity.x = r.preVelocityX;
		} else {
			r.velocity.y = r.preVelocityY;
		}
	}

	// lifts
	for (let i = 0; i < lifts.length; i++) {
		var l = lifts[i];
		l.velocity.x = l.preVelocityX;
		l.velocity.y = l.preVelocityY;
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
	startPlay ();
}

function NextLevel () {
	clickSnd.play ();
	level ++;
	if (game.code == 0) {
		if (game.preMode == 4) {
			mode = 6;
		}

		loadLevel ();
	} else {
		generateLevel ();
	}
}

function SaveGame () {
	saveGame.hide ();
	saveGame.hidden = true;
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
	// reset
	RemoveSprites ();
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

	inventory.preBlock = block;
	inventory.preRotation = rotation;
	inventory.preLenght = length;
	// lists
	positionX = [];
	positionY = [];
	Block = [];
	Rotation = [];
	// reset
	RemoveSprites ();
	// local storage
	j = localStorage.getItem ("track" + track + "level" + level + "posX");
	positionX = JSON.parse (j);
	j = localStorage.getItem ("track" + track + "level" + level + "posY");
	positionY = JSON.parse (j);
	j = localStorage.getItem ("track" + track + "level" + level + "blocks");
	Block = JSON.parse (j);
	j = localStorage.getItem ("track" + track + "level" + level + "rotation");
	Rotation = JSON.parse (j);
	// player
	checkPoint.position.x = start.position.x;
	checkPoint.position.y = start.position.y;
	checkPoint.rotation = 0;
	player.position.x = checkPoint.position.x;
	player.position.y = checkPoint.position.y - 20;
	player.prePositionX = round (player.position.x / 50) * 50;
	player.prePositionY = round (player.position.y / 50) * 50;

	if (Mode == 4) {
		startPlay ();
	}
	
	if (mode == 2) {
		// create blocks
		for (var i = Block.length - 1; i >= 0; i--) {
			block = Block[i];
			rotation = Rotation[i];
			if (rotation > 7) {
				length = rotation - floor (rotation / 10) * 10;
				rotation = floor ((rotation - 10) / 10);
			}
	
			createBlock (positionX[i] * 50, positionY[i] * 50, 2, i);
		}

		// optimization
		for (let i = 0; i < allSprites.length;) {
			var s = allSprites[i];
			if (s.undestroyable != 1) {
				if (s.position.x > player.prePositionX + 400 || s.position.x < player.prePositionX - 400 || s.position.y < player.prePositionY - 400 || s.position.y > player.prePositionY + 400) {
					s.remove ();
				} else {
					i ++;
				}
			} else {
				i ++;
			}
		}
	}

	block = inventory.preBlock;
	rotation = inventory.preRotation;
	length = inventory.preLenght;
}

function EditLevel () {
	clickSnd.play ();
	Mode = 1;
	mode = 2;
	Creator ();
	game.build = -10;
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
		for (let i = 0; i <= game.trackOrder.length; i++) {
			if (game.trackOrder[i] > track) {
				game.trackOrder[i] --;
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

		// rubies
		for (let i = 0; i < rubies.length; i++) {
			var r = rubies[i];
			if (r.time == -1000) {
				r.preVelocityX = r.velocity.x;
				r.velocity.x = 0;
			} else {
				r.preVelocityY = r.velocity.y;
				r.velocity.y = 0;
			}
		}

		// lifts
		for (let i = 0; i < lifts.length; i++) {
			var l = lifts[i];
			l.preVelocityX = l.velocity.x;
			l.preVelocityY = l.velocity.y;
			l.velocity.x = 0;
			l.velocity.y = 0;
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
	clickSnd.play ();
	game.code = 0;
	hideButtons ();
	codeInput.hide ();
	// set variables
	j = codeInput.value ();
	code = JSON.parse (j);
	tracksNumber ++;
	track = tracksNumber;
	// local storage
	game.trackOrder.splice (0, 0, track);
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
	// reset
	RemoveSprites ();
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
		if (rotation > 7) {
			length = rotation - floor (rotation / 10) * 10;
			rotation = floor ((rotation - 10) / 10);
		}

		createBlock (positionX[i] * 50, positionY[i] * 50, 2, i);
	}

	// player
	checkPoint.position.x = start.position.x;
	checkPoint.position.y = start.position.y;
	checkPoint.rotation = 0;
	player.position.x = checkPoint.position.x;
	player.position.y = checkPoint.position.y - 20;

	startPlay ();
	saveGame.hide ();
	saveGame.hidden = true;
}

function RemoveSprites () {
	walls.removeSprites ();
	lava.removeSprites ();
	checkPoints.removeSprites ();
	fallingBlocks.removeSprites ();
	trampolines.removeSprites ();
	ladders.removeSprites ();
	ice.removeSprites ();
	decorations.removeSprites ();
	spikes.removeSprites ();
	saws.removeSprites ();
	movingSaws.removeSprites ();
	halfSaws.removeSprites ();
	stoppers.removeSprites ();
	stomps.removeSprites ();
	slimes.removeSprites ();
	blueBlocks.removeSprites ();
	redBlocks.removeSprites ();
	timedBlocks.removeSprites ();
	greenBlocks.removeSprites ();
	bridges.removeSprites ();
	boosters.removeSprites ();
	rubies.removeSprites ();
	walls2.removeSprites ();
	oneWayWalls.removeSprites ();
	deadWeights.removeSprites ();
	fireBalls.removeSprites ();
	rotatingTypes.removeSprites ();
	weights.removeSprites ();
	greenButtons.removeSprites ();
	for (let i = 0; i < water.length;) {
		var w = water[0];
		w.remove ();
	}
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
	saveGame.hidden = true;
}

window.addEventListener ("beforeunload", function (ev) {
	// page unload save game
	if (saveGame.hidden == false) {
		ev.returnValue = "";
	}
});

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
			text ("Beta 1.2", 15, 480);
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
	// game optimization
	optimization.chunkUpdate = 0;
	// position x
	if (player.position.x > player.prePositionX + 50) {
		optimization.chunkUpdate = 1;
		player.prePositionX += 50;
		// remove blocks
		for (let i = 0; i < allSprites.length;) {
			var s = allSprites[i];
			if (s.undestroyable != 1 && s.pullingSpikes != 1 && s.slime != 1) {
				if (fireBars.contains (s)) {
					// fire bars
					if (s.position.x < player.prePositionX - 725) {
						for (let l = 0; l < fireBalls.length;) {
							var f = fireBalls[l];
							if (f.id == s.id) {
								f.remove ();
							} else {
								l ++;
							}
						}
												
						s.remove ();
					} else {
						i ++;
					}
				} else if (rotatingSaws.contains (s)) {
					// rotating saws
					if (s.position.x < player.prePositionX - 725) {
						for (let l = 0; l < rotatingTypes.length;) {
							var r = rotatingTypes[l];
							if (r.id == s.id) {
								r.remove ();
							} else {
								l ++;
							}
						}
												
						s.remove ();
					} else {
						i ++;
					}
				} else if (s.position.x < player.prePositionX - 425) {
					if (s.pullingBlock == 1) {
						// pulling spikes
						for (let l = 0; l < pullingSpikes.length; l++) {
							var p = pullingSpikes[l];
							if (p.id == s.id) {
								p.remove ();
								l = pullingSpikes.length;
							}
						}
					}

					s.remove ();
				} else {
					i ++;
				}
			} else {
				i ++;
			}
		}

		inventory.preBlock = block;
		inventory.preRotation = rotation;
		inventory.preLenght = length;
		// crete new blocks
		if (mode != 2) {
			for (let i = 0; i < slime.length; i++) {
				// slime
				if (slime[i].active == false && slime[i].alive == true) {
					if (slime[i].posX > (player.position.x - 350) && slime[i].posX < (player.position.x + 350) && slime[i].posY > (player.position.y - 350) && slime[i].posY < (player.position.y + 350)) {
						slime[i].active = true;
						createSlime (slime[i].posX, slime[i].posY, i);
					}
				}
			}
		}

		for (let i = 0; i < Block.length; i++) {
			block = Block[i];
			rotation = Rotation[i];
			if (rotation > 7) {
				length = rotation - floor (rotation / 10) * 10;
				rotation = floor ((rotation - 10) / 10);
			}

			if (Block[i] == 5 && mode != 2) {
				// falling blocks
				var posY;
				for (let l = 0; l < optimization.fallingBlockY.length; l+= 2) {
					if (optimization.fallingBlockY[l] == i) {
						posY = optimization.fallingBlockY[l + 1];
						l = optimization.fallingBlockY.length;
					}
				}

				if (positionX[i] > (player.prePositionX + 350) / 50 && positionX[i] < (player.prePositionX + 401) / 50 && posY > player.prePositionY - 401 && posY < player.prePositionY + 401) {
					block = Block[i];
					rotation = Rotation[i];
					createWall (positionX[i] * 50, posY, 2, i);
				}
			} else if (block == 38 || block == 39 || block == 40 || block == 41) {
				if (positionX[i] > (player.prePositionX + 650) / 50 && positionX[i] < (player.prePositionX + 701) / 50 && positionY[i] > (player.prePositionY - 651) / 50 && positionY[i] < (player.prePositionY + 651) / 50) {
					if (block == 38 || block == 39) {
						// fire bar
						createFireBar (positionX[i] * 50, positionY[i] * 50, block - 37, 0, i);
					} else {
						// rotating saw
						createRotatingSaw (positionX[i] * 50, positionY[i] * 50, block - 39, 0, i);
					}
				}
			} else if (block == 66 && mode != 2) {
				// weights
				var posX;
				var w;
				for (let l = 0; l < optimization.weightX.length; l+= 2) {
					if (optimization.weightX[l] == i) {
						if (optimization.weightX[l + 1] == 9999) {
							w = false;
							l = optimization.weightX.length;
						} else {
							w = true;
							posX = optimization.weightX[l + 1];
							l = optimization.weightX.length;
						}
					}
				}

				if (w == true) {
					if (posX > player.prePositionX + 350 && posX < player.prePositionX + 401 && positionY[i] > (player.prePositionY - 401) / 50 && positionY[i] < (player.prePositionY + 401) / 50) {
						var c = 0;
						for (let l = 0; l < weights.length; l++) {
							var w = weights[l];
							if (w.id == i) {
								l = weights.length;
								c = 1;
							}
						}
	
						if (c == 0) {
							createWeight (posX, positionY[i] * 50, i);
						}
					}
				}
			} else if (positionX[i] > (player.prePositionX + 350) / 50 && positionX[i] < (player.prePositionX + 401) / 50 && positionY[i] > (player.prePositionY - 401) / 50 && positionY[i] < (player.prePositionY + 401) / 50) {
				if (mode != 2) {
					if (block == 55) {
						// green buttons
						for (let l = 0; l < optimization.buttonPressed.length; l+= 2) {
							if (optimization.buttonPressed[l] == i) {
								if (optimization.buttonPressed[l + 1] == 1) {
									createGreenButton (positionX[i] * 50, positionY[i] * 50, i);
									l = optimization.buttonPressed.length;
								} else {
									l = optimization.buttonPressed.length;
								}
							}
						}
					} else if (block == 65) {
						// rubies
						for (let l = 0; l < optimization.rubyInfo.length; l += 3) {
							if (optimization.rubyInfo[l] == i) {
								if (optimization.rubyInfo[l + 1] == 1 && optimization.rubyInfo[l + 2] == -1) {
									createRuby (positionX[i] * 50, positionY[i] * 50, i);
									l = optimization.rubyInfo.length;
								} else {
									l = optimization.rubyInfo.length;
								}
							}
						}
					} else if (block == 45 || block == 46) {
						// falling blocks
						var c = 0;
						for (let l = 0; l < fallingBlocks2.length; l++) {
							var f = fallingBlocks2[l];
							if (f.id == i) {
								l = fallingBlocks2.length;
								c = 1;
							}
						}

						if (c == 0) {
							createFallingBlock (positionX[i] * 50, positionY[i] * 50, block - 44, i);
						}
					} else if (block == 5) {
						for (let l = 0; l < optimization.fallingBlockY.length; l+= 2) {
							if (optimization.fallingBlockY[l] == i) {
								if (optimization.fallingBlockY[l + 1] > (player.prePositionY - 401) && optimization.fallingBlockY[l + 1] < (player.prePositionY + 401)) {
									createWall (positionX[i] * 50, optimization.fallingBlockY[l], i);
									l = optimization.fallingBlockY.length;
								} else {
									l = optimization.fallingBlockY.length;
								}
							}
						}
					} else if (block == 42) {
						createPullingSpikes (positionX[i] * 50, positionY[i] * 50, i);
					} else {
						if (block != 34 && block != 35 && block != 43 && block != 63 && block != 64 && block != 47) {
							var blockDetected = 0;
							if (block == 1 || block == 8 || block == 10 || block == 11 || block == 12 || block == 13 || block == 14 || block == 28 || block == 51) {
								for (let l = 0; l < walls.length; l++) {
									var w = walls[l];
									var posY = round (w.position.y / 50) * 50;
									if (w.position.x == positionX[i] * 50 && posY == positionY[i] * 50 && w.undestroyable == 1) {
										blockDetected = 1;
										l = walls.length;
									}
								}
							} else if (block == 33) {
								for (let l = 0; l < stoppers.length; l++) {
									var w = stoppers[l];
									if (w.position.x == positionX[i] * 50 && w.position.y == positionY[i] * 50 && w.undestroyable == 1) {
										blockDetected = 1;
										l = stoppers.length;
									}
								}
							} else if (block == 68) {
								for (let l = 0; l < oneWayWalls.length; l++) {
									var w = oneWayWalls[l];
									if (w.position.x == positionX[i] * 50 && w.position.y == positionY[i] * 50 && w.undestroyable == 1) {
										blockDetected = 1;
										l = oneWayWalls.length;
									}
								}
							}

							if (blockDetected != 1) {
								createBlock (positionX[i] * 50, positionY[i] * 50, 2, i);
							}
						}
					}
				} else {
					createBlock (positionX[i] * 50, positionY[i] * 50, 2, i);
				}
			}
		}

		block = inventory.preBlock;
		rotation = inventory.preRotation;
		length = inventory.preLenght;
	}

	if (player.position.x < player.prePositionX - 50) {
		optimization.chunkUpdate = 1;
		player.prePositionX -= 50;
		// remove blocks
		for (let i = 0; i < allSprites.length;) {
			var s = allSprites[i];
			if (s.undestroyable != 1 && s.pullingSpikes != 1 && s.slime != 1) {
				if (fireBars.contains (s)) {
					// fire bars
					if (s.position.x > player.prePositionX + 725) {
						for (let l = 0; l < fireBalls.length;) {
							var f = fireBalls[l];
							if (f.id == s.id) {
								f.remove ();
							} else {
								l ++;
							}
						}
												
						s.remove ();
					} else {
						i ++;
					}
				} else if (rotatingSaws.contains (s)) {
					// rotating saws
					if (s.position.x > player.prePositionX + 725) {
						for (let l = 0; l < rotatingTypes.length;) {
							var r = rotatingTypes[l];
							if (r.id == s.id) {
								r.remove ();
							} else {
								l ++;
							}
						}
												
						s.remove ();
					} else {
						i ++;
					}
				} else if (s.position.x > player.prePositionX + 425) {
					if (s.pullingBlock == 1) {
						// pulling spikes
						for (let l = 0; l < pullingSpikes.length; l++) {
							var p = pullingSpikes[l];
							if (p.id == s.id) {
								p.remove ();
								l = pullingSpikes.length;
							}
						}
					}

					s.remove ();
				} else {
					i ++;
				}
			} else {
				i ++;
			}
		}

		inventory.preBlock = block;
		inventory.preRotation = rotation;
		inventory.preLenght = length;
		// crete new blocks
		if (mode != 2) {
			for (let i = 0; i < slime.length; i++) {
				// slime
				if (slime[i].active == false && slime[i].alive == true) {
					if (slime[i].posX > (player.position.x - 350) && slime[i].posX < (player.position.x + 350) && slime[i].posY > (player.position.y - 350) && slime[i].posY < (player.position.y + 350)) {
						slime[i].active = true;
						createSlime (slime[i].posX, slime[i].posY, i);
					}
				}
			}
		}

		for (let i = 0; i < Block.length; i++) {
			block = Block[i];
			rotation = Rotation[i];
			if (rotation > 7) {
				length = rotation - floor (rotation / 10) * 10;
				rotation = floor ((rotation - 10) / 10);
			}

			if (Block[i] == 5 && mode != 2) {
				// falling blocks
				var posY;
				for (let l = 0; l < optimization.fallingBlockY.length; l+= 2) {
					if (optimization.fallingBlockY[l] == i) {
						posY = optimization.fallingBlockY[l + 1];
						l = optimization.fallingBlockY.length;
					}
				}

				if (positionX[i] < (player.prePositionX - 350) / 50 && positionX[i] > (player.prePositionX - 401) / 50 && posY > player.prePositionY - 401 && posY < player.prePositionY + 401) {
					block = Block[i];
					rotation = Rotation[i];
					createWall (positionX[i] * 50, posY, 2, i);
				}
			} if (block == 38 || block == 39 || block == 40 || block == 41) {
				if (positionX[i] < (player.prePositionX - 650) / 50 && positionX[i] > (player.prePositionX - 701) / 50 && positionY[i] > (player.prePositionY - 651) / 50 && positionY[i] < (player.prePositionY + 651) / 50) {
					if (block == 38 || block == 39) {
						// fire bar
						createFireBar (positionX[i] * 50, positionY[i] * 50, block - 37, 0, i);
					} else {
						// rotating saw
						createRotatingSaw (positionX[i] * 50, positionY[i] * 50, block - 39, 0, i);
					}
				}
			} else if (block == 66 && mode != 2) {
				// weights
				var posX;
				var w;
				for (let l = 0; l < optimization.weightX.length; l += 2) {
					if (optimization.weightX[l] == i) {
						if (optimization.weightX[l + 1] == 9999) {
							w = false;
							l = optimization.weightX.length;
						} else {
							w = true;
							posX = optimization.weightX[l + 1];
							l = optimization.weightX.length;
						}
					}
				}

				if (w == true) {
					if (posX < player.prePositionX - 350 && posX > player.prePositionX - 401 && positionY[i] > (player.prePositionY - 401) / 50 && positionY[i] < (player.prePositionY + 401) / 50) {
						var c = 0;
						for (let l = 0; l < weights.length; l++) {
							var w = weights[l];
							if (w.id == i) {
								l = weights.length;
								c = 1;
							}
						}
	
						if (c == 0) {
							createWeight (posX, positionY[i] * 50, i);
						}
					}
				}
			} if (positionX[i] < (player.prePositionX - 350) / 50 && positionX[i] > (player.prePositionX - 401) / 50 && positionY[i] > (player.prePositionY - 401) / 50 && positionY[i] < (player.prePositionY + 401) / 50) {
				if (mode != 2) {
					if (block == 55) {
						// green buttons
						for (let l = 0; l < optimization.buttonPressed.length; l+= 2) {
							if (optimization.buttonPressed[l] == i) {
								if (optimization.buttonPressed[l + 1] == 1) {
									createGreenButton (positionX[i] * 50, positionY[i] * 50, i);
									l = optimization.buttonPressed.length;
								} else {
									l = optimization.buttonPressed.length;
								}
							}
						}
					} else if (block == 65) {
						// rubies
						for (let l = 0; l < optimization.rubyInfo.length; l += 3) {
							if (optimization.rubyInfo[l] == i) {
								if (optimization.rubyInfo[l + 1] == 1 && optimization.rubyInfo[l + 2] == -1) {
									createRuby (positionX[i] * 50, positionY[i] * 50, i);
									l = optimization.rubyInfo.length;
								} else {
									l = optimization.rubyInfo.length;
								}
							}
						}
					} else if (block == 45 || block == 46) {
						// falling blocks
						var c = 0;
						for (let l = 0; l < fallingBlocks2.length; l++) {
							var f = fallingBlocks2[l];
							if (f.id == i) {
								l = fallingBlocks2.length;
								c = 1;
							}
						}

						if (c == 0) {
							createFallingBlock (positionX[i] * 50, positionY[i] * 50, block - 44, i);
						}
					} else if (block == 42) {
						createPullingSpikes (positionX[i] * 50, positionY[i] * 50, i);
					} else {
						if (block != 34 && block != 35 && block != 43 && block != 63 && block != 64 && block != 47) {
							var blockDetected = 0;
							if (block == 1 || block == 8 || block == 10 || block == 11 || block == 12 || block == 13 || block == 14 || block == 28 || block == 51) {
								for (let l = 0; l < walls.length; l++) {
									var w = walls[l];
									var posY = round (w.position.y / 50) * 50;
									if (w.position.x == positionX[i] * 50 && posY == positionY[i] * 50 && w.undestroyable == 1) {
										blockDetected = 1;
										l = walls.length;
									}
								}
							} else if (block == 33) {
								for (let l = 0; l < stoppers.length; l++) {
									var w = stoppers[l];
									if (w.position.x == positionX[i] * 50 && w.position.y == positionY[i] * 50 && w.undestroyable == 1) {
										blockDetected = 1;
										l = stoppers.length;
									}
								}
							} else if (block == 68) {
								for (let l = 0; l < oneWayWalls.length; l++) {
									var w = oneWayWalls[l];
									if (w.position.x == positionX[i] * 50 && w.position.y == positionY[i] * 50 && w.undestroyable == 1) {
										blockDetected = 1;
										l = oneWayWalls.length;
									}
								}
							}

							if (blockDetected != 1) {
								createBlock (positionX[i] * 50, positionY[i] * 50, 2, i);
							}
						}
					}
				} else {
					createBlock (positionX[i] * 50, positionY[i] * 50, 2, i);
				}
			}
		}

		block = inventory.preBlock;
		rotation = inventory.preRotation;
		length = inventory.preLenght;
	}

	// position y
	if (player.position.y < player.prePositionY - 50) {
		optimization.chunkUpdate = 1;
		player.prePositionY -= 50;
		// remove blocks
		for (let i = 0; i < allSprites.length;) {
			var s = allSprites[i];
			if (s.undestroyable != 1 && s.pullingSpikes != 1 && s.slime != 1) {
				if (fireBars.contains (s)) {
					// fire bars
					if (s.position.y > player.prePositionY + 675) {
						for (let l = 0; l < fireBalls.length;) {
							var f = fireBalls[l];
							if (f.id == s.id) {
								f.remove ();
							} else {
								l ++;
							}
						}
												
						s.remove ();
					} else {
						i ++;
					}
				} else if (rotatingSaws.contains (s)) {
					// rotating saws
					if (s.position.y > player.prePositionY + 675) {
						for (let l = 0; l < rotatingTypes.length;) {
							var r = rotatingTypes[l];
							if (r.id == s.id) {
								r.remove ();
							} else {
								l ++;
							}
						}
												
						s.remove ();
					} else {
						i ++;
					}
				} else if (s.position.y > player.prePositionY + 425) {
					if (mode == 2) {
						s.remove ();
					} else {
						if (s.falling == 1) {
							s.position.y = s.prePositionY;
							if (s.position.y > player.prePositionY + 400 || s.position.y < player.position.y - 400) {
								s.remove ();
							} else {
								i ++;
								if (s.i > 0) {
									if (player.position.x > s.position.x + 48 || player.position.x < s.position.x - 48 || player.position.y > s.prePositionY + 58 || player.position.y < s.prePositionY - 58) {
										s.visible = true;
										s.velocity.y = 0;
										s.timeOut = 170;
										s.scale = 0;
										if (s.i == 1) {
											s.changeAnimation ("base");
										}
									} else {
										s.timeOut = -2;
									}
								} else {
									s.changeAnimation ("base");
									s.timeOut = 0;
								}
							}
						} else {
							if (s.pullingBlock == 1) {
								// pulling spikes
								for (let l = 0; l < pullingSpikes.length; l++) {
									var p = pullingSpikes[l];
									if (p.id == s.id) {
										p.remove ();
										l = pullingSpikes.length;
									}
								}
							}

							s.remove ();
						}
					}
				} else {
					i ++;
				}
			} else {
				i ++;
			}
		}

		inventory.preBlock = block;
		inventory.preRotation = rotation;
		inventory.preLenght = length;
		// crete new blocks
		if (mode != 2) {
			for (let i = 0; i < slime.length; i++) {
				// slime
				if (slime[i].active == false && slime[i].alive == true) {
					if (slime[i].posX > (player.position.x - 350) && slime[i].posX < (player.position.x + 350) && slime[i].posY > (player.position.y - 350) && slime[i].posY < (player.position.y + 350)) {
						slime[i].active = true;
						createSlime (slime[i].posX, slime[i].posY, i);
					}
				}
			}
		}

		for (let i = 0; i < Block.length; i++) {
			block = Block[i];
			rotation = Rotation[i];
			if (rotation > 7) {
				length = rotation - floor (rotation / 10) * 10;
				rotation = floor ((rotation - 10) / 10);
			}

			if (Block[i] == 5 && mode != 2) {
				// falling blocks
				var posY;
				for (let l = 0; l < optimization.fallingBlockY.length; l+= 2) {
					if (optimization.fallingBlockY[l] == i) {
						posY = optimization.fallingBlockY[l + 1];
						l = optimization.fallingBlockY.length;
					}
				}

				if (posY < player.prePositionY - 350 && posY > player.prePositionY - 401 && positionX[i] > (player.prePositionX - 401) / 50 && positionX[i] < (player.prePositionX + 401) / 50) {
					block = Block[i];
					rotation = Rotation[i];
					createWall (positionX[i] * 50, posY, 2, i);
				}
			} if (block == 38 || block == 39 || block == 40 || block == 41) {
				if (positionY[i] < (player.prePositionY - 600) / 50 && positionY[i] > (player.prePositionY - 651) / 50 && positionX[i] > (player.prePositionX - 701) / 50 && positionX[i] < (player.prePositionX + 701) / 50) {
					if (block == 38 || block == 39) {
						// fire bar
						createFireBar (positionX[i] * 50, positionY[i] * 50, block - 37, 0, i);
					} else {
						// rotating saw
						createRotatingSaw (positionX[i] * 50, positionY[i] * 50, block - 39, 0, i);
					}
				}
			} else if (block == 66 && mode != 2) {
				// weights
				var posX;
				var w;
				for (let l = 0; l < optimization.weightX.length; l+= 2) {
					if (optimization.weightX[l] == i) {
						if (optimization.weightX[l + 1] == 9999) {
							w = false;
							l = optimization.weightX.length;
						} else {
							w = true;
							posX = optimization.weightX[l + 1];
							l = optimization.weightX.length;
						}
					}
				}

				if (w == true) {
					if (positionY[i] < (player.prePositionY - 350) / 50 && positionY[i] > (player.prePositionY - 401) / 50 && posX > player.prePositionX - 401 && posX < player.prePositionX + 401) {
						var c = 0;
						for (let l = 0; l < weights.length; l++) {
							var w = weights[l];
							if (w.id == i) {
								l = weights.length;
								c = 1;
							}
						}
	
						if (c == 0) {
							createWeight (posX, positionY[i] * 50, i);
						}
					}
				}
			} else if (positionY[i] < (player.prePositionY - 350) / 50 && positionY[i] > (player.prePositionY - 401) / 50 && positionX[i] > (player.prePositionX - 401) / 50 && positionX[i] < (player.prePositionX + 401) / 50) {
				if (mode != 2) {
					if (block == 55) {
						// green buttons
						for (let l = 0; l < optimization.buttonPressed.length; l+= 2) {
							if (optimization.buttonPressed[l] == i) {
								if (optimization.buttonPressed[l + 1] == 1) {
									createGreenButton (positionX[i] * 50, positionY[i] * 50, i);
									l = optimization.buttonPressed.length;
								} else {
									l = optimization.buttonPressed.length;
								}
							}
						}
					} else if (block == 65) {
						// rubies
						for (let l = 0; l < optimization.rubyInfo.length; l += 3) {
							if (optimization.rubyInfo[l] == i) {
								if (optimization.rubyInfo[l + 1] == 1 && optimization.rubyInfo[l + 2] == -1) {
									createRuby (positionX[i] * 50, positionY[i] * 50, i);
									l = optimization.rubyInfo.length;
								} else {
									l = optimization.rubyInfo.length;
								}
							}
						}
					} else if (block == 45 || block == 46) {
						// falling blocks
						var c = 0;
						for (let l = 0; l < fallingBlocks2.length; l++) {
							var f = fallingBlocks2[l];
							if (f.id == i) {
								l = fallingBlocks2.length;
								c = 1;
							}
						}

						if (c == 0) {
							createFallingBlock (positionX[i] * 50, positionY[i] * 50, block - 44, i);
						}
					} else if (block == 42) {
						createPullingSpikes (positionX[i] * 50, positionY[i] * 50, i);
					} else {
						if (block != 34 && block != 35 && block != 43 && block != 63 && block != 64 && block != 47) {
							var blockDetected = 0;
							if (block == 1 || block == 8 || block == 10 || block == 11 || block == 12 || block == 13 || block == 14 || block == 28 || block == 51) {
								for (let l = 0; l < walls.length; l++) {
									var w = walls[l];
									var posY = round (w.position.y / 50) * 50;
									if (w.position.x == positionX[i] * 50 && posY == positionY[i] * 50 && w.undestroyable == 1) {
										blockDetected = 1;
										l = walls.length;
									}
								}
							} else if (block == 33) {
								for (let l = 0; l < stoppers.length; l++) {
									var w = stoppers[l];
									if (w.position.x == positionX[i] * 50 && w.position.y == positionY[i] * 50 && w.undestroyable == 1) {
										blockDetected = 1;
										l = stoppers.length;
									}
								}
							} else if (block == 68) {
								for (let l = 0; l < oneWayWalls.length; l++) {
									var w = oneWayWalls[l];
									if (w.position.x == positionX[i] * 50 && w.position.y == positionY[i] * 50 && w.undestroyable == 1) {
										blockDetected = 1;
										l = oneWayWalls.length;
									}
								}
							}

							if (blockDetected != 1) {
								createBlock (positionX[i] * 50, positionY[i] * 50, 2, i);
							}
						}
					}
				} else {
					createBlock (positionX[i] * 50, positionY[i] * 50, 2, i);
				}
			}
		}

		block = inventory.preBlock;
		rotation = inventory.preRotation;
		length = inventory.preLenght;
	}

	if (player.position.y > player.prePositionY + 50) {
		optimization.chunkUpdate = 1;
		player.prePositionY += 50;
		// remove blocks
		for (let i = 0; i < allSprites.length;) {
			var s = allSprites[i];
			if (s.undestroyable != 1 && s.pullingSpikes != 1 && s.slime != 1) {
				if (fireBars.contains (s)) {
					// fire bars
					if (s.position.y < player.prePositionY - 675) {
						for (let l = 0; l < fireBalls.length;) {
							var f = fireBalls[l];
							if (f.id == s.id) {
								f.remove ();
							} else {
								l ++;
							}
						}
												
						s.remove ();
					} else {
						i ++;
					}
				} else if (rotatingSaws.contains (s)) {
					// rotating saws
					if (s.position.y < player.prePositionY - 675) {
						for (let l = 0; l < rotatingTypes.length;) {
							var r = rotatingTypes[l];
							if (r.id == s.id) {
								r.remove ();
							} else {
								l ++;
							}
						}
												
						s.remove ();
					} else {
						i ++;
					}
				} else if (s.position.y < player.prePositionY - 425) {
					if (s.pullingBlock == 1) {
						// pulling spikes
						for (let l = 0; l < pullingSpikes.length; l++) {
							var p = pullingSpikes[l];
							if (p.id == s.id) {
								p.remove ();
								l = pullingSpikes.length;
							}
						}
					}

					s.remove ();
				} else {
					i ++;
				}
			} else {
				i ++;
			}
		}

		inventory.preBlock = block;
		inventory.preRotation = rotation;
		inventory.preLenght = length;
		// crete new blocks
		if (mode != 2) {
			for (let i = 0; i < slime.length; i++) {
				// slime
				if (slime[i].active == false && slime[i].alive == true) {
					if (slime[i].posX > (player.position.x - 350) && slime[i].posX < (player.position.x + 350) && slime[i].posY > (player.position.y - 350) && slime[i].posY < (player.position.y + 350)) {
						slime[i].active = true;
						createSlime (slime[i].posX, slime[i].posY, i);
					}
				}
			}
		}

		for (let i = 0; i < Block.length; i++) {
			block = Block[i];
			rotation = Rotation[i];
			if (rotation > 7) {
				length = rotation - floor (rotation / 10) * 10;
				rotation = floor ((rotation - 10) / 10);
			}

			if (Block[i] == 5 && mode != 2) {
				// falling blocks
				var posY;
				for (let l = 0; l < optimization.fallingBlockY.length; l+= 2) {
					if (optimization.fallingBlockY[l] == i) {
						posY = optimization.fallingBlockY[l + 1];
						l = optimization.fallingBlockY.length;
					}
				}

				if (posY > player.prePositionY + 350 && posY < player.prePositionY + 401 && positionX[i] > (player.prePositionX - 401) / 50 && positionX[i] < (player.prePositionX + 401) / 50) {
					block = Block[i];
					rotation = Rotation[i];
					createWall (positionX[i] * 50, posY, 2, i);
				}
			} if (block == 38 || block == 39 || block == 40 || block == 41) {
				if (positionY[i] > (player.prePositionY + 600) / 50 && positionY[i] < (player.prePositionY + 651) / 50 && positionX[i] > (player.prePositionX - 701) / 50 && positionX[i] < (player.prePositionX + 701) / 50) {
					if (block == 38 || block == 39) {
						// fire bar
						createFireBar (positionX[i] * 50, positionY[i] * 50, block - 37, 0, i);
					} else {
						// rotating saw
						createRotatingSaw (positionX[i] * 50, positionY[i] * 50, block - 39, 0, i);
					}
				}
			} else if (block == 66 && mode != 2) {
				// weights
				var posX;
				var w;
				for (let l = 0; l < optimization.weightX.length; l+= 2) {
					if (optimization.weightX[l] == i) {
						if (optimization.weightX[l + 1] == 9999) {
							w = false;
							l = optimization.weightX.length;
						} else {
							w = true;
							posX = optimization.weightX[l + 1];
							l = optimization.weightX.length;
						}
					}
				}

				if (w == true) {
					if (positionY[i] > (player.prePositionY + 350) / 50 && positionY[i] < (player.prePositionY + 401) / 50 && posX > player.prePositionX - 401 && posX < player.prePositionX + 401) {
						var c = 0;
						for (let l = 0; l < weights.length; l++) {
							var w = weights[l];
							if (w.id == i) {
								l = weights.length;
								c = 1;
							}
						}
	
						if (c == 0) {
							createWeight (posX, positionY[i] * 50, i);
						}
					}
				}
			} else if (positionY[i] > (player.prePositionY + 350) / 50 && positionY[i] < (player.prePositionY + 401) / 50 && positionX[i] > (player.prePositionX - 401) / 50 && positionX[i] < (player.prePositionX + 401) / 50) {
				if (mode != 2) {
					if (block == 55) {
						// green buttons
						for (let l = 0; l < optimization.buttonPressed.length; l+= 2) {
							if (optimization.buttonPressed[l] == i) {
								if (optimization.buttonPressed[l + 1] == 1) {
									createGreenButton (positionX[i] * 50, positionY[i] * 50, i);
									l = optimization.buttonPressed.length;
								} else {
									l = optimization.buttonPressed.length;
								}
							}
						}
					} else if (block == 65) {
						// rubies
						for (let l = 0; l < optimization.rubyInfo.length; l += 3) {
							if (optimization.rubyInfo[l] == i) {
								if (optimization.rubyInfo[l + 1] == 1 && optimization.rubyInfo[l + 2] == -1) {
									createRuby (positionX[i] * 50, positionY[i] * 50, i);
									l = optimization.rubyInfo.length;
								} else {
									l = optimization.rubyInfo.length;
								}
							}
						}
					} else if (block == 45 || block == 46) {
						// falling blocks
						var c = 0;
						for (let l = 0; l < fallingBlocks2.length; l++) {
							var f = fallingBlocks2[l];
							if (f.id == i) {
								l = fallingBlocks2.length;
								c = 1;
							}
						}

						if (c == 0) {
							createFallingBlock (positionX[i] * 50, positionY[i] * 50, block - 44, i);
						}
					} else if (block == 42) {
						createPullingSpikes (positionX[i] * 50, positionY[i] * 50, i);
					} else {
						if (block != 34 && block != 35 && block != 43 && block != 63 && block != 64 && block != 47) {
							var blockDetected = 0;
							if (block == 1 || block == 8 || block == 10 || block == 11 || block == 12 || block == 13 || block == 14 || block == 28 || block == 51) {
								for (let l = 0; l < walls.length; l++) {
									var w = walls[l];
									var posY = round (w.position.y / 50) * 50;
									if (w.position.x == positionX[i] * 50 && posY == positionY[i] * 50 && w.undestroyable == 1) {
										blockDetected = 1;
										l = walls.length;
									}
								}
							} else if (block == 33) {
								for (let l = 0; l < stoppers.length; l++) {
									var w = stoppers[l];
									if (w.position.x == positionX[i] * 50 && w.position.y == positionY[i] * 50 && w.undestroyable == 1) {
										blockDetected = 1;
										l = stoppers.length;
									}
								}
							} else if (block == 68) {
								for (let l = 0; l < oneWayWalls.length; l++) {
									var w = oneWayWalls[l];
									if (w.position.x == positionX[i] * 50 && w.position.y == positionY[i] * 50 && w.undestroyable == 1) {
										blockDetected = 1;
										l = oneWayWalls.length;
									}
								}
							}

							if (blockDetected != 1) {
								createBlock (positionX[i] * 50, positionY[i] * 50, 2, i);
							}
						}
					}
				} else {
					createBlock (positionX[i] * 50, positionY[i] * 50, 2, i);
				}
			}
		}

		block = inventory.preBlock;
		rotation = inventory.preRotation;
		length = inventory.preLenght;
	}

	// play mode
	if (mode == 1 || mode == 3) {
		// lifts
		for (let i = 0; i < lifts.length; i++) {
			var l = lifts[i];
			// move time
			if (l.moveTime > 0) {
				if (l.moveTime == 1) {
					l.velocity.x *= -1;
					l.velocity.y *= -1;
					l.moveTime = 0;
				} else {
					l.moveTime --;
				}
			} else {
				if (l.i == 3) {
					movingBlocksCollides (l, 50, 50, 3);
				} /*else if (l.i == 2) {
					if (l.rotation == 0 || l.rotation == 270) {
						movingBlocksCollides (l, 50, 28, 3);
					} else {
						movingBlocksCollides (l, 28, 50, 3);
					}
				}*/ else if (l.i == 4) {
					if (l.r == 1) {
						movingBlocksCollides (l, 50, 50, 3);
					} else {
						movingBlocksCollides (l, 50, 18, 3);
					}
				}
			}

			// near player
			if (l.position.x > player.prePositionX - 400 && l.position.x < player.prePositionX + 400 && l.position.y > player.prePositionY - 400 && l.position.y < player.prePositionY + 400) {
				if (l.nearPlayer == 0 && optimization.chunkUpdate == 1) {
					for (let o = 0; o < 10; o++) {
						if (l.overlap (walls2)) {
							l.position.x -= l.velocity.x * 25;
							l.position.y -= l.velocity.x * 25;
						} else {
							o = 10;
						}
					}
				}

				if (l.i == 3 && l.nearPlayer == 0) {
					// create green button
					let liftID = lifts.indexOf (l);
					if (l.greenButton[0] == 1) {
						createGreenButton (l.position.x, l.position.y, 0, liftID, 1);
					}
					
					if (l.greenButton[1] == 1) {
						createGreenButton (l.position.x, l.position.y, 0, liftID, 2);
					}
					
					if (l.greenButton[2] == 1) {
						createGreenButton (l.position.x, l.position.y, 0, liftID, 3);
					}
					
					if (l.greenButton[3] == 1) {
						createGreenButton (l.position.x, l.position.y, 0, liftID, 4);
					}
				}

				l.nearPlayer = 1;
			} else {
				if (l.i == 3 && l.nearPlayer == 1) {
					// remove green button
					let liftID = lifts.indexOf (l);
					if (l.greenButton[0] == 1 || l.greenButton[1] == 1 || l.greenButton[2] == 1 || l.greenButton[3] == 1) {
						for (let o = 0; o < greenButtons.length; o++) {
							let g = greenButtons[o];
							if (g.liftID == liftID) {
								g.remove ();
							}
						}
					}
				}

				l.nearPlayer = 0;
			}

			// walls2 collide
			if (l.nearPlayer == 1) {
				var plusX = 50;
				var plusY = 50;
				var minusX = 50;
				var minusY = 50;
				/*if (l.i == 1 || l.i == 2) {
					if (l.rotation == 0) {
						minusY = 28;
					} else if (l.rotation == 90) {
						plusX = 28;
					} else if (l.rotation == 180) {
						plusY = 28;
					} else if (l.rotation == 270) {
						minusX = 28;
					}
				} else*/ if (l.i == 4) {
					minusY = 18;
				}
				
				for (let o = 0; o < walls2.length; o++) {
					var w = walls2[o];
					if (greenButtons.contains (w) == false) {
						if (l.velocity.x > 0) {
							if (l.position.y > w.position.y - minusY && l.position.y < w.position.y + plusY) {
								if (l.position.x > w.position.x - minusX && l.position.x < w.position.x) {
									if (weights.contains (w)) {
										// weight move
										o = walls2.length;
										w.position.x += l.velocity.x;
										if (w.overlap (walls) || w.overlap (stoppers) || w.overlap (walls2)) {
											w.position.x -= l.velocity.x;
											l.velocity.x *= -1;
										} else {
											for (let d = 0; d < optimization.weightX.length; d += 2) {
												if (optimization.weightX[d] == w.id) {
													optimization.weightX[d + 1] = w.position.x;
													d = optimization.weightX.length;
												}
											}
										}
									} else {
										l.velocity.x *= -1;
										o = walls2.length;
									}
								}
							}
						} else if (l.velocity.x < 0) {
							if (l.position.y > w.position.y - minusY && l.position.y < w.position.y + plusY) {
								if (l.position.x < w.position.x + plusX && l.position.x > w.position.x) {
									if (weights.contains (w)) {
										// weight move
										o = walls2.length;
										w.position.x += l.velocity.x;
										if (w.overlap (walls) || w.overlap (stoppers) || w.overlap (walls2)) {
											w.position.x -= l.velocity.x;
											l.velocity.x *= -1;
										} else {
											for (let d = 0; d < optimization.weightX.length; d += 2) {
												if (optimization.weightX[d] == w.id) {
													optimization.weightX[d + 1] = w.position.x;
													d = optimization.weightX.length;
												}
											}
										}
									} else {
										l.velocity.x *= -1;
										o = walls2.length;
									}
								}
							}
						} else if (l.velocity.y > 0) {
							if (l.position.x > w.position.x - minusX && l.position.x < w.position.x + plusX) {
								if (l.position.y > w.position.y - minusY && l.position.y < w.position.y) {
									l.velocity.y *= -1;
									o = walls2.length;
								}
							}
						} else if (l.velocity.y < 0) {
							if (l.position.x > w.position.x - minusX && l.position.x < w.position.x + plusX) {
								if (l.position.y < w.position.y + plusY && l.position.y > w.position.y) {
									l.velocity.y *= -1;
									o = walls2.length;
								}
							}
						}
					}
				}
			}
		}

		if (player.death == 0) {
			time += 0.02;
			// water
			if (player.overlap (water)) {
				if (player.water == 0) {
					player.water = 1;
					if (player.anim != 5) {
						player.anim = 8;
						player.changeAnimation ("swim1");
					}
				}
			} else {
				if (player.water == 1) {
					player.water = 0;
					if (player.anim != 5) {
						if (keyIsDown (UP_ARROW) || keyIsDown (KEY.W)) {
							player.anim = 4;
							player.changeAnimation ("jump");
							player.velocityY = -9;
						} else {
							player.anim = 1;
							player.changeAnimation ("front");
						}
					}
				}
			}

			if (player.waterTimeOut > 0) {
				player.waterTimeOut --;
			}

			// y position
			if (player.anim == 6 || player.anim == 7) {
				// ladder
				if (player.velocityY > 0) {
					player.velocityY -= 0.5;
				}

				if (player.velocityY < 0) {
					player.velocityY += 0.5;
				}
			} else {
				if (player.water == 1) {
					// water
					if (player.velocityY < 4) {
						player.velocityY += 0.1;
					} else {
						player.velocityY = 4;
					}
				} else if (player.velocityY < 15) {
					if (player.velocityY == 0) {
						player.velocityY = 1;
					} else {
						player.velocityY += 0.5;
					}
					
					if (player.velocityY < 0.5 && player.velocityY > -0.5) {
						player.velocityY = 0;
					}
				}
			}

			// x position
			player.position.y ++;
			if (player.noMoveTime == 0) {
				if (keyIsDown (RIGHT_ARROW) || keyIsDown (KEY.D)) {
					if (player.water == 1 && player.anim != 5) {
						if (player.velocityX < 4 || player.velocityX < 5 && keyIsDown (KEY.C)) {
							player.velocityX += 1;
							player.mirrorX (1);
						}
					} else if (player.overlap (stickyBlocks) && player.anim != 5) {
						if (player.velocityX < 4) {
							player.velocityX += 1;
						}
					} else if (player.overlap (ice) && player.anim != 5) {
						if (player.velocityX < 10 && keyIsDown (KEY.C) || player.velocityX < 7) {
							player.velocityX += 2;
						}
					} else if (keyIsDown (KEY.C) && player.velocityX < 9 && player.anim != 5 || player.velocityX < 6 && player.anim != 5) {
						player.velocityX += 1.5;
					}
	
					// anim
					if (player.anim != 2 && player.anim < 4 && player.water == 0) {
						player.changeAnimation ("walk");
						player.anim = 2;
						player.mirrorX (1);
					}
	
					if (player.anim == 4 && player.water == 0) {
						player.mirrorX (1);
					}
				}
	
				if (keyIsDown (LEFT_ARROW) || keyIsDown (KEY.A)) {
					if (player.water == 1 && player.anim != 5) {
						if (player.velocityX > -4 || player.velocityX > -5 && keyIsDown (KEY.C)) {
							player.velocityX -= 1;
							player.mirrorX (-1);
						}
					} else if (player.overlap (stickyBlocks) && player.anim != 5) {
						if (player.velocityX > -4) {
							player.velocityX -= 1;
						}
					} else if (player.overlap (ice) && player.anim != 5) {
						if (player.velocityX > -10 && keyIsDown (KEY.C) || player.velocityX > -7) {
							player.velocityX -= 2;
						}
					} else if (keyIsDown (KEY.C) && player.velocityX > -9 && player.anim != 5 || player.velocityX > -6 && player.anim != 5) {
						player.velocityX -= 1.5;
					}
	
					// anim
					if (player.anim != 3 && player.anim < 4 && player.water == 0) {
						player.changeAnimation ("walk");
						player.anim = 3;
						player.mirrorX (-1);
					}
	
					if (player.anim == 4 && player.water == 0) {
						player.mirrorX (-1);
					}
				}
			}
			
			// player don't move
			if (player.velocityX == 0 && player.anim != 1 && player.anim < 4 && player.water == 0) {
				player.changeAnimation ("front");
				player.anim = 1;
			}

			// player friction x
			if (player.noMoveTime == 0) {
				if (player.overlap (ice)) {
					if (player.velocityX < 0.11 && player.velocityX > -0.11) {
						player.velocityX = 0;
					}
	
					if (player.velocityX > 0) {
						player.velocityX -= 0.1;
					}
	
					if (player.velocityX < 0) {
						player.velocityX += 0.1;
					}
				} else {
					if (player.velocityX < 0.41 && player.velocityX > -0.41) {
						player.velocityX = 0;
					}
	
					if (player.velocityX > 0) {
						player.velocityX -= 0.5;
					}
	
					if (player.velocityX < 0) {
						player.velocityX += 0.5;
					}
				}
			}

			player.position.y --;
			player.position.x += player.velocityX;
			player.preVelocityX = player.velocityX;
			// green buttons
			for (let i = 0; i < greenButtons.length; i++) {
				var g = greenButtons[i];
				if (g.rotation == 90) {
					if (player.overlap (g)) {
						buttonPressed (player, g);
					}
				} else if (g.rotation == 270) {
					if (player.overlap (g)) {
						buttonPressed (player, g);
					}
				}
			}

			// walls collide
			var wallsCollide;
			wallsCollide = 0;
			for (let i = 0; i < walls.length; i++) {
				var w = walls[i];
				if (player.velocityX > 0) {
					if (w.position.x > player.position.x) {
						for (var l = player.velocityX + 1; l >= 0; l--) {
							if (player.overlap (w)) {
								player.position.x --;
								i = walls.length;
								wallsCollide = 1;
							} else {
								l = 0;
							}
						}
					}
				} else {
					if (w.position.x < player.position.x) {
						for (var l = -player.velocityX + 1; l >= 0; l--) {
							if (player.overlap (w)) {
								player.position.x ++;
								i = walls.length;
								wallsCollide = 1;
							} else {
								l = 0;
							}
						}
					}
				}
			}

			// walls2 collide
			if (wallsCollide == 0) {
				for (let i = 0; i < walls2.length; i++) {
					var w = walls2[i];
					if (lifts.contains (w) && w.position.y > player.position.y + 55 && w.position.y < player.position.y + 60) {} else {
						if (stomps.contains (w) && w.position.y > player.position.y + 55 && w.velocity.y < 0) {
							// stomps collide
							if (player.overlap (w)) {
								player.position.y --;
								for (let l = 0; l < 10; l++) {
									if (player.overlap (w)) {
										player.position.y --;
									} else {
										l = 10;
										player.velocityY = 0;
									}
								}
							}
						} else if (player.velocityX > 0) {
							if (w.position.x > player.position.x) {
								for (var l = player.velocityX + 1; l >= 0; l--) {
									if (player.overlap (w)) {
										player.position.x --;
										i = walls2.length;
										wallsCollide = 1;
									} else {
										l = 0;
									}
								}
							}
						} else {
							if (w.position.x < player.position.x) {
								for (var l = -player.velocityX + 1; l >= 0; l--) {
									if (player.overlap (w)) {
										player.position.x ++;
										i = walls2.length;
										wallsCollide = 1;
									} else {
										l = 0;
									}
								}
							}
						}
					}
				}
			}
			
			if (wallsCollide == 1) {
				player.velocityX = 0;
			}

			// one way walls
			for (let i = 0; i < oneWayWalls.length; i++) {
				var o = oneWayWalls[i];
				if (o.rotation == 0) {
					if (player.velocityX < 0.1 && player.position.x > o.position.x + (40 + player.velocityX)) {
						if (player.overlap (o)) {
							player.position.x ++;
							for (var l = 30; l >= 0; l--) {
								if (player.overlap (o)) {
									player.position.x ++;
									i = oneWayWalls.length;
								} else {
									l = 0;
								}
							}

							player.velocityX = 0;
						}
					}
				}

				if (o.rotation == 180) {
					if (player.velocityX > -0.1 && player.position.x < o.position.x - (40 - player.velocityX)) {
						if (player.overlap (o)) {
							player.position.x --;
							for (var l = 30; l >= 0; l--) {
								if (player.overlap (o)) {
									player.position.x --;
									i = oneWayWalls.length;
								} else {
									l = 0;
								}
							}

							player.velocityX = 0;
						}
					}
				}
			}

			// y position
			player.position.y += round (player.velocityY);
			// lifts
			for (let i = 0; i < lifts.length; i++) {
				var l = lifts[i];
				// player
				if (l.overlap (player)) {
					// HL deleted-3

					// lift
					if (l.i == 3) {
						if (l.r == 1) {
							if (player.velocityY > -0.1 && player.position.y < l.position.y - 35 && player.anim != 5 || player.velocityY > -0.1 && player.position.y < l.position.y - 25 && player.anim == 5) {
								for (var o = player.velocityY + 1; o >= 0; o--) {
									if (player.overlap (walls) || player.overlap (walls2)) {
										player.position.y --;
									} else {
										o = 0;
										player.velocityY = 0;
										player.jumping = 10;
										if (player.anim == 4) {
											player.anim = 1;
											player.changeAnimation ("front");
										}
									}
								}
			
								player.position.x += l.velocity.x;
								if (player.overlap (walls) || player.overlap (walls2)) {
									player.position.x -= l.velocity.x;
								}
							} else {
								if (player.position.x > l.position.x + 35 || player.position.x < l.position.x - 35) {
									for (let o = abs (player.velocityX) + 3; o >= 0; o--) {
										if (player.overlap (l)) {
											if (l.velocity.x > 0) {
												player.position.x ++;
											} else {
												player.position.x --;
											}
										} else {
											o = 0;
										}
									}
								}
							}
						} else {
							if (player.position.y > l.position.y + 45 && l.velocity.y > 0) {
								for (let o = 30; o >= 0; o--) {
									if (player.overlap (l)) {
										player.position.y ++;
									} else {
										o = 0;
										player.velocityY = 6;
									}
								}
							}
						}
					}

					// bridge lift
					if (l.i == 4) {
						if (l.r == 1) {
							if (player.velocityY > -0.1 && player.position.y < l.position.y - 35 && player.anim != 5) {
								for (var o = player.velocityY + 1; o >= 0; o--) {
									if (player.overlap (l)) {
										player.position.y --;
									} else {
										o = 0;
										player.velocityY = 0;
										player.jumping = 10;
										if (player.anim == 4) {
											player.anim = 1;
											player.changeAnimation ("front");
										}
									}
								}
			
								player.position.x += l.velocity.x;
								if (player.overlap (walls) || player.overlap (walls2)) {
									player.position.x -= l.velocity.x;
								}
							}
						} else {
							if (player.position.y < l.position.y - 50 && player.position.y > l.position.y - 75 && l.velocity.y < 0) {
								if (player.overlap (walls) || player.overlap (walls2)) {
									player.position.y += 5;
								}
							}
						}
					}
				}
			}

			player.preVelocityY = player.velocityY;
			// green buttons
			for (let i = 0; i < greenButtons.length; i++) {
				var g = greenButtons[i];
				if (g.rotation == 180) {
					if (player.overlap (g)) {
						buttonPressed (player, g);
					}
				} else if (g.rotation == 0) {
					if (player.overlap (g)) {
						buttonPressed (player, g);
					}
				}
			}

			if (player.velocityY > 0) {
				// falling blocks
				player.overlap (fallingBlocks2, fallingBlockOverlap);
				var fallingCollide = 0;
				for (let i = 0; i < fallingBlocks.length; i++) {
					var b = fallingBlocks[i];
					if (player.overlap (b)) {
						player.jumping = 10;
						if (player.anim == 4) {
							player.changeAnimation ("front");
							player.anim = 1;
						}

						var wallsOverlap = 0;
						var fallingOverlap = 0;
						b.position.y += 3;
						// falling blocks
						for (let i = 0; i < fallingBlocks.length; i++) {
							var f = fallingBlocks[i];
							if (b.overlap (f) && b.id != f.id) {
								fallDown (b, f, 1);
								fallingOverlap = 1;
							}
						}

						// walls
						if (fallingOverlap == 0) {
							for (let l = 0; l < walls.length; l++) {
								var w = walls[l];
								if (w.position.x == b.position.x) {
									if (w.rotation != 180) {
										if (b.position.y > w.position.y - 50 && b.position.y < w.position.y + 40) {
											b.position.y = w.position.y - 50;
											wallsOverlap = 1;
										}
									} else {
										if (b.position.y > w.position.y - 28 && b.position.y < w.position.y + 40) {
											b.position.y = w.position.y - 28;
											wallsOverlap = 1;
										}
									}
								}
							}
						
							for (let l = 0; l < walls2.length; l++) {
								var w = walls2[l];
								if (b.position.x < w.position.x + 50 && b.position.x > w.position.x - 50) {
									if (greenButtons.contains (w) && w.rotation == 0) {
										if (b.position.y > w.position.y - 25 && b.position.y < w.position.y) {
											wallsOverlap = 1;
											buttonPressed (b, w);
										}
									} else {
										if (b.position.y > w.position.y - 50 && b.position.y < w.position.y) {
											b.position.y = w.position.y - 50;
											wallsOverlap = 1;
										}
									}
								}
							}
						}

						// one way walls
						for (let l = 0; l < oneWayWalls.length; l++) {
							var o = oneWayWalls[l];
							if (o.position.x == b.position.x) {
								if (b.position.y > o.position.y - 50 && b.position.y < o.position.y && o.rotation == 270) {
									b.position.y = o.position.y - 50;
									wallsOverlap = 1;
								}
							}
						}

						// player
						if (fallingCollide == 0) {
							if (wallsOverlap == 0) {
								fallingCollide = 1;
								player.position.y += 3;
								// walls collide
								for (let i = 0; i < walls.length; i++) {
									var w = walls[i];
									if (w.position.y > player.position.y) {
										if (player.velocityY == 1) {
											if (player.overlap (w)) {
												player.position.y --;
												i = walls.length;
												wallsCollide = 3;
											}
										} else {
											for (var l = player.velocityY + 3; l >= 0; l--) {
												if (player.overlap (w)) {
													player.position.y --;
													i = walls.length;
													wallsCollide = 2;
												} else {
													l = 0;
												}
											}
										}
									}
								}
							}
						} else {
							for (let l = 0; l < fallingBlocks.length; l++) {
								var f = fallingBlocks[l];
								for (let o = 0; o < 10; o++) {
									if (player.overlap (fallingBlocks)) {
										player.position.y --;
									} else {
										o = 10;
									}
								}
							}
						}
						
						var n = optimization.fallingBlockY.indexOf (b.id);
						optimization.fallingBlockY[n + 1] = b.position.y;
					}
				}
			} else {
				// blue/red switch
				var s;
				s = 0;
				for (let i = 0; i < blueRedSwitches.length; i++) {
					var br = blueRedSwitches[i];
					if (br.position.y < player.position.y - 25) {
						if (player.overlap (br)) {
							if (s == 0) {
								changeColor (p, br);
								s = 1;
							} else {
								changeColor (p, br, 1);
							}
						}
					}
				}
			}

			// walls collide
			for (let i = 0; i < walls.length; i++) {
				var w = walls[i];
				if (player.velocityY > 0) {
					if (w.position.y > player.position.y) {
						if (player.velocityY == 1) {
							if (player.overlap (w)) {
								player.position.y --;
								i = walls.length;
								wallsCollide = 3;
							}
						} else {
							for (var l = player.velocityY + 5; l >= 0; l--) {
								if (player.overlap (w)) {
									player.position.y --;
									i = walls.length;
									wallsCollide = 2;
								} else {
									l = 0;
								}
							}
						}
					}
				} else {
					if (w.position.y < player.position.y) {
						for (var l = -player.velocityY + 5; l >= 0; l--) {
							if (player.overlap (w)) {
								player.position.y ++;
								i = walls.length;
								wallsCollide = 2;
							} else {
								l = 0;
							}
						}
					}
				}
			}

			// walls2 collide
			if (wallsCollide != 2) {
				for (let i = 0; i < walls2.length; i++) {
					var w = walls2[i];
					if (player.velocityY > 0) {
						if (w.position.y > player.position.y) {
							for (var l = player.velocityY + 5; l >= 0; l--) {
								if (player.overlap (w)) {
									player.position.y --;
									i = walls2.length;
									wallsCollide = 2;
								} else {
									l = 0;
								}
							}
						}
					} else {
						if (w.position.y < player.position.y) {
							for (var l = -player.velocityY + 5; l >= 0; l--) {
								if (player.overlap (w)) {
									player.position.y ++;
									i = walls2.length;
									wallsCollide = 2;
								} else {
									l = 0;
								}
							}
						}
					}
				}
			}

			if (player.noMoveTime > 0) {
				player.noMoveTime --;
				if (player.preVelocityX > 0) {
					player.velocityX = 5;
				} else {
					player.velocityX = -5;
				}
			}

			// wall jump
			if (player.anim == 10) {
				if (wallsCollide == 0 || wallsCollide == 2 || wallsCollide == 3 || player.water == 1 || player.anim == 6 || player.anim == 7) {
					player.anim = 1;
					player.changeAnimation ("front");
				} else {
					player.jumping = 0;
					if (player.velocityY > 2) {
						player.velocityY = 2;
					}

					if (player.preVelocityX > 0) {
						if (keyWentDown (KEY.A) || keyWentDown (LEFT_ARROW)) {
							player.anim = 1;
							player.changeAnimation ("front");
						} else {
							player.velocityX = 5;
						}
					} else {
						if (keyWentDown (KEY.D) || keyWentDown (RIGHT_ARROW)) {
							player.anim = 1;
							player.changeAnimation ("front");
						} else {
							player.velocityX = -5;
						}
					}
				}
			} else if (wallsCollide == 1 && player.water == 0 && player.anim != 6 && player.anim != 7 && player.noMoveTime < 19 && player.jumping < 9) {
				player.jumping = 0;
				player.anim = 10;
				player.changeAnimation ("jump");
				if (player.velocityY > 2) {
					player.velocityY = 2;
				}

				if (player.preVelocityX > 0) {
					if (keyWentDown (KEY.A) || keyWentDown (LEFT_ARROW)) {
						player.anim = 1;
						player.changeAnimation ("front");
					} else {
						player.velocityX = 5;
					}
				} else {
					if (keyWentDown (KEY.D) || keyWentDown (RIGHT_ARROW)) {
						player.anim = 1;
						player.changeAnimation ("front");
					} else {
						player.velocityX = -5;
					}
				}
			}
			
			// bounce blocks
			player.position.y ++;
			if (player.overlap (bounceBlocks)) {
				player.velocityY = -player.velocityY + 1;
				if (player.velocityY != 0) {
					player.jumping = 0;
				}
			} else {
				if (wallsCollide == 2) {
					if (player.anim == 4) {
						player.anim = 1;
						player.changeAnimation ("front");
					}

					if (player.velocityY > 0) {
						player.jumping = 10;
					}
	
					player.velocityY = 0;
				}
			}
			player.position.y --;

			// squeeze
			if (wallsCollide > 0 && wallsCollide < 3 && player.unsqueezable == 0) {
				if (player.overlap (walls) || player.overlap (walls2)) {
					player.death = 50;
				}
			}

			// climb anim
			if (player.anim == 6 && wallsCollide > 1 || player.anim == 7 && wallsCollide > 1) {
				player.anim = 1;
				player.changeAnimation ("front");
			}

			if (player.unsqueezable > 0) {
				player.unsqueezable --;
				for (let i = 0; i < walls.length; i++) {
					var w = walls[i];
					for (let l = 0; l < 30; l++) {
						if (w.position.y > player.position.y) {
							if (player.overlap (w)) {
								player.position.y --;
								i = walls.length;
							} else {
								l = 30;
							}
						} else {
							if (player.overlap (w)) {
								player.position.y ++;
								i = walls.length;
							} else {
								l = 30;
							}
						}
					}

					for (let l = 0; l < 30; l++) {
						if (w.position.x > player.position.x) {
							if (player.overlap (w)) {
								player.position.x --;
								i = walls.length;
							} else {
								l = 30;
							}
						} else {
							if (player.overlap (w)) {
								player.position.x ++;
								i = walls.length;
							} else {
								l = 30;
							}
						}
					}
				}

				for (let i = 0; i < walls2.length; i++) {
					var w = walls2[i];
					for (let l = 0; l < 30; l++) {
						if (w.position.y > player.position.y) {
							if (player.overlap (w)) {
								player.position.y --;
								i = walls2.length;
							} else {
								l = 30;
							}
						} else {
							if (player.overlap (w)) {
								player.position.y ++;
								i = walls2.length;
							} else {
								l = 30;
							}
						}
					}

					for (let l = 0; l < 30; l++) {
						if (w.position.x > player.position.x) {
							if (player.overlap (w)) {
								player.position.x --;
								i = walls2.length;
							} else {
								l = 30;
							}
						} else {
							if (player.overlap (w)) {
								player.position.x ++;
								i = walls2.length;
							} else {
								l = 30;
							}
						}
					}
				}
			} else if (player.unsqueezable < 0) {
				player.unsqueezable = 0;
			}

			// one way walls
			for (let i = 0; i < oneWayWalls.length; i++) {
				var o = oneWayWalls[i];
				if (o.rotation == 90) {
					if (player.overlap (o) && player.velocityY < 0.1 && player.position.y > o.position.y + (55 + player.velocityY)) {
						player.position.y ++;
						for (var l = -player.velocityY + 5; l >= 0; l--) {
							if (player.overlap (o)) {
								player.position.y ++;
							} else {
								l = 0;
							}
						}

						player.velocityY = 0;
						if (player.anim == 4) {
							player.anim = 1;
							player.changeAnimation ("front");
						}
					}
				}

				if (o.rotation == 270) {
					if (player.anim == 5) {
						if (player.overlap (o) && player.velocityY > -0.1 && player.position.y < o.position.y - (45 - player.velocityY)) {
							player.position.y --;
							for (var l = player.velocityY + 5; l >= 0; l--) {
								if (player.overlap (o)) {
									player.position.y --;
								} else {
									l = 0;
								}
							}
	
							player.velocityY = 0;
							player.jumping = 10;
						}
					} else {
						if (player.overlap (o) && player.velocityY > 0 && player.position.y < o.position.y - (55 - player.velocityY)) {
							player.position.y --;
							for (var l = player.velocityY + 5; l >= 0; l--) {
								if (player.overlap (o)) {
									player.position.y --;
								} else {
									l = 0;
								}
							}
	
							player.velocityY = 0;
							player.jumping = 10;
							if (player.anim == 4) {
								player.anim = 1;
								player.changeAnimation ("front");
							}
						}
					}
				}
			}

			// bridges
			for (let i = 0; i < bridges.length; i++) {
				var b = bridges[i];
				if (player.overlap (b) && player.anim != 5 && player.velocityY > 0 && player.position.y < b.position.y - (55 - player.velocityY)) {
					player.position.y --;
					for (var l = player.velocityY + 1; l >= 0; l--) {
						if (player.overlap (b)) {
							player.position.y --;
						} else {
							l = 0;
						}
					}
	
					player.velocityY = 0;
					player.jumping = 10;
					if (player.anim == 4) {
						player.anim = 1;
						player.changeAnimation ("front");
					}
				}
			}
			
			player.position.y ++;
			if (player.overlap (stickyBlocks)) {
				player.jumping = 0;
			}

			player.position.y --;
			// jumping
			if (player.anim == 10 && (keyWentDown (UP_ARROW) || keyWentDown (KEY.W))) {
				// wall jump
				player.velocityY = -10;
				player.noMoveTime = 20;
				player.anim = 4;
				if (player.velocityX > 0) {
					player.velocityX = -6;
					player.mirrorX(-1);
				} else {
					player.velocityX = 6;
					player.mirrorX(1);
				}
			} else if (keyIsDown (UP_ARROW) || keyIsDown (KEY.W)) {
				if (player.water == 0) {
					if (player.overlap (ladders) && player.velocityY > -4) {
						// ladder
						player.jumping = 0;
						player.velocityY -= 2;
						if (frameCount % 5 == 0) {
							if (player.anim == 6) {
								player.anim = 7;
								player.changeAnimation ("climb2");
							} else {
								player.anim = 6;
								player.changeAnimation ("climb1");
							}
						}
					} else if (player.jumping > 0 && player.anim != 5) {
						if (player.jumping > 6) {
							player.jumping = 7;
							player.velocityY = -5.5;
						} else {
							player.velocityY -= 1.5;
						}
	
						// anim
						player.changeAnimation ("jump");
						player.anim = 4;
					}
				} else if (player.waterTimeOut == 0 && player.anim != 5) {
					// water
					player.jumping = 0;
					player.waterTimeOut = 5;
					if (player.velocityY > 0) {
						player.velocityY = -3;
					} else if (player.velocityY > -3) {
						player.velocityY -= 3;
						player.anim = 9;
						player.changeAnimation ("swim2");
					}
				}
			}

			// water anim
			if (player.water == 1 && player.anim != 5) {
				if (wallsCollide > 1 && player.preVelocityY > 0) {
					player.waterTimeOut = 0;
					if (keyIsDown (RIGHT_ARROW) || keyIsDown (KEY.D)) {
						if (player.anim != 2) {
							player.changeAnimation ("walk");
							player.anim = 2;
							player.mirrorX (1);
						}
					} else if (keyIsDown (LEFT_ARROW) || keyIsDown (KEY.A)) {
						if (player.anim != 3) {
							player.changeAnimation ("walk");
							player.anim = 3;
							player.mirrorX (-1);
						}
					} else {
						if (player.anim != 1) {
							player.anim = 1;
							player.changeAnimation ("front");
						}
					}
				} else if (player.anim != 8 && player.anim != 9) {
					player.position.y ++;
					if (player.overlap (walls) || player.overlap (walls2)) {} else {
						player.anim = 8;
						player.changeAnimation ("swim1");
					}

					player.position.y --;
				}

				if (player.anim == 9 && player.waterTimeOut < 2) {
					player.anim = 8;
					player.changeAnimation ("swim1");
				}
			}

			// ladders
			if (keyIsDown (DOWN_ARROW) && player.velocityY < 5 || keyIsDown (KEY.S) && player.velocityY < 4) {
				if (player.anim == 6 || player.anim == 7) {
					player.velocityY += 2;
					if (frameCount % 5 == 0) {
						if (player.anim == 6) {
							player.anim = 7;
							player.changeAnimation ("climb2");
						} else {
							player.anim = 6;
							player.changeAnimation ("climb1");
						}
					}
				}
			}

			
			if (player.anim == 6 || player.anim == 7) {
				if (player.overlap (ladders)) {} else {
					player.changeAnimation ("front");
					player.anim = 1;
				}
			}

			player.jumping --;
			// boosters
			for (let i = 0; i < boosters.length; i++) {
				var b = boosters[i];
				if (player.overlap (b)) {
					if (b.rotation == 0) {
						player.velocityX = 16;
					} else if (b.rotation == 90) {
						player.velocityY = 16;
					} else if (b.rotation == 180) {
						player.velocityX = -16;
					} else if (b.rotation == 270) {
						player.velocityY = -16;
						if (player.anim == 4) {
							player.anim = 1;
							player.changeAnimation ("front");
						}
					}
				}
			}
			// trampoline
			player.position.y += 3;
			for (let i = 0; i < trampolines.length; i++) {
				var t = trampolines[i];
				if (t.timeOut == 0) {
					if (player.overlap (t)) {
						t.timeOut = 10;
						t.changeAnimation ("press");
						t.setCollider ("rectangle", 0, 12, 68, 35);
						player.velocityY = 0;
					}
				} else if (t.timeOut == 1) {
					t.timeOut = 0;
					t.changeAnimation ("base");
					t.setCollider ("rectangle", 0, 7, 68, 50);
					if (player.overlap (t)) {
						if (player.water == 1) {
							player.velocityY = -7.5;
							player.changeAnimation ("swim1");
							player.anim = 8;
						} else {
							player.velocityY = -17;
						}
						
						player.jumping = 0;
						for (let i = 0; i < 20; i++) {
							if (t.overlap (player)) {
								player.position.y --;
							} else {
								i = 20;
							}
						}
					}
				} else {
					t.timeOut --;
				}
			}

			player.position.y -= 3;
			// crouch
			if (keyIsDown (DOWN_ARROW) && player.anim != 5 && player.overlap (ladders) == false || keyIsDown (KEY.S) && player.anim != 5 && player.overlap (ladders) == false) {
				player.anim = 5;
				player.scale = 0.7;
				player.changeAnimation ("crouch");
				player.setDefaultCollider ();
				player.position.x --;
				player.unsqueezable = -1;
			}
			
			if (keyIsDown (KEY.S) || keyIsDown (DOWN_ARROW)) {} else if (player.anim == 5) {
				player.anim = 1;
				player.scale = 0.72;
				player.changeAnimation ("front");
				player.setCollider ("rectangle", 0, 0, 65, 91);
				player.position.y -= 10;
				player.unsqueezable = 1;
				// walls overlap
				for (let i = 0; i < walls.length; i++) {
					var w = walls[i];
					if (w.position.y < player.position.y - (40 - abs (player.velocityY)) || w.position.y > player.position.y + (40 - abs (player.velocityY))) {
						if (player.overlap (w)) {
							if (w.position.y > player.position.y) {
								player.position.y --;
								for (let l = 0; l < 30; l++) {
									if (player.overlap (w)) {
										player.position.y --;
									} else {
										l = 30;
										i = walls.length;
									}
								}
							} else {
								player.position.y ++;
								for (let l = 0; l < 30; l++) {
									if (player.overlap (w)) {
										player.position.y ++;
									} else {
										l = 30;
										i = walls.length;
									}
								}
							}
						}
					}
				}

				for (let i = 0; i < walls2.length; i++) {
					var w = walls2[i];
					if (w.position.y < player.position.y - (40 - abs (player.velocityY)) || w.position.y > player.position.y + (40 - abs (player.velocityY))) {
						if (player.overlap (w)) {
							if (w.position.y > player.position.y) {
								player.position.y --;
								for (let l = 0; l < 30; l++) {
									if (player.overlap (w)) {
										player.position.y --;
									} else {
										l = 30;
										i = walls.length;
									}
								}
							} else {
								player.position.y ++;
								for (let l = 0; l < 30; l++) {
									if (player.overlap (w)) {
										player.position.y ++;
									} else {
										l = 30;
										i = walls.length;
									}
								}
							}
						}
					}
				}

				if (player.velocityY < 0) {
					player.velocityY = 1;
				}
			}

			// lose
			if (player.position.y > 2000 || player.overlap (lava) || player.overlap (spikes) || player.overlap (halfSaws) || player.overlap (saws) || player.overlap (movingSaws) || player.overlap (fireBalls)) {
				player.death = 50;
			}

			// checkpoint
			player.overlap (checkPoints, newCheckPoint);
		}
		
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
			}

			// move time
			if (s.moveTime > 0) {
				if (s.moveTime == 1) {
					s.velocity.x *= -1;
					s.velocity.y *= -1;
					s.moveTime = 0;
				} else {
					s.moveTime --;
				}
			} else {
				movingBlocksCollides (s, 51, 51, 1);
			}

			// near player
			if (s.position.x > player.prePositionX - 400 && s.position.x < player.prePositionX + 400 && s.position.y > player.prePositionY - 400 && s.position.y < player.prePositionY + 400) {
				if (s.nearPlayer == 0 && optimization.chunkUpdate == 1) {
					for (let l = 0; l < 10; l++) {
						if (s.overlap (walls2)) {
							s.position.x -= s.velocity.x * 25;
							s.position.y -= s.velocity.y * 25;
						} else {
							l = 10;
						}
					}
				}

				s.nearPlayer = 1;
			} else {
				s.nearPlayer = 0;
			}

			// walls2 collide
			if (s.nearPlayer == 1) {
				for (let l = 0; l < walls2.length; l++) {
					var w = walls2[l];
					if (lifts.contains (w) == false && stomps.contains (w) == false) {
						if (s.velocity.x > 0) {
							if (s.position.y > w.position.y - 50 && s.position.y < w.position.y + 50) {
								if (greenButtons.contains (w) && w.rotation == 270) {
									if (s.position.x > w.position.x - 25 && s.position.x < w.position.x) {
										buttonPressed (s, w);
										l = walls2.length;
									}
								} else {
									if (s.position.x > w.position.x - 50 && s.position.x < w.position.x) {
										s.velocity.x *= -1;
										l = walls2.length;
									}
								}
								
							}
						} else if (s.velocity.x < 0) {
							if (s.position.y > w.position.y - 50 && s.position.y < w.position.y + 50) {
								if (greenButtons.contains (w) && w.rotation == 90) {
									if (s.position.x < w.position.x + 25 && s.position.x > w.position.x) {
										buttonPressed (s, w);
										l = walls2.length;
									}
								} else {
									if (s.position.x < w.position.x + 50 && s.position.x > w.position.x) {
										s.velocity.x *= -1;
										l = walls2.length;
									}
								}
							}
						} else if (s.velocity.y > 0) {
							if (s.position.x > w.position.x - 50 && s.position.x < w.position.x + 50) {
								if (greenButtons.contains (w) && w.rotation == 0) {
									if (s.position.y > w.position.y - 25 && s.position.y < w.position.y) {
										buttonPressed (s, w);
										l = walls2.length;
									}
								} else {
									if (s.position.y > w.position.y - 50 && s.position.y < w.position.y) {
										s.velocity.y *= -1;
										l = walls2.length;
									}
								}
							}
						} else if (s.velocity.y < 0) {
							if (s.position.x > w.position.x - 50 && s.position.x < w.position.x + 50) {
								if (greenButtons.contains (w) && w.rotation == 180) {
									if (s.position.y < w.position.y + 25 && s.position.y > w.position.y) {
										buttonPressed (s, w);
										l = walls2.length;
									}
								} else {
									if (s.position.y < w.position.y + 50 && s.position.y > w.position.y) {
										s.velocity.y *= -1;
										l = walls2.length;
									}
								}
							}
						}
					}
				}
			}

			if (s.i == 1) {
				if (s.r == 0) {
					s.position.y += 25;
				} else if (s.r == 1) {
					s.position.x -= 25;
				} else if (s.r == 2) {
					s.position.y -= 25;
				} else if (s.r == 3) {
					s.position.x += 25;
				}
			}
		}

		// fire balls rotate
		optimization.rotatingBlocksRotaion = optimization.rotatingBlocksRotaion == 360 ? 2 : (optimization.rotatingBlocksRotaion + 2);
		for (var i = fireBalls.length - 1; i >= 0; i--) {
			var f = fireBalls[i];
			var distance = f.l * 50;
			var angle = f.i == 1 ? optimization.rotatingBlocksRotaion + f.r * 90 : -optimization.rotatingBlocksRotaion + f.r * 90;
			var a = radians (angle);
			f.position.x = cos (a) * distance + f.barPositionX;
			f.position.y = sin (a) * distance + f.barPositionY;

			if (f.rotation < 360) {
				f.rotation += 5;
			} else {
				f.rotation = 5;
			}
		}

		// rotating saws
		for (var i = rotatingTypes.length - 1; i >= 0; i--) {
			var r = rotatingTypes[i];
			var distance = r.l * 50;
			var angle = r.i == 1 ? optimization.rotatingBlocksRotaion + r.r * 90 : -optimization.rotatingBlocksRotaion + r.r * 90;
			var a = radians (angle);
			r.position.x = cos (a) * distance + r.startPositionX;
			r.position.y = sin (a) * distance + r.startPositionY;
			if (r.s != 1) {
				r.rotation = r.lastType ? angle + 180 : angle;
			}
		}

		// pulling spikes
		game.pullingSpikes ++;
		for (var i = pullingSpikes.length - 1; i >= 0; i--) {
			var p = pullingSpikes[i];
			if (p.i == 2) {
				if (game.pullingSpikes == 100) {
					p.setSpeed (2.5, p.rotation - 90);
				}

				if (game.pullingSpikes == 110) {
					p.setSpeed (0, 0);
				}

				if (game.pullingSpikes == 160) {
					p.setSpeed (1, p.rotation + 90);
				}

				if (game.pullingSpikes == 185) {
					p.setSpeed (0, 0);
				}
			}
		}

		if (game.pullingSpikes == 185) {
			game.pullingSpikes = 0;
		}

		// stomps
		for (var i = stomps.length - 1; i >= 0; i--) {
			var s = stomps[i];
			// move time
			if (s.moveTime > 0) {
				if (s.moveTime == 1) {
					stompsCollide (s, 1);
					s.moveTime = 0;
				} else {
					s.moveTime --;
				}
			} else {
				movingBlocksCollides (s, 51, 51, 2);
			}

			// near player
			if (s.position.x > player.prePositionX - 400 && s.position.x < player.prePositionX + 400 && s.position.y > player.prePositionY - 400 && s.position.y < player.prePositionY + 400) {
				if (s.nearPlayer == 0 && optimization.chunkUpdate == 1) {
					for (let l = 0; l < 10; l++) {
						if (s.overlap (walls2)) {
							s.position.x -= s.velocity.x * 25;
							s.position.y -= s.velocity.y * 25;
						} else {
							l = 10;
						}
					}
				}

				s.nearPlayer = 1;
			} else {
				s.nearPlayer = 0;
			}

			// walls2 collide
			if (s.nearPlayer == 1) {
				for (let l = 0; l < walls2.length; l++) {
					var w = walls2[l];
					if (s.velocity.x > 0) {
						if (s.position.y > w.position.y - 50 && s.position.y < w.position.y + 50) {
							if (greenButtons.contains (w) && w.rotation == 270) {
								if (s.position.x > w.position.x - 25 && s.position.x < w.position.x) {
									buttonPressed (s, w);
									l = walls2.length;
								}
							} else {
								if (s.position.x > w.position.x - 50 && s.position.x < w.position.x) {
									stompsCollide (s, w);
									l = walls2.length;
								}
							}
							
						}
					} else if (s.velocity.x < 0) {
						if (s.position.y > w.position.y - 50 && s.position.y < w.position.y + 50) {
							if (greenButtons.contains (w) && w.rotation == 90) {
								if (s.position.x < w.position.x + 25 && s.position.x > w.position.x) {
									buttonPressed (s, w);
									l = walls2.length;
								}
							} else {
								if (s.position.x < w.position.x + 50 && s.position.x > w.position.x) {
									stompsCollide (s, w);
									l = walls2.length;
								}
							}
						}
					} else if (s.velocity.y > 0) {
						if (s.position.x > w.position.x - 50 && s.position.x < w.position.x + 50) {
							if (greenButtons.contains (w) && w.rotation == 0) {
								if (s.position.y > w.position.y - 25 && s.position.y < w.position.y) {
									buttonPressed (s, w);
									l = walls2.length;
								}
							} else {
								if (s.position.y > w.position.y - 50 && s.position.y < w.position.y) {
									stompsCollide (s, w);
									l = walls2.length;
								}
							}
						}
					} else if (s.velocity.y < 0) {
						if (s.position.x > w.position.x - 50 && s.position.x < w.position.x + 50) {
							if (greenButtons.contains (w) && w.rotation == 180) {
								if (s.position.y < w.position.y + 25 && s.position.y > w.position.y) {
									buttonPressed (s, w);
									l = walls2.length;
								}
							} else {
								if (s.position.y < w.position.y + 50 && s.position.y > w.position.y) {
									stompsCollide (s, w);
									l = walls2.length;
								}
							}
						}
					}
				}
			}

			if (s.timeOut == 1) {
				s.velocity.y = -s.vy * 4;
				s.velocity.x = -s.vx * 4;
				s.timeOut = 0;
			} else if (s.timeOut > 1) {
				s.timeOut --;
			}
		}

		// stomps spikes
		for (var i = stompSpikes.length - 1; i >= 0; i--) {
			var s = stompSpikes[i];
			if (s.timeOut == 1) {
				s.velocity.y = -s.vy * 4;
				s.velocity.x = -s.vx * 4;
				s.timeOut = 0;
			} else if (s.timeOut > 1) {
				s.timeOut --;
			}
		}

		// slime update
		player.overlap (slimes, slimeCollide);
		for (let i = 0; i < slimes.length; i++) {
			var s = slimes[i];
			if (s.position.x > player.prePositionX + 350 || s.position.x < player.prePositionX - 350 || s.position.y > player.prePositionY + 350 || s.position.y < player.prePositionY - 350) {
				// slime too far
				if (s.life = -1) {
					slime[s.id].active = false;
					slime[s.id].velX = s.velocity.x;
					slime[s.id].velY = s.velocityY;
					slime[s.id].posX = s.position.x;
					slime[s.id].posY = s.position.y;
					s.remove ();
				}
			} else if (s.anim != 2 && s.rotation == 0) {
				// lava
				if (s.overlap (lava)) {
					s.rotation = -180;
					s.velocity.y = 5;
					s.velocityY = 0;
					s.velocity.x = 0;
					s.life = 50;
					if (s.ruby == 1) {
						for (let l = 0; l < rubies.length; l++) {
							var r = rubies[l];
							if (s.id == r.id) {
								rubyCollected (s, r);
							}
						}
					}
				}

				// water
				if (frameCount % 10 == 0) {
					if (s.overlap (water)) {
						if (s.water != 1) {
							s.velocity.x *= 0.6;
							s.water = 1;
						}
					} else {
						if (s.water != 0) {
							s.velocity.x /= 0.6;
							s.water = 0;
						}
					}
				}

				// position x
				if (s.overlap (walls) || s.overlap (stoppers) || s.overlap (walls2)) {
					// green buttons
					for (let i = 0; i < greenButtons.length; i++) {
						var g = greenButtons[i];
						if (g.rotation == 90 && s.velocity.x < 0) {
							if (s.overlap (g)) {
								buttonPressed (s, g);
							}
						} else if (g.rotation == 270 && s.velocity.x > 0) {
							if (s.overlap (g)) {
								buttonPressed (s, g);
							}
						}
					}

					if (s.velocity.x > 0) {
						s.mirrorX (1);
						if (s.water == 1) {
							s.velocity.x = -1.2;
							s.position.x -= 1.2;
						} else {
							s.velocity.x = -2;
							s.position.x -= 2;
						}
					} else {
						s.mirrorX (-1);
						if (s.water == 1) {
							s.velocity.x = 1.2;
							s.position.x += 1.2;
						} else {
							s.velocity.x = 2;
							s.position.x += 2;
						}
					}

					// rubies
					if (s.ruby == 1) {
						for (let l = 0; l < rubies.length; l++) {
							var r = rubies[l];
							if (s.id == r.id) {
								r.velocity.x = s.velocity.x;
								r.position.x += s.velocity.x;
							}
						}
					}
				}

				// one way walls
				for (let d = 0; d < oneWayWalls.length; d++) {
					var o = oneWayWalls[d];
					if (o.rotation == 0) {
						if (s.velocity.x < 0 && s.position.x > o.position.x + 45) {
							if (s.overlap (o)) {
								s.velocity.x = 2;
								s.position.x += 2;
								s.mirrorX (-1);
							}
						}
					}

					if (o.rotation == 180) {
						if (s.velocity.x > 0 && s.position.x < o.position.x - 45) {
							if (s.overlap (o)) {
								s.velocity.x = -2;
								s.position.x -= 2;
								s.mirrorX (1);
							}
						}
					}
				}
				
				// position y
				if (s.water == 1) {
					if (s.velocityY < 7) {
						s.velocityY += 0.5;
					}
				} else {
					if (s.velocityY < 11) {
						s.velocityY ++;
					}
				}

				s.position.y += s.velocityY;
				if (s.overlap (walls) || s.overlap (stoppers) || s.overlap (walls2)) {
					// green buttons
					for (let i = 0; i < greenButtons.length; i++) {
						var g = greenButtons[i];
						if (g.rotation == 0 && s.velocityY > 0) {
							if (s.overlap (g)) {
								buttonPressed (s, g);
							}
						} else if (g.rotation == 180 && s.velocityY < 0) {
							if (s.overlap (g)) {
								buttonPressed (s, g);
							}
						}
					}

					if (s.velocityY < 0) {
						s.position.y ++;
						for (let l = s.velocityY - 5; l < 0; l++) {
							if (s.overlap (walls) || s.overlap (stoppers) || s.overlap (walls2)) {
								s.position.y ++;
							} else {
								l = 0;
								s.velocityY = 0;
							}
						}
					} else {
						// blue red switches
						for (let l = 0; l < blueRedSwitches.length; l++) {
							var br = blueRedSwitches[l];
							if (s.overlap (br)) {
								if (br.move != 0) {
									s.rotation = -180;
									s.velocity.y = 5;
									s.velocityY = 0;
									s.velocity.x = 0;
									s.life = 50;
									if (s.ruby == 1) {
										for (let l = 0; l < rubies.length; l++) {
											var r = rubies[l];
											if (s.id == r.id) {
												rubyCollected (s, r);
											}
										}
									}
								}
							}
						}

						s.position.y --;
						for (let l = s.velocityY + 5; l > 0; l--) {
							if (s.overlap (walls) || s.overlap (stoppers) || s.overlap (walls2)) {
								s.position.y --;
							} else {
								l = 0;
								s.velocityY = 0;
							}
						}
					}

					// death
					if (s.new == true) {
						s.new = false;
					} else {
						if (s.overlap (walls) || s.overlap (stoppers) || s.overlap (walls2)) {
							s.rotation = -180;
							s.velocity.y = 5;
							s.velocityY = 0;
							s.velocity.x = 0;
							s.life = 50;
							if (s.ruby == 1) {
								for (let l = 0; l < rubies.length; l++) {
									var r = rubies[l];
									if (s.id == r.id) {
										rubyCollected (s, r);
									}
								}
							}
						}
					}
				}

				// one way walls
				for (let d = 0; d < oneWayWalls.length; d++) {
					var o = oneWayWalls[d];
					if (o.rotation == 90) {
						if (s.velocityY < 0 && s.position.y > o.position.y + 15) {
							if (s.overlap (o)) {
								s.position.y ++;
								for (var l = -s.velocityY + 5; l >= 0; l--) {
									if (s.overlap (o)) {
										s.position.y ++;
									} else {
										l = 0;
									}
								}

								s.velocityY = 0;
							}
						}
					}

					if (o.rotation == 270) {
						if (s.velocityY > 0 && s.position.y < o.position.y - 25) {
							if (s.overlap (o)) {
								s.position.y --;
								for (var l = -s.velocityY + 5; l >= 0; l--) {
									if (s.overlap (o)) {
										s.position.y --;
									} else {
										l = 0;
									}
								}

								s.velocityY = 0;
							}
						}
					}
				}

				// bridges
				if (s.velocityY > 0) {
					if (s.overlap (bridges)) {
						s.position.y --;
						for (let l = s.velocityY + 5; l > 0; l--) {
							if (s.overlap (bridges)) {
								s.position.y --;
							} else {
								l = 0;
								s.velocityY = 0;
							}
						}
					}
				}

				// rubies
				if (s.ruby == 1) {
					for (let l = 0; l < rubies.length; l++) {
						var r = rubies[l];
						if (s.id == r.id) {
							r.position.y = s.position.y;
						}
					}
				}

				// trampoline
				if (s.overlap (trampolines)) {
					s.velocityY = -25;
				}
			}	
		}

		// blue/red switches
		for (let i = 0; i < blueRedSwitches.length; i++) {
			var s = blueRedSwitches[i];
			if (s.move < 0) {
				if (s.move == -1) {
					s.velocity.y = 0;
					s.move = 8;
				} else {
					s.move ++;
					s.scale += 0.015;
				}
			} else if (s.move > 0) {
				if (s.move == 1) {
					s.move = 0;
					s.velocity.y = 0;
					s.scale = 0.785;
					s.position.y = s.prePositionY;
				} else {
					s.move --;
					s.scale -= 0.015;
					s.position.y += 3;
					if (player.position.y > s.position.y + 20) {
						if (s.overlap (player)) {
							player.position.y += 3;
						}
					}
				}
			}
		}

		// times blocks
		game.timedBlocks ++;
		if (game.timedBlocks == 150) {
			for (let i = 0; i < timedBlocks.length; i++) {
				var t = timedBlocks[i];
				t.changeAnimation ("dottedLine");
				walls.remove (t);
			}
		} else if (game.timedBlocks == 300) {
			game.timedBlocks = 0;
			for (let i = 0; i < timedBlocks.length; i++) {
				var t = timedBlocks[i];
				t.changeAnimation ("block");
				t.addToGroup (walls);
			}
		}

		// green buttons lift
		for (let i = 0; i < greenButtons.length; i++) {
			let g = greenButtons[i];
			if (g.liftID != undefined) {
				let l = lifts[g.liftID];
				if (g.rotation == 0) {
					g.position.x = l.position.x;
					g.position.y = l.position.y - 50;
				} else if (g.rotation == 90) {
					g.position.x = l.position.x + 50;
					g.position.y = l.position.y;
				} else if (g.rotation == 180) {
					g.position.x = l.position.x;
					g.position.y = l.position.y + 50;
				} else if (g.rotation == 270) {
					g.position.x = l.position.x - 50;
					g.position.y = l.position.y;
				}
			}
		}

		// green blocks
		if (game.buttonPressed > 0) {
			if (game.buttonPressed == 1) {
				game.buttonPressed = 0;
				for (let l = 0; l < greenBlocks.length; l++) {
					var b = greenBlocks[l];
					if (b.id == 1) {
						b.changeAnimation ("block");
						b.addToGroup (walls);
					} else {
						b.changeAnimation ("dottedLine");
						walls.remove (b);
					}
				}
			} else {
				game.buttonPressed --;
			}
		}

		// weights
		for (let i = 0; i < weights.length; i++) {
			var w = weights[i];
			w.position.y += 5;
			w.overlap (fallingBlocks2, fallingBlockOverlap);
			w.position.y -= 5;
			if (w.timeOut == 0) {
				if (player.position.x > w.position.x - 100 && player.position.x < w.position.x + 100 && player.position.y > w.position.y && player.position.y < w.position.y + 400 && w.velocity.y == 0) {
					w.velocity.y = 5;
					w.changeAnimation ("falling");
					w.timeOut = -1;
				}
			} else if (w.timeOut == -1 && w.velocity.y != 0) {
				// green buttons
				for (let i = 0; i < greenButtons.length; i++) {
					var g = greenButtons[i];
					if (g.rotation == 0 && w.position.x == g.position.x) {
						if (w.overlap (g)) {
							buttonPressed (w, g);
						}
					}
				}

				// stop falling
				function stopWeightFalling (b, s) {
					b.position.y --;
					b.timeOut = 100;
					b.overlap (blueRedSwitches, changeColor);
					b.velocity.y = 0;
					for (let l = 0; l < 15; l++) {
						if (b.overlap (s)) {
							b.position.y --;
						} else {
							l = 15;
						}
					}
				}

				w.overlap (walls, stopWeightFalling);
				w.overlap (walls2, stopWeightFalling);
				w.overlap (stoppers, stopWeightFalling);

				// one way walls
				for (let l = 0; l < oneWayWalls.length; l++) {
					var o = oneWayWalls[l];
					if (o.rotation == 270) {
						if (w.overlap (o)) {
							w.timeOut = 100;
							w.velocity.y = 0;
						}
					}
				}

				// go back
				if (w.position.y > player.position.y + 400) {
					w.changeAnimation ("base");
					w.timeOut = 0;
					w.position.y = w.prePositionY;
					w.velocity.y = 0;
					if (w.position.y < player.position.y - 400) {
						w.remove ();
					}
				}
			} else {
				if (w.timeOut == 1) {
					w.changeAnimation ("base");
					w.timeOut = 0;
					w.position.y = w.prePositionY;
					if (w.position.y < player.position.y - 400) {
						w.remove ();
					}
				} else {
					w.timeOut --;
				}
			}
		}

		// dead weights
		for (let i = 0; i < deadWeights.length; i++) {
			var d = deadWeights[i];
			if (d.time > 0) {
				d.time --;
				d.rotation += 10;
			} else {
				d.remove ();
			}
		}

		// falling blocks
		for (let i = 0; i < fallingBlocks2.length; i++) {
			var f = fallingBlocks2[i];
			if (f.i == 1) {
				// orange falling block
				if (f.timeOut == -1) {
					// green buttons
					for (let i = 0; i < greenButtons.length; i++) {
						var g = greenButtons[i];
						if (g.rotation == 0 && f.position.x == g.position.x) {
							if (f.overlap (g)) {
								buttonPressed (f, g);
							}
						}
					}

					f.overlap (blueRedSwitches, changeColor);
					// walls
					for (let l = 0; l < walls.length; l++) {
						var w = walls[l];
						if (w.rotation == 180) {
							if (w.position.x == f.position.x && f.position.y > w.position.y - 30 && f.position.y < w.position.y) {
								f.timeOut = -100;
								f.visible = false;
								walls.remove (f);
							}
						} else {
							if (w.position.x == f.position.x && f.position.y > w.position.y - 50 && f.position.y < w.position.y) {
								f.timeOut = -100;
								f.visible = false;
								walls.remove (f);
							}
						}
					}

					// stoppers
					for (let l = 0; l < stoppers.length; l++) {
						var s = stoppers[l];
						if (s.position.x == f.position.x && f.position.y > s.position.y - 30 && f.position.y < s.position.y) {
							f.timeOut = -100;
							f.visible = false;
							walls.remove (f);
						}
					}

					// one way walls
					for (let l = 0; l < oneWayWalls.length; l++) {
						var o = oneWayWalls[l];
						if (o.rotation == 270) {
							if (f.overlap (o)) {
								f.timeOut = -100;
								f.visible = false;
								walls.remove (f);
							}
						}
					}

					if (f.position.y > player.position.y + 400) {
						// reset
						f.position.y = f.prePositionY;
						f.timeOut == -2;
						if (player.position.x > f.position.x + 48 || player.position.x < f.position.x - 48 || player.position.y > f.prePositionY + 58 || player.position.y < f.prePositionY - 58) {
							f.visible = true;
							f.addToGroup (walls);
							f.changeAnimation ("base");
							f.velocity.y = 0;
							f.timeOut = 170;
							f.scale = 0;
						}
					}
				} else if (f.timeOut < -1) {
					if (f.timeOut == -2) {
						// reset
						f.position.y = f.prePositionY;
						if (player.position.x > f.position.x + 48 || player.position.x < f.position.x - 48 || player.position.y > f.prePositionY + 58 || player.position.y < f.prePositionY - 58) {
							f.visible = true;
							f.addToGroup (walls);
							f.changeAnimation ("base");
							f.velocity.y = 0;
							f.timeOut = 170;
							f.scale = 0;
							if (f.position.y < player.position.y - 400) {
								f.remove ();
							}
						}
					} else {
						f.timeOut ++;
					}
				} else if (f.timeOut > 150) {
					// respawn animation
					f.scale += 0.036;
					f.timeOut --;
					if (f.timeOut == 151) {
						f.timeOut = 0;
						f.scale = 0.72;
					}
				} else if (f.timeOut > 50) {
					// start falling
					f.timeOut = -1;
					f.velocity.y = 5;
				} else if (f.timeOut > 0) {
					// player overlap
					f.position.y --;
					if (f.overlap (player) || f.overlap (weights)) {} else {
						f.timeOut = 0;
						f.changeAnimation ("base");
					}

					f.position.y ++;
				}
			} else {
				// red falling block
				if (f.timeOut == -1) {
					// green buttons
					for (let i = 0; i < greenButtons.length; i++) {
						var g = greenButtons[i];
						if (g.rotation == 0 && f.position.x == g.position.x) {
							if (f.overlap (g)) {
								buttonPressed (f, g);
							}
						}
					}
					
					f.overlap (blueRedSwitches, changeColor);
					// walls
					for (let l = 0; l < walls.length; l++) {
						var w = walls[l];
						if (w.rotation == 180) {
							if (w.position.x == f.position.x && f.position.y > w.position.y - 30 && f.position.y < w.position.y) {
								f.timeOut = -100;
								f.visible = false;
								walls.remove (f);
							}
						} else {
							if (w.position.x == f.position.x && f.position.y > w.position.y - 50 && f.position.y < w.position.y) {
								f.timeOut = -100;
								f.visible = false;
								walls.remove (f);
							}
						}
					}

					// stopers
					for (let l = 0; l < stoppers.length; l++) {
						var s = stoppers[l];
						if (s.position.x == f.position.x && f.position.y > s.position.y - 30 && f.position.y < s.position.y) {
							f.timeOut = -100;
							f.visible = false;
							walls.remove (f);
						}
					}

					// one way walls
					for (let l = 0; l < oneWayWalls.length; l++) {
						var o = oneWayWalls[l];
						if (o.rotation == 270) {
							if (f.overlap (o)) {
								f.timeOut = -100;
								f.visible = false;
								walls.remove (f);
							}
						}
					}

					if (f.position.y > player.position.y + 400) {
						// reset
						f.position.y = f.prePositionY;
						f.timeOut = -2;
						if (player.position.x > f.position.x + 48 || player.position.x < f.position.x - 48 || player.position.y > f.prePositionY + 58 || player.position.y < f.prePositionY - 58) {
							f.visible = true;
							f.addToGroup (walls);
							f.velocity.y = 0;
							f.timeOut = 170;
							f.scale = 0;
							if (f.position.y < player.position.y - 400) {
								f.remove ();
							}
						}
					}
				} else if (f.timeOut < -1) {
					if (f.timeOut == -2) {
						// reset
						f.position.y = f.prePositionY;
						if (player.position.x > f.position.x + 48 || player.position.x < f.position.x - 48 || player.position.y > f.prePositionY + 58 || player.position.y < f.prePositionY - 58) {
							f.visible = true;
							f.addToGroup (walls);
							f.velocity.y = 0;
							f.timeOut = 170;
							f.scale = 0;
							if (f.position.y < player.position.y - 400) {
								f.remove ();
							}
						}
					} else {
						f.timeOut ++;
					}
				} else if (f.timeOut > 150) {
					// respawn animation
					f.scale += 0.036;
					f.timeOut --;
					if (f.timeOut == 151) {
						f.timeOut = 0;
						f.scale = 0.72;
					}
				} else if (f.timeOut > 50) {
					// start falling
					f.timeOut = -1;
					f.velocity.y = 5;
					f.velocity.x = 0;
					f.position.x = round (f.position.x / 50) * 50;
				} else if (f.timeOut > 0) {
					// player overlap
					if (f.timeOut & 3) {
						f.velocity.x *= -1;
					}
					
					f.timeOut ++;
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

		// player move
		if (keyIsDown (RIGHT_ARROW) || keyIsDown (KEY.D)) {
			if (keyIsDown (KEY.C)) {
				player.velocityX = 35;
			} else {
				if (player.velocityX < 12) {
					player.velocityX += 2;
				}
			}
		}

		if (keyIsDown (LEFT_ARROW) || keyIsDown (KEY.A)) {
			if (keyIsDown (KEY.C)) {
				player.velocityX = -35;
			} else {
				if (player.velocityX > -12) {
					player.velocityX -= 2;
				}
			}
		}

		if (keyIsDown (UP_ARROW) || keyIsDown (KEY.W)) {
			if (keyIsDown (KEY.C)) {
				player.velocityY = -35;
			} else {
				if (player.velocityY > -12) {
					player.velocityY -= 2;
				}
			}
		}

		if (keyIsDown (DOWN_ARROW) || keyIsDown (KEY.S)) {
			if (keyIsDown (KEY.C)) {
				player.velocityY = 35;
			} else {
				if (player.velocityY < 12) {
					player.velocityY += 2;
				}
			}
		}

		// friction
		if (keyIsDown (RIGHT_ARROW) || keyIsDown (KEY.D) || keyIsDown (LEFT_ARROW) || keyIsDown (KEY.A)) {} else {
			if (player.velocityX > 0) {
				if (player.velocityX > 12) {
					player.velocityX = 12;
				} else {
					player.velocityX -= 2;
				}
			} else if (player.velocityX < 0) {
				if (player.velocityX < -12) {
					player.velocityX = -12;
				} else {
					player.velocityX += 2;
				}
			}
		}
		

		if (keyIsDown (UP_ARROW) || keyIsDown (KEY.W) || keyIsDown (DOWN_ARROW) || keyIsDown (KEY.S)) {} else {
			if (player.velocityY > 0) {
				if (player.velocityY > 12) {
					player.velocityY = 12;
				} else {
					player.velocityY -= 2;
				}
			} else if (player.velocityY < 0) {
				if (player.velocityY < -12) {
					player.velocityY = -12;
				} else {
					player.velocityY += 2;
				}
			}
		}

		player.position.x += player.velocityX;
		player.position.y += player.velocityY;
		// rotate
		if (keyWentUp (KEY.R)) {
			if (block == 60) {
				if (rotation == 7) {
					rotation = 0;
				} else {
					rotation ++;
				}
			} else {
				if (rotation == 3) {
					rotation = 0;
				} else {
					rotation ++;
				}
			}
		}

		if (block != 60 && rotation > 3) {
			rotation = 0;
		}

		// length
		if (keyWentUp (KEY.L)) {
			if (length == 8) {
				length = 1;
			} else {
				length ++;
			}
		}

		// zoom
		/*if (keyIsDown (KEY.X)) {
			game.build = -10;
			if (camera.zoom > 0.28) {
				camera.zoom -= 0.072;
			}
		} else {
			if (camera.zoom != 1) {
				camera.zoom += 0.072;
			}
		}*/
	}

	if (keyWentUp (KEY.U)) {
		if (camera.zoom == 1) {
			camera.zoom = 0.28;
		} else {
			camera.zoom = 1;
		}
	}

	// hitboxes
	if (keyWentUp (KEY.H)) {
		if (game.debug == 1) {
			game.debug = 0;
			for (let i = 0; i < allSprites.length; i++) {
				var s = allSprites[i];
				s.debug = false;
			}
		} else {
			game.debug = 1;
			for (let i = 0; i < allSprites.length; i++) {
				var s = allSprites[i];
				s.debug = true;
			}
		}

		mouseC.debug = false;
	}

	if (frameCount % 10 == 0 && game.debug == 1) {
		for (let i = 0; i < allSprites.length; i++) {
			var s = allSprites[i];
			s.debug = true;
		}

		mouseC.debug = false;
	}

	// info
	if (keyWentUp (KEY.I)) {
		if (game.info == 0) {
			game.info = 1;
		} else {
			game.info = 0;
		}
	}

	// camera
	camera.position = player.position;
	// draw
	background ("#4db6e1");
	camera.on ();
	drawSprites ();
	drawGroup (oneWayWalls);
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
		
		image (bigChainImg, 0, -50, 50, 50);
		image (bigChainImg, 0, -100, 50, 50);
		image (bigChainImg, 0, -150, 50, 50);
		rotate(PI / 2 * -s.r);
		translate (-s.position.x, -s.position.y);
	}

	drawGroup (greenBlocks);
	drawGroup (redBlocks);
	drawGroup (blueBlocks);
	drawGroup (walls2);
	drawGroup (boosters);
	drawGroup (bridges);
	drawGroup (greenButtons);
	drawGroup (weights);
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
	drawGroup (blueRedSwitches);
	drawGroup (lifts);
	drawGroup (rotatingTypes);
	drawGroup (slimes);
	drawGroup (rubies);
	drawGroup (fireBalls);
	drawGroup (rSaws);
	drawGroup (deadWeights);
	// draw
	if (mode == 2) {
		fill ("red");
		rect (-1000000, 2000, 2000000, 5);
		imageMode (CENTER);
		// stopper
		for (var i = stoppers.length - 1; i >= 0; i--) {
			var s = stoppers[i];
			//if (s.i == 1) {
			image (stopperImg, s.position.x, s.position.y, 50, 50);
			/*} else {
				translate (s.position.x, s.position.y);
				rotate(PI / 180 * s.rotation);
				image (halfStopperImg, 0, 0, 50, 50);
				rotate(PI / 180 * -s.rotation);
				translate (-s.position.x, -s.position.y);
			}*/
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

	// rubies
	if (mode != 2) {
		for (let i = 0; i < rubies.length; i++) {
			var r = rubies[i];
			if (r.weightID == undefined) {
				if (r.time >= 0) {
					if (player.overlap (r)) {
						rubyCollected (player, r);
					} else {
						if (r.time == 50) {
							r.velocity.y *= -1;
							r.time = 0;
						} else {
							r.time ++;
						}
					}	
				} else if (r.time != -1000) {
					imageMode (CENTER);
					tint (255, 5 * -r.time);
					image (rubyImg, r.position.x, r.position.y, 50, 50);
					tint (255, 255);
					imageMode (CORNER);
					r.time ++;
				}
			} else {
				for (let l = 0; l < weights.length; l++) {
					const w = weights[l];
					if (w.id == r.weightID) {
						r.position.x = w.position.x;
						r.position.y = w.position.y + 5;
					}
				}
			}
		}
	}

	// death
	if (player.death > 0) {
		if (player.death == 50) {
			loseSnd.play ();
			deaths ++;
			player.visible = false;
		}

		if (player.death == 1) {
			player.position.x = checkPoint.position.x;
			player.position.y = checkPoint.position.y - 20;
			player.velocityX = 0;
			player.velocityY = 0;
			camera.position.x = player.position.x;
			camera.position.y = player.position.y;
			player.death = 0;
			player.visible = true;
			if (player.anim != 1) {
				player.changeAnimation ("front");
				player.setCollider ("rectangle", 0, 0, 65, 91);
				player.anim = 1;
			}

			resetBlocks (1);
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
	camera.off ();

	if (mode == 1 || mode == 3) {
		// draw time
		fill ("#151515");
		textSize (35);
		textAlign (LEFT);
		text ("time: " + round (time * 10) / 10, 15, 35);
		// draw ruby HUD
		if (game.totalrubies > 0) {
			image (HUDrubyImg, 550, 10, 34.5, 27);
			textAlign (RIGHT);
			text (game.collectedrubies + "/" + game.totalrubies, 540, 35);
		}
	}

	if (mode == 1) {
		// info
		if (game.info == 1) {
			textAlign (LEFT);
			textSize (20);
			fill ("#151515");
			if (frameCount % 25 == 0) {
				game.fps = int(getFrameRate());
			}

			var pvx = round (player.velocityX);
			var pvy = round (player.velocityY);
			if (pvx == 7 || pvx == -5 || pvx == 10 || pvx == -8) {
				pvx --;
			}

			if (pvy == 1) {
				pvy = 0;
			}

			text ("platformer creator: beta 1.2", 12, 75);
			text ("player position - x: " + round (player.position.x * 2) / 100 + " y: " + round (player.position.y * 2) / 100, 12, 102.5);
			text ("player speed (block / s) - x: " + pvx + " y: " + pvy, 12, 130);
			text ("total blocks in level: " + Block.length, 12, 157.5);
			text ("loaded blocks: " + (allSprites.length - 3), 12, 185);
			if (game.fps > 50) {
				text ("fps: 50", 12, 212.5);
			} else {
				text ("fps: " + game.fps, 12, 212.5);
			}

		}

		// draw
		fill ("#242424");
		noStroke ();
		rect (390, 440, width, 60);
		fill ("#eee");
	}

	if (mode == 2) {
		if (camera.zoom == 1) {
			showImage (block);
		}

		// info
		if (game.info == 1) {
			textAlign (LEFT);
			textSize (20);
			fill ("#151515");
			if (frameCount % 25 == 0) {
				game.fps = int(getFrameRate());
			}

			text ("platformer creator: beta 1.2", 12, 25);
			text ("player position - x: " + round (player.position.x * 2) / 100 + " y: " + round (player.position.y * 2) / 100, 12, 52.5);
			text ("holding block id: " + block, 12, 80);
			text ("rotation: " + rotation, 12, 107.5);
			text ("total blocks in level: " + Block.length, 12, 135);
			if (game.fps > 50) {
				text ("fps: 50", 12, 162.5);
			} else {
				text ("fps: " + game.fps, 12, 162.5);
			}

			text ("mouse position - x: " + mouseC.position.x / 50 + " y: " + mouseC.position.y / 50, 12, 190);
			var b;
			var r;
			b = 2;
			for (let i = 0; i < Block.length; i ++) {
				if (mouseC.position.x / 50 == positionX[i] && mouseC.position.y / 50 == positionY[i]) {
					b = Block[i];
					r = Rotation[i];
					if (r > 7) {
						r = floor ((r - 10) / 10);
					}
				}
			}

			if (b != 2) {
				text ("looking block id: " + b, 12, 217.5);
				text ("looking block rotation: " + r, 12, 245);
			}
		}

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
			// snow
			image (snowImg, 60, 445, 50, 50);
			text ("snow", 180, 483);
		}

		if (block == 12) {
			// tundra
			image (snowTundraImg, 60, 445, 50, 50);
			text ("tundra", 180, 483);
		}

		if (block == 13) {
			// sticky Block
			image (stickyBlockImg, 60, 445, 50, 50);
			text ("sticky block", 180, 483);
		}

		if (block == 14) {
			// bounce block
			image (bounceBlockImg, 60, 445, 50, 50);
			text ("bounce block", 180, 483);
		}

		if (block == 15) {
			// purple plant
			image (purplePlantImg, 60, 445, 50, 50);
			text ("purple plant", 180, 483);
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

		/*if (block == 44) {
			// half stopper
			image (halfStopperImg, 60, 445, 50, 50);
			text ("half stopper", 180, 483);
		}*/

		if (block == 44) {
			// snow hill
			image (snowHillImg, 60, 445, 50, 50);
			text ("snow hill", 170, 483);
		}

		if (block == 45) {
			// yellow falling block
			image (yellowFallingBlockImg, 60, 445, 50, 50);
			textSize (30);
			text ("yellow falling b.", 165, 483);
			textSize (35);
		}

		if (block == 46) {
			// red falling block
			image (redFallingBlockImg, 60, 445, 50, 50);
			textSize (30);
			text ("red falling block", 165, 483);
			textSize (35);
		}

		if (block == 47) {
			// slime
			image (slimeImg, 60, 465, 50, 28);
			text ("slime", 170, 483);
		}

		if (block == 48) {
			// snow spike
			image (snowSpikeImg, 60, 445, 50, 50);
			text ("snow spike", 170, 483);
		}

		if (block == 49) {
			// little spike
			image (littleSpikeImg, 60, 445, 50, 50);
			text ("little spike", 170, 483);
		}

		if (block == 50) {
			// big spike
			image (bigSpikeImg, 60, 445, 50, 50);
			text ("big spike", 170, 483);
		}

		if (block == 51) {
			// blue/red switch
			image (blueSwitchImg, 60, 445, 50, 50);
			textSize (30);
			text ("blue/red switch", 170, 483);
			textSize (35);
		}

		if (block == 52) {
			// blue block
			image (blueBlockImg, 60, 445, 50, 50);
			text ("blue block", 170, 483);
		}

		if (block == 53) {
			// red block
			image (redDottedLineImg, 60, 445, 50, 50);
			text ("red block", 170, 483);
		}

		if (block == 54) {
			// timed block
			image (yellowBlockImg, 60, 445, 50, 50);
			text ("timed block", 170, 483);
		}

		if (block == 55) {
			// green button
			image (greenButtonImg, 60, 445, 50, 50);
			text ("green button", 170, 483);
		}

		if (block == 56) {
			// green block
			image (greenBlockImg, 60, 445, 50, 50);
			text ("green block", 170, 483);
		}

		if (block == 57) {
			// dotted block
			image (greenDottedLineImg, 60, 445, 50, 50);
			text ("dotted block", 170, 483);
		}

		if (block == 58) {
			// bridge
			image (bridgeImg, 60, 445, 50, 50);
			text ("bridge", 170, 483);
		}

		if (block == 59) {
			// booster
			image (boosterImg, 60, 445, 50, 50);
			text ("booster", 170, 483);
		}

		if (block == 60) {
			// arrow
			image (arrowImg, 60, 445, 50, 50);
			text ("arrow", 170, 483);
		}

		/*if (block == 61) {
			// half lift
			image (halfLift1Img, 60, 445, 50, 50);
			text ("half lift", 170, 483);
		}

		if (block == 62) {
			// half lift
			image (halfLift2Img, 60, 445, 50, 50);
			text ("half lift", 170, 483);
		}*/

		if (block == 61) {
			// snowy pile
			image (snowyPileImg, 60, 445, 50, 50);
			text ("snowy pile", 170, 483);
		}

		if (block == 62) {
			// small snowy pile
			image (smallSnowyPileImg, 60, 445, 50, 50);
			textSize (30);
			text ("small snowy pile", 170, 483);
			textSize (35);
		}

		if (block == 63) {
			// lift
			if (rotation == 0 || rotation == 2) {
				image (lift1Img, 60, 445, 50, 50);
			} else {
				image (lift2Img, 60, 445, 50, 50);
			}
			
			text ("lift", 170, 483);
		}

		if (block == 64) {
			// bridge lift
			if (rotation == 0 || rotation == 2) {
				image (bridgeLiftRLImg, 60, 445, 50, 50);
			} else {
				image (bridgeLiftUDImg, 60, 445, 50, 50);
			}
			
			text ("bridge lift", 170, 483);
		}

		if (block == 65) {
			// ruby
			image (rubyImg, 60, 445, 50, 50);
			text ("ruby", 170, 483);
		}

		if (block == 66) {
			// weight
			image (weightImg, 60, 445, 50, 50);
			text ("weight", 170, 483);
		}

		if (block == 67) {
			// chain
			image (chainImg, 60, 445, 50, 50);
			text ("chain", 170, 483);
		}

		if (block == 68) {
			// one way wall
			image (oneWayWallImg, 60, 445, 50, 50);
			text ("one way wall", 170, 483);
		}

		if (block == 69) {
			// green cane
			image (greenCaneImg, 60, 445, 50, 50);
			text ("green cane", 170, 483);
		}

		if (block == 70) {
			// red cane
			image (redCaneImg, 60, 445, 50, 50);
			text ("red cane", 170, 483);
		}

		if (block == 71) {
			// frozen tree
			image (deadTreeImg, 60, 445, 50, 50);
			text ("frozen tree", 170, 483);
		}

		if (block == 72) {
			// frozen plant
			image (frozenPlantImg, 60, 445, 50, 50);
			text ("frozen plant", 170, 483);
		}

		if (block == 73) {
			// frozen plant
			image (plantAltImg, 60, 445, 50, 50);
			text ("frozen plant", 170, 483);
		}

		if (block == 74) {
			// snow rock
			image (snowRockImg, 60, 445, 50, 50);
			text ("snow rock", 170, 483);
		}

		if (block == 75) {
			// snow rock
			image (rockAltImg, 60, 445, 50, 50);
			text ("snow rock", 170, 483);
		}

		if (block == 76) {
			// big green cane
			image (bigGreenCaneImg, 60, 445, 50, 50);
			textSize (30);
			text ("big green cane", 170, 483);
			textSize (35);
		}

		if (block == 77) {
			// big red cane
			image (bigRedCaneImg, 60, 445, 50, 50);
			text ("big red cane", 170, 483);
		}
	}

	if (mouseIsPressed && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < 440 && mode == 2 && Mode == 1 && mouseC.overlap (exit) == false && mouseC.overlap (start) == false && game.build == 1) {
		saveGame.show ();
		saveGame.hidden = false;
		createBlock (mouseC.position.x, mouseC.position.y, 1);
	}

	// next level
	if (player.overlap (exit) && mode == 3 && game.collectedrubies == game.totalrubies) {
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

function createBlock (x, y, l, id) {
	if (block != 2 && block != 22 && block != 23 && l == 1) {
		deleteOld ();
		append(positionX, x / 50);
		append(positionY, y / 50);
		append(Block, block);
		append(Rotation, rotation);
	}

	// metal
	if (block == 1) {
		createWall (x, y, 1, l);
	}
	// eraser
	if (block == 2) {
		deleteOld ();
	}
	// lava
	if (block == 3) {
		createLava (x, y, l);
	}
	// check point
	if (block == 4) {
		createCheckPoint (x, y);
	}
	// falling block
	if (block == 5) {
		createWall (x, y, 2, id);
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
		createWater (x, y, l);
	}
	// grass
	if (block == 10) {
		createWall (x, y, 3, l);
	}
	// snow
	if (block == 11) {
		createWall (x, y, 4, l);
	}
	// tundra
	if (block == 12) {
		createWall (x, y, 5, l);
	}
	// sticky block
	if (block == 13) {
		createWall (x, y, 6);
	}
	// bounce block
	if (block == 14) {
		createWall (x, y, 7);
	}
	// purple plant
	if (block == 15) {
		createDecoration (x, y, 11);
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
		createWall (x, y, 8);
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
		createFireBar (x, y, 1, l, id);
	}
	// left fire bar
	if (block == 39) {
		createFireBar (x, y, 2, l, id);
	}
	// right rotating saw
	if (block == 40) {
		createRotatingSaw (x, y, 1, l, id);
	}
	// left rotating saw
	if (block == 41) {
		createRotatingSaw (x, y, 2, l, id);
	}
	// pulling spikes
	if (block == 42) {
		createPullingSpikes (x, y, id);
	}
	// stomp
	if (block == 43) {
		createStomp (x, y, id);
	}
	// half stopper
	/*if (block == 44) {
		createStopper (x, y, 2);
	}*/
	// snow hill
	if (block == 44) {
		createDecoration (x, y, 19, l);
	}
	// yellow falling block
	if (block == 45) {
		createFallingBlock (x, y, 1);
	}
	// red falling block
	if (block == 46) {
		createFallingBlock (x, y, 2);
	}
	// slime
	if (block == 47) {
		createSlime (x, y);
	}
	// snow spike
	if (block == 48) {
		createSpike (x, y, 5);
	}
	// little spike
	if (block == 49) {
		createSpike (x, y, 6);
	}
	// big spike
	if (block == 50) {
		createSpike (x, y, 7);
	}
	// blue/red switch
	if (block == 51) {
		createBlueRedSwitch (x, y);
	}
	// blue block
	if (block == 52) {
		createBlueRedBlock (x, y, 1);
	}
	// red block
	if (block == 53) {
		createBlueRedBlock (x, y, 2);
	}
	// timed block
	if (block == 54) {
		createTimedBlock (x, y);
	}
	// green button
	if (block == 55) {
		createGreenButton (x, y);
	}
	// green block
	if (block == 56) {
		createGreenBlock (x, y, 1);
	}
	// dotted block
	if (block == 57) {
		createGreenBlock (x, y, 2);
	}
	// bridge
	if (block == 58) {
		createBridge (x, y);
	}
	// booster
	if (block == 59) {
		createBooster (x, y);
	}
	// arrow
	if (block == 60) {
		createDecoration (x, y, 9);
	}
	// half lift
	/*if (block == 61) {
		createLift (x, y, 1);
	}
	// half lift
	if (block == 62) {
		createLift (x, y, 2);
	}*/
	// snowy pile
	if (block == 61) {
		createDecoration (x, y, 23);
	}
	// small snowy pile
	if (block == 62) {
		createDecoration (x, y, 22);
	}
	// lift
	if (block == 63) {
		createLift (x, y, 3);
	}
	// bridge lift
	if (block == 64) {
		createLift (x, y, 4);
	}
	// ruby
	if (block == 65) {
		createRuby (x, y, id);
	}
	// weight
	if (block == 66) {
		createWeight (x, y, id);
	}
	// chain
	if (block == 67) {
		createDecoration (x, y, 10);
	}
	// one way wall
	if (block == 68) {
		createOneWayWall (x, y);
	}
	// green cane
	if (block == 69) {
		createDecoration (x, y, 12);
	}
	// red cane
	if (block == 70) {
		createDecoration (x, y, 13);
	}
	// frozen tree
	if (block == 71) {
		createDecoration (x, y, 14);
	}
	// frozen plant
	if (block == 72) {
		createDecoration (x, y, 15);
	}
	// frozen plant
	if (block == 73) {
		createDecoration (x, y, 16);
	}
	// snow rock
	if (block == 74) {
		createDecoration (x, y, 17);
	}
	// snow rock
	if (block == 75) {
		createDecoration (x, y, 18);
	}
	// big green cane
	if (block == 76) {
		createDecoration (x, y, 20, l);
	}
	// big red cane
	if (block == 77) {
		createDecoration (x, y, 21, l);
	}
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
		// snow
		if (b == 11) {
			image (snowImg, 0, 0, 50, 50);
		}
		// tundra
		if (b == 12) {
			image (snowTundraImg, 0, 0, 50, 50);
		}
		// sticky block
		if (b == 13) {
			image (stickyBlockImg, 0, 0, 50, 50);
		}
		// bounce block
		if (b == 14) {
			image (bounceBlockImg, 0, 0, 50, 50);
		}
		// purple plant
		if (b == 15) {
			image (purplePlantImg, 0, 0, 50, 50);
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
			image (bigChainImg, 0, -50, 50, 50);
			image (bigChainImg, 0, -100, 50, 50);
			image (bigChainImg, 0, -150, 50, 50);
		}
		// halfStopper
		/*if (b == 44) {
			image (halfStopperImg, 0, 0, 50, 50);
		}*/

		rotate(PI / 180 * rotation * -90);
		// snow hill
		if (b == 44) {
			image (snowHillImg, 0, 0, 50, 50);
		}
		// yellow falling block
		if (b == 45) {
			image (yellowFallingBlockImg, 0, 0, 50, 50);
		}
		// red falling block
		if (b == 46) {
			image (redFallingBlockImg, 0, 0, 50, 50);
		}
		// slime
		if (b == 47) {
			image (slimeImg, 0, 12, 50, 28);
		}

		rotate(PI / 180 * rotation * 90);
		// snow spike
		if (b == 48) {
			image (snowSpikeImg, 0, 0, 50, 50);
		}
		// little spike
		if (b == 49) {
			image (littleSpikeImg, 0, 0, 50, 50);
		}
		// big spike
		if (b == 50) {
			image (bigSpikeImg, 0, 0, 50, 50);
		}

		rotate(PI / 180 * rotation * -90);
		// blue/red switch
		if (b == 51) {
			image (blueSwitchImg, 0, 0, 50, 50);
		}
		// blue block
		if (b == 52) {
			image (blueBlockImg, 0, 0, 50, 50);
		}
		// red block
		if (b == 53) {
			image (redDottedLineImg, 0, 0, 50, 50);
		}
		// timed block
		if (b == 54) {
			image (yellowBlockImg, 0, 0, 50, 50);
		}
		rotate(PI / 180 * rotation * 90);
		// green button
		if (b == 55) {
			image (greenButtonImg, 0, 0, 50, 50);
		}
		rotate(PI / 180 * rotation * -90);
		// green block
		if (b == 56) {
			image (greenBlockImg, 0, 0, 50, 50);
		}
		// dotted block
		if (b == 57) {
			image (greenDottedLineImg, 0, 0, 50, 50);
		}
		// bridge
		if (b == 58) {
			image (bridgeImg, 0, 0, 50, 50);
		}

		rotate(PI / 180 * rotation * 90);
		// booster
		if (b == 59) {
			image (boosterImg, 0, 0, 50, 50);
		}

		rotate(PI / 180 * rotation * -90);
		rotate(PI / 180 * rotation * 45);
		// arrow
		if (b == 60) {
			image (arrowImg, 0, 0, 50, 50);
		}

		rotate(PI / 180 * rotation * -45);
		rotate(PI / 180 * rotation * 90);
		// half lift
		/*if (b == 61) {
			image (halfLift1Img, 0, 0, 50, 50);
		}
		// half lift
		if (b == 62) {
			image (halfLift2Img, 0, 0, 50, 50);
		}*/

		rotate(PI / 180 * rotation * -90);
		// snowy pile
		if (b == 61) {
			image (snowyPileImg, 0, 0, 50, 50);
		}
		// small snowy pile
		if (b == 62) {
			image (smallSnowyPileImg, 0, 0, 50, 50);
		}
		// weight
		if (b == 66) {
			image (weightImg, 0, 0, 50, 50);
		}
		// chain
		if (b == 67) {
			image (chainImg, 0, 0, 50, 50);
		}
		// lift
		if (b == 63) {
			if (rotation == 0 || rotation == 2) {
				image (lift1Img, 0, 0, 50, 50);
			} else {
				image (lift2Img, 0, 0, 50, 50);
			}
		}
		// bridge lift
		if (b == 64) {
			if (rotation == 0 || rotation == 2) {
				image (bridgeLiftRLImg, 0, 0, 50, 50);
			} else {
				image (bridgeLiftUDImg, 0, 0, 50, 50);
			}
		}
		// ruby
		if (b == 65) {
			image (rubyImg, 0, 0, 50, 50);
		}

		rotate(PI / 180 * rotation * 90);
		// one way wall
		if (b == 68) {
			image (oneWayWallImg, 0, 0, 50, 50);
		}

		rotate(PI / 180 * rotation * -90);
		// green cane
		if (b == 69) {
			image (greenCaneImg, 0, 0, 50, 50);
		}
		// red cane
		if (b == 70) {
			image (redCaneImg, 0, 0, 50, 50);
		}
		// frozen tree
		if (b == 71) {
			image (deadTreeImg, 0, 0, 50, 50);
		}
		// frozen plant
		if (b == 72) {
			image (frozenPlantImg, 0, 0, 50, 50);
		}
		// frozen plant
		if (b == 73) {
			image (plantAltImg, 0, 0, 50, 50);
		}
		// snow rock
		if (b == 74) {
			image (snowRockImg, 0, 0, 50, 50);
		}
		// snow rock
		if (b == 75) {
			image (rockAltImg, 0, 0, 50, 50);
		}
		// big green cane
		if (b == 76) {
			image (bigGreenCaneImg, 0, 0, 50, 50);
		}
		// big red cane
		if (b == 77) {
			image (bigRedCaneImg, 0, 0, 50, 50);
		}
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

function movingBlocksCollides (s, plusPos, minusPos, id) {
	// one way walls
	for (let o = 0; o < oneWayWalls.length; o++) {
		var w = oneWayWalls[o];
		if (w.rotation == 0 && s.velocity.x < 0) {
			if (s.position.y == w.position.y) {
				if (s.position.x < w.position.x + plusPos && s.position.x > w.position.x) {
					o = oneWayWalls.length;
					if (id == 2) {
						stompsCollide (s, w);
					} else {
						s.velocity.x *= -1;
					}
				}
			}
		}

		if (w.rotation == 90 && s.velocity.y < 0) {
			if (s.position.x == w.position.x) {
				if (s.position.y < w.position.y + plusPos && s.position.y > w.position.y) {
					o = oneWayWalls.length;
					if (id == 2) {
						stompsCollide (s, w);
					} else {
						s.velocity.y *= -1;
					}
				}
			}
		}

		if (w.rotation == 180 && s.velocity.x > 0) {
			if (s.position.y == w.position.y) {
				if (s.position.x > w.position.x - minusPos && s.position.x < w.position.x) {
					o = oneWayWalls.length;
					if (id == 2) {
						stompsCollide (s, w);
					} else {
						s.velocity.x *= -1;
					}
				}
			}
		}

		if (w.rotation == 270 && s.velocity.y > 0) {
			if (s.position.x == w.position.x) {
				if (s.position.y > w.position.y - minusPos && s.position.y < w.position.y) {
					o = oneWayWalls.length;
					if (id == 2) {
						stompsCollide (s, w);
					} else {
						s.velocity.y *= -1;
					}
				}
			}
		}
	}

	// walls
	for (let l = 0; l < walls.length; l++) {
		var w = walls[l];
		if (s.velocity.x > 0) {
			if (s.position.y == w.position.y || s.position.y == w.prePositionY) {
				if (s.position.x > w.position.x - minusPos && s.position.x < w.position.x) {
					if (w.halfBlock == 1 && w.rotation == 90) {
						s.moveTime = round (20 / s.velocity.x);
						l = walls.length;
					} else {
						if (id == 2) {
							stompsCollide (s, w);
						} else {
							s.velocity.x *= -1;
						}

						l = walls.length;
						if (id == 1 || id == 2) {
							if (blueRedSwitches.contains (w)) {
								changeColor (s, w);
							}
						}
					}
				}
			}
		} else if (s.velocity.x < 0) {
			if (s.position.y == w.position.y || s.position.y == w.prePositionY) {
				if (s.position.x < w.position.x + plusPos && s.position.x > w.position.x) {
					if (w.halfBlock == 1 && w.rotation == 270) {
						s.moveTime = round (20 / -s.velocity.x);
						l = walls.length;
					} else {
						if (id == 2) {
							stompsCollide (s, w);
						} else {
							s.velocity.x *= -1;
						}

						l = walls.length;
						if (id == 1 || id == 2) {
							if (blueRedSwitches.contains (w)) {
								changeColor (s, w);
							}
						}
					}
				}
			}
		} else if (s.velocity.y > 0) {
			if (s.position.x == w.position.x) {
				if (s.position.y > w.position.y - minusPos && s.position.y < w.position.y) {
					if (w.halfBlock == 1 && w.rotation == 180) {
						s.moveTime = round (20 / s.velocity.y);
						l = walls.length;
					} else {
						if (id == 2) {
							stompsCollide (s, w);
						} else {
							s.velocity.y *= -1;
						}

						l = walls.length;
						if (id == 1 || id == 2) {
							if (blueRedSwitches.contains (w)) {
								changeColor (s, w);
							}
						}
					}
				}
			}
		} else if (s.velocity.y < 0) {
			if (s.position.x == w.position.x) {
				if (s.position.y < w.position.y + plusPos && s.position.y > w.position.y) {
					if (w.halfBlock == 1 && w.rotation == 0) {
						s.moveTime = round (20 / -s.velocity.y);
						l = walls.length;
					} else {
						if (id == 2) {
							stompsCollide (s, w);
						} else {
							s.velocity.y *= -1;
						}

						l = walls.length;
						if (id == 1 || id == 2) {
							if (blueRedSwitches.contains (w)) {
								changeColor (s, w);
							}
						}
					}
				}
			}
		}
	}

	// stoppers
	for (let i = 0; i < stoppers.length; i++) {
		var w = stoppers[i];
		if (s.velocity.x > 0) {
			if (s.position.y == w.position.y) {
				if (s.position.x > w.position.x - minusPos && s.position.x < w.position.x) {
					/*if (w.i == 2 && w.rotation == 90) {
						s.moveTime = 10;
						i = stoppers.length;
					} else {*/
					i = stoppers.length;
					if (id == 2) {
						stompsCollide (s, w);
					} else {
						s.velocity.x *= -1;
					}
				}
			}
		} else if (s.velocity.x < 0) {
			if (s.position.y == w.position.y) {
				if (s.position.x < w.position.x + plusPos && s.position.x > w.position.x) {
					/*if (w.i == 2 && w.rotation == 270) {
						s.moveTime = 10;
						i = stoppers.length;
					} else {*/
					i = stoppers.length;
					if (id == 2) {
						stompsCollide (s, w);
					} else {
						s.velocity.x *= -1;
					}
				}
			}
		} else if (s.velocity.y > 0) {
			if (s.position.x == w.position.x) {
				if (s.position.y > w.position.y - minusPos && s.position.y < w.position.y) {
					/*if (w.i == 2 && w.rotation == 180) {
						s.moveTime = 10;
						i = stoppers.length;
					} else {*/
					i = stoppers.length;
					if (id == 2) {
						stompsCollide (s, w);
					} else {
						s.velocity.y *= -1;
					}
				}
			}
		} else if (s.velocity.y < 0) {
			if (s.position.x == w.position.x) {
				if (s.position.y < w.position.y + plusPos && s.position.y > w.position.y) {
					/*if (w.i == 2 && w.rotation == 0) {
						s.moveTime = 10;
						i = stoppers.length;
					} else {*/
					i = stoppers.length;
					if (id == 2) {
						stompsCollide (s, w);
					} else {
						s.velocity.y *= -1;
					}
				}
			}
		}
	}
}

function fallDown (s, b, n) {
	var wallsOverlap = 0;
	var fallingOverlap = 0;
	b.position.y += 3;
	// falling blocks
	for (let i = 0; i < fallingBlocks.length; i++) {
		var f = fallingBlocks[i];
		if (b.overlap (f) && b.id != f.id) {
			if (n < 4) {
				fallDown (b, f, n + 1);
			} else {
				b.position.y = f.position.y - 50;
				wallsOverlap = 1;
				b.overlap (s, goUp);
			}
		}
	}

	// walls
	if (fallingOverlap == 0) {
		for (let l = 0; l < walls.length; l++) {
			var w = walls[l];
			if (w.position.x == b.position.x) {
				if (w.rotation != 180) {
					if (b.position.y > w.position.y - 50 && b.position.y < w.position.y + 40) {
						b.position.y = w.position.y - 50;
						wallsOverlap = 1;
						b.overlap (s, goUp);
					}
				} else {
					if (b.position.y > w.position.y - 28 && b.position.y < w.position.y + 40) {
						b.position.y = w.position.y - 28;
						wallsOverlap = 1;
						b.overlap (s, goUp);
					}
				}
			}
		}
	
		for (let l = 0; l < walls2.length; l++) {
			var w = walls2[l];
			if (b.position.x < w.position.x + 50 && b.position.x > w.position.x - 50) {
				if (greenButtons.contains (w) && w.rotation == 0) {
					if (b.position.y > w.position.y - 25 && b.position.y < w.position.y) {
						wallsOverlap = 1;
						buttonPressed (b, w);
					}
				} else {
					if (b.position.y > w.position.y - 50 && b.position.y < w.position.y) {
						b.position.y = w.position.y - 50;
						wallsOverlap = 1;
						b.overlap (s, goUp);
					}
				}
			}
		}

		// one way walls
		for (let l = 0; l < oneWayWalls.length; l++) {
			var o = oneWayWalls[l];
			if (o.position.x == b.position.x) {
				if (b.position.y > o.position.y - 50 && b.position.y < o.position.y && o.rotation == 270) {
					b.position.y = o.position.y - 50;
					wallsOverlap = 1;
					b.overlap (s, goUp);
				}
			}
		}
	}
	
	var c = optimization.fallingBlockY.indexOf (b.id);
	optimization.fallingBlockY[c + 1] = b.position.y;
}

function goUp (b, f) {
	f.position.y = b.position.y - 50;
	f.overlap (fallingBlocks, goUp);
	// player
	for (let i = 0; i < 10; i++) {
		if (f.overlap (player)) {
			player.position.y --;
		} else {
			i = 10;
		}
	}

	var n = optimization.fallingBlockY.indexOf (f.id);
	optimization.fallingBlockY[n + 1] = f.position.y;
}

function detectWalls (s, i) {
	if (i == 1 || i == 3) {
		var posX = s.position.x;
		var oneWayWallCollide = 0;
		for (let i = 0; i < 25; i++) {
			posX += 50;
			// blue / red blocks
			for (let l = 0; l < blueBlocks.length; l++) {
				var b = blueBlocks[l];
				if (b.position.x == posX && b.position.y == s.position.y) {
					b.undestroyable = 1;
				}
			}

			for (let l = 0; l < redBlocks.length; l++) {
				var b = redBlocks[l];
				if (b.position.x == posX && b.position.y == s.position.y) {
					b.undestroyable = 1;
				}
			}

			// green blocks
			for (let l = 0; l < greenBlocks.length; l++) {
				var b = greenBlocks[l];
				if (b.position.x == posX && b.position.y == s.position.y) {
					b.undestroyable = 1;
				}
			}

			// one way walls
			for (let l = 0; l < oneWayWalls.length; l++) {
				var b = oneWayWalls[l];
				if (b.rotation == 0) {
					if (b.position.x == posX && b.position.y == s.position.y) {
						b.undestroyable = 1;
						if (i == 1) {
							oneWayWallCollide = 1;
						}
					}
				}
			}

			// walls
			for (let l = 0; l < walls.length; l++) {
				var b = walls[l];
				if (b.position.x == posX && b.position.y == s.position.y) {
					b.undestroyable = 1;
					i = 25;
				}
			}

			// stoppers
			for (let l = 0; l < stoppers.length; l++) {
				var b = stoppers[l];
				if (b.position.x == posX && b.position.y == s.position.y) {
					b.undestroyable = 1;
					i = 25;
				}
			}

			// one way walls
			for (let l = 0; l < oneWayWalls.length; l++) {
				var b = oneWayWalls[l];
				if (b.rotation == 180) {
					if (b.position.x == posX && b.position.y == s.position.y) {
						b.undestroyable = 1;
						i = 25;
					}
				}
			}
		}

		if (oneWayWallCollide == 0) {
			posX = s.position.x;
			for (let i = 0; i < 25; i++) {
				posX -= 50;
				// blue / red blocks
				for (let l = 0; l < blueBlocks.length; l++) {
					var b = blueBlocks[l];
					if (b.position.x == posX && b.position.y == s.position.y) {
						b.undestroyable = 1;
					}
				}

				for (let l = 0; l < redBlocks.length; l++) {
					var b = redBlocks[l];
					if (b.position.x == posX && b.position.y == s.position.y) {
						b.undestroyable = 1;
					}
				}

				// green blocks
				for (let l = 0; l < greenBlocks.length; l++) {
					var b = greenBlocks[l];
					if (b.position.x == posX && b.position.y == s.position.y) {
						b.undestroyable = 1;
					}
				}

				// one way walls
				for (let l = 0; l < oneWayWalls.length; l++) {
					var b = oneWayWalls[l];
					if (b.rotation == 180) {
						if (b.position.x == posX && b.position.y == s.position.y) {
							b.undestroyable = 1;
						}
					}
				}

				// walls
				for (let l = 0; l < walls.length; l++) {
					var b = walls[l];
					if (b.position.x == posX && b.position.y == s.position.y) {
						b.undestroyable = 1;
						i = 25;
					}
				}

				// stoppers
				for (let l = 0; l < stoppers.length; l++) {
					var b = stoppers[l];
					if (b.position.x == posX && b.position.y == s.position.y) {
						b.undestroyable = 1;
						i = 25;
					}
				}

				// one way walls
				for (let l = 0; l < oneWayWalls.length; l++) {
					var b = oneWayWalls[l];
					if (b.rotation == 0) {
						if (b.position.x == posX && b.position.y == s.position.y) {
							b.undestroyable = 1;
							i = 25;
						}
					}
				}
			}
		}
	} else {
		var posY = s.position.y;
		var oneWayWallCollide = 0;
		for (let i = 0; i < 25; i++) {
			posY += 50;
			// blue / red blocks
			for (let l = 0; l < blueBlocks.length; l++) {
				var b = blueBlocks[l];
				if (b.position.x == s.position.x && b.position.y == posY) {
					b.undestroyable = 1;
				}
			}

			for (let l = 0; l < redBlocks.length; l++) {
				var b = redBlocks[l];
				if (b.position.x == s.position.x && b.position.y == posY) {
					b.undestroyable = 1;
				}
			}

			// green blocks
			for (let l = 0; l < greenBlocks.length; l++) {
				var b = greenBlocks[l];
				if (b.position.x == s.position.x && b.position.y == posY) {
					b.undestroyable = 1;
				}
			}

			// green blocks
			for (let l = 0; l < greenBlocks.length; l++) {
				var b = greenBlocks[l];
				if (b.position.x == s.position.x && b.position.y == posY) {
					b.undestroyable = 1;
				}
			}

			// one way walls
			for (let l = 0; l < oneWayWalls.length; l++) {
				var b = oneWayWalls[l];
				if (b.rotation == 90) {
					if (b.position.x == s.position.x && b.position.y == posY) {
						b.undestroyable = 1;
						if (i == 2) {
							oneWayWallCollide = 1;
						}
					}
				}
			}

			// walls
			for (let l = 0; l < walls.length; l++) {
				var b = walls[l];
				if (b.position.x == s.position.x && b.position.y == posY) {
					b.undestroyable = 1;
					i = 25;
				}
			}

			// stoppers
			for (let l = 0; l < stoppers.length; l++) {
				var b = stoppers[l];
				if (b.position.x == s.position.x && b.position.y == posY) {
					b.undestroyable = 1;
					i = 25;
				}
			}

			// one way walls
			for (let l = 0; l < oneWayWalls.length; l++) {
				var b = oneWayWalls[l];
				if (b.rotation == 270) {
					if (b.position.x == s.position.x && b.position.y == posY) {
						b.undestroyable = 1;
						i = 25;
					}
				}
			}
		}

		if (oneWayWallCollide == 0) {
			posY = s.position.y;
			for (let i = 0; i < 25; i++) {
				posY -= 50;
				// blue / red blocks
				for (let l = 0; l < blueBlocks.length; l++) {
					var b = blueBlocks[l];
					if (b.position.x == s.position.x && b.position.y == posY) {
						b.undestroyable = 1;
					}
				}

				for (let l = 0; l < redBlocks.length; l++) {
					var b = redBlocks[l];
					if (b.position.x == s.position.x && b.position.y == posY) {
						b.undestroyable = 1;
					}
				}

				// green blocks
				for (let l = 0; l < greenBlocks.length; l++) {
					var b = greenBlocks[l];
					if (b.position.x == s.position.x && b.position.y == posY) {
						b.undestroyable = 1;
					}
				}

				// one way walls
				for (let l = 0; l < oneWayWalls.length; l++) {
					var b = oneWayWalls[l];
					if (b.rotation == 270) {
						if (b.position.x == s.position.x && b.position.y == posY) {
							b.undestroyable = 1;
						}
					}
				}

				// walls
				for (let l = 0; l < walls.length; l++) {
					var b = walls[l];
					if (b.position.x == s.position.x && b.position.y == posY) {
						b.undestroyable = 1;
						i = 25;
					}
				}

				// stoppers
				for (let l = 0; l < stoppers.length; l++) {
					var b = stoppers[l];
					if (b.position.x == s.position.x && b.position.y == posY) {
						b.undestroyable = 1;
						i = 25;
					}
				}

				// one way walls
				for (let l = 0; l < oneWayWalls.length; l++) {
					var b = oneWayWalls[l];
					if (b.rotation == 90) {
						if (b.position.x == s.position.x && b.position.y == posY) {
							b.undestroyable = 1;
							i = 25;
						}
					}
				}
			}
		}
	}
}

function rubyCollected (s, r) {
	if (r.time >= 0 && r.weightID == null && player.death == 0) {
		// player
		game.collectedrubies ++;
		r.life = 50;
		r.visible = false;
		r.time = -51;
		r.velocity.y = -1.5;
		if (game.collectedrubies == game.totalrubies) {
			exit.changeAnimation ("open");
		}

		// optimization
		for (let i = 0; i < optimization.rubyInfo.length; i += 3) {
			if (optimization.rubyInfo[i] == r.id) {
				optimization.rubyInfo[i + 1] = 0;
				i = optimization.rubyInfo.length;
			}
		}
	} else if (r.weightID == s.id) {
		// weight
		game.collectedrubies ++;
		r.life = 50;
		r.visible = false;
		r.time = -51;
		r.velocity.y = -1.5;
		if (game.collectedrubies == game.totalrubies) {
			exit.changeAnimation ("open");
		}

		// optimization
		for (let i = 0; i < optimization.rubyInfo.length; i += 3) {
			if (optimization.rubyInfo[i] == r.id) {
				optimization.rubyInfo[i + 1] = 0;
				i = optimization.rubyInfo.length;
			}
		}
	} else if (r.time == -1000 && s.id == r.id) {
		// slime
		game.collectedrubies ++;
		r.life = 50;
		r.visible = false;
		r.time = -51;
		r.velocity.y = -1.5;
		r.velocity.x = 0;
		if (game.collectedrubies == game.totalrubies) {
			exit.changeAnimation ("open");
		}
	}
}

function buttonPressed (s, g, lift) {
	if (g.life == -1) {
		g.changeAnimation ("pressed");
		walls2.remove (g);
		if (g.liftID > -1) {
			// lift
			let l = lifts[g.liftID];
			l.greenButton[g.rotation / 90] = 0;
		} else {
			for (let i = 0; i < optimization.buttonPressed.length; i++) {
				if (optimization.buttonPressed[i] == g.id) {
					optimization.buttonPressed[i + 1] = 0;
					i = optimization.buttonPressed.length;
				}
			}
		}

		if (lift == 1) {
			g.remove ();
		} else {
			// green blocks
			if (game.buttonPressed == 0) {
				for (let l = 0; l < greenBlocks.length; l++) {
					var b = greenBlocks[l];
					if (b.id == 1) {
						b.changeAnimation ("dottedLine");
						walls.remove (b);
					} else {
						b.changeAnimation ("block");
						b.addToGroup (walls);
					}
				}
			}

			g.life = 100;
			game.buttonPressed = 250;
		}
	}
}

function changeColor (p, br, s) {
	if (br.move == 0) {
		br.move = -8;
		br.velocity.y = -3;
		if (s != 1) {
			if (game.switch == 1) {
				game.switch = 2;
				for (let l = 0; l < blueRedSwitches.length; l++) {
					var s = blueRedSwitches[l];
					s.changeAnimation ("red");
				}
		
				for (let l = 0; l < blueBlocks.length; l++) {
					var b = blueBlocks[l];
					b.changeAnimation ("dottedLine");
					walls.remove (b);
				}
		
				for (let l = 0; l < redBlocks.length; l++) {
					var b = redBlocks[l];
					b.changeAnimation ("block");
					b.addToGroup (walls);
					// weights
					for (let i = 0; i < weights.length; i++) {
						var w = weights[i];
						if (b.overlap (w)) {
							var a;
							a = createSprite (w.position.x, w.position.y);
							a.addToGroup (deadWeights);
							a.velocity.y = 5;
							a.velocity.x = 1;
							a.addAnimation ("base", "images/weight.png");
							a.scale = 0.72;
							a.time = 150;
							for (let o = 0; o < optimization.weightX.length; o += 2) {
								if (optimization.weightX[o] == w.id) {
									optimization.weightX[o + 1] = 9999;
									o = optimization.weightX.length
								}
							}

							// ruby
							if (w.rubyID != undefined) {
								for (let o = 0; o < rubies.length; o++) {
									const r = rubies[o];
									if (r.id == w.rubyID) {
										rubyCollected (w, r);
									}
								}
							}

							w.remove ();
						}
					}
				}
			} else {
				game.switch = 1;
				for (let l = 0; l < blueRedSwitches.length; l++) {
					var s = blueRedSwitches[l];
					s.changeAnimation ("blue");
				}
		
				for (let l = 0; l < blueBlocks.length; l++) {
					var b = blueBlocks[l];
					b.changeAnimation ("block");
					b.addToGroup (walls);
					// weights
					for (let i = 0; i < weights.length; i++) {
						var w = weights[i];
						if (b.overlap (w)) {
							var a;
							a = createSprite (w.position.x, w.position.y);
							a.addToGroup (deadWeights);
							a.velocity.y = 5;
							a.velocity.x = 1;
							a.addAnimation ("base", "images/weight.png");
							a.scale = 0.72;
							a.time = 150;
							for (let o = 0; o < optimization.weightX.length; o += 2) {
								if (optimization.weightX[o] == w.id) {
									optimization.weightX[o + 1] = 9999;
									o = optimization.weightX.length
								}
							}

							// ruby
							if (w.rubyID != undefined) {
								for (let o = 0; o < rubies.length; o++) {
									const r = rubies[o];
									if (r.id == w.rubyID) {
										rubyCollected (w, r);
									}
								}
							}

							w.remove ();
						}
					}
				}
		
				for (let l = 0; l < redBlocks.length; l++) {
					var b = redBlocks[l];
					b.changeAnimation ("dottedLine");
					walls.remove (b);
				}
			}
		}
	}
}

function stompsCollide (t, w) {
	if (w.move > 0 && w.move != -8 || w.move < 0 && w.move != -8) {} else {
		if (t.velocity.x != 0) {
			t.position.x = round (t.position.x / 10) * 10 + t.velocity.x;
		} else {
			t.position.y = round (t.position.y / 10) * 10 + t.velocity.y;
		}

		if (t.velocity.y == 6 || t.velocity.y == -6 || t.velocity.x == 6 || t.velocity.x == -6) {
			t.velocity.y /= -4;
			t.velocity.x /= -4;
			t.position.y += t.velocity.y * 4;
			t.position.x += t.velocity.x * 4;
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
					s.velocity.y /= -4;
					s.velocity.x /= -4;
					s.position.y += s.velocity.y * 4;
					s.position.x += s.velocity.x * 4;
				} else {
					s.vy = s.velocity.y;
					s.vx = s.velocity.x;
					s.velocity.y = 0;
					s.velocity.x = 0;
					s.position.y += s.vy * -1;
					s.position.x += s.vx * -1;
					s.timeOut = 50;
				}

				if (s.rotation == 360) {
					s.position.y = t.position.y - 50;
				} else if (s.rotation == 450) {
					s.position.x = t.position.x + 50;
				} else if (s.rotation == 180) {
					s.position.y = t.position.y + 50;
				} else if (s.rotation == 270) {
					s.position.x = t.position.x - 50;
				}
			}
		}
	}
}

function slimeCollide (p, s) {
	if (s.anim != 2 && p.death == 0 && s.rotation == 0) {
		if (p.position.y < s.position.y - 35 + (p.velocityY + abs (player.velocityY)) / 2 - s.velocityY && p.anim != 5 || p.position.y < s.position.y - 25 + (p.velocityY + abs (player.velocityY)) / 2 - s.velocityY && p.anim == 5) {
			// slime kill
			s.changeAnimation ("dead");
			s.anim = 2;
			s.position.y += 8;
			s.velocity.x = 0;
			s.life = 25;
			p.velocityY = -12;
			p.jumping = 10;
			s.overlap (rubies, rubyCollected);
		} else {
			// lose
			loseSnd.play ();
			player.death = 50;
			player.visible = false;
			deaths ++;
		}
	}
}

function drawGroup (g) {
	for (var i = g.length - 1; i >= 0; i--) {
		var s = g[i];
		drawSprite (s);
	}
}

function newCheckPoint (p, c) {
	checkPoint.position.x = c.position.x;
	checkPoint.position.y = c.position.y;
	checkPoint.rotation = c.rotation;
}

function fallingBlockOverlap(p, f) {
	if (f.i == 1) {
		if (f.timeOut > -1 && f.timeOut < 150) {
			f.timeOut ++;
			if (f.timeOut == 1) {
				f.changeAnimation ("touch");
			}
		}
	} else {
		if (f.timeOut == 0) {
			f.timeOut = 1;
			f.velocity.x = 1;
		}
	}
}

function deleteOld () {
	// walls image
	for (let l = 0; l < walls.length; l++) {
		var w = walls[l];
		if (w.i > 0 && mouseC.overlap (w) && w.f != 1) {
			w.position.y += 10;
			for (let i = 0; i < walls.length; i++) {
				var b = walls[i];
				if (b.i == 3) {	
					if (w.overlap (b)) {
						b.changeAnimation ("top");
						b.i = 2;
					}
				}
			}

			for (let i = 0; i < water.length; i++) {
				var b = water[i];
				if (b.i == 2) {	
					if (w.overlap (b)) {
						b.changeAnimation ("top");
						b.i = 1;
					}
				}
			}

			for (let i = 0; i < lava.length; i++) {
				var b = lava[i];
				if (b.i == 2) {	
					if (w.overlap (b)) {
						b.changeAnimation ("top");
						b.i = 1;
					}
				}
			}

			w.position.y -= 10;
			// snow hill
			for (let i = 0; i < decorations.length; i++) {
				var s = decorations[i];
				if (s.i > 0 && s.id == 1) {
					w.position.x += 10;
					if (w.overlap (s)) {
						var a;
						a = 0;
						w.position.x += 90;
						for (let o = 0; o < decorations.length; o++) {
							var d = decorations[o];
							if (d.i > 0) {
								if (w.overlap (d)) {
									a = 1;
									o = decorations.length;
								}
							}
						}

						w.position.x -= 90;
						if (a == 1) {
							s.changeAnimation ("corner");
							s.mirrorX (-1);
							s.i = 4;
						} else {
							s.changeAnimation ("self");
							s.mirrorX (1);
							s.i = 1;
						}
					}

					w.position.x -= 20;
					if (w.overlap (s)) {
						var a;
						a = 0;
						w.position.x -= 90;
						for (let o = 0; o < decorations.length; o++) {
							var d = decorations[o];
							if (d.i > 0) {
								if (w.overlap (d)) {
									a = 1;
									o = decorations.length;
								}
							}
						}

						w.position.x += 100;
						if (a == 1) {
							s.changeAnimation ("corner");
							s.mirrorX (1);
							s.i = 3;
						} else {
							s.changeAnimation ("self");
							s.mirrorX (1);
							s.i = 1;
						}
					}

					w.position.x += 10;
				}
			}
		}
	}

	// lava image
	for (let l = 0; l < lava.length; l++) {
		var w = lava[l];
		if (mouseC.overlap (w)) {
			w.position.y += 10;
			for (let i = 0; i < lava.length; i++) {
				var b = lava[i];
				if (b.i == 2) {	
					if (w.overlap (b)) {
						b.changeAnimation ("top");
						b.i = 1;
					}
				}
			}

			for (let i = 0; i < water.length; i++) {
				var b = water[i];
				if (b.i == 2) {	
					if (w.overlap (b)) {
						b.changeAnimation ("top");
						b.i = 1;
					}
				}
			}
		}
	}

	// water image
	if (block != 4 && block != 5  && block != 6 && block != 16 && block != 17 && block != 18) {
		if (block < 22 || block > 37 && block < 45 || block > 68) {
			for (let l = 0; l < water.length; l++) {
				var w = water[l];
				if (mouseC.overlap (w)) {
					w.position.y += 10;
					for (let i = 0; i < water.length; i++) {
						var b = water[i];
						if (b.i == 2) {	
							if (w.overlap (b)) {
								b.changeAnimation ("top");
								b.i = 1;
							}
						}
					}
		
					for (let i = 0; i < lava.length; i++) {
						var b = lava[i];
						if (b.i == 2) {	
							if (w.overlap (b)) {
								b.changeAnimation ("top");
								b.i = 1;
							}
						}
					}
				}
			}
		}
	}

	// snow hill
	for (let l = 0; l < decorations.length; l++) {
		var w = decorations[l];
		if (w.i > 0 && mouseC.overlap (w) && w.id == 1) {
			for (let i = 0; i < decorations.length; i++) {
				var s = decorations[i];
				if (s.i > 0 && s.i < 5 && s.id == 1) {
					w.position.x += 10;
					if (w.overlap (s)) {
						var a;
						a = 0;
						w.position.x += 90;
						for (let o = 0; o < decorations.length; o++) {
							var d = decorations[o];
							if (d.i > 0) {
								if (w.overlap (d)) {
									a = 1;
									o = decorations.length;
								}
							}
						}

						w.position.x -= 90;
						if (a == 1) {
							s.changeAnimation ("corner");
							s.mirrorX (-1);
							s.i = 4;
						} else {
							s.changeAnimation ("self");
							s.mirrorX (1);
							s.i = 1;
						}
					}

					w.position.x -= 20;
					if (w.overlap (s)) {
						var a;
						a = 0;
						w.position.x -= 90;
						for (let o = 0; o < decorations.length; o++) {
							var d = decorations[o];
							if (d.i > 0) {
								if (w.overlap (d)) {
									a = 1;
									o = decorations.length;
								}
							}
						}

						w.position.x += 90;
						if (a == 1) {
							s.changeAnimation ("corner");
							s.mirrorX (1);
							s.i = 3;
						} else {
							s.changeAnimation ("self");
							s.mirrorX (1);
							s.i = 1;
						}
					}

					w.position.x += 10;
				}
			}
		}
	}

	// cane image
	for (let l = 0; l < decorations.length; l++) {
		var d = decorations[l];
		if (d.id == 2) {
			if (mouseC.overlap (d)) {
				d.position.y += 10;
				for (let i = 0; i < decorations.length; i++) {
					var b = decorations[i];
					if (b.id == 2) {
						if (d.overlap (b)) {
							b.changeAnimation ("top");
							b.i = 1;
						}
					}
				}
			}
		}
	}

	// delete blocks
	mouseC.overlap (walls, deleteBlock);
	mouseC.overlap (lava, deleteBlock);
	mouseC.overlap (checkPoints, deleteBlock);
	mouseC.overlap (trampolines, deleteBlock);
	mouseC.overlap (ladders, deleteBlock);
	mouseC.overlap (spikes, deleteBlock);
	mouseC.overlap (saws, deleteBlock);
	mouseC.overlap (stoppers, deleteBlock);
	mouseC.overlap (stomps, deleteBlock);
	mouseC.overlap (halfSaws, deleteBlock);
	mouseC.overlap (blueBlocks, deleteBlock);
	mouseC.overlap (redBlocks, deleteBlock);
	mouseC.overlap (timedBlocks, deleteBlock);
	mouseC.overlap (greenBlocks, deleteBlock);
	mouseC.overlap (bridges, deleteBlock);
	mouseC.overlap (boosters, deleteBlock);
	mouseC.overlap (rubies, deleteBlock);
	mouseC.overlap (walls2, deleteBlock);
	mouseC.overlap (oneWayWalls, deleteBlock);
	// decoration
	if (block != 34 && block != 35 && block != 58 && block != 59 && block != 65 && block != 55) {
		mouseC.overlap (decorations, deleteBlock);
	}
	// water
	if (block != 4 && block != 5 && block != 6 && block != 16 && block != 17 && block != 18) {
		if (block < 22 || block > 37 && block < 45 || block > 68) {
			mouseC.overlap (water, deleteBlock);
		}
	}
	// types
	if (block != 36 && block != 37) {
		mouseC.overlap (movingSaws, deleteBlock);
	}
	// check point
	if (mouseC.overlap (checkPoint)) {
		checkPoint.position.x = start.position.x;
		checkPoint.position.y = start.position.y;
		checkPoint.rotation = 0;
	}
	// slime
	if (block != 65 && block != 58) {
		mouseC.overlap (slimes, deleteBlock);
	}
	// weight
	if (block != 65 && block != 58) {
		mouseC.overlap (weights, deleteBlock);
	}
}

function changeBlock (event) {
	if (event.deltaY > 0) {
		// all
		if (inventory.categorySelected == 1) {
			if (inventory.blocksSelected[0] < game.blocksNumber) {
				inventory.blocksSelected[0] ++;
			} else {
				inventory.blocksSelected[0] = 1;
			}

			block = inventory.blocksSelected[0];
		}

		// walls
		if (inventory.categorySelected == 2) {
			if (inventory.blocksSelected[1] < inventory.walls.length - 1) {
				inventory.blocksSelected[1] ++;
			} else {
				inventory.blocksSelected[1] = 0;
			}

			block = inventory.walls [inventory.blocksSelected[1]];
		}

		// hazard
		if (inventory.categorySelected == 3) {
			if (inventory.blocksSelected[2] < inventory.hazard.length - 1) {
				inventory.blocksSelected[2] ++;
			} else {
				inventory.blocksSelected[2] = 0;
			}

			block = inventory.hazard [inventory.blocksSelected[2]];
		}

		// decorations
		if (inventory.categorySelected == 4) {
			if (inventory.blocksSelected[3] < inventory.decorations.length - 1) {
				inventory.blocksSelected[3] ++;
			} else {
				inventory.blocksSelected[3] = 0;
			}

			block = inventory.decorations [inventory.blocksSelected[3]];
		}

		// other
		if (inventory.categorySelected == 5) {
			if (inventory.blocksSelected[4] < inventory.other.length - 1) {
				inventory.blocksSelected[4] ++;
			} else {
				inventory.blocksSelected[4] = 0;
			}

			block = inventory.other [inventory.blocksSelected[4]];
		}
	} else {
		// all
		if (inventory.categorySelected == 1) {
			if (inventory.blocksSelected[0] > 1) {
				inventory.blocksSelected[0] --;
			} else {
				inventory.blocksSelected[0] = game.blocksNumber;
			}

			block = inventory.blocksSelected[0];
		}

		// walls
		if (inventory.categorySelected == 2) {
			if (inventory.blocksSelected[1] > 0) {
				inventory.blocksSelected[1] --;
			} else {
				inventory.blocksSelected[1] = inventory.walls.length - 1;
			}

			block = inventory.walls [inventory.blocksSelected[1]];
		}

		// hazard
		if (inventory.categorySelected == 3) {
			if (inventory.blocksSelected[2] > 0) {
				inventory.blocksSelected[2] --;
			} else {
				inventory.blocksSelected[2] = inventory.hazard.length - 1;
			}

			block = inventory.hazard [inventory.blocksSelected[2]];
		}

		// decorations
		if (inventory.categorySelected == 4) {
			if (inventory.blocksSelected[3] > 0) {
				inventory.blocksSelected[3] --;
			} else {
				inventory.blocksSelected[3] = inventory.decorations.length - 1;
			}

			block = inventory.decorations [inventory.blocksSelected[3]];
		}

		// other
		if (inventory.categorySelected == 5) {
			if (inventory.blocksSelected[4] > 0) {
				inventory.blocksSelected[4] --;
			} else {
				inventory.blocksSelected[4] = inventory.other.length - 1;
			}

			block = inventory.other [inventory.blocksSelected[4]];
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
		inventory.blocksSelected[0] = 2;
		inventory.categorySelected = 1;
		for (var i = Block.length - 1; i >= 0; i--) {
			if (mouseC.position.x / 50 == positionX[i] && mouseC.position.y / 50 == positionY[i]) {
				inventory.blocksSelected[0] = Block[i];
				inventory.categorySelected = 1;
				block = Block[i];
				rotation = Rotation[i];
				if (rotation > 7) {
					length = rotation - floor (rotation / 10) * 10;
					rotation = floor ((rotation - 10) / 10);
				}

				return;
			}
		}
	}

	// inventory
	if (Mode == 1 && mode == 2) {
		if (keyCode == 96) {
			inventory.categorySelected = 1;
			block = inventory.blocksSelected[0];
		}

		if (keyCode == 97) {
			inventory.categorySelected = 2;
			block = inventory.walls[inventory.blocksSelected[1]];
		}

		if (keyCode == 98) {
			inventory.categorySelected = 3;
			block = inventory.hazard[inventory.blocksSelected[2]];
		}

		if (keyCode == 99) {
			inventory.categorySelected = 4;
			block = inventory.decorations[inventory.blocksSelected[3]];
		}

		if (keyCode == 100) {
			inventory.categorySelected = 5;
			block = inventory.other[inventory.blocksSelected[4]];
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