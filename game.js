var ROWS = 6
var COLS = 7

function field() {
	var currentUser = "none";
	var field = null;

	var histStates = new Array();

	initField();

	function initField() {
		// initialize field with none
		// array[COLS][ROWS]
		field = new Array(COLS);
		for ( var i = 0; i < COLS; i++) {
			field[i] = new Array(ROWS);
			for (j in field[i]) {
				j = "none";
			}
		}
	}

	function reset() {
		initField();
	}

	function setCurrentUser(user) {
		currentUser = user;
	}

	function switschUser() {
		if (currentUser = "red") {
			currentUser = "blue";
		} else {
			currentUser = "red";
		}
	}

	function getField() {
		return field;
	}

	function insert(stange) {
		if (isNumber(stange)) {
			return insertInStange(stange);
		} else
			throw exception("Not a number");
	}

	function insertInStange(stange) {
		if (stange < COLS) {
			var currentStange = field[stange];
			for ( var i = 0; i < Rows; i++) {
				if (currentStange[i] != "none")
					continue;
				else {
					currentStange[i] = currentUser;
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

	function undo() {
		field = histStates[histStates.length - 1];
		histStates.length--;
	}

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
			for (var cell in field[col]) {
				if (cell == "none") {
					user = "none";
					count = 0;
					break;
				} else if (cell != user) {
					user = cell;
					count = 1;
				} else if (cell == user) {
					count++;
				}
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
			for (var col in field) {
				var cell = field[col][row];
				if(cell == "none"){
					user = "none";
					count = 0;
				} else if(cell != user){
					user = cell;
					count = 1;
				} else if(cell == user){
					count++;
				}
			}
			if (user != "none" && count >= 4)
				return user;
		}
		// no horizontal line for one user
		return false;
	}
	
	function checkDiagonal(){
		
	}
}