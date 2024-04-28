function deleteBlock (x, y) {
	for (let i = 0; i < activeSprites.length;) {
		const b = activeSprites[i];
		if (b.undestroyable != true && b.position.x == x && b.position.y == y) {
			if (b.block == 1) {
				walls.remove (b);
				walls.forEach(w => {
					if (b.position.x == w.position.x && b.position.y == w.position.y + 50 || b.position.x == w.position.x - 50 && b.position.y == w.position.y || b.position.x == w.position.x && b.position.y == w.position.y - 50 || b.position.x == w.position.x + 50 && b.position.y == w.position.y) {
						let touching = [0, 0, 0, 0];
						walls.forEach(e => {
							if (w.position.x == e.position.x && w.position.y == e.position.y + 50) {
								// top
								touching[0] = 1;
							} else if (w.position.x == e.position.x - 50 && w.position.y == e.position.y) {
								// right
								touching[1] = 1;
							} else if (w.position.x == e.position.x && w.position.y == e.position.y - 50) {
								// bottom
								touching[2] = 1;
							} else if (w.position.x == e.position.x + 50 && w.position.y == e.position.y) {
								// left
								touching[3] = 1;
							}
						});
						touching = JSON.stringify (touching);
						if (touching == '[0,0,0,0]') {
							w.changeCostume ("00");
						} else if (touching == '[0,1,1,0]') {
							w.changeCostume ("01");
						} else if (touching == '[0,0,1,0]') {
							w.changeCostume ("02");
						} else if (touching == '[0,0,1,1]') {
							w.changeCostume ("03");
						} else if (touching == '[0,1,0,0]') {
							w.changeCostume ("04");
						} else if (touching == '[1,1,1,1]' || touching == '[1,1,0,1]' || touching == '[1,1,1,0]' || touching == '[1,0,1,1]' || touching == '[1,0,1,0]') {
							w.changeCostume ("05");
						} else if (touching == '[0,0,0,1]') {
							w.changeCostume ("06");
						} else if (touching == '[1,1,0,0]') {
							w.changeCostume ("07");
						} else if (touching == '[1,0,0,0]') {
							w.changeCostume ("08");
						} else if (touching == '[1,0,0,1]') {
							w.changeCostume ("09");
						} else {
							w.changeCostume ("10");
						}
					}
				});
			}
			b.delete ();
			for (let l = 0; l < positionX.length; l++) {
				if (x == positionX[l] * 50 && y == positionY[l] * -50) {
					blocks.splice (l, 1);
					positionX.splice (l, 1);
					positionY.splice (l, 1);
					rotations.splice (l, 1);
					break;
				}
			}
		} else {
			i++;
		}
	}
}

function deleteBlocks () {
	walls.deleteSprites ();
}

function createBlock (x, y, p) {
	if (p != true) {
		blocks.push (block);
		positionX.push (x / 50);
		positionY.push (y / -50);
		rotations.push (rotation);
	}
	
	if (block == 1) {
		createGround (x, y);
	}
}

function createGround (x, y) {
	let b = createSprite (x, y, 50, 50);
	b.addCostume ("00", img.grass00);
	b.addCostume ("01", img.grass01);
	b.addCostume ("02", img.grass02);
	b.addCostume ("03", img.grass03);
	b.addCostume ("04", img.grass04);
	b.addCostume ("05", img.grass05);
	b.addCostume ("06", img.grass06);
	b.addCostume ("07", img.grass07);
	b.addCostume ("08", img.grass08);
	b.addCostume ("09", img.grass09);
	b.addCostume ("10", img.grass10);
	b.block = 1;
	let touching = [0, 0, 0, 0];
	walls.forEach(w => {
		if (b.position.x == w.position.x && b.position.y == w.position.y + 50) {
			// top
			touching[0] = 1;
			if (w.currentCostume == "00") {
				w.changeCostume ("02");
			} else if (w.currentCostume == "04") {
				w.changeCostume ("01");
			} else if (w.currentCostume == "06") {
				w.changeCostume ("03");
			} else if (w.currentCostume == "07" || w.currentCostume == "08" || w.currentCostume == "09") {
				w.changeCostume ("05");
			}
		} else if (b.position.x == w.position.x - 50 && b.position.y == w.position.y) {
			// right
			touching[1] = 1;
			if (w.currentCostume == "00") {
				w.changeCostume ("06");
			} else if (w.currentCostume == "02") {
				w.changeCostume ("03");
			} else if (w.currentCostume == "01" || w.currentCostume == "04") {
				w.changeCostume ("10");
			} else if (w.currentCostume == "07") {
				w.changeCostume ("05");
			} else if (w.currentCostume == "08") {
				w.changeCostume ("09");
			}
		} else if (b.position.x == w.position.x && b.position.y == w.position.y - 50) {
			// bottom
			touching[2] = 1;
			if (w.currentCostume == "00") {
				w.changeCostume ("08");
			} else if (w.currentCostume == "04") {
				w.changeCostume ("07");
			} else if (w.currentCostume == "06") {
				w.changeCostume ("09");
			} else if (w.currentCostume == "01" || w.currentCostume == "02" || w.currentCostume == "03" || w.currentCostume == "10") {
				w.changeCostume ("05");
			}
		} else if (b.position.x == w.position.x + 50 && b.position.y == w.position.y) {
			// left
			touching[3] = 1;
			if (w.currentCostume == "00") {
				w.changeCostume ("04");
			} else if (w.currentCostume == "02") {
				w.changeCostume ("01");
			} else if (w.currentCostume == "03" || w.currentCostume == "06") {
				w.changeCostume ("10");
			} else if (w.currentCostume == "09") {
				w.changeCostume ("05");
			} else if (w.currentCostume == "08") {
				w.changeCostume ("07");
			}
		}
	});
	if (b.position.y == 0) {
		touching[2] = 1;
	}

	touching = JSON.stringify (touching);
	if (touching == '[0,0,0,0]') {
		b.changeCostume ("00");
	} else if (touching == '[0,1,1,0]') {
		b.changeCostume ("01");
	} else if (touching == '[0,0,1,0]') {
		b.changeCostume ("02");
	} else if (touching == '[0,0,1,1]') {
		b.changeCostume ("03");
	} else if (touching == '[0,1,0,0]') {
		b.changeCostume ("04");
	} else if (touching == '[1,1,1,1]' || touching == '[1,1,0,1]' || touching == '[1,1,1,0]' || touching == '[1,0,1,1]' || touching == '[1,0,1,0]') {
		b.changeCostume ("05");
	} else if (touching == '[0,0,0,1]') {
		b.changeCostume ("06");
	} else if (touching == '[1,1,0,0]') {
		b.changeCostume ("07");
	} else if (touching == '[1,0,0,0]') {
		b.changeCostume ("08");
	} else if (touching == '[1,0,0,1]') {
		b.changeCostume ("09");
	} else {
		b.changeCostume ("10");
	}
	b.addToGroup (walls);
	if (gameMode == 1 && game.createBlockAnim == true) {
		b.imageScale = 0.2;
		b.addToGroup (createBlockAnimations);
		b.timeOut = 9;
	} else {
		b.imageScale = 2.04;
	}
}