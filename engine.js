function Engine() {
	gameField = [ [ "red", "blue" ], [ "red", "none" ], [ "none", "red" ] ];
	balls = [ [], [] ];
	lines = new Array();
	var f = new Field();
	var space = 0;
	var lineWidth = 5;

	/*
	 * Called once when a game state is activated. Use it for one-time setup
	 * code.
	 */
	this.setup = function() {
		gameField = f.getField();
		space = jaws.width / (gameField.length + 1) - lineWidth;

		ballR = 33;
		for ( var y = 0; y < gameField.length; y++) {
			balls[y] = new Array();
			for ( var x = 0; x < gameField[y].length; x++) {
				console.log(gameField[y][x]);
				ball = new jaws.Sprite({
					image : colorToPicture(gameField[y][x]),
					x : space + space * y - ballR,
					y : jaws.height - x * ballR * 2 - ballR * 2,
					scale : 0.1
				});
				jaws.log(ball);
				balls[y][x] = ball;
			}
		}

		for ( var i = 0; i < gameField.length; i++) {
			lines[i] = jaws.Rect(space + i * space, 50, lineWidth,
					jaws.height - 50);
		}

		jaws.context.mozImageSmoothingEnabled = false; // non-blurry, blocky
		jaws.preventDefaultKeys([ "up", "down", "left", "right", "space" ]);
	};

	/*
	 * update() will get called each game tick with your specified FPS. Put game
	 * logic here.
	 */
	this.update = function() {
		if (jaws.pressed("left_mouse_button")) {
			var x = Math.floor(jaws.mouse_x
					/ jaws.width * gameField.length);
			console.log(x);
			f.insert(x);
		}
	};

	/*
	 * Directly after each update draw() will be called. Put all your on-screen
	 * operations here.
	 */
	this.draw = function() {
		jaws.context.clearRect(0, 0, jaws.width, jaws.height);
		jaws.context.lineWidth = 1;
		jaws.context.moveTo(0, 300);
		jaws.context.lineTo(jaws.width, 300);
		jaws.context.strokeStyle = "black";
		jaws.context.stroke();

		for ( var y = 0; y < balls.length; y++) {
			for ( var x = 0; x < balls[y].length; x++) {
				balls[y][x].draw();
			}
		}

		for ( var i = 0; i < lines.length; i++) {
			lines[i].draw();
		}

	};

	function colorToPicture(color) {
		if (color == "blue") {
			return "G1-Kugel-blue.png";
		} else if (color == "red") {
			return "G1-Kugel-red.png";
		}
		return "";
	}
}

jaws.onload = function() {
	jaws.assets.add("G1-Kugel-red.png");
	jaws.assets.add("G1-Kugel-blue.png");
	jaws.start(Engine);
};