
/// canvas variables
let canvas, ctx, canvasWidth, canvasHeight;
// inlibrary variables
let drawMode = "corner", frameSpeed = 1;
// create inlibrary groups
let allSprites = createGroup ();
let activeSprites = createGroup ();
let inactiveSprites = createGroup ();
// current position of mouse cursor in canvas
let mouse = {
	x: 0,
	y: 0,
	down: false,
	pressed: false,
	up: false,
	which: null,
}
// current font settings
let text = {
	font: "arial",
	size: 16,
	align: "left"
}
// variables determined only for library
let dl = {
	animations: [],
	buttons: [],
	sliders: [],
	inputs: [],
	tooLag: false, // if fps is lower than 12.5 set to true
	color: "#000", // current fill color
	canvasScale: 1, // scale of canvas
	buttonPressed: false,
	cursor: {
		style: "normal",
		image: null,
		with: 0,
		height: 0,
		offsetX: 0,
		offsetY: 0,
		hoverImage: null,
		hoverWith: 0,
		hoverHeight: 0,
		hoverOffsetX: 0,
		hoverOffsetY: 0,
		buttonHover: false,
		addImage: function (img, width, height) {
			dl.cursor.image = img;
			dl.cursor.with = width;
			dl.cursor.height = height;
		},
		addHoverImage: function (img, width, height) {
			dl.cursor.hoverImage = img;
			dl.cursor.hoverWith = width;
			dl.cursor.hoverHeight = height;
		},
		changeStyle: function (style) {
			dl.cursor.style = style;
			if (style == "normal") {
				canvas.style.cursor = "default";
			} else {
				canvas.style.cursor = "none";
			}
		}
	},
	// mouse position on screen & if it's outside canvas
	mouse: {
		x: 0,
		y: 0,
		outside: false
	},
	// info about images
	images: {
		all: 0,
		loaded: 0,
		name: [] // list of all images
	},
	// info about fonts
	fonts: {
		all: 0,
		loaded: 0,
		name: [] // list of all fonts
	},
	// info about sounds
	sounds: {
		all: 0,
		loaded: 0,
		name: [] // list of all sounds
	},
	// list of keys that are pressed
	key: {
		press: [],
		down: [],
		up: []
	},
	// for determine the frame update call time
	frame: {
		time: 0, // time from the last frame
		last: 0, // last frame time
		tick: 50 // how many frames are in 1 second
	},
	// check if sprites overlap
	spritesOverlap (sprite1, sprite2, callFunct) {
		// set collisers info
		let ax = sprite1.position.x + sprite1.collider.offsetX * sprite1.scale; // sprite 1 postion x
		let ay = sprite1.position.y + sprite1.collider.offsetY * sprite1.scale; // sprite 1 postion y
		let aw = sprite1.collider.width * sprite1.scale; // sprite 1 width
		let ah = sprite1.collider.height * sprite1.scale; // sprite 1 height
		let bx = sprite2.position.x + sprite2.collider.offsetX * sprite2.scale; // sprite 2 postion x
		let by = sprite2.position.y + sprite2.collider.offsetY * sprite2.scale; // sprite 2 postion y
		let bw = sprite2.collider.width * sprite2.scale; // sprite 2 width
		let bh = sprite2.collider.height * sprite2.scale; // sprite 2 height
		let distX = Math.abs (ax - bx); // distance x from collider centers
		let distY = Math.abs (ay - by); // distance y from collider centers
		// if sprites overlap variable is set to true
		let ol = false;
		// overlap check
		if (sprite1.collider.type == "rect") {
			if (sprite2.collider.type == "rect") {
				// rect to rect
				if (distX < aw / 2 + bw / 2 && distY < ah / 2 + bh / 2) {
					ol = true;
				}
			} else if (sprite2.collider.type == "point") {
				// rect to point
				if (distX < aw / 2 && distY < ah / 2) {
					ol = true;
				}
			} else {
				// rect to circle
				if (distX > (aw / 2 + bw)) {
					ol = false;
				} else if (distY > (ah / 2 + bw)) {
					ol = false;
				} else if (distX <= (aw / 2)) {
					ol = true;
				} else if (distY <= (ah / 2)) { 
					ol = true;
				} else {
					let dx = distX - aw / 2;
					let dy = distY - ah / 2;
					if (dx * dx + dy * dy <= (bw * bw)) {
						ol = true;
					}
				}
			}
		} else if (sprite1.collider.type == "point") {
			if (sprite2.collider.type == "rect") {
				// point to rect
				if (distX < bw / 2 && distY < bh / 2) {
					ol = true;
				}
			} else if (sprite2.collider.type == "point") {
				// point to point
				if (ax == bx && ay == by) {
					ol = true;
				}
			} else {
				// point to cirle
				let dist = Math.sqrt ((ax - bx) ** 2 + (ay - by) ** 2);
				if (dist < bw) {
					ol = true;
				}
			}
		} else {
			if (sprite2.collider.type == "rect") {
				// circle to rect
				if (distX > (bw / 2 + aw)) {
					ol = false;
				} else if (distY > (bh / 2 + aw)) {
					ol = false;
				} else if (distX <= (bw / 2)) {
					ol = true;
				} else if (distY <= (bh / 2)) { 
					ol = true;
				} else {
					let dx = distX - bw / 2;
					let dy = distY - bh / 2;
					if (dx * dx + dy * dy <= (aw * aw)) {
						ol = true;
					}
				}
			} else if (sprite2.collider.type == "point") {
				// circle to point
				let dist = Math.sqrt ((ax - bx) ** 2 + (ay - by) ** 2);
				if (dist < aw) {
					ol = true;
				}
			} else {
				// cirle to circle
				let dist = Math.sqrt ((ax - bx) ** 2 + (ay - by) ** 2);
				if (dist < aw + bw) {
					ol = true;
				}
			}
		}
	
		if (ol == true) {
			// sprites overlap
			if (callFunct == undefined) {
				return true; // no function to call
			} else {
				callFunct (sprite1, sprite2); // call function in parameter
			}
		} else if (callFunct == undefined) {
			// sprites don't overlap
			return false;
		}
	},

	// check if sprites overlap
	spritesBounce (sprite1, sprite2, callFunct) {
		// convert sprites speed to velocity
		if (sprite1._speedValue != 0) {
			const a = sprite1._speedAngle / 180 * Math.PI;
			sprite1.velocity.x += Math.cos (a) * sprite1._speedValue;
			sprite1.velocity.y += Math.sin (a) * sprite1._speedValue;
		}
		
		if (sprite2._speedValue != 0) {
			const a = sprite2._speedAngle / 180 * Math.PI;
			sprite2.velocity.x += Math.cos (a) * sprite2._speedValue;
			sprite2.velocity.y += Math.sin (a) * sprite2._speedValue;
		}
		// set collisers info
		const ax = sprite1.position.x + sprite1.collider.offsetX * sprite1.scale; // sprite 1 postion x
		const ay = sprite1.position.y + sprite1.collider.offsetY * sprite1.scale; // sprite 1 postion y
		const aw = sprite1.collider.width * sprite1.scale; // sprite 1 width
		const ah = sprite1.collider.height * sprite1.scale; // sprite 1 height
		const bx = sprite2.position.x + sprite2.collider.offsetX * sprite2.scale; // sprite 2 postion x
		const by = sprite2.position.y + sprite2.collider.offsetY * sprite2.scale; // sprite 2 postion y
		const bw = sprite2.collider.width * sprite2.scale; // sprite 2 width
		const bh = sprite2.collider.height * sprite2.scale; // sprite 2 height
		const distX = Math.abs (ax - bx); // distance x from collider centers
		const distY = Math.abs (ay - by); // distance y from collider centers
		// if sprites over variable is set to true
		let bounce = false;
		let direction = null;
		// bounce check
		if (sprite1.collider.type == "rect") {
			if (sprite2.collider.type == "rect") {
				// rect to rect
				if (distX < aw / 2 + bw / 2 && distY < ah / 2 + bh / 2) {
					bounce = true;
					sprite1.move(-sprite1.velocity.x, -sprite1.velocity.y);
					if (distX / (aw + bw) > distY / (ah + bh)) {
						// left or right bounce
						sprite1.velocity.x = -sprite1.velocity.x;
					} else {
						// bottom or top bounce
						sprite1.velocity.y = -sprite1.velocity.y;
					}
				}
			} else if (sprite2.collider.type == "point") {
				// rect to point
				if (distX < aw / 2 && distY < ah / 2) {
					bounce = true;
					if (distX / aw > distY / ah) {
						// left or right bounce
						sprite1.velocity.x = -sprite1.velocity.x;
					} else {
						// bottom or top bounce
						sprite1.velocity.y = -sprite1.velocity.y;
					}
				}
			} else {
				// rect to circle
				if (distX > (aw / 2 + bw)) {
					bounce = false;
				} else if (distY > (ah / 2 + bw)) {
					bounce = false;
				} else if (distX <= (aw / 2)) {
					bounce = true;
				} else if (distY <= (ah / 2)) { 
					bounce = true;
				} else {
					let dx = distX - aw / 2;
					let dy = distY - ah / 2;
					if (dx * dx + dy * dy <= (bw * bw)) {
						bounce = true;
					}
				}

				if (bounce == true) {
					if (bx > ax + aw / 2 && by > ay + ah / 2) {
						// bottom right corner
						direction = Math.atan2 (ay + ah / 2 - by, ax + aw / 2 - bx) * 180 / Math.PI;
					} else if (bx > ax + aw / 2 && by < ay - ah / 2) {
						// top right corner
						direction = Math.atan2 (ay - ah / 2 - by, ax + aw / 2 - bx) * 180 / Math.PI;
					} else if (bx < ax - aw / 2 && by > ay + ah / 2) {
						// bottom left corner
						direction = Math.atan2 (ay + ah / 2 - by, ax - aw / 2 - bx) * 180 / Math.PI;
					} else if (bx < ax - aw / 2 && by < ay - ah / 2) {
						// top left corner
						direction = Math.atan2 (ay - ah / 2 - by, ax - aw / 2 - bx) * 180 / Math.PI;
					} else {
						// center
						if (distX / (aw + bw) > distY / (ah + bh)) {
							// left or right bounce
							sprite1.velocity.x = -sprite1.velocity.x;
						} else {
							// bottom or top bounce
							sprite1.velocity.y = -sprite1.velocity.y;
						}
					}
				}
			}
		} else if (sprite1.collider.type == "point") {
			if (sprite2.collider.type == "rect") {
				// point to rect
				if (distX < bw / 2 && distY < bh / 2) {
					bounce = true;
					if (distX / bw > distY / bh) {
						// left or right bounce
						sprite1.velocity.x = -sprite1.velocity.x;
					} else {
						// bottom or top bounce
						sprite1.velocity.y = -sprite1.velocity.y;
					}
				}
			} else if (sprite2.collider.type == "point") {
				// point to point
				// can't bounce
			} else {
				// point to cirle
				let dist = Math.sqrt ((ax - bx) ** 2 + (ay - by) ** 2);
				if (dist < bw) {
					bounce = true;
					direction = Math.atan2 (ay - by, ax - bx) * 180 / Math.PI;
				}
			}
		} else {
			if (sprite2.collider.type == "rect") {
				// circle to rect
				if (distX > (bw / 2 + aw)) {
					bounce = false;
				} else if (distY > (bh / 2 + aw)) {
					bounce = false;
				} else if (distX <= (bw / 2)) {
					bounce = true;
				} else if (distY <= (bh / 2)) { 
					bounce = true;
				} else {
					let dx = distX - bw / 2;
					let dy = distY - bh / 2;
					if (dx * dx + dy * dy <= (aw * aw)) {
						bounce = true;
					}
				}

				if (bounce == true) {
					if (ax > bx + bw / 2 && ay > by + bh / 2) {
						// bottom right corner
						direction = Math.atan2 (by + bh / 2 - ay, bx + bw / 2 - ax) * 180 / Math.PI;
					} else if (ax > bx + bw / 2 && ay < by - bh / 2) {
						// top right corner
						direction = Math.atan2 (by - bh / 2 - ay, bx + bw / 2 - ax) * 180 / Math.PI;
					} else if (ax < bx - bw / 2 && ay > by + bh / 2) {
						// bottom left corner
						direction = Math.atan2 (by + bh / 2 - ay, bx - bw / 2 - ax) * 180 / Math.PI;
					} else if (ax < bx - bw / 2 && ay < by - bh / 2) {
						// top left corner
						direction = Math.atan2 (by - bh / 2 - ay, bx - bw / 2 - ax) * 180 / Math.PI;
					} else {
						// center
						if (distX / (aw + bw) > distY / (ah + bh)) {
							// left or right bounce
							sprite1.velocity.x = -sprite1.velocity.x;
						} else {
							// bottom or top bounce
							sprite1.velocity.y = -sprite1.velocity.y;
						}
					}
				}
			} else if (sprite2.collider.type == "point") {
				// circle to point
				let dist = Math.sqrt ((ax - bx) ** 2 + (ay - by) ** 2);
				if (dist < aw) {
					bounce = true;
					direction = Math.atan2 (ay - by, ax - bx) * 180 / Math.PI;
				}
			} else {
				// cirle to circle
				let dist = Math.sqrt ((ax - bx) ** 2 + (ay - by) ** 2);
				if (dist < aw + bw) {
					bounce = true;
					direction = Math.atan2 (ay - by, ax - bx) * 180 / Math.PI;
				}
			}
		}

		if (direction !== null) {
			let dirSpeed = Math.atan2 (sprite1.velocity.y, sprite1.velocity.x) * 180 / Math.PI;
			let dirChange = direction - dirSpeed;
			let newDir = dirSpeed + dirChange * 2 + 180;
			if (newDir > 360) {
				newDir -= 360;
			} else if (newDir < 0) {
				newDir += 360;
			}
			sprite1.setSpeed (dirSpeed, newDir);
		}
	
		if (bounce == true) {
			// convert velocity to speed
			if (sprite1._speedValue != 0) {
				sprite1._speedValue = Math.sqrt (sprite1.velocity.x ** 2 + sprite1.velocity.y ** 2);
				sprite1._speedAngle = Math.atan2(sprite1.velocity.y, sprite1.velocity.x) * (180 / Math.PI);
				sprite1.velocity.x = 0;
				sprite1.velocity.y = 0;
			}

			if (sprite2._speedValue != 0) {
				sprite2._speedValue = Math.sqrt (sprite2.velocity.x ** 2 + sprite2.velocity.y ** 2);
				sprite2._speedAngle = Math.atan2(sprite2.velocity.y, sprite2.velocity.x) * (180 / Math.PI);
				sprite2.velocity.x = 0;
				sprite2.velocity.y = 0;
			}
			
			// sprites bounce
			if (callFunct == undefined) {
				return true; // no function to call
			} else {
				callFunct (sprite1, sprite2); // call function in parameter
			}
		} else if (callFunct == undefined) {
			// reset sprites velocity
			if (sprite1._speedValue != 0) {
				sprite1.velocity.x = 0;
				sprite1.velocity.y = 0;
			}

			if (sprite2._speedValue != 0) {
				sprite2.velocity.x = 0;
				sprite2.velocity.y = 0;
			}

			// sprites don't bounce
			return false;
		} else {
			// reset sprites velocity
			if (sprite1._speedValue != 0) {
				sprite1.velocity.x = 0;
				sprite1.velocity.y = 0;
			}

			if (sprite2._speedValue != 0) {
				sprite2.velocity.x = 0;
				sprite2.velocity.y = 0;
			}
		}
	}
}

