
//var game = new gameData(); // Model
var selectedCell = null;

function validate() {
    var errors = game.validate();
    if(game.gameOver){
        console.log("You win!");
        document.getElementById("gameContainer").classList.add("hidden");
        document.getElementById("victoryDisplay").classList.remove("hidden");
        // Show message that you won the game
    }
    else {  
        var table = document.getElementById('game-table');
        errors.forEach(function(error){
            i = error[0];
            j = error[1];
           // console.log("Error in cell: " + i + "," + j);
            var elem = table.rows[i].cells[j];
            elem.classList.remove("selected");
            elem.classList.add("error");
            console.log("Adding error styling to:" + error);
        });
    }
}

function generateBoard(rows, columns) {
    generateTable(rows, columns);
    newGame(DIFFICULTY.EASY);
    startAnimation();
}



function generateTable(rows, columns) {
    var gameContainer = document.getElementById('gameContainer');

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
            (function(i,j){
                var cell = document.createElement("td");
                var input = document.createElement("input");
                input.type = "text";
                input.maxLength=1;
                input.onkeypress = function(event) {return validateKeypress(event)}
                input.onchange = function(event) { onChange(event.target, i-1, j-1) };
                cell.appendChild(input);
                /* Cell styling using javascript */
                if (j == 1) {
                    cell.className = "first-cell";
                }
                else if (j && (j % 3 === 0)) {
                    cell.className = "third-cell";
                }

                row.appendChild(cell);
            })(i,j);
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
                row.cells[j].classList.remove("error");
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
            if (!cell.includes(":pre")) {
                //cell = "";
                game.board[i][j] = "";
            }
        });
    });
    populateData();
    resetClock()
}

function newGame(difficulty){
    var difficulty = difficulty;
    if(difficulty==undefined){
       var input = document.getElementById("newGame").value;
       difficulty = DIFFICULTY[input];
    }
    console.log("Loading game with difficulty " + difficulty);
    game.loadBoard(difficulty, populateData);
    resetClock();
    console.log("Json");
    console.log(game.gameJson);
    document.getElementById("jsonData").innerHTML = game.gameJson;
    document.getElementById("gameContainer").classList.remove("hidden");
    document.getElementById("victoryDisplay").classList.add("hidden");
    
}

// Event handler for when they put in a new number
function onChange(target,i, j){
    target.parentElement.classList.remove("error");    
    game.setValue(target.value, i, j);
}

function showModelData(){
    document.getElementById("modelData").classList.remove("hidden");
    document.getElementById("hide-button").classList.remove("hidden");
    document.getElementById("show-button").classList.add("hidden");
}
function hideModelData(){
    document.getElementById("modelData").classList.add("hidden");
    document.getElementById("hide-button").classList.add("hidden");
    document.getElementById("show-button").classList.remove("hidden");
}

function showJsonData(){
    document.getElementById("jsonData").classList.remove("hidden");
    document.getElementById("hide-json-button").classList.remove("hidden");
    document.getElementById("show-json-button").classList.add("hidden");
}
function hideJsonData(){
    document.getElementById("jsonData").classList.add("hidden");
    document.getElementById("hide-json-button").classList.add("hidden");
    document.getElementById("show-json-button").classList.remove("hidden");
}


function displayUserData(){
    document.getElementById("userData").innerHTML = localStorage.getItem("sudoku");
}
function logout(){
    localStorage.removeItem("sudoku");
    displayUserData();
    /*window.location.href = "./index.html";*/
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

function testInput(){

    game.populateAnswers();
    populateData();
}

function validateKeypress(event){
    var valid = true;

    // If the character is not between 1 and 9 it's invalid.
    if(event.charCode < 49 || event.charCode > 57){
        valid = false;
    }
    // Add some notible exceptions such as the arrow keys and backspace/delete
    if(event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 37 || event.keyCode == 39){
        valid = true;
    }
    return valid;
}

var sec = 0;
function pad ( val ) { return val > 9 ? val : "0" + val; }
setInterval( function(){
    document.getElementById("seconds").innerHTML=pad(++sec%60);
    document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
}, 1000);
function resetClock(){
    sec=0;
}


displayUserData();
generateBoard(9, 9);
