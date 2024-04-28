function drawMenu () {
	if (submenuID == 0) {
		// game update
		gameUpdate ();
	} else if (submenuID == 1) {
		// home menu
		drawMode = "center";
		image (homeMenuImg, canvasWidth / 2 - (mouse.x - canvasWidth / 2) / 6, canvasHeight / 2 - (mouse.y - canvasHeight / 2) / 6, 1120, 630);
		fill ("white");
		image (img.logo, canvasWidth / 2, 100, 800);
		fill ("#eee");
		text.size = 20;
		text.align = "left";
		txt ("beta 1.0", 10, 530);
	} else if (menuID == 4 && submenuID == 2) {
		// settings selection
		background ("#eee");
		fill ("#999");
		text.size = 60;
		text.align = "center"
		txt ("Settings", canvasWidth / 2, 130);
	} else if (menuID == 1 && submenuID == 3) {
		// sounds settings
		background ("#eee");
		drawMode = "corner";
		image (greenPanelImg, -100, -210, 1160, 300);
		fill ("#eee");
		text.size = 60;
		text.align = "center"
		txt ("Sounds", canvasWidth / 2, 62);
		fill ("#242424");
		text.size = 28;
		text.align = "left"
		txt ("music volume: " + slider.music.value, 175, 168);
		txt ("sounds volume: " + slider.sounds.value, 175, 243);
	} else if (menuID == 2 && submenuID == 3) {
		// controls settings
		background ("#eee");
		fill ("#999");
		text.size = 60;
		text.align = "center"
		txt ("Controls", canvasWidth / 2, 80);
	} else if (menuID == 3 && submenuID == 3) {
		// other settings
		background ("#eee");
		fill ("#999");
		text.size = 60;
		text.align = "center"
		txt ("Settings", canvasWidth / 2, 80);
	}
}

function startCreator () {
	gameMode = 1;
	player.moves = true;
	camera.smooth = true;
	game.createBlockCountdown = 20;
	startLevel ();
}

function startPlay () {
	gameMode = 2;
	player.moves = false;
	player.jump = 0;
	player.state = 1;
	camera.smooth = true;
	startLevel ();
}

function startLevel () {
	// set precamera positions
	precamera.x = Math.round (camera.x / 50) * 50;
	precamera.y = Math.round (camera.y / 50) * 50;
	// set player
	player.velocity.x = 0;
	player.velocity.y = 0;
	player.changeCostume ("front");
	player.mirror.x = 1;
	// delete all old blocks
	deleteBlocks ();
	// create new blocks
	game.createBlockAnim = false;
	for (let i = 0; i < blocks.length; i++) {
		block = blocks[i];
		rotation = rotations[i];
		createBlock (positionX[i] * 50, positionY[i] * -50, true);
	}

	game.createBlockAnim = true;
	// deactivate blocks too far from camera
	for (let i = 0; i < activeSprites.length;) {
		const b = activeSprites[i];
		if (b.undestroyable != true && (b.position.x < precamera.x - 750 || b.position.x > precamera.x + 750 || b.position.y < precamera.y - 500 || b.position.y > precamera.y + 500)) {
			b.OFF ();
		} else {
			i++;
		}
	}
}

function newLevel () {
	submenuID = 0;
	hideAllButtons ();
	blocks = [];
	rotations = [];
	positionX = [];
	positionY = [];
	player.ON ();
	block = 1;
	rotation = 0;
	for (let i = -15; i < 15; i++) {
		createBlock (0, i * 50);
	}

	for (let i = -15; i < 15; i++) {
		createBlock (i * 50, 0);
	}
	
	camera.zoom (0.8);
	camera.ON ();
	startCreator ();
}

function homeMenu () {
	menuID = 1;
	submenuID = 1;
	hideAllButtons ();
	btn.play.visible = true;
	btn.create.visible = true;
	btn.online.visible = true;
	btn.settings.visible = true;
	menuSnd.play ();
}

function goBack () {
	if (menuID == 4 && submenuID == 2) {
		homeMenu ();
	} else if (menuID < 4 && submenuID == 3) {
		settingsMenu ();
		btn.back.position.y = 434;
	}
}

function settingsMenu () {
	menuID = 4;
	submenuID = 2;
	hideAllButtons ();
	btn.back.visible = true;
	btn.sounds.visible = true;
	btn.controls.visible = true;
	btn.otherSettings.visible = true;
	slider.music.visible = false;
	slider.sounds.visible = false;
}

function openSettings (b) {
	hideAllButtons ();
	btn.exit.visible = true;
	if (b.name == "sounds") {
		menuID = 1;
		submenuID = 3;
		slider.music.visible = true;
		slider.sounds.visible = true;
	} else if (b.name == "controls") {
		menuID = 2;
		submenuID = 3;
	} else if (b.name == "other") {
		menuID = 3;
		submenuID = 3;
	}
}

function btnPressed (params) {
	
}