// camera variables and functions
let camera = {
	x: 0,
	y: 0,
	rotation: 0,
	active: false,
	scale: 1,
	mirror: new Vector (1, 1),
	ON () {
		// set canvas transformation for camera
		ctx.translate (canvasWidth / 2, canvasHeight / 2);
		ctx.rotate (camera.rotation * Math.PI / 180);
		ctx.scale (camera.scale, camera.scale);
		ctx.scale (camera.mirror.x, camera.mirror.y);
		camera.active = true;
		// set mouse position
		mouse.x = (dl.mouse.x / dl.canvasScale - canvasWidth / 2) / camera.scale + camera.x;
		mouse.y = (dl.mouse.y / dl.canvasScale - canvasHeight / 2) / camera.scale + camera.y;
	},
	OFF () {
		// reset canvas transformation for camera
		ctx.scale (1 / camera.scale, 1 / camera.scale);
		ctx.scale (camera.mirror.x, camera.mirror.y);
		ctx.rotate (-camera.rotation * Math.PI / 180);
		ctx.translate (-canvasWidth / 2, -canvasHeight / 2);
		camera.active = false;
		// set mouse position
		mouse.x = dl.mouse.x / dl.canvasScale;
		mouse.y = dl.mouse.y / dl.canvasScale;
	},
	zoom (scale) {
		if (camera.active == true) {
			// scale canvas, only if camera is on
			ctx.scale (1 / camera.scale * scale, 1 / camera.scale * scale);
		}
		camera.scale = scale;
	},
	rotate (degrees) {
		if (camera.active == true) {
			// rotate canvas, only if camera is on
			ctx.rotate ((degrees - camera.rotation) * Math.PI / 180);
		}
		camera.rotation = degrees;
	},
	mirrorX (mirror) {
		// mirror entire canvas by x axis
		if (camera.active == true) {
			if (camera.mirror.x == 1) {
				ctx.scale (mirror, 1);
			} else {
				ctx.scale (-mirror, 1);
			}
		}
		
		camera.mirror.x = mirror;
	},
	mirrorY (mirror) {
		// mirror entire canvas by y axis
		if (camera.active == true) {
			if (camera.mirror.y == 1) {
				ctx.scale (1, mirror);
			} else {
				ctx.scale (1, -mirror);
			}
		}

		camera.mirror.y = mirror;
	}
}

