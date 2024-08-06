//TASK ONE

function makeRows(row) {
	var puzzle = [];
	for (i = 0; i <= 3; i++){
		puzzle.push(row.slice());
	}
	return puzzle;
}

var row = [1, 2, 3, 4];
var puzzle = makeRows(row);
console.log(visPuzzle(puzzle));

//TASK TWO
// this is the constructor of the queue data structure
function Queue() {
	this.arr = [];
	this.head = function() {
		return this.arr[0];
	};
	this.dequeue = function() {
		if (this.arr.length == 0) {
			return "Queue underflow!";
		} else {
			return this.arr.shift();
		}
	};
	this.enqueue = function(o) {
		this.arr.push(o);
	};
	this.isEmpty = function() {
			return this.arr.length == 0;
	};
}

function permuteRow(row, p) {
	var queue = new Queue();
	for (var i = 0; i < row.length; i++){
		queue.enqueue(row[i]);
	}

	while(p>0){
		queue.enqueue(queue.head());
		queue.dequeue();
		p--;
  }
	return queue.arr;

}

var row = [1, 2, 3, 4];
console.log(permuteRow(row , 2));

function permutePuzzle(puzzle, p, q, r) {
	var perms = [p,q,r];
    for (var i=0; i<3; i++){
        puzzle[i + 1] = permuteRow(puzzle[i + 1], perms[i]);
    }
    return puzzle;
}

var row = [1, 2, 3, 4];
var puzzle = makeRows(row);
console.log(permutePuzzle(puzzle, 1, 2, 3));

//TASK THREE

function linearSearch(array, item) {
	var n = array.length;
	for (var i = 0; i < n; i++) {
		if (array[i] == item) {
			return true;
		}
 	}
	return false;
}

function checkColumn(puzzle, j) {
	//first make an array out of the values stored in column j

	var check = [];
	for (var i=0; i <= 3; i++){
		check.push(puzzle[i][j])
	}

	//call linearSearch on the array of column values for all values of k from 1 to 4
	
	for(var k = 1; k <= 4; k++){
		if(!linearSearch(check,k)){
			return false;
		}
	}
	return true;
}

var puzzle = [[1 , 2, 3, 4], [2, 3, 4, 1], [3, 4, 1, 2], [4, 1, 2, 3]];
console.log(checkColumn(puzzle , 1));
puzzle = [[1 , 2, 3, 4], [2, 3, 4, 1], [2, 3, 4, 1], [4, 1, 2, 3]];
console.log(checkColumn (puzzle, 2));
//TASK FOUR

function colCheck(puzzle) {
	for(var j = 0; j <= 3; j++){
		if(!checkColumn(puzzle,j)){
			return false;
		}
	}
	return true;
}
var puzzle = [[1 , 2, 3, 4], [2, 3, 4, 1], [3, 4, 1, 2], [4, 1, 2, 3]];
console.log(colCheck(puzzle));
puzzle = [[1 , 2, 3, 4], [2, 3, 4, 1], [2, 3, 4, 1], [4, 1, 2, 3]];
console.log(colCheck(puzzle));

//TASK FIVE

function makeGrid(puzzle, row1, row2, col1, col2) {
	//this copies all elements in a grid from co-ordinates (row1, col1) to (row2,col2) to an array
	var array = [];
	for (var i = row1; i <= row2; i++) {
		for (var j = col1; j <= col2; j++) {
			array.push(puzzle[i][j]);
		}
	}
	return array;
}

function checkGrid(puzzle, row1, row2, col1, col2) {
	var array = makeGrid(puzzle, row1, row2, col1, col2)
	for(var i=1; i <=4; i++){
		if(!linearSearch(array,i)){
			return false;
		}
	}
	return true;
} 
	
var puzzle = [[1, 2, 3, 4], [2, 3, 4, 1], [3, 4, 1, 2], [4, 1, 2, 3]];
console.log(checkGrid(puzzle, 0, 1, 2, 3));
puzzle = [[1 , 2, 3, 4], [3, 4, 1, 2], [4, 1, 2, 3], [4, 1, 2, 3]];
console.log(checkGrid (puzzle, 0, 1, 0, 1));

//TASK SIX

function checkGrids(puzzle) {


	if(checkGrid(puzzle, 0, 1, 0, 1) && 
	   checkGrid(puzzle, 2, 3, 2, 3) && 
	   checkGrid(puzzle, 2, 3, 0, 1) && 
	   checkGrid(puzzle, 2, 3, 2, 3)){
		return true;
	}

	return false;	
}


console.log("TASK 6 START \n")
var puzzle = [
	[1, 2, 3, 4], [2, 3, 4, 1], [3, 4, 1, 2], [4, 1, 2, 3]
];
console.log(checkGrids(puzzle));
puzzle = [[1, 2, 3, 4], [3, 4, 1, 2], [4, 1, 2, 3], [2, 3, 4, 1] ,];
console.log(checkGrids(puzzle));

console.log("TASK 6 FINISH \n")

//TASK SEVEN

function makeSolution(row) {
	var puzzle = makeRows(row)
	for(var p=0; p<=3; p++){
		for(var q=0; q<=3; q++){
			for(var r=0; r<=3; r++){
				var tempPuzzle = permutePuzzle(puzzle,p,q,r)
				if(checkGrids(tempPuzzle) && colCheck(tempPuzzle)){
					return tempPuzzle;
				}
			}
		}
	}
	return puzzle;
}

var row = [1, 2, 3, 4];
var puzzle = makeSolution(row)
console.log(puzzle);
console.log(visPuzzle(puzzle));



// TASK EIGHT

function checkArray(array,item){
	for(var i=0;i<array.length;i++){
		if(array[i][0] == item[0] && array[i][1] == item[1]){
			return true;
		}
	}
	return false;
}

// a function to randomly select n (row,column) entries of a 2d array
function entriesToDel(n) {
		var array = [];
		for (var i = 0; i < n; i++) {
			var row = Math.round(3*Math.random());
			var col = Math.round(3*Math.random());
			while(checkArray(array,[row,col])){
				var row = Math.round(3*Math.random());
				var col = Math.round(3*Math.random());
			}
			array.push([row,col]);
		}
		return array;
	}




function genPuzzle(row, n) {
	if (n >= 16) {
		return "Error! Too many blank spaces!";
	}
	var solution = makeSolution(row);
	var blanks = entriesToDel(n);
	for (var i = 0; i < blanks.length; i++) {
		solution[blanks[i][0]][blanks[i][1]] = " ";
	}
	return solution;
}



// The following function is used to visualise the puzzles

function visPuzzle(puzzle) {
	var viz = "";

	for (var i = 0; i < puzzle.length; i++) {
		for (var j = 0; j < puzzle.length; j++) {
			viz = viz + "----";
		}
		viz = viz + "-\n";
		for (var j = 0; j < puzzle.length; j++) {
			viz = viz + "| " + puzzle[i][j] + " ";
		}
		viz = viz + "| " + "\n";
	}
	for (var j = 0; j < puzzle.length; j++) {
			viz = viz + "----";
	}
	viz = viz + "-";

	return viz;
}

console.log(entriesToDel(7))


// DO NOT DELETE BELOW THIS LINE OR NOTHING WILL WORK AND YOU MAY GET NO MARKS

module.exports = {makeRows : makeRows, makeSolution : makeSolution, genPuzzle : genPuzzle, checkGrid : checkGrid, checkGrids : checkGrids, colCheck : colCheck, checkColumn : checkColumn, permuteRow : permuteRow, permutePuzzle : permutePuzzle, entriesToDel : entriesToDel};