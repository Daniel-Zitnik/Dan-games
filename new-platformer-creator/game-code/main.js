// game variables
var player, menuID, submenuID, gameMode, musicVolume, soundsVolume, block, rotation;
// other game variables
var game = {
	createBlockAnim: true, createBlockCountdown: 0, multiSelection: false, firstBlockX: 0, firstBlockY: 0, unzoom: false
}
// game constans
const maxBlock = 1;
// key controll variables
var upKey, downKey, rightKey, leftKey, upKeyAlt, downKeyAlt, rightKeyAlt, leftKeyAlt, runKey, runKeyAlt, switchModeKey;
// groups
var createBlockAnimations, walls;
// game lists
var blocks = [], rotations = [], positionX = [], positionY = [];
// images
var homeMenuImg, cursorImg;
// buttons
var btn = {
	play: null, create: null, online: null, settings: null, back: null, controls: null, sounds: null, otherSettings: null
}
// images
img = {
	grass00: null, grass01: null, grass02: null, grass03: null, grass04: null, grass05: null, grass06: null, grass07: null, grass08: null, grass09: null, grass10: null, grass11: null, logo: null,
	player: {
		front: null, stand: null, jump: null, hurt: null, crouch: null, walk1: null, walk2: null, climb1: null, climb2: null, swim1: null, swim2: null
	},
	blocks: []
}
// sliders
var slider = {
	music: null, sounds: null
}
// precamera position
var precamera = {
	x: 0, y: 0
}
// button images
var greenButtonImg, redButtonImg, greenPointerImg, greenPanelImg, redButton2Img;
// sounds
var menuSnd, gameSnd, buttonClickSnd;
// fonts
var kenneyFont;

setCanvas (960, 540);

function init () {
	background ("white");
	// load fonts
	kenneyFont = loadFont ("kenney", "url(../fonts/kenvector_future_thin.ttf)");
	// ui images
	greenButtonImg = loadImage ("images/UI/greenButton.svg");
	redButtonImg = loadImage ("images/UI/redButton.svg");
	redButton2Img = loadImage ("images/UI/redButton2.svg");
	greenPointerImg = loadImage ("images/UI/slider_pointer.svg");
	greenPanelImg = loadImage ("images/UI/green_panel.svg");
	img.logo = loadImage ("images/UI/logo.svg");
	// player images
	img.player.front = loadImage ("images/player/front.svg");
	img.player.stand = loadImage ("images/player/stand.svg");
	img.player.jump = loadImage ("images/player/jump.svg");
	img.player.hurt = loadImage ("images/player/hurt.svg");
	img.player.crouch = loadImage ("images/player/crouch.svg");
	img.player.climb1 = loadImage ("images/player/climb1.svg");
	img.player.climb2 = loadImage ("images/player/climb2.svg");
	img.player.swim1 = loadImage ("images/player/swim1.svg");
	img.player.swim2 = loadImage ("images/player/swim2.svg");
	img.player.walk = loadAnimation (["images/player/walk1.svg", "images/player/walk2.svg"]);
	// other images
	homeMenuImg = loadImage ("images/other/menuImg.jpg");
	cursorImg = loadImage ("images/other/cursor_pointer3D.png");
	// ground images
	img.grass00 = loadImage ("images/ground/grass00.svg");
	img.grass01 = loadImage ("images/ground/grass01.svg");
	img.grass02 = loadImage ("images/ground/grass02.svg");
	img.grass03 = loadImage ("images/ground/grass03.svg");
	img.grass04 = loadImage ("images/ground/grass04.svg");
	img.grass05 = loadImage ("images/ground/grass05.svg");
	img.grass06 = loadImage ("images/ground/grass06.svg");
	img.grass07 = loadImage ("images/ground/grass07.svg");
	img.grass08 = loadImage ("images/ground/grass08.svg");
	img.grass09 = loadImage ("images/ground/grass09.svg");
	img.grass10 = loadImage ("images/ground/grass10.svg");
	// load sounds
	menuSnd = loadSound ("sounds/menu.mp3");
	gameSnd = loadSound ("sounds/game.mp3");
	buttonClickSnd = loadSound ("sounds/button_click.mp3");
}