// set canvas width & height
function setCanvas (width, height) {
	// setup canvas
	canvas = document.createElement ("canvas");
	const div = document.getElementById("dangame");
	div.appendChild(canvas);
	ctx = canvas.getContext ("2d");
	div.style.width = width + "px";
	div.style.height = height + "px";
	// set canvas size
	ctx.canvas.width = width;
	ctx.canvas.height = height;
	// save canvas size
	canvasWidth = width;
	canvasHeight = height;
	// set camera position in the middle of screen
	camera.x = canvas.width / 2;
	camera.y = canvas.height / 2;
	// hide canvas until the button is pressed
	canvas.style.display = "none";
}

// function called after cliking on dan game button
function startDanGame () {
	// show canvas
	canvas.style.display = "block";
	// hide button
	const dangameButton = document.getElementById ("dangameButton");
	dangameButton.style.display = "none";
	init (); // function for assets load
	// wait until all images are loaded and then call function setup and frame update
	dl.images.name.forEach (img => {
		img.addEventListener("load", function () {
			dl.images.loaded ++; // update number of loaded images after image load
			if (dl.images.loaded == dl.images.all && dl.fonts.loaded == dl.fonts.all && dl.sounds.loaded == dl.sounds.all) {
				runCode ();
			}
		});
	});

	dl.fonts.name.forEach (font => {
		font.load().then((f) => {
			document.fonts.add(f);
			dl.fonts.loaded ++; // update number of loaded images after image load
			if (dl.images.loaded == dl.images.all && dl.fonts.loaded == dl.fonts.all && dl.sounds.loaded == dl.sounds.all) {
				runCode ();
			}
		});
	});

	dl.sounds.name.forEach (audio => {
		audio.addEventListener("canplaythrough", () => {
			dl.sounds.loaded ++; // update number of loaded images after image load
			if (dl.images.loaded == dl.images.all && dl.fonts.loaded == dl.fonts.all && dl.sounds.loaded == dl.sounds.all) {
				runCode ();
			}
		});
	});
}

// change canvas scale
function scaleCanvas (scale) {
	// turn off camera, if it's activated
	let con = camera.active;
	if (con == true) {
		camera.OFF ();
	}
	// change canvas size
	ctx.canvas.width = canvasWidth * scale;
	ctx.canvas.height = canvasHeight * scale;
	// change canvas scale
	ctx.scale (scale, scale);
	// save canvas scale
	dl.canvasScale = scale;
	// chnage div size
	const div = document.getElementById("dangame");
	div.style.width = canvas.width + "px";
	div.style.height = canvas.height + "px";
	// turn on camera, if it was activated
	if (con == true) {
		camera.ON ();
	}
	// resize inputs
	dl.inputs.forEach(i => {
		let x = i.style.left.slice (0, -2);
		let y = i.style.top.slice (0, -2);
		let width = i.style.width.slice (0, -2);
		let height = i.style.height.slice (0, -2);
		let fontSize = i.style.fontSize.slice (0, -2);
		let fontFamily = i.style.fontFamily;
		i.setPosition (x, y);
		i.setSize (width, height);
		i.setText (fontFamily, fontSize);
	});
}

// set background of canvas
function background (color) {
	ctx.fillStyle = color;
	if (camera.active == true) {
		camera.OFF ();
		ctx.fillRect(0, 0, canvasWidth, canvasHeight);
		camera.ON ();
	} else {
		ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	}
}

// scale canvas to max posible size
function openFullscreen () {
	let scaleX = window.innerWidth / canvasWidth;
	let scaleY = window.innerHeight / canvasHeight;
	if (scaleX < scaleY) {
		scaleCanvas (scaleX);
	} else {
		scaleCanvas (scaleY);
	}

	// add class
	const div = document.getElementById("dangame");
	div.setAttribute('class', 'full-screen');
}

// scale canvas to original size
function closeFullscreen () {
	scaleCanvas (1);
	// remove class
	const div = document.getElementById("dangame");
	div.removeAttribute('class');
}

// function for loading images
function loadImage (src) {
	let img = new Image ();
	dl.images.name.push (img); // add image to image list
	img.src = src; // set source of image
	dl.images.all ++; // update image number
	return img;
}

// function for loading fonts
function loadFont (family, src) {
	let font = new FontFace (family, src);
	dl.fonts.name.push (font); // add font to font list
	dl.fonts.all ++; // update font number
	return font;
}

// function for loading animations
function loadAnimation (sources) {
	let images = sources.map(s => {
		return loadImage (s);
	});
	let anim = new Animation (images);
	dl.animations.push (anim);
	return anim;
}

// function for creating animations
function createAnimation (images, frameDelay = 100) {
	let anim = new Animation (images, frameDelay);
	dl.animations.push (anim);
	return anim;
}

function Animation (images, frameDelay) {
	this.images = images;
	this.frameDelay = frameDelay;
	this.image = images[0];
	this.imageNumber = 1;
	this.lastFrame = 0;
	this.draw = function (x, y, width, height, degrees, mirrorX, mirrorY) {
		image (this.image, x, y, width, height, degrees, mirrorX, mirrorY);
	}

	this.setFrame = function (n) {
		this.image = images[n - 1];
		this.imageNumber = n;
		this.lastFrame = Date.now();
	}
}

