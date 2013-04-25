var ROWS = 6;
var COLS = 7;

function Field() {
	var currentUser = "red";
	var field = null;

	var histStates = new Array();

	initField();

	function initField() {
		// initialize field with none
		// array[COLS][ROWS]
		field = new Array(COLS);
		for ( var i = 0; i < COLS; i++) {
			field[i] = new Array(ROWS);
			for ( var j = 0; j < ROWS; j++) {
				field[i][j] = "none";
			}
		}
	}

	this.reset = function() {
		initField();
	};

	this.getField = function() {
		return field;
	};

	this.setCurrentUser = function(user) {
		currentUser = user;
	};

	function switchUser() {
		if (currentUser == "red") {
			currentUser = "blue";
		} else {
			currentUser = "red";
		}
	}

	this.insert = function(stange) {
		if (!isNaN(stange)) {
			return insertInStange(stange);
		} else
			throw exception("Not a number");
	};

	function insertInStange(stange) {
		if (stange < COLS) {
			var currentStange = field[stange];
			for ( var i = 0; i < ROWS; i++) {
				if (currentStange[i] != "none")
					continue;
				else {
					currentStange[i] = currentUser;
					addHistState();
					switchUser();
					console.log("next user:" + currentUser);
					return true;
				}
			}
			return false; // column is full
		} else {
			throw exception("Out of column range");
		}
	}

	function addHistState() {
		histStates[histStates.length] = field;
	}

	this.undo = function() {
		field = histStates[histStates.length - 1];
		histStates.length--;
	};

	this.win = function() {
		return checkRules();
	};

	function checkRules() {
		var user = "none";
		user = checkVertical();
		if (user == "red" || user == "blue")
			return user;
		else {
			user = checkHorizontal();
			if (user == "red" || user == "blue") {
				return user;
			} else {
				user = checkDiagonal();
				if (user == "red" || user == "blue")
					return user;
				else
					return false;
			}
		}
	}

	function checkVertical() {
		for (col in field) {
			var user = "none";
			var count = 0;
			for ( var cell in field[col]) {
				if (cell == "none") {
					user = "none";
					count = 0;
					break;
				} else if (cell != user) {
					user = cell;
					count = 1;
				} else if (cell == user) {
					count++;
					if (count >= 4) {
						return user;
					}
				}
				;
			}
			if (user != "none" && count >= 4)
				return user;
		}
		// no vertical for one user
		return false;
	}

	function checkHorizontal() {
		for ( var row = 0; row < ROWS; row++) {
			var user = "none";
			var count = 0;
			for ( var col in field) {
				var cell = col[row];
				if (cell == "none") {
					user = "none";
					count = 0;
				} else if (cell != user) {
					user = cell;
					count = 1;
				} else if (cell == user) {
					count++;
					if (count >= 4) {
						return user;
					}
				}
				;
			}
			if (user != "none" && count >= 4)
				return user;
		}
		// no horizontal line for one user
		return false;
	}

	function checkDiagonal() {
		var user = checkDiagonalUp();
		if (user == "red" || user == "blue") {
			return user;
		} else {
			user = checkDiagonalDown();
			if (user == "red" || user == "blue") {
				return user;
			} else {
				return false;
			}
		}
	}

	function checkDiagonalUp() {
		var user = "none";
		var count = 0;
		// diagonale started in each column
		for ( var rowOffset = 0; rowOffset < ROWS; rowOffset++) {
			for ( var col = 0; col < COLS; col++) {
				var row = col + rowOffset;
				if (row >= ROWS)
					break;

				var cell = field[col][row];
				if (cell == "none") {
					break;
				} else if (cell != user) {
					user = cell;
					count = 1;
				} else if (cell == user) {
					count++;
					if (count >= 4) {
						return user;
					}
				}
			}
			if (user != "none" && count >= 4)
				return user;
		}
		// no diagonal line for one user
		return false;
	}

	function checkDiagonalDown() {
		var user = "none";
		var count = 0;
		// diagonale started in each column
		for ( var rowOffset = 0; rowOffset < ROWS; rowOffset++) {
			for ( var col = 0; col < COLS; col++) {
				var row = ROWS - col - rowOffset;
				if (row < 0)
					break;

				var cell = field[col][col + rowOffset];
				if (cell == "none") {
					break;
				} else if (cell != user) {
					user = cell;
					count = 1;
				} else if (cell == user) {
					count++;
					if (count >= 4) {
						return user;
					}
				}
			}
			if (user != "none" && count >= 4)
				return user;
		}
		// no diagonal line for one user
		return false;
	}
};