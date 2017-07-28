
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
                if (httpRequest.status === 200) {
                    var gameData = JSON.parse(httpRequest.responseText);
                    game.board = gameData.start;
                    game.key = gameData.key;
                    console.log(game.key);
                    callback();
                }
            }
        };
        httpRequest.open('GET', path, false);
        httpRequest.send(); 

    },
    // Sets the value of specific box in the model
    setValue: function(value, row, col) {
        this.board[row][col] = value;
    },
    // Gets the value of a specific box
    getValue: function(row, col){
        return this.board[row][col];
    },

    // Validates the game data to see if we've won or not
    validate: function(){
        console.log("Validating data");
        /*for(var i = 0; row = table.row[i]; i++){
            for( var j=0; col = rows.cells[j]; j++){
                
            }
        }*/
        /*if( this.checkRows() && this.checkCols() && this.checkSquares()){
            this.gameOver = true;
        }*/
    }

    // Checks to see if all of the rows are correct
    /*checkRows: function(){
        this.board.forEach(function(element){
            
        });
    },

    // Checks to see if all the cols are correct
    checkCols: function(){
        return true;
    },

    // Checks to see if the 3x3 squares are all correct
    checkSquares: function(){
        return true;
    }*/
}

var DIFFICULTY = {
  EASY : {value: 0, name: "Easy", code: "E"}, 
  MEDIUM: {value: 1, name: "Medium", code: "M"}, 
  HARD : {value: 2, name: "Hard", code: "H"}
};