function loadSound (src) {
	let audio = new Audio ();
	dl.sounds.name.push (audio);
	audio.src = src;
	dl.sounds.all ++;
	return audio;
}

function runCode () {
	// reset mouse
	mouse.down = false;
	mouse.pressed = false;
	mouse.up = false;
	// when all assets are loaded
	dl.animations.forEach(a => {
		a.lastFrame = Date.now();
	});

	setup ();

	dl.frame.last = Date.now() - 1000 / dl.frame.tick; // set last frame time
	frameUpdate (); // infinitely calling function
}

// infinitely calling function
function frameUpdate () {
	// set frame speed
	dl.frame.time = Date.now() - dl.frame.last; // set how long it take from last frame
	frameSpeed = dl.frame.time * dl.frame.tick / 1000;
	dl.frame.last = Date.now(); // update last frame time
	if (frameSpeed > 4) {
		// if the game is too lag, frame speed is set to 4, so it don't mess up the game
		frameSpeed = 4;
		dl.tooLag = true;
	} else {
		dl.tooLag = false;
	}
	// set current position of mouse in canvas
	mouse.x = dl.mouse.x / dl.canvasScale;
	mouse.y = dl.mouse.y / dl.canvasScale;
	dl.mouse.outside = false;
	if (mouse.x < 0) {
		mouse.x = 0;
		dl.mouse.outside = true;
	} else if (mouse.x > canvasWidth) {
		mouse.x = canvasWidth;
		dl.mouse.outside = true;
	}

	if (mouse.y < 0) {
		mouse.y = 0;
		dl.mouse.outside = true;
	} else if (mouse.y > canvasHeight) {
		mouse.y = canvasHeight;
		dl.mouse.outside = true;
	}

	if (camera.active == true) {
		mouse.x = (mouse.x - canvasWidth / 2) / camera.scale + camera.x;
		mouse.y = (mouse.y - canvasHeight / 2) / camera.scale + camera.y;
	}

	let dm = drawMode;
	let clr = dl.color;
	// update animations
	dl.animations.forEach(a => {
		if (a.frameDelay < Date.now() - a.lastFrame) {
			// set next frame of animation
			dl.tooLag == true ? a.lastFrame = Date.now() : a.lastFrame += a.frameDelay;
			if (a.imageNumber == a.images.length) {
				a.imageNumber = 1;
			} else {
				a.imageNumber ++;
			}

			a.image = a.images[a.imageNumber - 1];
		}
	});
	
	// update every sprite that is active
	activeSprites.forEach(s => {
		s.update ();
	});

	drawMode = dm;
	fill (clr);
	// call function run
	run ();

	dm = drawMode;
	clr = dl.color;
	// update every button that is visible
	dl.cursor.buttonHover = false;
	drawMode = "center";
	dl.buttonPressed = false;
	dl.buttons.forEach(b => {
		if (b.visible == true) {
			b.update ();
		}
	});
	// update every slider that is visible
	dl.sliders.forEach(s => {
		if (s.visible == true) {
			s.update ();
		}
	});
	// draw cursor
	if (dl.cursor.style == "normal") {
		if (dl.cursor.buttonHover == false) {
			canvas.style.cursor = "default";
		} else {
			canvas.style.cursor = "pointer";
		}
	} else if (dl.cursor.style == "custom" && dl.mouse.outside == false) {
		drawMode = "corner";
		let cm = false;
		if (camera.active == true) {
			cm = true;
			camera.OFF (); 
		}

		ctx.scale (1 / dl.canvasScale, 1 / dl.canvasScale);
		if (dl.cursor.buttonHover == false || dl.cursor.hoverImage == null) {
			image (dl.cursor.image, (mouse.x + dl.cursor.offsetX) * dl.canvasScale, (mouse.y + dl.cursor.offsetY) * dl.canvasScale, dl.cursor.with, dl.cursor.height);
		} else {
			image (dl.cursor.hoverImage, (mouse.x + dl.cursor.hoverOffsetX) * dl.canvasScale, (mouse.y + dl.cursor.hoverOffsetY) * dl.canvasScale, dl.cursor.hoverWith, dl.cursor.hoverHeight);
		}

		ctx.scale (dl.canvasScale, dl.canvasScale);
		if (cm == true) { camera.ON (); }
	}

	drawMode = dm;
	fill (clr);
	// reset lists of key interactions
	dl.key.press = [];
	dl.key.up = [];
	// reset mouse interaction
	mouse.down = false;
	mouse.up = false;
	// call function after some time
	requestAnimationFrame (frameUpdate);
}

function translate (x, y) {
	ctx.translate (x, y);
}

function rotate (degrees) {
	ctx.rotate (degrees * Math.PI / 180); // convert radians to degrees
}

// translate with added camera position
function movePosition (x, y) {
	if (camera.active == true) {
		ctx.translate ((x - camera.x), (y - camera.y));
	} else {
		ctx.translate (x, y);
	}
}

// draw image on canvas
function image (img, x, y, width = img.width, height = img.height * (width / img.width), degrees, mirrorX = 1, mirrorY = 1) {
	ctx.save (); // save canvas transformation
	movePosition (x, y);
	rotate (degrees);
	ctx.scale (mirrorX, mirrorY);
	if (drawMode == "corner") {
		ctx.drawImage (img, 0, 0, width, height);
	} else if (drawMode == "center") {
		ctx.drawImage (img, width / -2, height / -2, width, height);
	} else {
		console.log ("ERROR:" + drawMode + "is not a type of draw mode");
	}

	ctx.restore (); // restore canvas transformation
}

// set color for drawing
function fill (color) {
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	dl.color = color;
}

// draw rectangle
function rect (x, y, width, height, degrees, radius) {
	ctx.save ();
	movePosition (x, y);
	rotate (degrees);
	if (drawMode == "corner") {
		if (radius) {
			ctx.beginPath();
			ctx.roundRect(0, 0, width, height, radius);
			ctx.fill();
		} else {
			ctx.fillRect (0, 0, width, height);
		}
	} else if (drawMode == "center") {
		if (radius) {
			ctx.beginPath();
			ctx.roundRect(width / -2, height / -2, width, height, radius);
			ctx.fill();
		} else {
			ctx.fillRect (width / -2, height / -2, width, height);
		}
	} else {
		console.log ("ERROR:" + drawMode + "is not a type of draw mode");
	}

	ctx.restore ();
}

// draw stroke of rectangle
function strokeRect (x, y, width, height, degrees, weight, radius) {
	ctx.save ();
	ctx.lineWidth = weight;
	movePosition (x, y);
	rotate (degrees);
	if (drawMode == "corner") {
		if (radius) {
			ctx.beginPath();
			ctx.roundRect(0, 0, width, height, radius);
			ctx.stroke();
		} else {
			ctx.strokeRect (0, 0, width, height);
		}
	} else if (drawMode == "center") {
		if (radius) {
			ctx.beginPath();
			ctx.roundRect(width / -2, height / -2, width, height, radius);
			ctx.stroke();
		} else {
			ctx.strokeRect (width / -2, height / -2, width, height);
		}
	} else {
		console.log ("ERROR:" + drawMode + "is not a type of draw mode");
	}

	ctx.restore ();
}

// draw circle
function circle (x, y, radius) {
	ctx.save ();
	movePosition (x, y);
	ctx.beginPath ();
	ctx.arc (0, 0, radius, 0, Math.PI * 2);
	ctx.closePath ();
	ctx.fill ();
	ctx.restore ();
}