function setup () {
	// set font
	text.font = "kenney";
	// set cursor
	dl.cursor.changeStyle ("custom");
	dl.cursor.addImage (cursorImg, 20, 24);
	// set variables
	img.blocks = [img.grass00];
	camera.smooth = false;
	// set sounds
	musicVolume = 0;
	soundsVolume = 0;
	menuSnd.loop = true;
	gameSnd.loop = true;
	// set key controll variables
	upKey = "KeyW";
	downKey = "KeyS";
	rightKey = "KeyD";
	leftKey = "KeyA";
	upKeyAlt = "ArrowUp";
	downKeyAlt = "ArrowDown";
	rightKeyAlt = "ArrowRight";
	leftKeyAlt = "ArrowLeft";
	runKey = "ShiftLeft";
	runKeyAlt = "KeyN";
	actionKey = "Space";
	actionKeyAlt = "KeyM";
	switchModeKey = "KeyQ";
	// setup player
	img.player.walk.frameDelay = 120;
	player = createSprite (0, 0, 50, 70);
	player.setCollider ("rect", 0, 0, 46, 70);
	player.addCostume ("front", img.player.front);
	player.addCostume ("stand", img.player.stand);
	player.addCostume ("jump", img.player.jump);
	player.addCostume ("hurt", img.player.hurt);
	player.addCostume ("crouch", img.player.crouch);
	player.addCostume ("walk", img.player.walk);
	player.addCostume ("climb1", img.player.climb1);
	player.addCostume ("climb2", img.player.climb2);
	player.addCostume ("swim1", img.player.swim1);
	player.addCostume ("swim2", img.player.swim2);
	player.changeCostume ("front");
	player.debug = true;
	player.imageScale = 0.769;
	player.undestroyable = true;
	player.state = 1;
	player.jump = 0;
	player.OFF ();
	// create groups
	createBlockAnimations = createGroup ();
	walls = createGroup ();
	// play button
	btn.play = createButton ("play", 480, 230, btnPressed, -6);
	btn.play.text.setVariables (26, "#396a23", "kenney");
	btn.play.hoverText.setVariables (26, "#eef8e9", "kenney");
	btn.play.addImage (greenButtonImg, 228, 60);
	// create button
	btn.create = createButton ("create", 480, 298, newLevel, -6);
	btn.create.text.setVariables (26, "#396a23", "kenney");
	btn.create.hoverText.setVariables (26, "#eef8e9", "kenney");
	btn.create.addImage (greenButtonImg, 228, 60);
	// online button
	btn.online = createButton ("online", 480, 366, btnPressed, -6);
	btn.online.text.setVariables (26, "#396a23", "kenney");
	btn.online.hoverText.setVariables (26, "#eef8e9", "kenney");
	btn.online.addImage (greenButtonImg, 228, 60);
	// settings button
	btn.settings = createButton ("settings", 480, 434, settingsMenu, -6);
	btn.settings.text.setVariables (26, "#396a23", "kenney");
	btn.settings.hoverText.setVariables (26, "#eef8e9", "kenney");
	btn.settings.addImage (greenButtonImg, 228, 60);
	// back button
	btn.back = createButton ("back", 480, 434, goBack, -6);
	btn.back.text.setVariables (26, "#7c390c", "kenney");
	btn.back.hoverText.setVariables (26, "#fad2cf", "kenney");
	btn.back.addImage (redButtonImg, 228, 60);
	// back button
	btn.exit = createButton ("X", 920, 40, goBack, -6);
	btn.exit.text.setVariables (26, "#7c390c", "arial");
	btn.exit.hoverText.setVariables (26, "#fad2cf", "arial");
	btn.exit.addImage (redButton2Img, 60, 60);
	// sounds button
	btn.sounds = createButton ("sounds", 480, 230, openSettings, -6);
	btn.sounds.text.setVariables (26, "#396a23", "kenney");
	btn.sounds.hoverText.setVariables (26, "#eef8e9", "kenney");
	btn.sounds.addImage (greenButtonImg, 228, 60);
	// controls button
	btn.controls = createButton ("controls", 480, 298, openSettings, -6);
	btn.controls.text.setVariables (26, "#396a23", "kenney");
	btn.controls.hoverText.setVariables (26, "#eef8e9", "kenney");
	btn.controls.addImage (greenButtonImg, 228, 60);
	// other settings button
	btn.otherSettings = createButton ("other", 480, 366, openSettings, -6);
	btn.otherSettings.text.setVariables (26, "#396a23", "kenney");
	btn.otherSettings.hoverText.setVariables (26, "#eef8e9", "kenney");
	btn.otherSettings.addImage (greenButtonImg, 228, 60);
	// music slider
	slider.music = createSlider (535, 160, 0, 100, musicVolume, 250, 5);
	slider.music.addImages (greenPointerImg);
	slider.music.pointer.width = 28;
	slider.music.pointer.height = 42;
	slider.music.sliderColor = "#999";
	slider.music.valueColor = "#60b13a";
	slider.music.visible = false;
	// sounds slider
	slider.sounds = createSlider (535, 235, 0, 100, soundsVolume, 250, 5);
	slider.sounds.addImages (greenPointerImg);
	slider.sounds.pointer.width = 28;
	slider.sounds.pointer.height = 42;
	slider.sounds.sliderColor = "#999";
	slider.sounds.valueColor = "#60b13a";
	slider.sounds.visible = false;
	// change volume of sounds
	slider.music.valueChange = function () {
		musicVolume = slider.music.value;
		menuSnd.volume = musicVolume / 100;
		gameSnd.volume = musicVolume / 100;
	}
	
	slider.sounds.valueChange = function () {
		soundsVolume = slider.sounds.value;
		buttonClickSnd.volume = soundsVolume / 100;
	}
	// update sounds
	slider.music.valueChange ();
	slider.sounds.valueChange ();
	// open home menu
	homeMenu ();
}

function run () {
	if (dl.buttonPressed == true) {
		buttonClickSnd.play ();
	}

	drawMenu ();
}

// disable right click
const danGameDiv = document.getElementById ("dangame");
danGameDiv.addEventListener("contextmenu", function (e){
    e.preventDefault();
}, false);