The JSON files contain the starting board state and the answer key for the puzzle.

There are two kinds of values on the starting board. Numbers 1-9 and numbers marked :pre. 
Numbers with :pre are preconfigured for the puzzle, display in bold, and can not be changed in the game. 

The starting state loads into the grid whent he puzzle is loaded. The answer key is never displayed, but can be checked against by clicking validate. 
In the interest of keeping testing easy I've added a 'Test' button that loads answers from the key. 

You can view the stringified JSON by clicking the 'Show JSON Data' at the bottom of the game page.