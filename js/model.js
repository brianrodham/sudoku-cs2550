
var game = {

    
    board:  [
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '','', '', ''],
                    ['', '', '', '', '', '','', '', ''],
                    ['', '', '', '', '', '','', '', ''],
                    ['', '', '', '', '', '','', '', ''],
                    ['', '', '', '', '', '','', '', ''],
                    ['', '', '', '', '', '','', '', ''],
                    ['', '', '', '', '', '','', '', ''],
                    ['', '', '', '', '', '','', '', '']     
    ],
    key:  [
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '','', '', ''],
                    ['', '', '', '', '', '','', '', ''],
                    ['', '', '', '', '', '','', '', ''],
                    ['', '', '', '', '', '','', '', ''],
                    ['', '', '', '', '', '','', '', ''],
                    ['', '', '', '', '', '','', '', ''],
                    ['', '', '', '', '', '','', '', ''],
                    ['', '', '', '', '', '','', '', '']     
    ],
    gameOver: false,
    gameTime: "00:05:25",
    gameJson: "", // Used for assignment 6 to show the parsed json in the view. Has no functional purpose. 
    //Puzzles
    easyPuzzles: ['easy-1.json','easy-2.json','easy-3.json', 'easy-4.json'],
    mediumPuzzles: ['medium-1.json','medium-2.json','medium-3.json'],
    hardPuzzles: ['hard-1.json','hard-2.json','hard-3.json'],
    loadBoard: function(difficulty, callback){

        var path = "puzzles/";
        if(difficulty == DIFFICULTY.EASY){
            path = path + this.easyPuzzles[Math.floor(Math.random() * this.easyPuzzles.length)];
        }
        else if(difficulty == DIFFICULTY.MEDIUM) {
            path = path + this.mediumPuzzles[Math.floor(Math.random() * this.mediumPuzzles.length)];
        }
        else if(difficulty == DIFFICULTY.HARD){
            path = path + this.hardPuzzles[Math.floor(Math.random() * this.hardPuzzles.length)];
        }
        else {
            throw("An invalid difficulty level was entered.");
        }

        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function() {
            if (httpRequest.readyState === 4) {
               // if (httpRequest.status === 200) {
                    var gameData = JSON.parse(httpRequest.responseText);
                    game.gameJson = JSON.stringify(gameData,  null, '\t');
                    game.board = gameData.start;
                    game.key = gameData.key;
                    console.log(game.key);
                    callback();
                //}
            }
        };
        httpRequest.open('GET', path, false);
        httpRequest.send(); 

    },
    // Sets the value of specific box in the model
    setValue: function(value, row, col) {
        console.log("Setting value: " + value + " at " + row + "," + col);
        game.board[row][col] = value;
    },
    // Gets the value of a specific box
    getValue: function(row, col){
        return game.board[row][col];
    },

    // Validates the game data to see if we've won or not
    validate: function(){
        console.log("Validating data");
        var errors = [];
        this.gameOver = false; // In case the game already ended set it to still be in progress.

        // Gets a list of all errors
        game.board.forEach(function (row, i) {
            row.forEach(function (cell, j) {
                //console.log("1: Checking cell: " + i + "," + j + " ("+ game.board[i][j] +")");
                if(game.board[i][j] != game.key[i][j] && !cell.includes(":pre")){
                  //  console.log("2: Checking cell: " + i + "," + j);

                    /*console.log(game.board[i][j] + " != " + game.key[i][j]);
                    console.log("ERROR ERRROR ERROR");
                    console.log("--------------------Board-------------");
                    console.log(game.board);
                    console.log("--------------------------------------");
                    console.log("--------------------Key---------------");
                    console.log(game.key);
                    console.log("--------------------------------------");*/

                    errors.push([i,j]);
                }
            });
        });

        // If there are no errors mark that the game is over.
        if(errors.length == 0){
            this.gameOver = true;
        }

        return errors; // Returns a list of errors to the controller
    },

    populateAnswers: function(){
        game.board.forEach(function (row, i) {
            row.forEach(function (cell, j) {
                if (!cell.includes(":pre")) {
                    game.board[i][j] = game.key[i][j];
                }
            });
        });
    },
}

var DIFFICULTY = {
  EASY : {value: 0, name: "Easy", code: "E"}, 
  MEDIUM: {value: 1, name: "Medium", code: "M"}, 
  HARD : {value: 2, name: "Hard", code: "H"}
};
