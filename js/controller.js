
//var game = new gameData(); // Model

function validate(){
   game.validate();
}

function generateBoard(rows, columns){
    generateTable(rows, columns);
    populateData();
}

function generateTable(rows, columns){
    var gameContainer = document.getElementById('game-container');

    // Create the container for the grid
    var gameTable = document.createElement("table");
    gameTable.setAttribute("id","game-table");
    gameContainer.appendChild(gameTable);

    for(i = 1; i <= rows; i++){
        var row = document.createElement("tr"); // create the row

        // Add a black border to the bottom of the cells of every third row
        if(i && (i % 3 === 0)){
            row.className = "third-row";
        }

        for(j = 1; j <= columns; j++){
            var cell = document.createElement("td");

            /* Cell styling using javascript */
            if(j==1){
                cell.className = "first-cell";
            }
            else if(j && (j % 3 === 0))
            {
                cell.className = "third-cell";
            }

            row.appendChild(cell);
        }
        gameTable.appendChild(row);
    }
}

// Takes the data from the model and puts it in the view
function populateData(){
    var value;
    var cellValue;
    var grid = game.board; // Gets the grid data from the model
    var table = document.getElementById('game-table');
    for (var i = 0, row; row = table.rows[i]; i++) { //iterate through rows      
        for (var j = 0, col; col = row.cells[j]; j++) { //iterate through columns
            value = game.getValue(i,j);
            if(value.includes(":pre")){ // If the value is a preset default
                row.cells[j].classList.add("pre");
                cellValue = value.replace(":pre","");
                row.cells[j].innerHTML = cellValue ;
            }
            else { // If the value is user defined (Probably won't be used unless showing game in progress)
                row.cells[j].innerHTML = value;
            }
        }  
    }

}

generateBoard(9,9);