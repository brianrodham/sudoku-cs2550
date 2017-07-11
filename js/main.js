var game = {
    board:  {
        "grid": [
                    ['1:pre', '7:pre', '', '5:pre', '2:pre', '', '', '', ''],
                    ['', '2', '8', '', '7:pre', '9:pre','', '6:pre', '3:pre'],
                    ['', '', '9:pre','8:pre', '3:pre', '4:pre','7:pre', '', '1:pre'],
                    ['', '', '','4:pre', '', '','', '3:pre', '2:pre'],
                    ['', '4:pre', '','', '5', '2','', '', '6:pre'],
                    ['7:pre', '', '','3:pre', '1:pre', '','', '', '4:pre'],
                    ['5:pre', '', '','', '8', '','', '4:pre', '9:pre'],
                    ['', '8:pre', '','', '9:pre', '','', '', ''],
                    ['9:pre', '1:pre', '','', '4:pre', '5:pre','3:pre', '8', '7']     
                ],
    },
    "gameOver": false,
    "gameTime": "00:05:25"            
    
}

function generateBoard(rows, columns){
    //var grid = game.board.grid; // Gets the grid data from the json
    var gameContainer = document.getElementById('game-container');

    // Create the container for the grid
    var gameTable = document.createElement("table");
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

generateBoard(9,9);