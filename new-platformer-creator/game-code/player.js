function updatePlayer () {
	if (gameMode == 1) {
		// creator mode
		if (keyDown (upKey) || keyDown (upKeyAlt)) {
			// go up
			if (keyDown (runKey) || keyDown (runKeyAlt)) {
				player.velocity.y = -40;
			} else {
				player.velocity.y -= 2;
			}
		} else if (keyDown (downKey) || keyDown (downKeyAlt)) {
			// go down
			if (keyDown (runKey) || keyDown (runKeyAlt)) {
				player.velocity.y = 40;
			} else {
				player.velocity.y += 2;
			}
		}

		if (player.position.y > -10) {
			// player can't go under the red line
			player.position.y = -10;
			player.velocity.y = 0;
		}
		
		if (keyDown (rightKey) || keyDown (rightKeyAlt)) {
			// go right
			if (keyDown (runKey) || keyDown (runKeyAlt)) {
				player.velocity.x = 40;
			} else {
				player.velocity.x += 2;
			}
		} else if (keyDown (leftKey) || keyDown (leftKeyAlt)) {
			// go left
			if (keyDown (runKey) || keyDown (runKeyAlt)) {
				player.velocity.x = -40;
			} else {
				player.velocity.x -= 2;
			}
		}
		// friction x
		if (player.velocity.x > 0) {
			if (player.velocity.x > 40) {
				player.velocity.x = 40;
			} else if (player.velocity.x > 15 && keyDown (runKey) == false && keyDown (runKeyAlt) == false) {
				player.velocity.x = 15;
			} else {
				player.velocity.x -= 1;
			}
		} else if (player.velocity.x < 0) {
			if (player.velocity.x < -40) {
				player.velocity.x = -40;
			} else if (player.velocity.x < -15 && keyDown (runKey) == false && keyDown (runKeyAlt) == false) {
				player.velocity.x = -15;
			} else {
				player.velocity.x += 1;
			}
		}
		// friction y
		if (player.velocity.y > 0) {
			if (player.velocity.y > 40) {
				player.velocity.y = 40;
			} else if (player.velocity.y > 15 && keyDown (runKey) == false && keyDown (runKeyAlt) == false) {
				player.velocity.y = 15;
			} else {
				player.velocity.y -= 1;
			}
		} else if (player.velocity.y < 0) {
			if (player.velocity.y < -40) {
				player.velocity.y = -40;
			} else if (player.velocity.y < -15 && keyDown (runKey) == false && keyDown (runKeyAlt) == false) {
				player.velocity.y = -15;
			} else {
				player.velocity.y += 1;
			}
		}
	} else {
		// play mode
		// fall
		if (player.state == 2 || player.state == 3) {
			if (player.velocity.y < 6) {
				player.velocity.y += 0.5;
			}
		} else {
			if (player.velocity.y < 20) {
				player.velocity.y ++;
			}
		}

		if (player.jump >= -15) {
			// go right
			if ((keyDown (rightKey) || keyDown (rightKeyAlt)) && player.currentCostume != "crouch") {
				// anim
				player.mirror.x = 1;
				if (player.jump == 9 && player.currentCostume != "jump" && player.currentCostume != "walk") {
					player.changeCostume ("walk");
					player.getCostume("walk").image.setFrame(1);
				}

				if (keyDown (runKey) == false && keyDown (runKeyAlt) == false) {
					// walk
					if (player.jump == 9) {
						player.velocity.x ++;
					} else {
						player.velocity.x += 0.5;
					}
					if (player.velocity.x > 6.5) {
						player.velocity.x = 6.5;
					}
				} else if (keyDown (runKey) || keyDown (runKeyAlt)) {
					// run
					if (player.jump == 9) {
						player.velocity.x ++;
					} else {
						player.velocity.x += 0.5;
					}
					if (player.velocity.x > 10.5) {
						player.velocity.x = 10.5;
					}
				}
			}

			// go left
			if ((keyDown (leftKey) || keyDown (leftKeyAlt)) && player.currentCostume != "crouch") {
				// anim
				player.mirror.x = -1;
				if (player.jump == 9 && player.currentCostume != "jump" && player.currentCostume != "walk") {
					player.changeCostume ("walk");
					player.getCostume("walk").image.setFrame(1);
				}

				if (keyDown (runKey) == false && keyDown (runKeyAlt) == false) {
					// walk
					if (player.jump == 9) {
						player.velocity.x --;
					} else {
						player.velocity.x -= 0.5;
					}
					if (player.velocity.x < -6.5) {
						player.velocity.x = -6.5;
					}
				} else if (keyDown (runKey) || keyDown (runKeyAlt) ) {
					// run
					if (player.jump == 9) {
						player.velocity.x --;
					} else {
						player.velocity.x -= 0.5;
					}
					if (player.velocity.x < -10.5) {
						player.velocity.x = -10.5;
					}
				}
			}
		}

		if (player.jump < 0) {
			player.jump ++;
		}

		// player friction x
		if (player.jump == 9) {
			if (player.velocity.x > 0) {
				player.velocity.x -= 0.5;
			}
	
			if (player.velocity.x < 0) {
				player.velocity.x += 0.5;
			}

			if (player.velocity.x < 0.5 && player.velocity.x > -0.5) {
				player.velocity.x = 0;
				if (player.currentCostume == "walk") {
					player.changeCostume ("stand");
				}
			}
		} else if (player.currentCostume == "walk") {
			player.changeCostume ("jump");
		}

		// walls x collide
		player.updateVelocity (1);
		let overlapX = false;
		if (player.velocity.x != 0) {
			player.overlap (walls, function (p, w) {
				if (player.velocity.x > 0) {
					player.position.x = w.position.x - 48;
				} else {
					player.position.x = w.position.x + 48;
				}

				// wall slide
				if (((keyDown (rightKey) || keyDown (rightKeyAlt)) && player.state == 1 && player.velocity.y > 0 || player.jump < 0) && player.velocity.x > 0 && player.currentCostume != "crouch") {
					// right
					player.state = 2;
					player.changeCostume ("jump");
					player.mirror.x = 1;
					if (player.velocity.y < 0) {
						player.velocity.y = 0;
					}
				} else if (((keyDown (leftKey) || keyDown (leftKeyAlt)) && player.state == 1 && player.velocity.y > 0 || player.jump < 0) && player.velocity.x < 0 && player.currentCostume != "crouch") {
					// left
					player.state = 3;
					player.changeCostume ("jump");
					player.mirror.x = -1;
					if (player.velocity.y < 0) {
						player.velocity.y = 0;
					}
				}
				overlapX = true;
				player.velocity.x = 0;
			});
		}

		// stop wall jump
		if (player.state == 2 && overlapX == false) {
			player.position.x ++;
			if (player.overlap (walls) == false) {
				player.state = 1;
				player.changeCostume ("stand");
			}

			player.position.x --;
		} else if (player.state == 3 && overlapX == false) {
			player.position.x --;
			if (player.overlap (walls) == false) {
				player.state = 1;
				player.changeCostume ("stand");
			}

			player.position.x ++;
		}

		// walls y collide
		player.updateVelocity (2);
		player.overlap (walls, function (p, w) {
			if (player.velocity.y > 0) {
				if (player.currentCostume == "crouch") {
					player.position.y = w.position.y - 48;
				} else {
					player.position.y = w.position.y - 60;
				}
				
				player.jump = 10;
				if (player.state == 2 || player.state == 3) {
					player.state = 1;
				}

				if (player.currentCostume == "jump") {
					player.changeCostume ("stand");
				}	
			} else {
				if (player.currentCostume == "crouch") {
					player.position.y = w.position.y + 48;
				} else {
					player.position.y = w.position.y + 60;
				}
			}
			player.velocity.y = 0;
		});

		// up key
		if (keyPressed (upKey) || keyPressed (upKeyAlt)) {
			if (player.state == 2) {
				// right wall jump
				player.velocity.x = -9;
				player.velocity.y = -17;
				player.jump = -30;
				player.state = 1;
				player.mirror.x = -1;
			} else if (player.state == 3) {
				// left wall jump
				player.velocity.x = 9;
				player.velocity.y = -17;
				player.jump = -30;
				player.state = 1;
				player.mirror.x = 1;
			} else if (player.jump == 10) {
				// jump
				if (player.currentCostume != "crouch") {
					player.changeCostume ("jump");
					player.state = 1;
				}
				player.velocity.y = -13;
			}
		} else if (keyDown (upKey) || keyDown (upKeyAlt)) {
			if (player.jump > 0 && player.state == 1 && player.currentCostume == "jump") {
				player.velocity.y -= 1.5;
			}
		}

		if (player.jump > 0) {
			player.jump --;
		}

		// crouch
		if ((keyPressed (downKey) || keyPressed (downKeyAlt))) {
			player.changeCostume ("crouch");
			player.setCollider ("rect", 0, 0, 46, 46);
			player.position.y += 12;
			player.state = 1;
		}
		// stop crouch
		if ((keyUp (downKey) || keyUp (downKeyAlt))) {
			player.changeCostume ("front");
			player.setCollider ("rect", 0, 0, 46, 70);
			player.position.y -= 12;
		}
	}
}