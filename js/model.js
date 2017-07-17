var game = {


    board:  [
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
    gameOver: false,
    gameTime: "00:05:25",
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
        if( this.checkRows() && this.checkCols() && this.checkSquares()){
            //this.gameOver = true;
            console.log("Validating data");
        }
    },

    // Checks to see if all of the rows are correct
    checkRows: function(){
        return true;
    },

    // Checks to see if all the cols are correct
    checkCols: function(){
        return true;
    },

    // Checks to see if the 3x3 squares are all correct
    checkSquares: function(){
        return true;
    }
}