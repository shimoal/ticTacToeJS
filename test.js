var chai = require('chai');
var expect = chai.expect;
var Game = require('./ticTacToe.js').Game;
var Player = require('./ticTacToe.js').Player;

describe('Game', function() {
  var game = new Game();

  it('should be a constructor', function() {
    expect(Game).to.be.a('function');
    expect(game).to.be.an('object');
  })

  it('should be able to determine a winning combination', function() {
    expect(game.checkForWinner([1, 2, 4])).to.equal(false);
    expect(game.checkForWinner([3, 6, 9])).to.equal(true);
    expect(game.checkForWinner([1, 2, 4, 5, 8])).to.equal(true);
    expect(game.checkForWinner([1, 3, 8])).to.equal(false);
    expect(game.checkForWinner([9, 8, 6, 3])).to.equal(true);
    expect(game.checkForWinner([5, 2, 8, 1, 9])).to.equal(true);
  });

  it('should not allow a player to choose an invalid move', function() {
    game.board[2] = 'X';
    expect(game.moveIsValid(2)).to.equal(false);
    expect(game.moveIsValid(3)).to.equal(true);
  });
});

describe('Player', function() {
  var player = new Player();
  it('should be a constructor', function() {
    expect(Player).to.be.a('function');
    expect(player).to.be.an('object');
  });

  it('should be a moves property to store previous moves', function() {
    expect(player.moves).to.exist;
    expect(player.moves).to.be.an('array');
  });
})