// draw stroke of circle
function strokeCircle (x, y, radius) {
	ctx.save ();
	movePosition (x, y);
	ctx.beginPath ();
	ctx.arc (0, 0, radius, 0, Math.PI * 2);
	ctx.closePath ();
	ctx.stroke ();
	ctx.restore ();
}

// draw simple line
function line (x1, y1, x2, y2) {
	ctx.beginPath ();
	if (camera.active == true) {
		ctx.moveTo (x1 - camera.x, y1 - camera.y);
		ctx.lineTo (x2 - camera.x, y2 - camera.y);
	} else {
		ctx.moveTo (x1, y1);
		ctx.lineTo (x2, y2);
	}
	
	ctx.closePath ();
	ctx.stroke ();
}

// draw text message
function txt (msg, x, y) {
	ctx.font = text.size + "px " + text.font; // set canvas text size and font from variables
	ctx.textAlign = text.align;
	if (camera.active == true) {
		ctx.fillText (msg, x - camera.x, y - camera.y);
	} else {
		ctx.fillText (msg, x, y);
	}
}

function createButton (text, x, y, pressed, txtOffsetY, txtHoverOffsetY) {
	let btn = new Button (text, x, y);
	dl.buttons.push (btn);
	if (pressed != undefined) { btn.pressed = pressed }
	if (txtOffsetY != undefined) {
		btn.txtOffsetY = txtOffsetY;
		if (txtHoverOffsetY != undefined) {
			btn.hoverTxtOffsetY = txtHoverOffsetY; 
		} else {
			btn.hoverTxtOffsetY = txtOffsetY;
		}
	}

	return btn;
}

function Button (text, x, y) {
	this.position = new Vector (x, y);
	this.width = 100;
	this.height = 50;
	this.text = new TextInfo ();
	this.hoverText = new TextInfo ();
	this.name = text;
	this.visible = true;
	this.image = null;
	this.hoverImage = null;
	this.pressed = null;
	this.color = "#aaa";
	this.txtOffsetY = 0;
	this.hoverTxtOffsetY = 0;

	this.update = function () {
		if (mouse.x > this.position.x - this.width / 2 && mouse.x < this.position.x + this.width / 2 && mouse.y > this.position.y - this.height / 2 && mouse.y < this.position.y + this.height / 2) {
			// draw button hover
			dl.cursor.buttonHover = true;
			if (this.hoverImage != null) {
				image (this.hoverImage, this.position.x, this.position.y, this.width, this.height);
			} else {
				fill (this.color);
				rect (this.position.x, this.position.y, this.width, this.height);
			}

			// button pressed
			if (mouse.down == true && dl.buttonPressed == false) {
				this.pressed (this);
				dl.buttonPressed = true;
			}

			// draw button name
			this.hoverText.setText ();
			txt (this.name, this.position.x, this.position.y + this.text.size / 2 + this.hoverTxtOffsetY);
			this.hoverText.previousText ();
		} else {
			// draw button
			if (this.image != null) {
				image (this.image, this.position.x, this.position.y, this.width, this.height);
			} else {
				fill (this.color);
				rect (this.position.x, this.position.y, this.width, this.height);
			}

			// draw button name
			this.text.setText ();
			txt (this.name, this.position.x, this.position.y + this.text.size / 2 + this.txtOffsetY);
			this.text.previousText ();
		}
	}

	// adds button image
	this.addImage = function (img, width, height, hoverImg) {
		this.image = img;
		width == undefined ? this.width = img.width : this.width = width;
		height == undefined ? this.height = img.height : this.height = height;
		if (hoverImg == undefined) {
			this.hoverImage = img;
		} else {
			this.hoverImage = hoverImg;
		}
	}
}

function TextInfo () {
	this.size = 16;
	this.color = "#000";
	this.font = "arial";
	this.align = "center";
	this.preSize = null;
	this.preColor = null;
	this.preFont = null;
	this.preAlign = null;

	this.setVariables = function (size, color, font, align) {
		this.size = size;
		this.color = color;
		this.font = font;
		if (align != undefined) { this.align = align; }
	}

	this.setText = function () {
		this.preAlign = drawMode;
		this.preSize = text.size;
		this.preFont = text.font;
		this.preColor = dl.color;
		text.align = this.align;
		text.size = this.size;
		text.font = this.font;
		fill (this.color);
	}

	this.previousText = function () {
		text.align = this.preAlign;
		text.size = this.preSize;
		text.font = this.preFont;
		fill (this.preColor);
	}
}

function hideAllButtons () {
	dl.buttons.forEach(b => {
		b.visible = false;
	});
}

function createSlider (x, y, min, max, value, width, height) {
	if (width == undefined) { width = 100 }
	if (height == undefined) { height = 5 }
	if (value == undefined || value < 0 || value < min) {
		value = min;
	}

	let s = new Slider (x, y, min, max, value, width, height);
	dl.sliders.push (s);
	return s;
}

function Slider (x, y, min, max, value, width, height) {
	this.position = new Vector (x, y);
	this.minValue = min;
	this.maxValue = max;
	this.value = value;
	this.width = width;
	this.height = height;
	this.image = null;
	this.sliderColor = "#aaa";
	this.valueColor = "#555";
	this.visible = true;
	this.pointer = new SliderPointer (this.position.x + this.width / (this.maxValue - this.minValue) * (this.value - this.minValue), this.position.y);
	this.update = function () {
		if (this.pointer.pressed == true) {
			if (mouse.up == true) {
				this.pointer.pressed = false
			} else {
				let change;
				if (mouse.x > this.pointer.position.x) {
					change = Math.floor ((mouse.x - this.pointer.position.x) / (this.width / this.maxValue));
				} else {
					change = Math.ceil ((mouse.x - this.pointer.position.x) / (this.width / this.maxValue));
				}
				
				if (change != 0) {
					// if value is too low or high set to max or min
					if (this.value + change > this.maxValue) {
						change = this.maxValue - this.value;
					} else if (this.value + change < this.minValue) {
						change = this.minValue - this.value;
					}

					// change slider value
					this.value += change;
					this.pointer.position.x += change * this.width / (this.maxValue - this.minValue); // change pointer position x
					this.valueChange (this.value);
				}
			}
		} else {
			if (mouse.x > this.pointer.position.x - this.pointer.width / 2 && mouse.x < this.pointer.position.x + this.pointer.width / 2 && mouse.y > this.pointer.position.y + this.pointer.offsetY - this.pointer.height / 2 && mouse.y < this.pointer.position.y + this.pointer.offsetY + this.pointer.height / 2 && mouse.down == true) {
				this.pointer.pressed = true;
			}
		}

		// draw slider
		drawMode = "corner";
		if (this.image != null) {
			image (this.image, this.position.x, this.position.y - this.height / 2, this.width, this.height);
		} else {
			fill (this.sliderColor);
			rect (this.position.x, this.position.y - this.height / 2, this.width, this.height);
			fill (this.valueColor);
			rect (this.position.x, this.position.y - this.height / 2, this.width / (this.maxValue - this.minValue) * (this.value - this.minValue), this.height);
		}

		drawMode = "center";
		if (this.pointer.image != null) {
			image (this.pointer.image, this.pointer.position.x, this.pointer.position.y + this.pointer.offsetY, this.pointer.width, this.pointer.height);
		} else {
			fill (this.pointer.color);
			circle (this.pointer.position.x, this.pointer.position.y + this.pointer.offsetY, this.pointer.width / 2);
		}
	}

	this.addImages = function (pointerImg, img) {
		this.pointer.image = pointerImg;
		this.pointer.width = pointerImg.width;
		this.pointer.height = pointerImg.height;
		if (img != undefined) {
			this.image = img;
			this.width = img.width;
			this.height = img.height;
		}
	}

	this.valueChange = function () {
		// function called when slider changes it's value
	}
}

