
//var game = new gameData(); // Model
var selectedCell = null;

function validate() {
    game.validate();
}

function generateBoard(rows, columns) {
    generateTable(rows, columns);
    newGame(DIFFICULTY.EASY);
    startAnimation();
}



function generateTable(rows, columns) {
    var gameContainer = document.getElementById('game-container');

    // Create the container for the grid
    var gameTable = document.createElement("table");
    gameTable.setAttribute("id", "game-table");
    gameContainer.appendChild(gameTable);

    for (i = 1; i <= rows; i++) {
        var row = document.createElement("tr"); // create the row

        // Add a black border to the bottom of the cells of every third row
        if (i && (i % 3 === 0)) {
            row.className = "third-row";
        }

        for (j = 1; j <= columns; j++) {
            var cell = document.createElement("td");
            var input = document.createElement("input");
            input.type = "text";
            input.maxLength=1;
            input.onkeypress = function(event) {return event.charCode >= 49 && event.charCode <= 57}
            cell.appendChild(input);
            /* Cell styling using javascript */
            if (j == 1) {
                cell.className = "first-cell";
            }
            else if (j && (j % 3 === 0)) {
                cell.className = "third-cell";
            }

            row.appendChild(cell);
        }
        gameTable.appendChild(row);
    }
}


// Takes the data from the model and puts it in the view
function populateData() {
    console.log("Populating grid");
    console.log(game.board);
    var value;
    var cellValue;
    //var grid = game.board; // Gets the grid data from the model
    var table = document.getElementById('game-table');
    for (var i = 0, row; row = table.rows[i]; i++) { //iterate through rows     

        for (var j = 0, col; col = row.cells[j]; j++) { //iterate through columns
            (function (i, j, row, col) {
                value = game.getValue(i, j);
               // console.log("Adding data " + value + " to cell: " + i.toString() + "," + j.toString());

                if (value.includes(":pre")) { // If the value is a preset default
                    row.cells[j].classList.add("pre");
                    cellValue = value.replace(":pre", "");
                    row.cells[j].firstChild.value = cellValue;
                    row.cells[j].firstChild.readOnly = true;
                }
                else { // Clears out the old styling
                    row.cells[j].firstChild.value = value;
                    row.cells[j].firstChild.readOnly = false;
                    row.cells[j].classList.remove("pre");
                   
                }
                row.cells[j].onclick = function () {
                    if(selectedCell != null){
                        selectedCell.classList.remove("selected");
                    }
                    document.getElementById("itemClicked").innerHTML = "Cell clicked: " + i + ',' + j;
                    row.cells[j].classList.add("selected");
                    selectedCell = row.cells[j];
                }
            })(i, j, row, col)
        }
    }
}

function reset() {
    game.board.forEach(function (row, i) {
        row.forEach(function (cell, j) {
            console.log(cell);
            if (!cell.includes(":pre")) {
                //cell = "";
                game.board[i][j] = "";
            }
        });
    });
    populateData();
}


function newGame(difficulty){
    console.log("NEW GAME");
    var difficulty = difficulty;
    if(difficulty==undefined){
       var input = document.getElementById("newGame").value;
       difficulty = DIFFICULTY[input];
    }
    console.log("Loading game with difficulty " + difficulty);
    game.loadBoard(difficulty, populateData);
    
}


function showModelData(){
    document.getElementById("modelData").classList.remove("hidden");
}
function hideModelData(){
    document.getElementById("modelData").classList.add("hidden");
}

function startAnimation(){
    console.log("ANIMATING");
    var element = document.getElementById("gameTitle");
    var speed = 16;
    element.style.top = "-500px";
    setTimeout(moveElementDown, speed);
}
function moveElementDown(){
    var speed = 16;
    var element = document.getElementById("gameTitle");
    var currentTop  =  element.style.top.substring(0,element.style.top.length-2);
    var newTop = parseInt(currentTop) + 12;
    element.style.top =  newTop + "px";
    if(newTop < 10){
     setTimeout(moveElementDown, speed);
    }
}

var sec = 0;
function pad ( val ) { return val > 9 ? val : "0" + val; }
setInterval( function(){
    document.getElementById("seconds").innerHTML=pad(++sec%60);
    document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
}, 1000);


generateBoard(9, 9);
console.log("Starting?");
