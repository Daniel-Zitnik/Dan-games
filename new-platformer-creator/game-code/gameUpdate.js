function gameUpdate () {
	updatePlayer ();
	// update camera position
	if (gameMode == 1) {
		camera.x = player.position.x;
		if (camera.smooth == true) {
			// smooth camera after switching modes
			if (camera.y < player.position.y) {
				camera.y += 10;
			} else {
				camera.y -= 10;
			}

			if (camera.y > player.position.y - 10 && camera.y < player.position.y + 10 || camera.y > -160) {
				camera.smooth = false;
				if (player.position.y < -160) {
					camera.y = player.position.y;
				} else {
					camera.y = -160;
				}
			}
		} else {
			// update camera y position
			if (player.position.y < -163) {
				camera.y = player.position.y;
			} else {
				camera.y = -163;
			}
		}
		
	} else {
		// camera x
		if (camera.x < player.position.x - 12) {
			camera.x = player.position.x - 12;
		} else if (camera.x > player.position.x + 12) {
			camera.x = player.position.x + 12;
		}

		// camera y
		if (player.jump == 9) {
			if (player.currentCostume == "crouch") {
				// player crouch
				if (camera.y > player.position.y - 87) {
					camera.y -= 5;
				} else if (camera.y < player.position.y - 97) {
					camera.y += 5;
				}
	
				if (camera.y >= player.position.y - 87 && camera.y <= player.position.y - 97) {
					camera.y = player.position.y - 92;
				}
			} else {
				// player normal size
				if (camera.y > player.position.y - 75) {
					camera.y -= 5;
				} else if (camera.y < player.position.y - 85) {
					camera.y += 5;
				}
	
				if (camera.y >= player.position.y - 75 && camera.y <= player.position.y - 85) {
					camera.y = player.position.y - 80;
				}
			}
		}

		if (camera.smooth == true) {
			// smooth camera transition
			if (camera.y > -312) {
				camera.y -= 15;
			} else {
				camera.smooth = false;
			}
			
			if (camera.y > -297 && camera.y < -327) {
				camera.y = -312;
				camera.smooth = false;
			}
		} else {
			// move camera if the player is too far
			if (camera.y < player.position.y - 100) {
				camera.y = player.position.y - 100;
			} else if (camera.y > player.position.y + 145) {
				camera.y = player.position.y + 145;
			}

			// camera stop
			if (camera.y > -312) {
				camera.y = -312;
			}
		}
	}
	
	// update precamera positions
	let chunkUpdate = false;
	if (camera.x > precamera.x + 50 || camera.x < precamera.x - 50) {
		precamera.x = Math.round (camera.x / 50) * 50;
		chunkUpdate = true;
	}

	if (camera.y > precamera.y + 50 || camera.y < precamera.y - 50) {
		precamera.y = Math.round (camera.y / 50) * 50;
		chunkUpdate = true;
	}
	// chunk update
	if (chunkUpdate == true) {
		// deactivate blocks too far from camera
		if (gameMode == 1) {
			for (let i = 0; i < activeSprites.length;) {
				const b = activeSprites[i];
				if (b.undestroyable != true && (b.position.x <= precamera.x - 750 || b.position.x >= precamera.x + 750 || b.position.y <= precamera.y - 500 || b.position.y >= precamera.y + 500)) {
					b.OFF ();
				} else {
					i++;
				}
			}
		} else {
			for (let i = 0; i < activeSprites.length;) {
				const b = activeSprites[i];
				if (b.undestroyable != true && (b.position.x <= precamera.x - 1100 || b.position.x >= precamera.x + 1100 || b.position.y <= precamera.y - 850 || b.position.y >= precamera.y + 850)) {
					b.OFF ();
				} else {
					i++;
				}
			}
		}
		// activate block that are too close to camera
		for (let i = 0; i < inactiveSprites.length;) {
			const b = inactiveSprites[i];
			if (b.undestroyable != true && b.position.x < precamera.x + 750 && b.position.x > precamera.x - 750 && b.position.y <= precamera.y + 500 && b.position.y >= precamera.y - 500) {
				b.ON ();
			} else {
				i++;
			}
		}
	}
	// switch mode
	if (keyUp (switchModeKey)) {
		if (gameMode == 1) {
			startPlay ();
		} else {
			startCreator ();
		}
	}

	if (gameMode == 1) {
		// switch block laying
		if (keyPressed (actionKey)) {
			game.multiSelection = !game.multiSelection;
		}
		// unzoom
		/*if (keyPressed (actionKeyAlt)) {
			game.unzoom = !game.unzoom;
		}
		if (game.unzoom == true) {
			if (camera.scale != 0.3) {
				if (camera.scale < 0.35) {
					camera.zoom (0.3);
				} else {
					camera.zoom (camera.scale - 0.05);
				}
			}
		} else {
			if (camera.scale != 0.8) {
				if (camera.scale > 0.75) {
					camera.zoom (0.8);
				} else {
					camera.zoom (camera.scale + 0.05);
				}
			}
		}*/
		// creating blocks
		if (game.createBlockCountdown > 0) {
			game.createBlockCountdown --;
		} else {
			if (game.multiSelection == false) {
				if (mouse.pressed == true && dl.mouse.outside == false && mouse.which != 2) {
					// single block laying
					const x = Math.round (mouse.x / 50) * 50;
					const y = Math.round (mouse.y / 50) * 50;
					if (mouse.which == 1) {
						var overlap = false;
						activeSprites.forEach(b => {
							if (b.undestroyable != true && b.position.x == x && b.position.y == y) {
								overlap = true;
							}
						});
						if (overlap == false) {
							createBlock (x, y);
						}
					} else if (mouse.which == 3) {
						deleteBlock (x, y);
					}
				}
			} else {
				// multiple blocks laying
				if (mouse.down == true && dl.mouse.outside == false && mouse.which != 2) {
					// writes first block positions
					game.firstBlockX = Math.round (mouse.x / 50) * 50;
					game.firstBlockY = Math.round (mouse.y / 50) * 50;
				} else if (mouse.up == true && dl.mouse.outside == false && mouse.which != 2) {
					// set variables
					const endX = Math.round (mouse.x / 50) * 50;
					const endY = Math.round (mouse.y / 50) * 50;
					const rowMax = Math.abs (game.firstBlockX - endX) / 50 + 1;
					const columnMax = Math.abs (game.firstBlockY - endY) / 50 + 1;
					// invert variables if needed
					if (endX < game.firstBlockX) {
						game.firstBlockX = endX;
					}
					if (endY < game.firstBlockY) {
						game.firstBlockY = endY;
					}
					// activate all blocks
					for (let i = 0; i < inactiveSprites.length;) {
						const b = inactiveSprites[i];
						b.ON ();
					}
					// create blocks
					for (let i = 0; i < rowMax; i++) {
						const x = game.firstBlockX + i * 50;
						for (let l = 0; l < columnMax; l++) {
							const y = game.firstBlockY + l * 50;
							if (mouse.which == 1) {
								var overlap = false;
								activeSprites.forEach(b => {
									if (b.undestroyable != true && b.position.x == x && b.position.y == y) {
										overlap = true;
									}
								});
								if (overlap == false) {
									createBlock (x, y);
								}
							} else {
								deleteBlock (x, y);
							}
						}
					}
					// deactivate blocks that are too far
					for (let i = 0; i < activeSprites.length;) {
						const b = activeSprites[i];
						if (b.undestroyable != true && (b.position.x < precamera.x - 750 || b.position.x > precamera.x + 750 || b.position.y < precamera.y - 500 || b.position.y > precamera.y + 500)) {
							b.OFF ();
							b.timeOut = 0;
						} else {
							i++;
						}
					}
				}
			}
		}
	}
	// draw
	background ("#4db6e1");
	if (gameMode == 1) {
		// draw grid
		fill ("#79c8e8");
		for (let i = 0; i < 26; i++) {
			line (precamera.x - 625 + i * 50, camera.y - 340, precamera.x - 625 + i * 50, camera.y + 340);
		}

		for (let i = 0; i < 16; i++) {
			line (camera.x - 605, precamera.y - 375 + i * 50, camera.x + 605, precamera.y - 375 + i * 50);
		}

		// create block animation
		for (let i = 0; i < createBlockAnimations.length;) {
			const b = createBlockAnimations[i];
			if (b.timeOut == 0) {
				b.timeOut = undefined;
				b.imageScale = 2.04;
				createBlockAnimations.remove (b);
			} else {
				b.timeOut --;
				b.imageScale += 0.2;
				i++;
			}
		}
	}

	drawSprites ();
	if (gameMode == 1) {
		// draw block tint
		ctx.globalAlpha = 0.5;
		if (mouse.pressed == true && mouse.which != 2) {
			// draw rectangle
			if (mouse.which == 1) {
				fill ("#888");
			} else {
				fill ("#e8222f");
			}
			if (game.multiSelection == true) {
				// multi selection
				const width = Math.abs (game.firstBlockX - Math.round (mouse.x / 50) * 50) + 50;
				const height = Math.abs (game.firstBlockY - Math.round (mouse.y / 50) * 50) + 50;
				var startX, startY;
				// set start positions
				if (Math.round (mouse.x / 50) * 50 > game.firstBlockX) {
					startX = game.firstBlockX;
				} else {
					startX = Math.round (mouse.x / 50) * 50;
				}
				if (Math.round (mouse.y / 50) * 50 > game.firstBlockY) {
					startY = game.firstBlockY;
				} else {
					startY = Math.round (mouse.y / 50) * 50;
				}
				// draw rectangle
				drawMode = "corner";
				rect (startX - 25, startY - 25, width, height);
				drawMode = "center";
			} else {
				// single selection
				rect (Math.round (mouse.x / 50) * 50, Math.round (mouse.y / 50) * 50, 50, 50);
			}
		} else {
			// draw current block
			image (img.blocks[block - 1], Math.round (mouse.x / 50) * 50, Math.round (mouse.y / 50) * 50, 50, 50);
		}
		
		ctx.globalAlpha = 1;
		// draw red line
		if (camera.y > -315) {
			fill ("#e8222f");
			ctx.lineWidth = 6;
			line (camera.x - 605, 25, camera.x + 605, 25);
			fill ("#fff");
			ctx.lineWidth = 4;
			for (let i = 0; i < 26; i++) {
				line (precamera.x - 612.5 + i * 50, 25, precamera.x - 637.5 + i * 50, 25);
			}
			ctx.lineWidth = 1;
		}
	}
	player.draw ();
	// developer tools
	if (keyUp ("u")) {
		if (camera.scale == 0.8) {
			camera.zoom (0.3);
		} else {
			camera.zoom (0.8);
		}
	}
}

function deleteBlocks () {
	walls.deleteSprites ();
}