function SliderPointer (x, y) {
	this.position = new Vector (x, y);
	this.width = 20;
	this.height = 20;
	this.image = null;
	this.pressed = false;
	this.offsetY = 0;
	this.color = "#555";
}

function createInput (x, y, width, height, value) {
	const div = document.getElementById ("dangame");
	let i = document.createElement("INPUT");
	div.appendChild (i);
	dl.inputs.push (i);
	i.style.display = "block";
	i.style.position = "absolute";

	i.setPosition = function (x, y) {
		i.style.left = (x * dl.canvasScale) + "px";
		i.style.top = (y * dl.canvasScale) + "px";
	}

	i.setSize = function (width, height) {
		i.style.width = (width * dl.canvasScale) + "px";
		i.style.height = (height * dl.canvasScale) + "px";
	}

	i.setText = function (font, size) {
		i.style.fontSize = (size * dl.canvasScale) + "px";
		i.style.fontFamily = font;
	}

	i.hide = function () {
		i.style.display = "none";
	}

	i.show = function () {
		i.style.display = "block";
	}

	if (value != undefined) { i.setAttribute ("value", value); }
	i.setPosition (x, y);
	i.setSize (width, height);
	return i;
}

function createSprite (x, y, w, h) {
	// create new sprite
	let s = new Sprite (x, y, w, h);
	// add  sprite to basic groups
	s.addToGroup (allSprites, 1);
	s.addToGroup (activeSprites, 1);
	// return sprite
	return s;
}

// function for creating sprite
class Sprite {
	// set build-in variables
	constructor (x, y, width = 100, height = 100) {
		this.position = new Vector (x, y); // position of sprite in canvas
		this.velocity = new Vector (0, 0); // sprite can change position by this number every frame
		this.mirror = new Vector (1, 1); // if set to -1, it can mirror the sprite by x or y axis
		this.width = width; // set width, if undefined set to 100
		this.height = height; // set height, if undefined set to 100
		this.collider = new Collider (this.width, this.height); // area around the sprite, it can check collision between other sprite
		this.active = true; // if set to false sprite doesn't update
		this.visible = true; // if set to false sprite isn't draw in canvas
		this.debug = false; // a line that shows sprite's collider
		this.scale = 1; // scale the sprite (width, height, collider)
		this.rotation = 0; // rotate the sprite
		this.rotateToDirection = false; // if set to true, sprite rotatation will be set to sprite's speed direction
		this._image = false; // draw image at sprite position instead of rectangle if it isn't set to false
		this.imageScale = 1; // scale of image, that draws on sprite draw
		this.currentCostume = false; // name of costume, that sprite has, if hasn't, it's set to false
		this.moves = true; // if can sprite move by it's velocity
		this.groups = []; // list of groups that sprite belongs to
		this.costumes = []; // list of costumes
		this.life = -1;
		this.maxSpeed = -1;
		this.friction = 0;
		this._speedValue = 0;
		this._speedAngle = 0;
		this._animations = [];
	}

	// adds sprite to group
	addToGroup (g, n) {
		g.push (this);
		if (n != 1) {
			this.groups.push (g);
		}
	}

	// removes sprite from group
	removeFromGroup (g, n) {
		g.splice (g.indexOf (this), 1);
		if (n != 1) {
			this.groups.splice (this.groups.indexOf (g), 1);
		}
	}

	// get sprite image
	get image () {
		return this._image;
	}

	// set sprite image
	set image (img) {
		this._image = img;
		this.currentCostume = false; // sprite hasn't any costume
	}

	// adds image or animation to sprite's costumes
	addCostume (name, img, w = img.width, h = img.height, frameDelay) {
		let costume;
		if (frameDelay && img instanceof Animation) {
			const images = img.images;
			costume = createAnimation (images, frameDelay);
			this._animations.push (costume);
		} else {
			costume = img;
		}
		
		costume.width = w;
		costume.height = h;

		let c = {
			name: name,
			image: costume,
		}

		this.costumes.push (c);
		if (this.costumes.length == 1) {
			this.image = costume;
			this.currentCostume = name;
		}
	}

	// the image or animtion that will be visible when is sprite drawn
	changeCostume (name) {
		for (let i of this.costumes.entries()) {
			if (i[1].name == name) {
				this.image = i[1].image;
				this.currentCostume = name;
				break;
			}	
		}
	}

	getCostume (name) {
		for (let i = 0; i < this.costumes.length; i++) {
			const c = this.costumes[i];
			if (c.name == name) {
				return c;
			}
		}
	}

	// removes image or animation from sprite's costumes
	removeCostume (name) {
		for (let i of this.costumes.entries()) {
			if (i[1].name == name) {
				this.costumes.splice (i[0], 1);
				break;
			}	
		}
	}

	// function for updating the sprite every frame
	update () {
		if (this.moves == true) {
			this.position.x += this.velocity.x * frameSpeed;
			this.position.y += this.velocity.y * frameSpeed;
			// velocity friction
			if (this.friction != 0) {
				this.velocity.x -= this.velocity.x * this.friction;
				if (Math.abs(this.velocity.x) < this.friction) {
					this.velocity.x = 0;
				}

				this.velocity.y -= this.velocity.y * this.friction;
				if (Math.abs(this.velocity.y) < this.friction) {
					this.velocity.y = 0;
				}
			}
			
			// rotate to velocity
			if (this.rotateToDirection == true) {
				if (this._speedValue != 0) {
					this.rotation = this._speedAngle;
				} else {
					this.rotation = Math.atan2 (this.velocity.y, this.velocity.x) * 180 / Math.PI;
				}
			}

			// speed
			if (this._speedValue != 0) {
				let a = this._speedAngle / 180 * Math.PI;
				this.position.x += Math.cos (a) * this._speedValue;
				this.position.y += Math.sin (a) * this._speedValue;
				// speed friction
				this._speedValue -= this._speedValue * this.friction;
				if (this._speedValue < this.friction) {
					this._speedValue = 0;
				}
			}
		}

		if (this.life != -1) {
			if (this.life <= 0) {
				this.delete();
			} else {
				this.life --;
			}
		}
	}

	// updates sprite's velocity
	updateVelocity (witch) {
		if (witch == 1) {
			// update velocity x
			this.position.x += this.velocity.x * frameSpeed;
		} else if (witch == 2) {
			// update velocity y
			this.position.y += this.velocity.y * frameSpeed;
		} else {
			// update both velocities
			this.position.x += this.velocity.x * frameSpeed;
			this.position.y += this.velocity.y * frameSpeed;
		}
	}

	// moves the sprite by x & y parameters
	move (x, y) {
		this.position.x += x * frameSpeed;
		this.position.y += y * frameSpeed;
	}

	setSpeed (speed, angle = this.rotation) {
		if (this._speedValue < 0) {
			this._speedValue = -speed;
			this._speedAngle = angle - 180;
		} else {
			this._speedAngle = angle;
		}
		
		if (this.maxSpeed != -1 && speed > this.maxSpeed) {
			this._speedValue = this.maxSpeed;
		} else {
			this._speedValue = speed;
		}
	}

	addSpeed (speed, angle = this.rotation) {
		const a1 = angle / 180 * Math.PI;
		const x1 = Math.cos (a1) * speed;
		const y1 = Math.sin (a1) * speed;
		const a2 = this._speedAngle / 180 * Math.PI;
		const x2 = Math.cos (a2) * this._speedValue;
		const y2 = Math.sin (a2) * this._speedValue;
		const finalSpeed = Math.sqrt ((x1 + x2) ** 2 + (y1 + y2) ** 2);
		const finalAngle = Math.atan2(y1 + y2, x1 + x2) * (180 / Math.PI);
		this.setSpeed (finalSpeed, finalAngle);
	}

