
var prompt = require('prompt');

var Game = function() {
  this.player1;
  this.player2;
  this.turn = 0;
  this.currentPlayer = this.player1;
    this.board = {
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7, 
      8: 8,
      9: 9
    };

};

var Player = function() {
  this.moves = [];
};

Game.prototype.startGame = function() {
  this.player1 = new Player();
  this.player1.symbol = 'X';

  this.player2 = new Player();
  this.player2.symbol = 'O';

  this.currentPlayer = this.player2;
  this.getUserInfo();
};

Game.prototype.getUserInfo = function() {
  var context = this;
  console.log('Player 1, what is your name?');
  prompt.start();
  prompt.get('name', function(err, result) {
    context.player1.name = result.name;
    console.log('Welcome, ' + result.name +'! You are "X".');
    console.log('Player 2, what is your name?');
    prompt.start();
    prompt.get('name', function(err, result) {
      context.player2.name = result.name;
      console.log('Welcome, ' + result.name + '! You are "O".');
      context.showBoard();
      context.takeTurn();
    });
  });
};


Game.prototype.takeTurn = function() {
  if (this.checkForWinner(this.currentPlayer.moves)) {
    console.log('!!!!!!!!!!       GAME OVER      !!!!!!!!!!!!');
    console.log(this.currentPlayer.name + ' is the winner!');
    this.showBoard();
  } else {
    this.turn++;
    this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;

    console.log(this.currentPlayer.name + ', it\'s your turn!');
    console.log('Where would you like to go?');
    this.showBoard();
    this.promptMove();
  }
};

Game.prototype.promptMove = function() {
  var context = this;
  prompt.start();
  prompt.get(['move'], function(err, result) {
    console.log('you chose ' + result.move);
    if (context.moveIsValid(result.move)) {
      context.board[result.move] = context.currentPlayer.symbol;
      context.currentPlayer.moves.push(Number(result.move));
    } else {
      console.log('That was an invalid move! Be more careful next time!');
    }
    context.takeTurn();
  });

};

Game.prototype.checkForWinner = function(moves) {
  var winningCombos = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];
  var winnerFound = false;

  winningCombos.forEach(function(combo) {
      if ((moves.indexOf(combo[0]) > -1) && (moves.indexOf(combo[1]) > -1) && (moves.indexOf(combo[2]) > -1)) {
        winnerFound = true;
      }
  });
  return winnerFound;
};

Game.prototype.showBoard = function() {

  console.log('here is the current board:');

  console.log('   |   |   ')
  console.log('_'+ this.board[1] + '_|_' + this.board[2] +'_|_' + this.board[3]+'_');
  console.log('   |   |   ')
  console.log('_' + this.board[4] + '_|_' + this.board[5] + '_|_' + this.board[6] + '_');
  console.log('   |   |   ')
  console.log(' ' + this.board[7]+' | ' + this.board[8]+' | ' + this.board[9]+' ');
};

Game.prototype.moveIsValid = function(move) {
  if (this.board[move] === 'X' || this.board[move] === 'O') {
    return false;
  } 
  return true;
};


module.exports.Game = Game;
module.exports.Player = Player;





