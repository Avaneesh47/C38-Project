var canvas, backgroundImage;
var athlete1,athlete2,athlete3,athlete4;
var athletes;
var track;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form,player,game;

function preload(){
  athlete_img = loadImage("athlete1.png");
  track = loadImage("track.png");
}

function setup() {
  canvas = createCanvas(displayWidth,displayHeight - 200);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  if(playerCount === 4){
    game.update(1);
  }

  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}