	rotateToPoint (x, y) {
		this.rotation = Math.atan2 (y - this.position.y, x - this.position.x) * 180 / Math.PI;
	}

	// draws the sprite, if has visible set to true
	draw () {
		if (this.visible == true) {
			if (camera.active == false && this.position.x > 0 - this.width / 2 * this.imageScale * this.scale && this.position.x < canvasWidth + this.width / 2 * this.imageScale * this.scale && this.position.y > 0 - this.height / 2 * this.imageScale * this.scale && this.position.y < canvasHeight + this.height / 2 * this.imageScale * this.scale
			|| camera.active == true && this.position.x > camera.x - canvasWidth / 2 / camera.scale - this.width / 2 * this.imageScale * this.scale && this.position.x < camera.x + canvasWidth / 2 / camera.scale + this.width / 2 * this.imageScale * this.scale && this.position.y > camera.y - canvasHeight / 2 / camera.scale - this.height / 2 * this.imageScale * this.scale && this.position.y < camera.y + canvasHeight / 2 / camera.scale + this.height / 2 * this.imageScale * this.scale) {
				let dm = drawMode; // save value of draw mode
				drawMode = "center";
				if (this.image !== false) {
					// draw image or animation if sprite has some
					if (this.image instanceof Animation) {
						// draw animation
						this.image.draw (this.position.x, this.position.y, (this.image.width ? this.image.width : this.image.image.width) * this.imageScale * this.scale, (this.image.height ? this.image.height : this.image.image.height) * this.imageScale * this.scale, this.rotation, this.mirror.x, this.mirror.y);
					} else {
						// draw image
						image (this.image, this.position.x, this.position.y, this.image.width * this.imageScale * this.scale, this.image.height * this.imageScale * this.scale, this.rotation, this.mirror.x, this.mirror.y);
					}
				} else {
					// draw gray rect with the sprite dimensions
					fill ("#888");
					rect (this.position.x, this.position.y, this.width * this.scale, this.height * this.scale, this.rotation);
				}

				if (this.debug == true) {
					fill ("#0f0");
					// draw target at center of sprite collider
					line (this.position.x + this.collider.offsetX * this.scale + 5, this.position.y + this.collider.offsetY * this.scale, this.position.x + this.collider.offsetX * this.scale - 5, this.position.y + this.collider.offsetY * this.scale);
					line (this.position.x + this.collider.offsetX * this.scale, this.position.y + this.collider.offsetY * this.scale + 5, this.position.x + this.collider.offsetX * this.scale, this.position.y + this.collider.offsetY * this.scale - 5);
					// draw corner of sprite collider
					if (this.collider.type == "rect") {
						strokeRect (this.position.x + this.collider.offsetX * this.scale, this.position.y + this.collider.offsetY * this.scale, this.collider.width * this.scale, this.collider.height * this.scale);
					} else if (this.collider.type == "circle") {
						strokeCircle (this.position.x + this.collider.offsetX * this.scale, this.position.y + this.collider.offsetY * this.scale, this.collider.width * this.scale);
					}
				}

				drawMode = dm; // set draw mode to past value
			}
		}
	}

	// sets the collider parameters for sprite
	setCollider (type, offsetX, offsetY, width, height) {
		if (type == "rect") {
			this.collider.type = type;
			this.collider.offsetX = offsetX;
			this.collider.offsetY = offsetY;
			this.collider.width = width;
			this.collider.height = height;
		} else if (type == "circle") {
			this.collider.type = type;
			this.collider.offsetX = offsetX;
			this.collider.offsetY = offsetY;
			this.collider.width = width; // aka radius
		} else if (type == "point") {
			this.collider.type = type;
			this.collider.offsetX = offsetX;
			this.collider.offsetY = offsetY;
		} else {
			console.log ("ERROR: " + type + " is not a type of collider");
		}
	}

	// function that check if sprite is overlaping with another
	overlap (o, callFunct) {
		if (o instanceof Sprite) {
			// sprite to sprite
			return dl.spritesOverlap (this, o, callFunct);
		} else {
			// sprite to group
			if (callFunct == undefined) {
				let ans = false;
				for (let i = 0; i < o.length; i++) {
					const s = o[i];
					if (dl.spritesOverlap (this, s)) {
						ans = true;
						break;
					}
				}
				return ans;
			} else {
				o.forEach(s => {
					dl.spritesOverlap (this, s, callFunct);
				});
			}
		}
	}

	// if sprite overlap with another, sprite bounce
	bounce (o, callFunct) {
		if (o instanceof Sprite) {
			// sprite to sprite
			return dl.spritesBounce (this, o, callFunct);
		} else {
			// sprite to group
			if (callFunct == undefined) {
				let ans = false;
				for (let i = 0; i < o.length; i++) {
					const s = o[i];
					if (dl.spritesBounce (this, s)) {
						ans = true;
						break;
					}
				}
				return ans;
			} else {
				o.forEach(s => {
					dl.spritesBounce (this, s, callFunct);
				});
			}
		}
	}

	collide (o) {
		// velocity x collide
		if (this.velocity.x != 0) {
			const velX = Math.ceil (this.velocity.x * frameSpeed);
			this.position.x += velX;
			if (o instanceof Sprite) {
				// sprite to sprite
				if (dl.spritesOverlap (this, o)) {
					for (let i = 0; i < Math.abs(velX) + 1; i++) {
						this.position.x += this.velocity.x > 0 ? -1 : 1;
						if (dl.spritesOverlap (this, o) == false) {
							break;
						}
					}

					this.velocity.x = 0;
				} else {
					this.position.x -= velX;
				}
			} else {
				// sprite to group
				let ans = false;
				for (let l = 0; l < o.length; l++) {
					const s = o[l];
					if (dl.spritesOverlap (this, s)) {
						ans = true;
						for (let i = 0; i < Math.abs(velX) + 1; i++) {
							this.position.x += this.velocity.x > 0 ? -1 : 1;
							if (dl.spritesOverlap (this, s) == false) {
								break;
							}
						}
					}
				}
				
				if (ans == true) {
					this.velocity.x = 0;
				} else {
					this.position.x -= velX;
				}
			}
		}

		// velocity y collide
		if (this.velocity.y != 0) {
			const velY = Math.ceil (this.velocity.y * frameSpeed);
			this.position.y += velY;
			if (o instanceof Sprite) {
				// sprite to sprite
				if (dl.spritesOverlap (this, o)) {
					for (let i = 0; i < Math.abs(velY) + 1; i++) {
						this.position.y += this.velocity.y > 0 ? -1 : 1;
						if (dl.spritesOverlap (this, o) == false) {
							break;
						}
					}

					this.velocity.y = 0;
				} else {
					this.position.y -= velY;
				}
			} else {
				// sprite to group
				let ans = false;
				for (let l = 0; l < o.length; l++) {
					const s = o[l];
					if (dl.spritesOverlap (this, s)) {
						ans = true;
						for (let i = 0; i < Math.abs(velY) + 1; i++) {
							this.position.y += this.velocity.y > 0 ? -1 : 1;
							if (dl.spritesOverlap (this, s) == false) {
								break;
							}
						}
					}
				}
				
				if (ans == true) {
					this.velocity.y = 0;
				} else {
					this.position.y -= velY;
				}
			}
		}

		// speed collide
		if (this._speedValue != 0) {
			const move = function (o, value) {
				const a = o._speedAngle / 180 * Math.PI;
				o.position.x += Math.cos (a) * value;
				o.position.y += Math.sin (a) * value;
			}

			const speed = Math.ceil (this._speedValue * frameSpeed);
			move (this, speed);
			if (o instanceof Sprite) {
				// sprite to sprite
				if (dl.spritesOverlap (this, o)) {
					for (let i = 0; i < Math.abs(speed) + 1; i++) {
						move (this, speed > 0 ? -1 : 1);
						if (dl.spritesOverlap (this, o) == false) {
							break;
						}
					}

					this._speedValue = 0;
				} else {
					move (this, -speed);;
				}
			} else {
				// sprite to group
				let ans = false;
				for (let l = 0; l < o.length; l++) {
					const s = o[l];
					if (dl.spritesOverlap (this, s)) {
						ans = true;
						for (let i = 0; i < Math.abs(speed) + 1; i++) {
							move (this, speed > 0 ? -1 : 1);
							if (dl.spritesOverlap (this, s) == false) {
								break;
							}
						}
					}
				}
				
				if (ans == true) {
					this._speedValue = 0;
				} else {
					move (this, -speed);;
				}
			}
		}
	}

	ON () {
		if (this.active == false) {
			this.addToGroup (activeSprites, 1);
			this.removeFromGroup (inactiveSprites, 1);
			this.active = true;
			this.groups.forEach(g => {
				this.addToGroup (g, 1);
			});
		}
	}

	OFF () {
		if (this.active == true) {
			this.addToGroup (inactiveSprites, 1);
			this.removeFromGroup (activeSprites, 1);
			this.active = false;
			this.groups.forEach(g => {
				this.removeFromGroup (g, 1);
			});
		}
	}

	// removes the sprite from groups
	delete () {
		this.groups.forEach(g => {
			g.splice (g.indexOf (this), 1);
		});
		this._animations.forEach(a => {
			dl.animations.splice (dl.animations.indexOf (a), 1);
		});
		allSprites.splice (allSprites.indexOf (this), 1);
		if (this.active == true) {
			activeSprites.splice (activeSprites.indexOf (this), 1);
		} else {
			inactiveSprites.splice (inactiveSprites.indexOf (this), 1);
		}
	}
}

// create variable with x & y values
function Vector (x, y) {
	this.x = x;
	this.y = y;
	
	this.set = function (nx, ny) {
		this.x = nx;
		this.y = ny;
	}
}

// create collider for sprite
function Collider (w, h) {
	this.width = w; // collider width (rectangle) or radius (circle), not for point
	this.height = h; // collider height (only for rectangle)
	this.offsetX = 0; // collider position x from the sprite center
	this.offsetY = 0; // collider position y from the sprite center
	this.type = "rect"; // rectangle, circle or point
}

function createGroup () {
	let g;
	g = [];

	// returns true if the sprite is in group
	g.contains = function (sprite) {
		return g.some(s => objectsEqual (s, sprite) );
	}

	// function that check if sprites in group are overlaping with another sprite
	g.overlap = function (o, callFunct) {
		if (o instanceof Sprite) {
			// group to sprite
			if (callFunct == undefined) {
				let ans = false;
				for (let i = 0; i < g.length; i++) {
					const s = o[i];
					if (dl.spritesOverlap (o, s)) {
						ans = true;
						break;
					}
				}
				return ans;
			} else {
				g.forEach(s => {
					dl.spritesOverlap (o, s, callFunct);
				});
			}
		} else {
			// group to group
			if (callFunct == undefined) {
				let ans = false;
				loop:
				for (let i = 0; i < g.length; i++) {
					const gs = g[i];
					for (let i = 0; i < o.length; i++) {
						const os = o[i];
						if (dl.spritesOverlap (gs, os)) {
							ans = true;
							break loop;
						}
					}
				}
				return ans;
			} else {
				g.forEach(gs => {
					o.forEach(os => {
						dl.spritesOverlap (gs, os, callFunct);
					});
				});
			}
		}
	}

	// if group overlap with another, group bounce
	g.bounce = function (o, callFunct) {
		if (o instanceof Sprite) {
			// group to sprite
			if (callFunct == undefined) {
				let ans = false;
				for (let i = 0; i < g.length; i++) {
					const s = o[i];
					if (dl.spritesBounce (o, s)) {
						ans = true;
						break;
					}
				}
				return ans;
			} else {
				g.forEach(s => {
					dl.spritesBounce (o, s, callFunct);
				});
			}
		} else {
			// group to group
			if (callFunct == undefined) {
				let ans = false;
				loop:
				for (let i = 0; i < g.length; i++) {
					const gs = g[i];
					for (let i = 0; i < o.length; i++) {
						const os = o[i];
						if (dl.spritesBounce (gs, os)) {
							ans = true;
							break loop;
						}
					}
				}
				return ans;
			} else {
				g.forEach(gs => {
					o.forEach(os => {
						dl.spritesBounce (gs, os, callFunct);
					});
				});
			}
		}
	}

	// group collide
	g.collide = function (o) {
		g.forEach(s => {
			s.collide (o);
		});
	}

	// remove the sprite from this group
	g.remove = function (sprite) {
		sprite.groups.splice (sprite.groups.indexOf (g), 1);
		g.splice (g.indexOf (sprite), 1);
	}

	// removes all sprites from this group
	g.removeSprites = function () {
		g.length = 0;
	}

	// deletes all sprites in this group
	g.deleteSprites = function () {
		if (g.length != 0) {
			for (let i = 0; i < g.length;) {
				const s = g[i];
				s.delete ();
			}
		}
	}

	// draws all sprites in this group
	g.draw = function () {
		g.forEach(s => {
			s.draw ();
		});
	}

	return g;
}

// sum function
function sum (...nums) {
	return nums.reduce ( (sum, value) => sum + value );
}

// draw all active sprites, witch has visible set to true
function drawSprites () {
	activeSprites.forEach(s => {
		s.draw ();
	});
}

// record if some key went down
document.onkeydown = (e) => {
	// check if key hasn't been already down
	if (dl.key.down.includes (e.code) == false) {
		// add key to key press & key down lists
		dl.key.press.push (e.code);
		dl.key.press.push (e.key);
		dl.key.down.push (e.code);
		dl.key.down.push (e.key);
	}
}

// record if some key went up
document.onkeyup = (e) => {
	// add key to key up list
	dl.key.up.push (e.code);
	dl.key.up.push (e.key);
	// remove key from key down list
	for (let i = 0; i < dl.key.down.length;) {
		const k = dl.key.down[i];
		if (k == e.code || k == e.key) {
			dl.key.down.splice (i, 1);
		} else {
			i ++;
		}
	}
}

// return true if the key is pressed
function keyPressed (key) {
	return dl.key.press.includes (key);
}

// return true if the key is down
function keyDown (key) {
	return dl.key.down.includes (key);
}

// return true if the key is up
function keyUp (key) {
	return dl.key.up.includes (key);
}

// record if mouse went down
document.addEventListener ("mousedown", function (e) {
	mouse.down = true;
	mouse.pressed = true;
	mouse.which = e.which;
});

// record if mouse went up
document.addEventListener ("mouseup", function (e) {
	mouse.pressed = false;
	mouse.up = true;
});

// catch the position of mouse if it moves
document.onmousemove = function (e) {
	const elem = document.getElementById('dangame');
	const canvas = elem.querySelector('canvas');
	const rect = canvas.getBoundingClientRect();
	dl.mouse.x = e.x - rect.left;
	dl.mouse.y = e.y - rect.top;
}

// check if objects have same content
function objectsEqual (object1, object2) {
	const keys1 = Object.keys(object1);
	const keys2 = Object.keys(object2);
	if (keys1.length !== keys2.length) {
		return false;
	}
	for (let key of keys1) {
		if (object1[key] !== object2[key]) {
			return false;
		}
	}
	return true;
}

function print (a) {
	console.log (a);
}